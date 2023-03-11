import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmationToken: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    tokens: [{ type: String }],
  }, { versionKey: false });

const User = mongoose.model('User', Schema, 'users');

export default User;

