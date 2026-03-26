import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  adminLogin
} from "../controllers/Usercontrollers.js";

import { authMiddleware } from "../middleware/autherMiddleware.js"; // for user auth
// NOTE: do NOT use verifyAdmin on login route

const router = express.Router();

// ------------------- USER ROUTES -------------------
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile); // protect profile with user auth

// ------------------- ADMIN ROUTE -------------------
router.post("/admin-login", adminLogin); // no middleware, login only

export default router;