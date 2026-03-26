import React from "react";
import { FaUserTie, FaFileAlt, FaPenFancy, FaQuestionCircle } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    { id: 1, icon: <FaUserTie size={45} />, number: "১৫০০+", label: "ভিডিও টিউটোরিয়াল", color: "from-blue-400 to-blue-500" },
    { id: 2, icon: <FaFileAlt size={45} />, number: "৫০০০+", label: "কন্টেন্ট", color: "from-orange-400 to-orange-500" },
    { id: 3, icon: <FaPenFancy size={45} />, number: "২০০০+", label: "ক্লাস নোট", color: "from-yellow-400 to-yellow-500" },
    { id: 4, icon: <FaQuestionCircle size={45} />, number: "২০০+", label: "কুইজ", color: "from-green-400 to-green-500" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex flex-col items-center justify-center text-center p-8 border rounded-xl shadow-lg bg-white"
        >
          <div
            className={`bg-gradient-to-br ${stat.color} text-white p-5 rounded-2xl shadow-md mb-4`}
          >
            {stat.icon}
          </div>

          <h2 className="text-3xl font-extrabold mb-1 tracking-wide">
            {stat.number}
          </h2>

          <p className="text-gray-700 text-lg font-medium">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
