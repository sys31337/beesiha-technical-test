import { Document } from 'mongoose';
import { IProducts } from './IProducts';

interface ICategories extends Document {
  categoryName: string;
  products: Schema.Types.ObjectId[] | IProducts[];
  price: number;
}
