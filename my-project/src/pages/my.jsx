import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const My = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = "https://examly-ammh.onrender.com";

  // ------------------------
  // Helper: Safe image
  // ------------------------
  const safeImage = (img) => (img && img.trim() !== "" ? img : "/images/fallback.png");

  // ------------------------
  // Fetch courses
  // ------------------------
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/courses`);
        if (res.data.success) {
          setCourses(res.data.products || []);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err.response?.data || err.message);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // ------------------------
  // Loading / empty state
  // ------------------------
  if (loading) return <p className="text-center mt-4">Loading courses...</p>;
  if (!courses.length) return <p className="text-center mt-4">No courses found.</p>;

  // ------------------------
  // Render courses
  // ------------------------
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-3">My Courses</h2>

      <div className="flex flex-col gap-4">
        {courses.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
          >
            <img
              src={safeImage(item.image)}
              alt={item.name || "Course Image"}
              className="object-cover rounded-lg"
            />
            <h3 className="font-bold text-lg mt-2">{item.name || "Untitled Course"}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {item.description || "No description available"}
            </p>

            {/* Navigate using the course ID */}
            <Link to={`/exam/${item._id}`}>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Open
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default My;