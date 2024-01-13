import express from 'express';
import { fetchAll, createOne, addProductsToCategory, removeProductsFromCategory } from '../../../controllers/categories';
import { auth, isSuperAdmin } from '../../../middlewares/auth';
import { categoryIdValidator, createCategoryValidator } from '../../../validations/categories';

const router = express.Router();

router.route('/')
  .post(auth, isSuperAdmin, createCategoryValidator, createOne)
  .get(auth, isSuperAdmin, fetchAll);

router.route('/:id/products')
  .post(auth, isSuperAdmin, categoryIdValidator, addProductsToCategory)
  .delete(auth, isSuperAdmin, categoryIdValidator, removeProductsFromCategory);

export default router;
