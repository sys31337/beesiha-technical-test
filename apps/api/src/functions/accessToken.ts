import jwt from 'jsonwebtoken';
import { parseJwt } from '../utils';
import { IUser } from 'types/IUser';

interface SignTokenProps {
  userId: string;
  fullname: string;
  profilePicture: string;
  email: string;
  secret: string;
  expiresIn: string;
}

export const signToken = ({ userId, fullname, profilePicture, email, secret, expiresIn }: SignTokenProps) => jwt.sign({
  userId, fullname, profilePicture, email,
}, secret, {
  expiresIn,
})

export const checkRefreshToken = (currentRefreshToken: string, user: IUser) => {
  const { _id: userId, fullname, profilePicture, email } = user;
  if (currentRefreshToken) {
    const { exp } = parseJwt(currentRefreshToken);
    const curTime = Math.ceil(Date.now() / 1000);
    if (curTime < exp) return currentRefreshToken;
  }
  return signToken({ userId, fullname, profilePicture, email, expiresIn: '90d', secret: process.env.REFRESH_TOKEN_SECRET });
};
