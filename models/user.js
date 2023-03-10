import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    register_time: Date,
  }, { versionKey: false });

const ModelUser = mongoose.model('ModelUser', Schema, 'users');

export default ModelUser;
