// ---------------- Submit Exam ----------------
// submitExamController.js
import Submission from "../models/submission.js";
import Exam from "../models/exam.js";
import mongoose from "mongoose";

// Helper: validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);  



export const submitExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { answers } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    let correct = 0;
    let wrong = 0;
    let blank = 0;

    exam.questions.forEach((question) => {
      const userAnswer = answers.find(
        (a) => a.questionId.toString() === question._id.toString()
      );

      if (!userAnswer) {
        blank++;
      } 
      else if (userAnswer.answer === question.correctAnswer) {
        correct++;
      } 
      else {
        wrong++;
      }
    });

    const negativeMarks = wrong * 0.25;
    const score = correct - negativeMarks;

    const submission = await Submission.create({
      exam: exam._id,
      user: user._id,
      answers,
      correctAnswers: correct,
      wrongAnswers: wrong,
      blankAnswers: blank,
      negativeMarks,
      score,
    });

    res.status(201).json({
      success: true,
      message: "Exam submitted successfully",
      submission,
      score,
    });

  } catch (err) {
    console.error("Submit exam error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const getResults = async (req, res) => {
  try {
    const { examId } = req.params;
    const userId = req.user._id;

    const submission = await Submission.findOne({
      exam: examId,
      user: userId,
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    const exam = await Exam.findById(examId);

    let correct = 0;
    let wrong = 0;
    let blank = 0;

    const mistakes = [];

    exam.questions.forEach((q) => {
      const userAnswer = submission.answers.find(
        (a) => a.questionId.toString() === q._id.toString()
      );

      if (!userAnswer) {
        blank++;
      } 
      else if (userAnswer.answer === q.correctAnswer) {
        correct++;
      } 
      else {
        wrong++;

        // ⭐ Save mistake question
        mistakes.push({
          questionId: q._id,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          userAnswer: userAnswer.answer
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
      mistakes   // ⭐ send mistake questions
    });

  } catch (error) {
    console.error("Result Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching result",
    });
  }
};