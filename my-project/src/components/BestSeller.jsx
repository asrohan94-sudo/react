// AdmissionExamBatch.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = "http://localhost:5000";

const AdmissionExamBatch = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, courseRes] = await Promise.all([
          axios.get(`${backendUrl}/api/categories`),
          axios.get(`${backendUrl}/api/courses`)
        ]);

        const catData = catRes.data.categories || [];
        const courseData =
          courseRes.data.courses ||
          courseRes.data.products ||
          [];

        setCategories(["All", ...catData.map(c => c.name)]);

        const validCourses = courseData.filter(c => c && c._id);
        setCourses(validCourses);
        setFilteredCourses(validCourses);

      } catch (err) {
        console.error("Error fetching data:", err);
        setErrorMsg("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= FILTER =================
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(c => {
        if (!c.category) return false;

        if (typeof c.category === "object") {
          return c.category.name === activeCategory;
        }

        return c.category === activeCategory;
      });

      setFilteredCourses(filtered);
    }
  }, [activeCategory, courses]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white p-4 rounded-xl shadow">
              <div className="h-32 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================= ERROR =================
  if (errorMsg) {
    return (
      <p className="text-center py-10 text-red-500">{errorMsg}</p>
    );
  }

  // ================= UI =================
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Admission Exam Batch
        </h2>
        <p className="text-gray-500 mt-2">
          Choose a category to explore courses
        </p>
      </div>

      {/* CATEGORY */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* COURSES */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">😕 No courses found</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredCourses.map(item => (
            <div
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden group cursor-pointer"
            >
              {/* IMAGE */}
              <div className="mt-2 w-full max-h-80 object-contain rounded border mb-3.5">
                <img
                  src={item.image || "/fallback.png"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 text-left">
                <h3 className="font-semibold text-gray-800 line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                  {item.description}
                </p>

                <div className="flex justify-between text-xs text-gray-400 mt-3">
                  <span>📘 {item.examCount || 0} Exams</span>
                  <span>📝 {item.notesCount || 0} Notes</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-blue-600 font-bold">
                    ৳{item.price || 0}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click conflict
                      navigate(`/product/${item._id}`);
                    }}
                    className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700"
                  >
                    View
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdmissionExamBatch;