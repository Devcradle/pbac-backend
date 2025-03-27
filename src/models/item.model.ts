import { Schema, model } from 'mongoose';
import { IItem } from '../interfaces/item.interface';

const itemSchema = new Schema(
  {
    name: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model<IItem>('Item', itemSchema);
