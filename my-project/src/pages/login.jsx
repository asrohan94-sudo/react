import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = "https://examly-ammh.onrender.com";

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle login/register
  const [name, setName] = useState(""); // only for register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill all required fields");
      return;
    }

    // Hard-coded admin check
    if (email === "admin123@gmail.com" && password === "admin123") {
      window.location.href = "https://react-xdcm.onrender.com/login";
      return;
    }

    try {
      const endpoint = isLogin ? "/api/user/login" : "/api/user/register";
      const payload = isLogin ? { email, password } : { name, email, password };

      const res = await axios.post(`${backendUrl}${endpoint}`, payload);

      if (res.data.success) {
        // Save token & user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Regular user dashboard
        navigate("/"); 
      } else {
        setError(res.data.message || "Operation failed");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.response?.data?.message || "Server error");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "User Login" : "User Register"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">{error}</div>
        )}

        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          onClick={handleSubmit}
          className={`w-full py-2 rounded ${
            isLogin ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
          } text-white`}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-sm text-gray-500 mt-3 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={toggleForm}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserAuth;