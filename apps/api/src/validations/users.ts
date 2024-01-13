import Joi from 'joi';
import expressJoiValidation from 'express-joi-validation';
import { mongooseId, number, string } from './schema';

const validator = expressJoiValidation.createValidator({ passError: true });

const createAccountSchema = Joi.object({
  fullname: string.required(),
  email: string.required(),
  profilePicture: string,
  password: string.required().min(6),
  password_confirmation: string.required().min(6),
});

const loginSchema = Joi.object({
  email: string.required(),
  password: string.required().min(6),
});

const userIdSchema = Joi.object({ id: mongooseId.required() });
const refreshUserTokenSchema = Joi.object({ refreshToken: string.required() });

export const createAccountValidator = validator.body(createAccountSchema);
export const loginValidator = validator.body(loginSchema);
export const refreshUserTokenValidator = validator.body(refreshUserTokenSchema);

export const userIdValidator = validator.params(userIdSchema);
