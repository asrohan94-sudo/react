import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const backendUrl = "https://examly-ammh.onrender.com";

const ViewExam = () => {
  const { id } = useParams(); // Exam ID from URL

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    course: "",
    category: "",
    status: "inactive",
    questions: [],
  });

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  // ---------------- Fetch Courses, Categories & Exam ----------------
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/courses`);
        if (res.data.success) setCourses(res.data.products);
      } catch (err) {
        console.error("Fetch Courses Error:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/categories`);
        if (res.data.success) setCategories(res.data.categories);
      } catch (err) {
        console.error("Fetch Categories Error:", err);
      }
    };

    const fetchExam = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/exams/${id}`);
        if (res.data.success) {
          const e = res.data.exam;
          setFormData({
            title: e.title || "",
            description: e.description || "",
            date: e.date?.split("T")[0] || "",
            course: e.course?._id || "",
            category: e.category?._id || "",
            status: e.status || "inactive",
            questions: e.questions || [],
          });
        }
      } catch (err) {
        console.error("Fetch Exam Error:", err);
        toast.error("Failed to fetch exam data");
      }
    };

    fetchCourses();
    fetchCategories();
    fetchExam();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6">View Exam</h1>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold">Title</label>
            <input
              type="text"
              value={formData.title}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
              disabled
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              value={formData.description}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
              rows={3}
              disabled
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 font-semibold">Date</label>
            <input
              type="date"
              value={formData.date}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
              disabled
            />
          </div>

          {/* Course */}
          <div>
            <label className="block mb-2 font-semibold">Course</label>
            <input
              type="text"
              value={courses.find((c) => c._id === formData.course)?.name || ""}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
              disabled
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold">Category</label>
            <input
              type="text"
              value={categories.find((c) => c._id === formData.category)?.name || ""}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
              disabled
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 font-semibold">Status</label>
            <input
              type="text"
              value={formData.status}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
              disabled
            />
          </div>

          {/* Questions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Questions</h2>
            {formData.questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="p-4 mb-4 border rounded-md bg-gray-50"
              >
                <h3 className="font-semibold mb-2">
                  Question {qIndex + 1}: {q.text}
                </h3>

                {/* Options */}
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

                {/* Explanation */}
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <strong>Explanation: </strong>
                  {q.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExam;