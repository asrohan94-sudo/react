import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
   <section className="bg-white   pb-10">
  {/* WRAPPER */}
  <div className="flex flex-col items-center text-center">
    {/* IMAGE (Mobile Friendly) */}
    <img
      src={assets.hero_img}
      alt="Students"
      className="w-full mb-5"
    />

    {/* TITLE */}
    <h1 className="text-3xl font-bold text-gray-900 leading-snug">
      শিক্ষার্থীদের শেষ ভরসা <br />
      <span className="text-blue-600">Xamly</span>
    </h1>

    {/* DESCRIPTION */}
    <p className="text-gray-600 text-base mt-3">
      একাডেমিক প্রস্তুতির জন্য বাংলাদেশে trusted platform। Mock exam, performance analysis এবং personalized tools।
    </p>

    {/* STATISTICS */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-6">
      <div className="text-center">
        <p className="text-2xl sm:text-3xl font-bold text-blue-600">15,000+</p>
        <p className="text-gray-600 text-sm">শিক্ষার্থী</p>
      </div>

      <div className="text-center">
        <p className="text-2xl sm:text-3xl font-bold text-blue-600">100%</p>
        <p className="text-gray-600 text-sm">Satisfaction</p>
      </div>
    </div>

    {/* BUTTONS */}
    <div className="flex flex-col   mt-6 gap-3">
    <Link to='/admission'>  <button className="bg-blue-600 w-80  text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
        Get Started
      </button></Link>

      <Link to='/Reviews'><button className="border w-80 border-blue-600 text-blue-600 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition">
        Learn More
      </button></Link>
    </div>
  </div>
</section>

  
  );
};

export default HeroSection;
