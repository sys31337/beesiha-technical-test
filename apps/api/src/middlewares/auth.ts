import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserIdRequest } from '../types/common';
import User from '../models/users';

export const auth = (req: IUserIdRequest, res: Response, next: NextFunction): NextFunction => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;
  if (token == null) {
    return res.sendStatus(401) as unknown as NextFunction;
  }
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.email = (decoded as jwt.JwtPayload).email;
    req.userId = (decoded as jwt.JwtPayload).userId;
    const user = await User.findById((decoded as jwt.JwtPayload).userId);
    req.isSuperAdmin = user.isSuperAdmin || false;
    return next();
  }) as unknown as NextFunction;
};

export const isSuperAdmin = async (req: IUserIdRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('USER_NOT_FOUND');
    if (user.isSuperAdmin) return next();
    return res.status(401).send('NOT_SUPER_ADMIN');
  } catch (error) {
    return next(error);
  }
};
