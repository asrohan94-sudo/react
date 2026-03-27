// pages/ExamPage.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ExamPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const backendUrl = "https://examly-ammh.onrender.com";
  const token = localStorage.getItem("token");

  const { exam } = state || {};
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(null);
  const [loading, setLoading] = useState(true);

  const isSubmitted = useRef(false);

  // ---------------- Fetch Exam ----------------
  useEffect(() => {
    if (!exam?._id) return;

    const fetchExam = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/exams/${exam._id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.data.success) {
          const examData = res.data.exam;
          setQuestions(examData.questions || []);
          const duration = Number(examData.time) || 10;
          setTimeLeftSeconds(duration * 60);
        }
      } catch (err) {
        console.error("Failed to fetch exam:", err);
        alert("Failed to fetch exam. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [exam, token]);

  // ---------------- Timer ----------------
  useEffect(() => {
    if (timeLeftSeconds === null) return;
    if (timeLeftSeconds <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => setTimeLeftSeconds(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeftSeconds]);

  // ---------------- Handle Answer Selection ----------------
  const handleSelectAnswer = (qIndex, optionIndex) => {
    setAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  // ---------------- Submit Exam ----------------
  const handleSubmit = useCallback(async () => {
    if (isSubmitted.current) return;
    isSubmitted.current = true;

    try {
      // Map selected answers
      const answerArray = questions
        .map((q, qIndex) => {
          const selectedIndex = answers[qIndex];
          const option = q.options[selectedIndex];
          return {
            questionId: q._id,
            answer: selectedIndex !== undefined ? (typeof option === "string" ? option : option.text) : null,
          };
        })
        .filter(ans => ans.answer != null); // remove unanswered

      if (answerArray.length === 0) {
        alert("No answers selected!");
        return;
      }

      const res = await axios.post(
        `${backendUrl}/api/exams/${exam._id}/submit`,
        { answers: answerArray }, // ✅ user comes from JWT
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      if (res.data.success) {
        alert("Exam submitted successfully!");
        navigate("/examresult", { state: { exam, submission: res.data.submission, score: res.data.score } });
      }
    } catch (err) {
      console.error("Failed to submit exam:", err);
      alert(err.response?.data?.message || "Failed to submit exam. Please try again.");
    }
  }, [answers, questions, exam, navigate, token]);

  // ---------------- Format Timer ----------------
  const formatTime = seconds => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading) return <div className="text-center p-6">Loading exam...</div>;
  if (!exam) return <div className="text-center p-6 text-red-600">Exam not found!</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{exam.title}</h1>

      <div className="text-xl font-bold mb-6">
        Time Left: {formatTime(timeLeftSeconds)}
      </div>

      {questions.map((q, qIndex) => (
        <div key={q._id} className="mb-6 border p-4 rounded bg-gray-50">
          <p className="font-bold mb-3">
            {qIndex + 1}. {q.text}
          </p>
          {q.options.map((opt, oIndex) => (
            <div
              key={oIndex}
              onClick={() => handleSelectAnswer(qIndex, oIndex)}
              className={`p-2 border rounded mb-2 cursor-pointer ${
                answers[qIndex] === oIndex ? "bg-blue-100 border-blue-500" : ""
              }`}
            >
              {typeof opt === "string" ? opt : opt.text}
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Submit Exam
      </button>
    </div>
  );
};

export default ExamPage;