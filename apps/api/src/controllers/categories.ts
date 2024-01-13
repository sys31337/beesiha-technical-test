import { Request, Response, NextFunction } from 'express';
import Category from '../models/categories';

export const fetchAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const categories = await Category.find();
    return res.status(200).send(categories);
  } catch (error) {
    return next(error);
  }
};

export const createOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const payload = req.body;
    await new Category(payload).save();
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
}

export const addProductsToCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { body: { products }, params: { id } } = req;
    const category = await Category.findByIdAndUpdate(id, { $addToSet: { products: { $each: products } } }, { new: true });
    if (!category) return res.sendStatus(404);
    return res.status(200).send(category);
  } catch (error) {
    return next(error);
  }
}

export const removeProductsFromCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { body: { products }, params: { id } } = req;
    const category = await Category.findByIdAndUpdate(id, { $pull: { products: { $in: products } } }, { new: true });
    if (!category) return res.sendStatus(404);
    return res.status(200).send(category);
  } catch (error) {
    return next(error);
  }
}