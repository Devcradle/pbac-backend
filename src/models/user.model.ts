import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema(
  {
    name: {
      type: String
    },
    username: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    role: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model<IUser>('User', userSchema);
