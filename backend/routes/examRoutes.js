import express from "express";
import {
  createExam,
  getExams,
  getExam,
  updateExam,
  deleteExam,
  getRemainingTime,
  startExam,
  getExamsByCourse,
} from "../controllers/exam.js";

import { authMiddleware } from "../middleware/autherMiddleware.js";
import { submitExam, getResults } from "../controllers/submit.js";
import Submission from "../models/submission.js";

const router = express.Router();

// -------- Create Exam (admin only) --------
router.post("/", authMiddleware, createExam);

// -------- Get All Exams --------
router.get("/", getExams);

// -------- Get Exams By Course --------
router.get("/course/:id", getExamsByCourse);

// -------- Start Exam --------
router.post("/start", authMiddleware, startExam);

// -------- Remaining Time --------
router.post("/remaining-time", authMiddleware, getRemainingTime);

// -------- Submit Exam --------
router.post("/:examId/submit", authMiddleware, submitExam);

// ⭐ Results (KEEP BEFORE /:id)
router.get("/:examId/results", authMiddleware, getResults);

// ================== ✅ DONE EXAMS ==================
router.get("/done", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    const submissions = await Submission.find({ user: userId }).populate({
      path: "exam",
      populate: [
        { path: "course", select: "name" },
        { path: "category", select: "name" },
      ],
    });

    const doneExams = submissions.map((sub) => ({
      examId: sub.exam._id,
      title: sub.exam.title,
      course: sub.exam.course?.name || null,
      category: sub.exam.category?.name || null,
      submissionId: sub._id,
      score: sub.score || 0,
      totalQuestions: sub.exam.questions.length,
    }));

    res.json({ success: true, doneExams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ================== ✅ MISTAKES ==================
router.get("/mistakes/:submissionId", authMiddleware, async (req, res) => {
  try {
    const { submissionId } = req.params;

    const submissionData = await Submission.findById(submissionId).populate("exam");

    if (!submissionData) {
      return res.status(404).json({ success: false, message: "Submission not found" });
    }

    const exam = submissionData.exam;

    const mistakes = exam.questions
      .map((question) => {
        const userAnswer = submissionData.answers.find(
          (a) => a.questionId.toString() === question._id.toString()
        );

        const correctOption = question.options.find((o) => o.isCorrect);

        if (!userAnswer || userAnswer.answer !== correctOption?.text) {
          return {
            question: question.text,
            options: question.options,
            userAnswer: userAnswer?.answer || null,
            correctAnswer: correctOption?.text || "",
            explanation: question.explanation || "",
          };
        }

        return null;
      })
      .filter(Boolean);

    res.json({ success: true, mistakes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// -------- Get Single Exam (KEEP LAST) --------
router.get("/:id", getExam);

// -------- Update Exam --------
router.put("/:id", authMiddleware, updateExam);

// -------- Delete Exam --------
router.delete("/:id", authMiddleware, deleteExam);

export default router;