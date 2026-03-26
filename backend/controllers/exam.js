import Exam from "../models/exam.js";
import Submission from "../models/submission.js";
import mongoose from "mongoose";

// Helper: validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// ---------------- Create Exam ----------------
export const createExam = async (req, res) => {
  try {
    const { title, description, date, course, category, questions, status, time } = req.body;

    if (!title || !course || !category) {
      return res.status(400).json({ success: false, message: "Title, course, and category are required" });
    }

    const exam = new Exam({
      title,
      description: description || "",
      date: date ? new Date(date) : undefined,
      course,
      category,
      questions,
      time: Number(time) || 0,
      status: status || "inactive",
    });

    await exam.save();

    res.status(201).json({ success: true, message: "Exam created successfully", exam });
  } catch (error) {
    console.error("Create Exam Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Get All Exams ----------------
export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("category", "name")
      .populate("course", "name")
      .lean();

    res.json({ success: true, exams });
  } catch (error) {
    console.error("Get Exams Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Get Single Exam ----------------
export const getExam = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ success: false, message: "Invalid Exam ID" });

    const exam = await Exam.findById(id)
      .populate("category", "name")
      .populate("course", "name")
      .lean();

    if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });

    res.json({ success: true, exam });
  } catch (error) {
    console.error("Get Exam Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Start Exam ----------------
// Returns exam info and startTime, can be used to track user session
export const startExam = async (req, res) => {
  try {
    const { examId } = req.body;
    if (!isValidObjectId(examId)) return res.status(400).json({ success: false, message: "Invalid Exam ID" });

    const exam = await Exam.findById(examId).lean();
    if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });

    const startTime = new Date();

    res.json({ success: true, exam, startTime, duration: exam.time }); // duration in minutes
  } catch (error) {
    console.error("Start Exam Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Get Remaining Time ----------------
export const getRemainingTime = async (req, res) => {
  try {
    const { startTime, examId } = req.body;

    if (!isValidObjectId(examId)) return res.status(400).json({ success: false, message: "Invalid Exam ID" });

    const exam = await Exam.findById(examId).lean();
    if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });

    const examDuration = exam.time * 60 * 1000; // milliseconds
    const elapsed = new Date() - new Date(startTime);
    const remaining = examDuration - elapsed;

    if (remaining <= 0) {
      return res.json({ success: false, message: "Time over", remainingTime: 0 });
    }

    res.json({ success: true, remainingTime: Math.floor(remaining / 1000) }); // seconds
  } catch (error) {
    console.error("Get Remaining Time Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Update Exam ----------------
export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ success: false, message: "Invalid Exam ID" });

    const updateData = req.body;
    if (updateData.time) updateData.time = Number(updateData.time);

    const exam = await Exam.findByIdAndUpdate(id, updateData, { new: true }).lean();

    if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });

    res.json({ success: true, message: "Exam updated successfully", exam });
  } catch (error) {
    console.error("Update Exam Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Delete Exam ----------------
export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ success: false, message: "Invalid Exam ID" });

    const exam = await Exam.findByIdAndDelete(id).lean();
    if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });

    res.json({ success: true, message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Delete Exam Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Get Exams By Course ----------------
export const getExamsByCourse = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ success: false, message: "Invalid Course ID" });

    const exams = await Exam.find({ course: id, status: "active" })
      .populate("course", "name")
      .populate("category", "name")
      .lean();

    res.json({ success: true, exams });
  } catch (error) {
    console.error("Get Exams By Course Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Get Exam Results ----------------
export const getResults = async (req, res) => {
  try {
    const { examId } = req.params;
    const userId = req.user._id;

    const submission = await Submission.findOne({
      exam: examId,
      user: userId,
    });

    if (!submission) {
      return res.status(404).json({ success: false, message: "Result not found" });
    }

    const exam = await Exam.findById(examId).lean();
    if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });

    let correct = 0;
    let wrong = 0;
    let blank = 0;
    const mistakes = [];

    exam.questions.forEach((q) => {
      const userAnswer = submission.answers?.find(
        (a) => a.questionId.toString() === q._id.toString()
      );

      const correctOption = q.options.find((o) => o.isCorrect);

      if (!userAnswer) {
        blank++;
        mistakes.push({
          question: q.text,
          options: q.options,
          userAnswer: null,
          correctAnswer: correctOption?.text || "",
          explanation: q.explanation || "",
        });
      } else if (userAnswer.answer === correctOption?.text) {
        correct++;
      } else {
        wrong++;
        mistakes.push({
          question: q.text,
          options: q.options,
          userAnswer: userAnswer.answer,
          correctAnswer: correctOption?.text || "",
          explanation: q.explanation || "",
        });
      }
    });

    const negativeMarks = wrong * 0.25;
    const score = correct - negativeMarks;

    res.json({
      success: true,
      result: {
        score,
        correctAnswers: correct,
        wrongAnswers: wrong,
        blankAnswers: blank,
        negativeMarks,
        examTitle: exam.title,
      },
      mistakes,
    });

  } catch (error) {
    console.error("Get Results Error:", error);
    res.status(500).json({ success: false, message: "Server error while fetching result" });
  }
};