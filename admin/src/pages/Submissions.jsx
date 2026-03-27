import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const backendUrl = "https://examly-ammh.onrender.com";

export default function ViewExam() {
  const { id } = useParams(); // exam ID from URL
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/exams/${id}`);
        if (res.data.success) setExam(res.data.exam);
        else toast.error("Exam not found");
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch exam data");
      }
    };
    fetchExam();
  }, [id]);

  if (!exam) return <p className="p-6 text-center">Loading exam data...</p>;

  const renderField = (field) => {
    if (Array.isArray(field)) return field.join(", ");
    if (typeof field === "object" && field !== null) return JSON.stringify(field);
    return field;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>

        <p><strong>Description:</strong> {renderField(exam.description)}</p>
        <p><strong>Date:</strong> {exam.date?.split("T")[0]}</p>
        <p><strong>Course:</strong> {exam.course?.name}</p>
        <p><strong>Category:</strong> {exam.category?.name}</p>
        <p><strong>Status:</strong> {exam.status}</p>

        <div>
          <h2 className="text-xl font-semibold mb-2">Questions</h2>
          {exam.questions?.map((q, i) => (
            <div key={i} className="p-4 mb-4 border rounded-md bg-gray-50">
              <h3 className="font-semibold mb-2">
                Question {i + 1}: {q.text}
              </h3>
              <div className="ml-4 mb-2">
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="flex items-center mb-1">
                    <input
                      type="radio"
                      checked={opt.isCorrect}
                      disabled
                      className="mr-2"
                    />
                    <span>{opt.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <strong>Explanation:</strong> {q.explanation}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back
        </button>
      </div>
    </div>
  );
}