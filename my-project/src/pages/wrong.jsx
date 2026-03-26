import React, { useEffect, useState } from "react";
import axios from "axios";

const QuizResultPanel = ({ submissionId }) => {
  const [questions, setQuestions] = useState([]);
  const [totalMistakes, setTotalMistakes] = useState(0);
  const [loading, setLoading] = useState(true);

  const backendUrl = "http://localhost:5000";

  useEffect(() => {
    const fetchMistakes = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/exams/mistakes/${submissionId}`
        );

        const mistakes = res.data?.mistakes || [];

        setQuestions(mistakes);
        setTotalMistakes(mistakes.length);
      } catch (error) {
        console.error("Error fetching mistakes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (submissionId) {
      fetchMistakes();
    }
  }, [submissionId]);

  const handleCreateCustomProgram = () => {
    alert("Creating custom program based on your mistakes...");
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-gray-50 font-sans">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">
          আপনার ভুল করা প্রশ্নসমূহ
        </h1>
        <p className="text-sm text-gray-600">
          নিচে আপনার ভুল করা প্রশ্নগুলো এবং তাদের সঠিক উত্তরগুলো দেখানো হলো।
        </p>
      </div>

      {/* Mistake Counter */}
      <div className="flex justify-between items-center mb-6 py-3 border-y border-gray-200">
        <div className="text-lg font-semibold text-gray-800">
          মোট ভুল প্রশ্ন: {totalMistakes}
        </div>

        <button
          onClick={handleCreateCustomProgram}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          কাস্টম প্রোগ্রাম তৈরি করুন
        </button>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.length === 0 ? (
          <div className="text-center text-gray-500">
            কোনো ভুল প্রশ্ন পাওয়া যায়নি।
          </div>
        ) : (
          questions.map((q, index) => (
            <div
              key={q._id || index}
              className="bg-white p-5 rounded-xl shadow border"
            >
              <h2 className="text-lg font-bold mb-3">
                {index + 1}. {q.question}
              </h2>

              <div className="space-y-2">
                {(q.options || []).map((option, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded ${
                      option.isCorrect
                        ? "bg-green-100 border-l-4 border-green-500 font-semibold"
                        : "bg-gray-50"
                    }`}
                  >
                    {option.text}
                  </div>
                ))}
              </div>

              {q.explanation && (
                <div className="mt-3 text-sm text-gray-600">
                  ব্যাখ্যা: {q.explanation}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuizResultPanel;