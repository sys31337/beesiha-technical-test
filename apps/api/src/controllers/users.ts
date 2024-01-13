import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import User from 'models/users';
import { checkRefreshToken, signToken } from 'functions/accessToken';
import { IUserIdRequest } from 'types/common';

export const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullname, email, profilePicture, password: plainPassword } = req.body;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(plainPassword, salt);
    const userPayload = { fullname, email, profilePicture, password, salt };
    const user = await new User(userPayload).save();
    return res.status(201).send(user);
  } catch (error) {
    return next(error);
  }
}

export const fetchAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return next(error);
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: { $regex: `^${email}$`, $options: 'i' } });
    if (!user) return res.sendStatus(404);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send({ message: 'Wrong Password' });
    }
    const {
      _id: userId, fullname, profilePicture, refreshToken: currentRefreshToken,
    } = user;
    const accessToken = jwt.sign({
      userId, fullname, profilePicture, email,
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    const refreshToken = checkRefreshToken(currentRefreshToken, user);  /* Check if currentRefreshToken has Expired */
    await User.findByIdAndUpdate(userId, { refreshToken });
    return res.status(200).send({ refreshToken, accessToken });
  } catch (error) {
    return next(error);
  }
};

export const refreshUserToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).send('USERNOTALLOWED');

    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err: JsonWebTokenError) => {
      if (err) res.sendStatus(403);

      const { _id: userId, fullname, profilePicture, email } = user;
      const accessToken = signToken({ userId, fullname, profilePicture, email, expiresIn: '1d', secret: process.env.ACCESS_TOKEN_SECRET });
      const newRefreshToken = signToken({ userId, fullname, profilePicture, email, expiresIn: '90d', secret: process.env.REFRESH_TOKEN_SECRET });
      await User.findByIdAndUpdate(userId, { refreshToken: newRefreshToken });
      return res.status(200).send({ refreshToken: newRefreshToken, accessToken });
    });
  } catch (error) {
    return next(error);
  }
};

export const getCurrentUser = async (req: IUserIdRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).select('-refreshToken -password -salt');
    return res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};