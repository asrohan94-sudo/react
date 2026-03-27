import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const backendUrl = "https://examly-ammh.onrender.com";

export default function EditCourse() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  if (!course) return <p className="p-6">No course data available.</p>;

  const [formData, setFormData] = useState({
    name: course.name || "",
    price: course.price || "",
    description: course.description || "",
    time: course.time || "",
    examCount: course.examCount || 0,
    notesCount: course.notesCount || 0,
    features: course.features || [],
    specialFeatures: course.specialFeatures || [],
    image: null,           // new image file
    existingImage: course.image || "", // preview of current image
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value.split(",").map((v) => v.trim()),
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("time", formData.time);
      data.append("examCount", formData.examCount);
      data.append("notesCount", formData.notesCount);
      data.append("features", formData.features.join(","));
      data.append("specialFeatures", formData.specialFeatures.join(","));

      if (formData.image) data.append("image", formData.image);

      const res = await axios.put(
        `${backendUrl}/api/courses/update/${course._id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast.success("Course updated successfully");
        navigate("/courses/list");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Edit Course</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Course Name */}
          <div>
            <label className="font-semibold">Course Name</label>
            <input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          {/* Price */}
          <div>
            <label className="font-semibold">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          {/* Time */}
          <div>
            <label className="font-semibold">Course Time</label>
            <input
              value={formData.time}
              onChange={(e) => handleChange("time", e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          {/* Exam & Notes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Exam Count</label>
              <input
                type="number"
                value={formData.examCount}
                onChange={(e) => handleChange("examCount", e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="font-semibold">Notes Count</label>
              <input
                type="number"
                value={formData.notesCount}
                onChange={(e) => handleChange("notesCount", e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="font-semibold">Features (comma separated)</label>
            <input
              value={formData.features.join(", ")}
              onChange={(e) => handleArrayChange("features", e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          {/* Special Features */}
          <div>
            <label className="font-semibold">Special Features (comma separated)</label>
           
          </div>

          {/* Image */}
          <div>
            <label className="font-semibold">Course Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mt-1"
            />
            {formData.image ? (
              <p className="mt-2 text-green-600">{formData.image.name}</p>
            ) : formData.existingImage ? (
              <img
                src={formData.existingImage}
                alt="current"
                className="mt-2 w-full h-40 object-cover rounded"
              />
            ) : null}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}