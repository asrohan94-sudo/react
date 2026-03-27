import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = "https://examly-ammh.onrender.com";

export default function CourseList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/courses`);
      if (res.data.success) {
        setCourses(res.data.products);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      const res = await axios.delete(`${backendUrl}/api/courses/${id}`);

      if (res.data.success) {
        setCourses((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (course) => {
    navigate("/courses/edit-course", { state: { course } });
  };

  const handleView = (course) => {
    navigate("/courses/view-course", { state: { course } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>

        <button
          onClick={() => navigate("/courses/add-course")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Create Course
        </button>
      </div>

      {/* Empty state */}
      {courses.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          No courses available
        </div>
      )}

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >

            {/* Image */}
            <div className="mt-2 w-full max-h-80 object-contain rounded border mb-3.5">
              {course.image ? (
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">

              <h2 className="text-lg font-semibold">{course.name}</h2>

              <p className="text-gray-600 text-sm">
                {course.description?.slice(0, 80)}...
              </p>

              <div className="text-sm text-gray-500 space-y-1">
                <p><b>Price:</b> {course.price}</p>
                <p><b>Category:</b> {course.category?.name || "None"}</p>
                
              </div>

              {/* Features */}
              {course.features?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {course.features.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="flex justify-between text-sm text-gray-600 pt-3 border-t">
                <span>Exams: {course.examCount}</span>
                <span>Notes: {course.notesCount}</span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-4">

                <button
                  onClick={() => handleView(course)}
                  className="flex-1 bg-green-500 text-white py-1 rounded hover:bg-green-600"
                >
                  View
                </button>

                <button
                  onClick={() => handleEdit(course)}
                  className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(course._id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}