import { Document, Types } from 'mongoose';
import { ICategories } from './ICategories';

interface IDiscounts {
  id: Types.ObjectId;
  type: 'AMOUNT' | 'PERCENTAGE';
  amount: number;
}

interface IProducts extends Document {
  productName: string;
  price: number;
  discounts: [IDiscounts]
}
