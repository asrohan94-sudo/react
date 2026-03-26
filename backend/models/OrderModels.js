import mongoose from "mongoose";
// ✅ ensures model is registered

const orderSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // 🔹 must match the Course model
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["bkash", "nagad", "rocket", "card"], // 🔹 must match controller validation
    },
    lastFourDigits: {
      type: String,
      required: true,
      match: /^\d{4}$/, // exactly 4 digits
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;