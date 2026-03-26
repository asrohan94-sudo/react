// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Pay from "../pages/Pay";
import Orders from '../pages/order'
import ExamList from "../pages/ExamList";     // Your exam dashboard (the one we built)
import AddExam from "../pages/AddExam";        // Create new exam page
import EditExam from "../pages/EditExam";      // Optional: edit page
import Submissions from "../pages/Submissions"; 
import Category from '../pages/Categorylist'
import AddCategory from "../pages/AddCategory";
import AddCourse from '../pages/AddCourse'
import List from '../pages/list'
import ViewCourse from '../pages/ViewCourse'
import EditCourse from '../pages/EditCourse'
import AccessList from '../pages/Accesslist'
import Login from "../components/Login";

// Layout with Navbar (shared across all pages)
const Layout = () => (
  <>
    <Navbar />
    <Outlet /> {/* This is where child routes render */}
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* All pages that should have the Navbar */}
      <Route element={<Layout />}>
      <Route path="/login" element={<Login />} />
        
        {/* Home / Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="pay" element={<Pay />} />

        {/* === Exams Section === */}
        <Route path="exams">
          {/* Default exam page → list of exams */}
          <Route index element={<ExamList />} />

          {/* List of exams (you can use /exams or /exams/list) */}
          <Route path="list" element={<ExamList />} />

          {/* Create new exam */}
          <Route path="add" element={<AddExam />} />

          {/* Optional: Edit, Submissions, Delete */}
          <Route path=":id/edit" element={<EditExam />} />
          <Route path=":id/submissions" element={<Submissions />} />
          {/* You can add delete confirmation page if needed */}
        </Route>
          <Route path="courses">
          <Route path="category-list" element={<Category/>} />
           <Route path="add-category" element={<AddCategory/>} />
           <Route path="add-course" element={<AddCourse/>} />
            <Route path="list" element={<List/>} />
            <Route path="edit-course" element={<EditCourse/>} />
            <Route path="view-course" element={<ViewCourse/>} />
          </Route> 
          <Route path="orders" element={<Orders/>} />
          <Route path="exam-access">
             <Route path="list" element={<AccessList/>} />
          </Route>
          
        {/* 404 - Page Not Found */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-800">404</h1>
              <p className="text-xl text-gray-600 mt-4">পৃষ্ঠা পাওয়া যায়নি</p>
              <a href="/" className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                হোমে ফিরে যান
              </a>
            </div>
          </div>
        } />
      </Route>
    </Routes>
  );
};

export default AppRoutes;