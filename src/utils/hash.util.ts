import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';

class HashingPassword {
  private encrypt = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  };

  private compare = async (
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> => {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw new Error('Error comparing passwords');
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public EncryptPassword() {
    return this.encrypt;
  }
}

export default HashingPassword;
