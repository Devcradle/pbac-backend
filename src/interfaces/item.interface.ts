import { Document } from 'mongoose';

export interface IItem extends Document {
  _id: string | number;
  name: string;
}
