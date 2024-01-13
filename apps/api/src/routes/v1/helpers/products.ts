import express from 'express';
import { fetchAll, createOne, getOne, updateOne, deleteOne, addDiscount, removeDiscount } from '../../../controllers/products';
import { auth, isSuperAdmin } from '../../../middlewares/auth';
import { addDiscountValidator, createProductValidator, productIdValidator, removeDiscountValidator } from '../../../validations/products';

const router = express.Router();

router.route('/')
  .post(auth, isSuperAdmin, createProductValidator, createOne)
  .get(auth, isSuperAdmin, fetchAll);

router.route('/:id')
  .get(auth, isSuperAdmin, productIdValidator, getOne)
  .patch(auth, isSuperAdmin, productIdValidator, updateOne)
  .delete(auth, isSuperAdmin, productIdValidator, deleteOne);

router.route('/:id/discount')
  .delete(auth, isSuperAdmin, productIdValidator, removeDiscountValidator, removeDiscount)
  .post(auth, isSuperAdmin, productIdValidator, addDiscountValidator, addDiscount);

export default router;
