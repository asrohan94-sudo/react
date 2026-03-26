import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [optionSchema],
  explanation: { type: String, default: "" },
});

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: Date },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: false }, // optional now
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: false }, // optional now
    questions: [questionSchema],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    time: { type: Number, default: 0 }, // minutes
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

export default mongoose.model("Exam", examSchema);