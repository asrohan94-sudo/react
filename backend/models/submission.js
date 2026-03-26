// models/submission.js
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  exam: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Exam", 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", // assuming you have a User model
    required: true 
  },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      answer: { type: String }
    }
  ],
  score: { 
    type: Number, 
    default: 0 
  },
  submittedAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("Submission", submissionSchema);