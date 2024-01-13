import { Document } from 'mongoose';

interface IUser extends Document {
  fullname: string;
  email: string;
  profilePicture: string;
  isSuperAdmin: boolean;
  password: string;
  salt: string;
  refreshToken: string;
}
