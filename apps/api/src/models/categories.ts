import { model, Schema } from 'mongoose';
import { ICategories } from 'types/ICategories';

const categoriesSchema = new Schema<ICategories>({
  categoryName: {
    type: String,
    required: true,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    unique: true,
  }],
  price: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const Categories = model('Category', categoriesSchema);
export default Categories;
