import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = "https://examly-ammh.onrender.com";

const ExamsDashboard = () => {
  const [exams, setExams] = useState([]);
  const [categories, setCategories] = useState(["সব"]);
  const [selectedCategory, setSelectedCategory] = useState("সব");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // ---------------- Fetch Exams ----------------
  const fetchExams = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/exams`);
      if (res.data.success) setExams(res.data.exams);
    } catch (error) {
      console.error("Fetch Exams Error:", error);
    }
  };

  // ---------------- Fetch Categories ----------------
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/categories`);
      if (res.data.success) {
        setCategories(["সব", ...res.data.categories.map((c) => c.name)]);
      }
    } catch (error) {
      console.error("Fetch Categories Error:", error);
    }
  };

  useEffect(() => {
    fetchExams();
    fetchCategories();
  }, []);

  // ---------------- Filter Exams ----------------
  const filteredExams = exams.filter((exam) => {
    const matchesCategory =
      selectedCategory === "সব" || exam.category?.name === selectedCategory;
    const matchesSearch =
      exam.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subtitle?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ---------------- Actions ----------------
  const handleCreateExam = () => navigate("/exams/add");

  const handleViewSubmissions = (exam) => {
    if (exam.status !== "active") {
      alert("This exam is not active yet. Access denied!");
      return;
    }
    navigate(`/exams/${exam._id}/submissions`);
  };

  const handleEditExam = (exam) => navigate(`/exams/${exam._id}/edit`);

  const handleDeleteExam = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    try {
      const res = await axios.delete(`${backendUrl}/api/exams/${id}`);
      if (res.data.success) setExams((prev) => prev.filter((e) => e._id !== id));
    } catch (error) {
      console.error("Delete Exam Error:", error);
    }
  };

  // ---------------- Toggle Active Status ----------------
  const toggleStatus = async (exam) => {
    try {
      const newStatus = exam.status === "active" ? "inactive" : "active";
      const res = await axios.put(`${backendUrl}/api/exams/${exam._id}`, {
        status: newStatus,
      });
      if (res.data.success) {
        setExams((prev) =>
          prev.map((e) => (e._id === exam._id ? res.data.exam : e))
        );
      }
    } catch (error) {
      console.error("Toggle Status Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Exams</h1>
        <button
          onClick={handleCreateExam}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition shadow-md"
        >
          Create Exam
        </button>
      </div>

      {/* Search */}
      <div className="px-6 pt-6">
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all shadow-sm ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exam Cards */}
      <div className="px-6 pb-12 max-w-5xl mx-auto">
        <div className="space-y-6">
          {filteredExams.length ? (
            filteredExams.map((exam) => (
              <div
                key={exam._id}
                className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition hover:shadow-xl ${
                  exam.status !== "active" ? "opacity-70" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{exam.title}</h2>
                      <p className="text-sm text-gray-600 mt-1">{exam.subtitle}</p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        exam.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {exam.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full">
                      {exam.category?.name || "নির্ধারিত নেই"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleViewSubmissions(exam)}
                      className={`px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg ${
                        exam.status !== "active" ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      View Submissions
                    </button>

                    <button
                      onClick={() => handleEditExam(exam)}
                      className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteExam(exam._id)}
                      className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => toggleStatus(exam)}
                      className={`px-5 py-2 ${
                        exam.status === "active"
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white font-medium rounded-lg`}
                    >
                      {exam.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">কোনো পরীক্ষা পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamsDashboard;