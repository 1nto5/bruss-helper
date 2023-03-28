import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  loginToken: String,
  loginTokenExpires: Date,
});

export default mongoose.model("User", userSchema, "users");
