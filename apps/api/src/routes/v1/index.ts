import express from 'express';

import usersRouter from './helpers/users';
import productsRouter from './helpers/products';
import categoriesRouter from './helpers/categories';

const router = express.Router();

router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);

export default router;
