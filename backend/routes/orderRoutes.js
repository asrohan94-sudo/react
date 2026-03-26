import express from "express";
import {
  createOrder,
  getOrders,
  approveOrder,
  deleteOrder
} from "../controllers/Orders.js";

import { authMiddleware } from "../middleware/autherMiddleware.js";

const router = express.Router();

// ------------------- USER ROUTES -------------------
// Create order (user must login)
router.post("/", authMiddleware, createOrder);

// ------------------- ADMIN ROUTES -------------------
// Get all orders (admin only)
router.get("/", authMiddleware, getOrders);

// Approve order (admin only)
router.put("/approve/:id", authMiddleware,  approveOrder);

// Delete order (admin only)
router.delete("/:id", authMiddleware,  deleteOrder);

export default router;