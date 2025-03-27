import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

class UserService {
  public signUp = async (body: IUser): Promise<IUser> => {
    const data = await User.create(body);
    return data;
  };

  public login = async (body: {
    email: string;
    password: string;
  }): Promise<IUser> => {
    const data = await User.findOne({ email: body.email });
    return data;
  };

  public forgetPassword = async (
    _id: string,
    body: { password: string }
  ): Promise<IUser> => {
    const data = await User.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  //delete a user
  public deleteUser = async (_id: string): Promise<string> => {
    await User.findByIdAndDelete(_id);
    return '';
  };

  //get a single user
  public getUser = async (_id: string): Promise<IUser> => {
    const data = await User.findById(_id);
    return data;
  };
}

export default UserService;
