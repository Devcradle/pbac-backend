import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';
import { sendCodeEmail } from '../utils/otp.util';
import RedisConfig from '../config/redis.config';
import TokenUtil from '../utils/token.util';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

class UserService {
  public signUp = async (body: IUser): Promise<IUser> => {
    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;
    const data = await User.create(body);
    return data;
  };

  public login = async (body: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; refreshToken: string }> => {
    const data = await User.findOne({ email: body.email });
    if (!data) {
      throw new Error('Invalid login credentials');
    }

    const isMatch = await bcrypt.compare(body.password, data.password);
    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }

    const accessToken = await TokenUtil.generateToken(
      data._id,
      process.env.SECRET_KEY_0,
      '15m'
    );
    const refreshToken = await TokenUtil.generateToken(
      data._id,
      process.env.SECRET_KEY_1,
      '7d'
    );
    const tokenData = await TokenUtil.getToken(data._id);
    tokenData
      ? await TokenUtil.updateToken(accessToken, refreshToken, data._id)
      : await TokenUtil.storeToken(accessToken, refreshToken, data._id);

    return { accessToken, refreshToken };
  };

  public generateOtp = async (body: {
    email: string;
    _id: string;
  }): Promise<boolean> => {
    const secret = speakeasy.generateSecret({ length: 20 });
    const code = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
      digits: 4
    });
    console.log(code);
    await sendCodeEmail(body.email, code);
    const redisConfig = new RedisConfig();
    await redisConfig.set(`${body._id}`, code, 300);
    return !!code;
  };

  public forgetPasswordOtp = async (body: {
    email: string;
  }): Promise<boolean> => {
    const secret = speakeasy.generateSecret({ length: 20 });
    const code = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
      digits: 6
    });
    console.log(code);
    await sendCodeEmail(body.email, code);
    const redisConfig = new RedisConfig();
    await redisConfig.set(`${body.email}`, code, 300);
    return !!code;
  };

  public forgetPassword = async (body: {
    email: string;
    code: string;
  }): Promise<string> => {
    const redisConfig = new RedisConfig();
    const storedCode = await redisConfig.get(body.email);

    if (!storedCode || storedCode !== body.code) {
      throw new Error('Invalid or expired OTP');
    }

    const user = await User.findOne({ email: body.email });
    if (!user) {
      throw new Error('User not found');
    }

    return 'OTP verified successfully';
  };

  public resetPassword = async (body: {
    password: string;
    _id: string;
  }): Promise<string> => {
    const user = await User.findById(body._id);
    if (!user) {
      throw new Error('User not found');
    }
    const hashPassword = await bcrypt.hash(body.password, 10);
    user.password = hashPassword;
    await user.save();
    return 'Password reset successfully';
  };

  public regenerateToken = async (body: {
    accessToken: string;
    refreshToken: string;
    _id: string;
  }): Promise<unknown> => {
    try {
      if (!body.accessToken || !body.refreshToken) {
        throw {
          code: HttpStatus.UNAUTHORIZED,
          message: 'Both access and refresh tokens are missing'
        };
      }

      const verifyAccessToken = new Promise((resolve) => {
        jwt.verify(body.accessToken, process.env.SECRET_KEY_2, (err, user) => {
          if (err) {
            resolve(null);
          } else {
            resolve(user);
          }
        });
      });

      const user = await verifyAccessToken;

      if (!user) {
        const verifyRefreshToken = new Promise((resolve, reject) => {
          jwt.verify(body.refreshToken, process.env.SECRET_KEY, (err, user) => {
            if (err) {
              reject(err);
            } else {
              resolve(user);
            }
          });
        });

        const refreshTokenUser = (await verifyRefreshToken) as {
          email: string;
          _id: string;
        };
        const newAccessToken = await TokenUtil.generateToken(
          { email: refreshTokenUser?.email, _id: refreshTokenUser?._id },
          process.env.SECRET_KEY_2,
          '15min'
        );
        await TokenUtil.updateToken(
          newAccessToken,
          body.refreshToken,
          refreshTokenUser?._id
        );
        return newAccessToken;
      } else {
        return null;
      }
    } catch (error) {
      throw {
        code: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized Access'
      };
    }
  };
}

export default UserService;
