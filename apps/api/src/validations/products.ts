import Joi from 'joi';
import expressJoiValidation from 'express-joi-validation';
import {
  array, mongooseId, number, string,
} from './schema';

const validator = expressJoiValidation.createValidator({ passError: true });

const discountSchema = Joi.object({
  kind: string.required().valid('AMOUNT', 'PERCENTAGE'),
  amount: number.required(),
});

const createProductSchema = Joi.object({
  productName: string.required(),
  price: number.required(),
  discounts: array.items(discountSchema)
});

const productIdSchema = Joi.object({ id: mongooseId.required() });

const addDiscountSchema = discountSchema;

export const createProductValidator = validator.body(createProductSchema);
export const addDiscountValidator = validator.body(addDiscountSchema);
export const removeDiscountValidator = validator.body(productIdSchema);

export const productIdValidator = validator.params(productIdSchema);
