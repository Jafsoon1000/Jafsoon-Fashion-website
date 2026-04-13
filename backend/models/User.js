import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    isPhoneVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false, required: true }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
