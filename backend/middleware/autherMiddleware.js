// middleware/authMiddleware.jsz
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

// ------------------- USER AUTH MIDDLEWARE -------------------
export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized. Token missing." });
    }

    // Remove 'Bearer ' prefix if present
    if (token.startsWith("Bearer ")) token = token.slice(7);

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "yourjwtsecret");

    // Fetch user from DB (exclude password)
    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired. Please login again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }
    res.status(401).json({ success: false, message: "Not authorized." });
  }
};

// ------------------- ADMIN AUTH MIDDLEWARE -------------------
export const verifyAdmin = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized. Token missing." });
    }

    if (token.startsWith("Bearer ")) token = token.slice(7);

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "yourjwtsecret");

    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden: Admins only." });
    }

    // Optional: attach admin ID for future use
    req.adminId = decoded.id;
    next();
  } catch (error) {
    console.error("Admin middleware error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired. Please login again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }
    res.status(401).json({ success: false, message: "Not authorized." });
  }
};