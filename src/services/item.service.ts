import User from '../models/item.model';
import { IUser } from '../interfaces/item.interface';

class UserService {
  public signUp = async (body: IUser): Promise<IUser> => {
    const data = await User.create(body);
    return data;
  };

  //update a user
  public updateUser = async (_id: string, body: IUser): Promise<IUser> => {
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
