import UserModel from "../models/UserModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ================= CREATE JWT TOKEN =================
const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || "yourjwtsecret",
    { expiresIn: "7d" }
  );
};

// ================= REGISTER USER =================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "All fields are required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ success: false, message: "Invalid email" });

    if (password.length < 6)
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

    const exists = await UserModel.findOne({ email });
    if (exists)
      return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isActive: false,
      lastActive: null,
    });

    const token = createToken(user);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= LOGIN USER =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password are required" });

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Incorrect password" });

    user.isActive = true;
    user.lastActive = Date.now();
    await user.save();

    const token = createToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        lastActive: user.lastActive,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= ADMIN LOGIN =================
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password are required" });

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "User does not exist" });

    if (user.role !== "admin")
      return res.status(403).json({ success: false, message: "Not authorized as admin" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Incorrect password" });

    user.isActive = true;
    user.lastActive = Date.now();
    await user.save();

    const token = createToken(user);

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        lastActive: user.lastActive,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= CREATE ADMIN (AUTO) =================
export const createAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    const existingAdmin = await UserModel.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await UserModel.create({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        isActive: false,
        lastActive: null,
      });
      console.log("✅ Admin created:", adminEmail);
    } else {
      console.log("✅ Admin already exists:", adminEmail);
    }
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  }
};

// ================= GET USER PROFILE =================
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Not authenticated" });

    const user = await UserModel.findById(userId).select("-password");
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= LOGOUT USER =================
const logoutUser = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (userId) {
      const user = await UserModel.findById(userId);
      if (user) {
        user.isActive = false;
        user.lastActive = Date.now();
        await user.save();
      }
    }
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, adminLogin, getUserProfile, logoutUser };