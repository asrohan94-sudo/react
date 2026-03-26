import Order from "../models/OrderModels.js";
import Course from "../models/productModel.js";
import mongoose from "mongoose";

// ------------------- CREATE ORDER -------------------
export const createOrder = async (req, res) => {
  try {
    const { course, amount, paymentMethod, lastFourDigits } = req.body;

    // ✅ Check auth FIRST
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = req.user._id;

    // ✅ Debug (remove later)
    console.log("BODY:", req.body);
    console.log("USER:", user);

    // ✅ Field-by-field validation (NO more generic error)
    if (!course) {
      return res.status(400).json({ success: false, message: "Course is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: "Amount must be greater than 0" });
    }

    if (!paymentMethod) {
      return res.status(400).json({ success: false, message: "Payment method is required" });
    }

    const normalizedMethod = paymentMethod.toLowerCase();

    if (!["bkash", "nagad", "rocket", "card"].includes(normalizedMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method (bkash/nagad/rocket/card only)",
      });
    }

    if (!lastFourDigits || !/^\d{4}$/.test(lastFourDigits)) {
      return res.status(400).json({
        success: false,
        message: "Last four digits must be exactly 4 numbers",
      });
    }

    // ✅ Check course exists
    const existingCourse = await Course.findById(course);
    if (!existingCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // ✅ Create order
    const order = await Order.create({
      course,
      user,
      amount: Number(amount),
      paymentMethod: normalizedMethod,
      lastFourDigits,
    });

    // ✅ Populate
    await order.populate([
      { path: "user", select: "name email" },
      { path: "course", select: "name price" },
    ]);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------- GET ALL ORDERS (ADMIN) -------------------
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate([
        { path: "user", select: "name email" },
        { path: "course", select: "name price" },
      ])
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------- APPROVE ORDER (ADMIN) -------------------
export const approveOrder = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid order ID" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Order is already ${order.status}`,
      });
    }

    order.status = "approved";
    await order.save();

    await order.populate([
      { path: "user", select: "name email" },
      { path: "course", select: "name price" },
    ]);

    res.status(200).json({
      success: true,
      message: "Order approved successfully",
      order,
    });
  } catch (error) {
    console.error("Approve Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------- DELETE ORDER (ADMIN) -------------------
export const deleteOrder = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid order ID" });
    }

    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Delete Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};