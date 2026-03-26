import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CategoryForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim())
      return alert("Category name cannot be empty");

    try {
      setLoading(true);

      const res = await axios.post(
        `${BACKEND_URL}/api/categories`,
        { name }
      );

      alert(res.data.message || "Category created");
      navigate("/courses/category-list");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Add Category
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg"
      >
        <label className="block text-gray-700 mb-2">
          Category Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter category name"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() =>
              navigate("/courses/category-list")
            }
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}