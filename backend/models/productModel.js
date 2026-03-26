
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: String,
    price: Number,
    category: String,
    examCount: { type: Number, default: 0 },
    notesCount: { type: Number, default: 0 },
    featureCount: { type: Number, default: 0 },
    link: String,
    description: String,
    features: String,
    specialFeatures: String,
    routineImages: [String],
    time: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Register the model
const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;