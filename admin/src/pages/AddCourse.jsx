import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowLeft } from "lucide-react";

export default function CreateCourseForm() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    price: "",
    category: "", // now will store name
    examCount: 0,
    notesCount: 0,
    featureCount: 0,
    link: "",
    description: "",
    features: "",
    specialFeatures: "",
    routineImages: [],
    time: "0",
  });

  const [dragActive, setDragActive] = useState(false);

  // Fetch categories from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.categories);
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  // Handle drag events for single course image
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setFormData({ ...formData, image: e.dataTransfer.files[0] });
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      if (name === "routineImages") {
        // Multiple routine images safely
        setFormData({ ...formData, routineImages: Array.from(files) });
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ----------------- SUBMIT TO BACKEND -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append all fields
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category); // now sends name
      data.append("examCount", formData.examCount);
      data.append("notesCount", formData.notesCount);
      data.append("featureCount", formData.featureCount);
      data.append("link", formData.link);
      data.append("description", formData.description);
      data.append("features", formData.features);
      data.append("specialFeatures", formData.specialFeatures);
      data.append("time", formData.time);

      // Append images
      if (formData.image) data.append("image", formData.image);
      (formData.routineImages || []).forEach((file) =>
        data.append("routineImages", file)
      );

      // Send request to backend
      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      console.log("Backend response:", result);

      if (result.success) {
        alert("Course created successfully!");
        navigate("/courses/list");
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Failed to create course. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Heading Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Create Course</h1>
        </div>
      </header>

      {/* Form Section */}
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-7">
            {/* Course Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course name"
              />
            </div>

            {/* Course Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Image</label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-10 text-center ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
                }`}
              >
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="absolute inset-0  w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
              </div>
              {formData.image && (
                <p className="mt-3 text-sm text-green-600 font-medium">
                  Selected: {formData.image.name || "1 file"}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="e.g. 2999"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Counts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Count</label>
                <input
                  type="number"
                  name="examCount"
                  value={formData.examCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes Count</label>
                <input
                  type="number"
                  name="notesCount"
                  value={formData.notesCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feature Count</label>
                <input
                  type="number"
                  name="featureCount"
                  value={formData.featureCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Group Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="https://"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
                placeholder="Write a detailed description..."
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Features</label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Features</label>
                <textarea
                  name="specialFeatures"
                  value={formData.specialFeatures}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
                />
              </div>
            </div>

            {/* Routine Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Routine Images</label>
              <input
                type="file"
                name="routineImages"
                multiple
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-5 file:rounded-lg file:bg-gray-100 hover:file:bg-gray-200"
              />
              {(formData.routineImages || []).length > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  {(formData.routineImages || []).length} file(s) selected
                </p>
              )}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="number"
                name="time"
                value={formData.time}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="e.g. 25"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/courses/list")}
                className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
              >
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}