import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResultAnalysisCard = () => {
  const { examId } = useParams();

  const backendUrl = "https://examly-ammh.onrender.com";
  const token = localStorage.getItem("token");

  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/exams/${examId}/results`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setResult(res.data.result);
        }
      } catch (err) {
        console.error("Failed to fetch result:", err);
      }
    };

    fetchResult();
  }, [examId]);

  if (!result) {
    return <p className="text-center p-6">Loading result...</p>;
  }

  const stats = [
    {
      label: "Right",
      value: result.correctAnswers || 0,
      emoji: "✅",
      color: "border-green-500 text-green-700",
    },
    {
      label: "Wrong",
      value: result.wrongAnswers || 0,
      emoji: "❌",
      color: "border-red-500 text-red-700",
    },
    {
      label: "Neg",
      value: result.negativeMarks || 0,
      emoji: "➖",
      color: "border-orange-500 text-orange-700",
    },
    {
      label: "Blank",
      value: result.blankAnswers || 0,
      emoji: "⚪",
      color: "border-gray-400 text-gray-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans">

      <div
        className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl
        transform hover:-translate-y-3 transition-all duration-700"
      >
        {/* Exam Title */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-slate-800">
            Exam: {result.examTitle}
          </h1>

          <div className="mt-3 inline-block px-6 py-2 border-2 border-slate-900 rounded-lg bg-white shadow">
            <span className="text-xl font-black uppercase tracking-tighter text-slate-900">
              Result Analysis
            </span>
          </div>
        </div>

        {/* Status Boxes */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center justify-between border-2  rounded-xl p-3 bg-white ${stat.color} shadow`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{stat.emoji}</span>
                <span className="font-bold text-sm uppercase">
                  {stat.label}:
                </span>
              </div>
              <span className="text-lg font-black">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Score Box */}
        <div
          className="relative overflow-hidden border-2 border-blue-900 rounded-2xl p-8 text-center mb-10 
          bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg"
        >
          <div className="absolute -left-4 top-2 opacity-10 text-7xl">🏆</div>

          <h2 className="text-3xl font-black text-blue-900 mb-2">
            Your Score = {result.score}
          </h2>

          <p className="text-xl font-bold text-indigo-700 flex justify-center items-center gap-2">
            <span>🌟</span> মেরিট পজিশন {result.rank || "-"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {["সলিউশন শীট", "ভুলকৃত প্রশ্ন", "মেরিট লিস্ট"].map((btn, index) => (
            <button
              key={index}
              className="border-2 border-slate-300 py-3 px-1 text-xs font-bold rounded-xl text-slate-700
              hover:bg-slate-900 hover:text-white transition-all duration-300"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultAnalysisCard;