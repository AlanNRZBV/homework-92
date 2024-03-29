import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {UserFields, UserMethods, UserModel} from '../types';
import { randomUUID } from 'crypto';

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;
const UserSchema = new Schema<UserFields, UserModel, UserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'client'],
    default: 'client',
  },
  displayName: {
    type: String,
    required: true,
  },
  isOnline: {
    type: Boolean,
    required: true,
    default: false
  }
});

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.methods.setOnline = function(){
  this.isOnline = true;
}
UserSchema.methods.setOffline = function(){
  this.isOnline = false;
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, _options) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model<UserFields, UserModel>('User', UserSchema);
export default User;
