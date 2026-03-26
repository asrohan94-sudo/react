import express from "express";
import User from "../models/UserModel.js";
import { authMiddleware } from "../middleware/autherMiddleware.js";

const router = express.Router();

/**
 * POST /api/activity
 * Body: { action: "update" | "logout" }
 * - "update": update lastActive and set isActive = true
 * - "logout": set isActive = false
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { action } = req.body;

    if (!action) {
      return res.status(400).json({ success: false, message: "Action is required" });
    }

    if (action === "update") {
      // Update last active timestamp and mark user online
      await User.findByIdAndUpdate(req.user.id, {
        lastActive: Date.now(),
        isActive: true,
      });
      return res.status(200).json({ success: true, message: "Activity updated" });
    } else if (action === "logout") {
      // Mark user offline
      await User.findByIdAndUpdate(req.user.id, { isActive: false });
      return res.status(200).json({ success: true, message: "Logged out successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid action" });
    }
  } catch (err) {
    console.error("Activity route error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * GET /api/activity/active-users
 * Get all currently online users
 */
router.get("/active-users", async (req, res) => {
  try {
    const users = await User.find({ isActive: true }).select("name email lastActive");
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;