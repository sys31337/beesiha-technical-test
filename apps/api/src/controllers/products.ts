import { Request, Response, NextFunction } from 'express';
import Product from 'models/products';

export const fetchAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (error) {
    return next(error);
  }
};

export const addDiscount = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params: { id }, body: { kind, amount } } = req;
    const product = await Product.findByIdAndUpdate(id, { $push: { discounts: { kind, amount } } }, { new: true, upsert: true });
    if (!product) return res.sendStatus(404);
    return res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
}

export const removeDiscount = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params: { id }, body: { id: discountId } } = req;
    const product = await Product.findByIdAndUpdate(id, { $pull: { discounts: { _id: discountId } } }, { new: true, upsert: true });
    if (!product) return res.sendStatus(404);
    return res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
}

export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.sendStatus(404);
    return res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
}

export const createOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { productName, price, discounts } = req.body;
    const payload = { productName, price, discounts };
    const product = await new Product(payload).save();
    return res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
}

export const updateOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { body: { productName, price, discounts }, params: { id } } = req;
    const payload = { productName, price, discounts };
    const product = await Product.findByIdAndUpdate(id, payload);
    if (!product) return res.sendStatus(404);
    return res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.sendStatus(404);
    return res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
}
