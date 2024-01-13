import Joi from 'joi';
import expressJoiValidation from 'express-joi-validation';
import {
  array, mongooseId, number, string,
} from './schema';

const validator = expressJoiValidation.createValidator({ passError: true });

const createCategorySchema = Joi.object({
  categoryName: string.required(),
  products: array.items(mongooseId.required()).required(),
  price: number.required(),
});

const categoryIdSchema = Joi.object({ id: mongooseId.required() });

export const createCategoryValidator = validator.body(createCategorySchema);
export const categoryIdValidator = validator.params(categoryIdSchema);
