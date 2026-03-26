
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "User Name",
    email: "user@example.com",
    role: "Customer",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch user profile from backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          setUserData({
            name: res.data.user.name || "User Name",
            email: res.data.user.email || "user@example.com",
            role: res.data.user.role || "Customer",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const { name, email, role } = userData;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {/* Profile Picture & Name */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white text-2xl font-bold rounded-full">
          {(name && name[0]?.toUpperCase()) || "U"}
        </div>
        <div>
          <h2 className="text-xl font-semibold capitalize">{name}</h2>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              readOnly
              className="w-full p-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Account Type</label>
            <input
              type="text"
              value={role}
              readOnly
              className="w-full p-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Email Address */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Email Address</h3>
        <input
          type="text"
          value={email}
          readOnly
          className="w-full p-2 border rounded bg-gray-100 text-gray-700"
        />
      </div>

      {/* Logout Button */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handleLogout}
          className="w-80 p-2 border hover:bg-gray-200 rounded bg-gray-100 text-gray-700 text-center font-medium"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;