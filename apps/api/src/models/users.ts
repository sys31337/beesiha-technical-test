import { model, Schema } from 'mongoose';
import { IUser } from 'types/IUser';

const usersSchema = new Schema<IUser>({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
    default: 'default.png',
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  refreshToken: String,
}, { timestamps: true });

const User = model<IUser>('User', usersSchema);
export default User;
