import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CourseEnrollmentFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const backendUrl = "http://localhost:5000";
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [course, setCourse] = useState(null);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [activeExam, setActiveExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  const safeImage = (img) => img || "/images/fallback.png";
  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  // ---------- Fetch Course ----------
  useEffect(() => {
    if (!id || !isValidObjectId(id)) {
      setErrorMsg("Invalid course ID");
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/courses/${id}`);
        if (res.data.success) {
          setCourse(res.data.product || res.data.course);
        } else {
          setErrorMsg(res.data.message || "Course not found");
        }
      } catch (err) {
        console.error(err);
        setErrorMsg(err?.response?.data?.message || "Failed to fetch course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // ---------- Fetch Exams ----------
  useEffect(() => {
    if (!course?._id || !isValidObjectId(course._id)) {
      setExams([]);
      return;
    }

    const fetchExams = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/exams/course/${course._id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.data.success) {
          const activeExams = (res.data.exams || []).filter((e) => e.status === "active");
          setExams(activeExams);
        } else {
          setExams([]);
        }
      } catch (err) {
        console.error("Failed to fetch exams:", err.response?.data || err.message);
        setExams([]);
      }
    };

    fetchExams();
  }, [course?._id, token]);

  // ---------- Start Exam ----------
  const startExam = async (exam) => {
    if (!userId) {
      alert("User not found. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/exams/start`,
        { examId: exam._id },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      const remainingTime =
        res.data.duration != null
          ? res.data.duration * 60
          : exam.time > 0
          ? exam.time * 60
          : 600;

      setActiveExam(exam);
      setTimeLeft(remainingTime);

      const questionsRes = await axios.get(`${backendUrl}/api/exams/${exam._id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (questionsRes.data.success) {
        setQuestions(questionsRes.data.exam.questions || []);
      }
    } catch (err) {
      console.error("Failed to start exam:", err.response?.data || err.message);
      alert("Unable to start exam. Please try again.");
    }
  };

  // ---------- Countdown Timer ----------
  useEffect(() => {
    if (!activeExam || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam(); // auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeExam]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSelectAnswer = (qIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  // ---------- Submit Exam ----------
  const submitExam = async () => {
    if (!activeExam) return;

    if (!userId) {
      alert("User not found. Please login again.");
      navigate("/login");
      return;
    }

    const formattedAnswers = questions
      .map((q, index) => ({
        questionId: q._id,
        answer: q.options[answers[index]]?.text,
      }))
      .filter((ans) => ans.answer != null);

    if (formattedAnswers.length === 0) {
      alert("No answers to submit!");
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/exams/${activeExam._id}/submit`,
        { user: userId, answers: formattedAnswers },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      if (res.data.success) {
        // Navigate to Result page
        navigate(`/exam/result/${activeExam._id}`, {
          state: {
            exam: activeExam,
            submission: res.data.submission,
            score: res.data.score,
          },
        });
      }

      // Reset
      setActiveExam(null);
      setQuestions([]);
      setAnswers({});
      setTimeLeft(0);
    } catch (err) {
      console.error("Failed to submit exam:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to submit exam. Please try again.");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading course...</p>;
  if (errorMsg)
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 mb-4">{errorMsg}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{course?.name}</h1>
        {course?.image && (
          <img
            src={safeImage(course.image)}
            alt={course.name}
            className="mb-4 rounded-lg"
            onError={(e) => (e.target.src = "/images/fallback.png")}
          />
        )}
        <p className="text-gray-700 mb-4">{course?.description}</p>

        {!activeExam && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-3">✅ Exams</h2>
            {exams.length === 0 ? (
              <p className="text-gray-500">No exams available.</p>
            ) : (
              exams.map((exam) => (
                <div key={exam._id} className="border p-3 rounded-lg mb-2">
                  <p className="font-semibold">{exam.title}</p>
                  <p className="text-sm text-gray-600">
                    Duration: {exam.time > 0 ? exam.time : 10} mins
                  </p>
                  <button
                    onClick={() => startExam(exam)}
                    className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                  >
                    Start Exam
                  </button>
                </div>
              ))
            )}
          </section>
        )}

        {activeExam && (
          <section className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-700">{activeExam.title}</h2>
              <span className="text-lg font-semibold">
                ⏳ {timeLeft > 0 ? formatTime(timeLeft) : "Time Over"}
              </span>
            </div>

            {questions.map((q, qIndex) => (
              <div key={q._id} className="border p-3 rounded-lg mb-3 bg-gray-50">
                <p className="font-semibold mb-2">
                  {qIndex + 1}. {q.text}
                </p>
                {q.options.map((opt, oIndex) => (
                  <label
                    key={oIndex}
                    className={`flex items-center space-x-2 cursor-pointer p-2 border rounded hover:bg-gray-100 ${
                      answers[qIndex] === oIndex ? "bg-green-100 border-green-400" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${qIndex}`}
                      checked={answers[qIndex] === oIndex}
                      onChange={() => handleSelectAnswer(qIndex, oIndex)}
                    />
                    <span>{opt.text || opt}</span>
                  </label>
                ))}
              </div>
            ))}

            <div className="text-center mt-4">
              <button
                onClick={submitExam}
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Submit Exam
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CourseEnrollmentFlow;