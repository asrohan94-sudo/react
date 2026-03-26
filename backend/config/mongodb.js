import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://asrohan94_db_user:123456788@cluster1.k3wy3q4.mongodb.net/xamly?retryWrites=true&w=majority"
    );

    console.log(`🔥 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
