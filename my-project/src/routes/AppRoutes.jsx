import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
import About from "../pages/About";
import Telegram from "../pages/Telegramx";
import Layout from "../pages/Layout";
import Login from "../pages/login";
import Orders from "../pages/Order";
import Products from "../pages/Product";
import AdmissionExamBatch from "../pages/AdmissionExamBatch";
import Cart from '../pages/cart';
import PlaceOrderContainer from '../pages/placeOrder';
import Reviews from '../pages/Reviews';
import Profile from '../pages/Profile';
import Dashboard from "../pages/Dashboard";
import Routine from "../pages/Routine";
import Done from "../pages/done";
import My from "../pages/my";
import Wrong from "../pages/wrong";
import Exam from "../pages/Exam";
import ExamPage from "../pages/ExamPage";
import Examresult from "../pages/Examresult";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="admission" element={<AdmissionExamBatch />} />
        <Route path="product/:id" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="routine" element={<Routine />} />
        {/* Dashboard / Telegram */}
        <Route path="Reviews" element={<Reviews />} />
        <Route path="telegram" element={<Telegram />} />
        <Route path="login" element={<Login />} />
        <Route path="place-order" element={<PlaceOrderContainer />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Cart />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="my" element={<My/>} />
        <Route path="wrong" element={<Wrong />} />
        <Route path="done" element={<Done/>} />
        <Route path="exam/:id" element={<Exam/>} />
        <Route path="exampage/:id" element={<ExamPage/>} />
        <Route path="/exam/result/:examId" element={<Examresult/>} />
           
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
