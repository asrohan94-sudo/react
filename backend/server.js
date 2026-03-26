import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'dotenv/config';
import path from 'path';

import userRouter from './routes/userRoutes.js';
import paymentRouter from './routes/PaymentRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import examRouter from './routes/examRoutes.js';
import activityRouter from './routes/activityRouter.js';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudary.js';
import { createAdmin } from './controllers/Usercontrollers.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- MIDDLEWARES ----------------
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true
}));

// ----------------- START SERVER AFTER DB -----------------
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB connected");

    // Connect Cloudinary
    

    // Ensure admin exists
    await createAdmin();
    

    // ----------------- ROUTES -----------------
    app.use('/api/user', userRouter);
    app.use("/api/payment-methods", paymentRouter);
    app.use("/api/courses", productRouter);
    app.use("/api/orders", orderRouter);
    app.use("/api/categories", categoryRoutes);
    app.use("/api/exams", examRouter);
    app.use("/api/activity", activityRouter);

    app.get('/', (req, res) => res.send('API is running...'));

    // ----------------- START LISTEN -----------------
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server start failed:", err.message);
    process.exit(1);
  }
};

startServer();