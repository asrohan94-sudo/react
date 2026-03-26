import React from "react";
import { Link } from "react-router-dom";

// Props: user object with `name` and `profilePic`
const StudentDashboard = ({ user }) => {
  // Fallbacks if user data is missing
  const profilePic = user?.profilePic || "/images/default-profile.png";
  const name = user?.name || "অজানা ব্যবহারকারী"; // "Unknown User" in Bangla

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4 sm:p-8">
      
      {/* Dashboard Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg overflow-hidden">
        
        {/* Profile Section */}
        <div className="flex items-center p-4 border-b border-gray-200">
          {/* Profile Picture */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 mr-4">
            <img
              src={profilePic}
              alt="Student Profile"
              className="w-full h-full object-cover rounded-full border-2 border-white shadow-md"
            />
          </div>

          {/* User Name */}
          <div>
            <p className="text-base sm:text-lg font-semibold text-gray-800">
              {name}
            </p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-6">
            Dashboard
          </h2>

          {/* Navigation Buttons */}
          <div className="flex flex-col items-center gap-4">
            
            <Link to="/my">
              <button className="w-80 text-left p-4 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors duration-200 shadow-md">
                <span className="text-white text-lg sm:text-xl font-medium">
                  আমার কোর্সসমূহ
                </span>
              </button>
            </Link>

            <Link to="/wrong">
              <button className="w-80 text-left p-4 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors duration-200 shadow-md">
                <span className="text-white text-lg sm:text-xl font-medium">
                  সকল ভুলকৃত প্রশ্ন
                </span>
              </button>
            </Link>

            <Link to="/done">
              <button className="w-80 text-left p-4 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors duration-200 shadow-md">
                <span className="text-white text-lg sm:text-xl font-medium">
                  সম্পূর্ণকৃত পরীক্ষা সমূহ
                </span>
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;