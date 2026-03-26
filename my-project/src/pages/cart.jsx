import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShopContext from "../context/ShopContext";
import axios from "axios";

const backendUrl = "http://localhost:5000";

const Cart = () => {
  const { currency } = useContext(ShopContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const courseId = state?.id;
  const name = state?.name;
  const price = state?.price;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [lastFourDigits, setLastFourDigits] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [sendMoneyNumber, setSendMoneyNumber] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= AUTH =================
  const token = localStorage.getItem("token");
  let userId = null;
  const userRaw = localStorage.getItem("user");

  if (userRaw && userRaw !== "undefined") {
    try {
      const parsedUser = JSON.parse(userRaw);
      // ✅ FIX: extract MongoDB-style _id
      if (parsedUser._id) {
        userId = parsedUser._id.$oid || parsedUser._id;
      } else {
        userId = parsedUser.id || parsedUser.user?._id || parsedUser.user?.id || null;
      }
      console.log("Parsed user object:", parsedUser);
      console.log("Resolved userId:", userId);
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
    }
  }

  console.log("Auth Check -> Token:", !!token, "UID:", userId);

  // ================= PAYMENT METHODS =================
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/payment-methods`);
        if (res.data.success && res.data.methods?.length > 0) {
          setPaymentMethods(res.data.methods);
          setPaymentMethod(res.data.methods[0].label);
          setSendMoneyNumber(res.data.methods[0].value);
        } else {
          setPaymentMethods([{ label: "Default", value: "0000" }]);
          setPaymentMethod("Default");
          setSendMoneyNumber("0000");
        }
      } catch (err) {
        console.error("Failed to fetch payment methods:", err);
        setPaymentMethods([{ label: "Default", value: "0000" }]);
        setPaymentMethod("Default");
        setSendMoneyNumber("0000");
      }
    };
    fetchPaymentMethods();
  }, []);

  const handleCopy = () => {
    if (sendMoneyNumber) {
      navigator.clipboard.writeText(sendMoneyNumber);
      alert("Number copied!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId) { alert("No course selected"); return; }
    if (!token || !userId) { alert("Session expired. Please login again."); navigate("/login"); return; }
    if (lastFourDigits.length !== 4) { alert("Enter valid 4 digits"); return; }

    setLoading(true);
    try {
      const orderData = {
        course: courseId,
        user: userId,
        amount: price,
        paymentMethod,
        lastFourDigits,
        sendMoneyNumber,
        currency,
      };

      const res = await axios.post(`${backendUrl}/api/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        alert("Order placed successfully!");
        
      } else {
        alert(res.data.message || "Order failed");
      }
    } catch (err) {
      console.error("Submission error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Server Error");
    } finally { setLoading(false); }
  };

  const handlePaymentChange = (e) => {
    const methodLabel = e.target.value;
    setPaymentMethod(methodLabel);
    const method = paymentMethods.find((m) => m.label === methodLabel);
    setSendMoneyNumber(method?.value || "");
  };

  if (!courseId) {
    return (
      <div className="p-10 text-center">
        No course selected.
        <br />
        <button onClick={() => navigate("/")} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-xs mx-auto p-4 bg-white shadow-lg rounded-md mt-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-1">{name}</h2>
      <p className="text-lg font-semibold text-blue-600 mb-4">{currency} {price}</p>

      <div className="bg-blue-50 p-3 rounded-md mb-4 border border-blue-100">
        <p className="text-xs text-gray-600 mb-2">
          কোর্সে যুক্ত হতে নিচের নাম্বারে {paymentMethod} করুন।
        </p>
        <div className="flex justify-between items-center bg-white p-2 rounded border">
          <span className="text-sm font-mono">{sendMoneyNumber}</span>
          <button type="button" onClick={handleCopy} className="text-xs bg-gray-100 px-2 py-1 rounded">Copy</button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="text-xs font-bold text-gray-500 uppercase">Method</label>
        <select value={paymentMethod} onChange={handlePaymentChange} className="w-full p-2 border rounded mb-3 text-sm">
          {paymentMethods.map((m) => (<option key={m._id || m.label} value={m.label}>{m.label}</option>))}
        </select>

        <label className="text-xs font-bold text-gray-500 uppercase">Last 4 Digits</label>
        <input type="text" maxLength="4" value={lastFourDigits} onChange={(e) => setLastFourDigits(e.target.value.replace(/\D/g, ""))} className="w-full p-2 border rounded mb-4" placeholder="1234" required />

        <button type="submit" disabled={loading} className={`w-full py-2 rounded font-bold text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>
          {loading ? "Processing..." : "Submit Order"}
        </button>
      </form>
    </div>
  );
};

export default Cart;