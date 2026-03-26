import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentMethodsManager = () => {
  const [methods, setMethods] = useState([]);
  const [newMethod, setNewMethod] = useState({ label: "", value: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // ----------------- FETCH METHODS -----------------
  const fetchMethods = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/payment-methods`);
      console.log("Fetched methods:", data);

      // Ensure methods is always an array
      setMethods(Array.isArray(data) ? data : Array.isArray(data.methods) ? data.methods : []);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setMethods([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  // ----------------- ADD METHOD -----------------
  const handleAddMethod = async () => {
    if (!newMethod.label || !newMethod.value) return;

    try {
      await axios.post(`${BACKEND_URL}/api/payment-methods`, newMethod);
      setNewMethod({ label: "", value: "" });
      fetchMethods();
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  // ----------------- EDIT METHOD -----------------
  const handleEdit = (method) => {
    setEditingId(method._id);
    setEditingData({ label: method.label, value: method.value });
  };

  // ----------------- UPDATE METHOD -----------------
  const handleUpdate = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/payment-methods/${id}`, editingData);
      setEditingId(null);
      setEditingData({});
      fetchMethods();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // ----------------- DELETE METHOD -----------------
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/payment-methods/${id}`);
      fetchMethods();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ----------------- RENDER -----------------
  if (loading) return <p className="text-center mt-6">Loading payment methods...</p>;
  if (methods.length === 0) return <p className="text-center mt-6">No payment methods found.</p>;

  return (
    <div className="p-6 max-w-2xl mb-60 mx-auto bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Payment Methods</h2>

      {/* ----------------- ADD NEW METHOD ----------------- */}
      <div className="mb-6 flex flex-wrap gap-2 items-center">
        <input
          type="text"
          placeholder="Label"
          value={newMethod.label}
          onChange={(e) => setNewMethod({ ...newMethod, label: e.target.value })}
          className="border p-2 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="text"
          placeholder="Value"
          value={newMethod.value}
          onChange={(e) => setNewMethod({ ...newMethod, value: e.target.value })}
          className="border p-2 rounded-md flex-1 min-w-[150px]"
        />
        <button
          onClick={handleAddMethod}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* ----------------- METHODS TABLE ----------------- */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Label</th>
              <th className="border px-4 py-2 text-left">Value</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((method) => (
              <tr key={method._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  {editingId === method._id ? (
                    <input
                      value={editingData.label}
                      onChange={(e) =>
                        setEditingData({ ...editingData, label: e.target.value })
                      }
                      className="border p-1 rounded-md w-full"
                    />
                  ) : (
                    method.label
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingId === method._id ? (
                    <input
                      value={editingData.value}
                      onChange={(e) =>
                        setEditingData({ ...editingData, value: e.target.value })
                      }
                      className="border p-1 rounded-md w-full"
                    />
                  ) : (
                    method.value
                  )}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  {editingId === method._id ? (
                    <button
                      onClick={() => handleUpdate(method._id)}
                      className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(method)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(method._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentMethodsManager;