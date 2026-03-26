import express from "express";
import Category from "../models/category.js";

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({}, "_id name"); // only _id and name
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET single category
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id, "_id name");
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// CREATE category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Name is required" });

    const category = new Category({ name });
    await category.save();

    res.json({ success: true, category: { _id: category._id, name: category.name } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// UPDATE category
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Name is required" });

    const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    res.json({ success: true, category: { _id: category._id, name: category.name } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    res.json({ success: true, message: "Category deleted", category: { _id: category._id, name: category.name } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;