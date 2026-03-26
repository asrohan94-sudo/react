import { assets } from '../assets/assets';
import React from 'react';
import SocialLinks from './SocialLink';

const Footer = () => {
  return (
    <footer className=" py-10">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between gap-10 mx-10">

        {/* Logo & Description */}
        <div className="flex flex-col gap-4 max-w-md">
          <img src={assets.logo} alt="Xamly Logo" className="w-32" />
          <p className="text-sm sm:text-base">
            Xamly is a trusted platform for admission test preparation in Bangladesh. We offer online mock exams, performance analysis, and personalized preparation tools for Medical, Engineering, and University admission seekers.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <p className="text-xl font-semibold mb-2">Useful Links</p>
          <ul className="flex flex-col text-sm text-gray-600 gap-1">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">About Us</li>
            <li className="hover:text-blue-600 cursor-pointer">Delivery</li>
            <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-semibold mb-2">Get in Touch</p>
          <ul className="flex flex-col text-sm text-gray-600 gap-1">
            <li><span className="font-semibold">Address: </span>123 Main Street, Dhaka, Bangladesh</li>
            <li><span className="font-semibold">Phone: </span>+880 123 456 7890</li>
            <li><span className="font-semibold">Email: </span>xamly@gmail.com</li>
            <li><span className="font-semibold">Hours: </span>Sat - Thu: 9:00 AM - 6:00 PM</li>
          </ul>
        </div>
      </div>
       <SocialLinks />

      {/* Bottom Section */}
      <div className="mt-10 border-t pt-6 text-center space-y-2">
        <p className="text-sm">
          © <span className="font-semibold">Xamlybd.com</span> — All Rights Reserved.
        </p>
        <p  className="text-sm">Developed by <a href="https://www.facebook.com/rohan.hossain62">Rohu</a> </p>
       
      </div>
    </footer>
  );
};

export default Footer;
