import { Document } from 'mongoose';

export interface IToken extends Document {
  accessToken: string;
  refreshToken: string;
  userId: string;
}
