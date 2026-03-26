import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/categories`
      );
      setCategories(res.data.categories || []);
    } catch (error) {
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // DELETE CATEGORY
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await axios.delete(
        `${BACKEND_URL}/api/categories/${id}`
      );

      setCategories((prev) =>
        prev.filter((c) => c._id !== id)
      );
    } catch (error) {
      alert("Failed to delete category");
    }
  };

  if (loading)
    return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          Category List
        </h2>

        <button
          onClick={() => navigate("/courses/add-category")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6">
                Name
              </th>
              <th className="text-left py-4 px-6">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="text-center py-4 text-gray-500"
                >
                  No categories yet.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${category.color}`}
                    >
                      {category.name}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <button
                      onClick={() =>
                        handleDelete(category._id)
                      }
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
