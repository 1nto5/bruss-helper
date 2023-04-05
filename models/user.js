import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dmcheckMgmtAccess: { type: Boolean, default: false },
    extraHoursSupervisor: { type: Boolean, default: false },
  },
  { versionKey: false }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

const User = mongoose.model("User", UserSchema, "users");
export default User;
