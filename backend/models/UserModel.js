import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },

    // Active log fields
    isActive: { type: Boolean, default: false }, // currently online
    lastActive: { type: Date, default: Date.now }, // last activity timestamp
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;