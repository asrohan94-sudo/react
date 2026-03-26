import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // tracks token validity

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Get JWT token from localStorage
  const token = localStorage.getItem("token");

  // Only send header if token exists
  const axiosConfig = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  // ----------------- FETCH ORDERS -----------------
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders`, axiosConfig);
      setOrders(res.data.orders || []);
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch orders";

      // Handle missing/invalid token
      if (msg.toLowerCase().includes("token") || msg.toLowerCase().includes("unauthorized")) {
        setIsLoggedIn(false);
        setOrders([]);
      } else {
        alert(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ----------------- APPROVE ORDER -----------------
  const approveOrder = async (orderId) => {
    if (!token) {
      alert("You must be logged in to approve orders.");
      return;
    }

    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/orders/approve/${orderId}`,
        {},
        axiosConfig
      );
      alert(res.data.message || "Order approved!");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "approved" } : order
        )
      );
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to approve order";
      alert(msg);
    }
  };

  // ----------------- DELETE ORDER -----------------
  const deleteOrder = async (orderId) => {
    if (!token) {
      alert("You must be logged in to delete orders.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/orders/${orderId}`, axiosConfig);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to delete order";
      alert(msg);
    }
  };

  // ----------------- STATUS BADGE -----------------
  const statusBadge = (status) => {
    const base = "px-3 py-1 text-xs font-semibold rounded-full inline-block";
    switch (status?.toLowerCase()) {
      case "approved":
        return `${base} bg-green-100 text-green-700`;
      case "pending":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "rejected":
        return `${base} bg-red-100 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  // ----------------- RENDER -----------------
  if (!isLoggedIn) {
    return (
      <p className="p-6 text-center text-lg font-medium text-red-600">
        You are not logged in or your session expired. Please log in to view orders.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="p-6 text-center text-lg font-medium">
        Loading orders...
      </p>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last 4 Digits</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="text-center text-sm">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-6 text-gray-500">
                  No orders available.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={order._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{order.course?.name || "N/A"}</td>
                  <td className="px-4 py-3 capitalize">{order.paymentMethod || "N/A"}</td>
                  <td className="px-4 py-3 font-semibold">৳ {order.amount || 0}</td>
                  <td className="px-4 py-3">
                    <span className={statusBadge(order.status)}>
                      {order.status || "pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{order.lastFourDigits || "N/A"}</td>
                  <td className="px-4 py-3 space-x-2">
                    {order.status !== "approved" && (
                      <button
                        onClick={() => approveOrder(order._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
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