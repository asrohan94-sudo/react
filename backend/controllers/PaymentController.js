import PaymentMethod from "../models/paymentMethodSchema.js";
import mongoose from "mongoose";
// List all methods
export const listMethods = async (req, res) => {
  try {
    const methods = await PaymentMethod.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: methods.length,
      methods,
    });
  } catch (error) {
    console.error("List Methods Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment methods",
    });
  }
};

// Add a method
export const addMethod = async (req, res) => {
  try {
    const { label, value } = req.body;

    if (!label || !value) {
      return res.status(400).json({
        success: false,
        message: "Label and value are required",
      });
    }

    const existing = await PaymentMethod.findOne({ value });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Payment method already exists",
      });
    }

    const method = await PaymentMethod.create({ label, value });

    res.status(201).json({
      success: true,
      message: "Payment method added successfully",
      method,
    });
  } catch (error) {
    console.error("Add Method Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add payment method",
    });
  }
};

// Update a method
export const updateMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, value } = req.body;

    const updated = await PaymentMethod.findByIdAndUpdate(
      id,
      { label, value },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Payment method not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment method updated successfully",
      method: updated,
    });
  } catch (error) {
    console.error("Update Method Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update payment method",
    });
  }
};

// Delete a method
export const deleteMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await PaymentMethod.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Payment method not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment method deleted successfully",
    });
  } catch (error) {
    console.error("Delete Method Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete payment method",
    });
  }
};

export default { listMethods, addMethod, updateMethod, deleteMethod };