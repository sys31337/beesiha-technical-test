import { model, Schema, Types } from 'mongoose';
import { IProducts } from 'types/IProducts';

const productsSchema = new Schema<IProducts>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discounts: [{
    id: Types.ObjectId,
    kind: {
      type: String,
      enum: ['AMOUNT', 'PERCENTAGE']
    },
    amount: Number
  }]
}, { timestamps: true });

const Products = model<IProducts>('Product', productsSchema);
export default Products;
