import React from 'react';
import { NavLink } from 'react-router-dom';

const CourseHeader = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* The main content card/area */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        
        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          
          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            All Courses
          </h2>
          
          {/* Button */}
         <NavLink to='/courses/add-course'> <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm sm:text-base transition duration-150 ease-in-out shadow-lg"
            onClick={() => console.log('Add New Course clicked')} // Replace with actual function
          >
            Add New Course
          </button></NavLink>
        </div>

        {/* Placeholder for where the course list would go */}
        <div className="min-h-[400px] flex items-center justify-center text-gray-400 italic">
          {/* Course list content goes here */}
          
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
