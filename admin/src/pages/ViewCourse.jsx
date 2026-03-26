import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewCourse() {
  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state?.course;

  if (!course) {
    return <p className="p-6">No course data available.</p>;
  }

  const renderField = (field) => {
    if (Array.isArray(field)) return field.join(", ");
    if (typeof field === "object" && field !== null) return JSON.stringify(field);
    return field;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">{course.name}</h1>
        <p><strong>Image:</strong> {renderField(course.image)}</p>
        <p><strong>Price:</strong> {renderField(course.price)}</p>
        <p><strong>Category:</strong> {renderField(course.category)}</p>
        <p><strong>Exam Count:</strong> {renderField(course.examCount)}</p>
        <p><strong>Notes Count:</strong> {renderField(course.notesCount)}</p>
        <p><strong>Feature Count:</strong> {renderField(course.featureCount)}</p>
        <p><strong>Description:</strong> {renderField(course.description)}</p>
        <p><strong>Features:</strong> {renderField(course.features)}</p>
        <p><strong>Special Features:</strong> {renderField(course.specialFeatures)}</p>
        <p><strong>Time:</strong> {renderField(course.time)}</p>

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
