import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => 'user_' + ar7id(),
  },
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: false },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true,
  },
  isBanned: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export const userModel = mongoose.model('users', userSchema);
