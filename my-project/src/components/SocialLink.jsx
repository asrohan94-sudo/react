import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube  } from "react-icons/fa";
import React from "react";



const SocialLinks = () => {
  const icons = [
    { icon: <FaFacebookF />, color: "text-blue-600", link: "https://www.facebook.com/AdmissionWithMejbaVai" },
    { icon: <FaTwitter />, color: "text-blue-400", link: "https://twitter.com" },
    { icon: <FaInstagram />, color: "text-pink-500", link: "https://www.instagram.com/@mejbavai1/" },
    { icon: <FaYoutube />, color: "text-red-600", link: "https://www.youtube.com/@expertadmissionmentor" },
  ];

  return (
    <div className="flex items-center justify-center  gap-6 mt-9">
      {icons.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition transform hover:scale-110 ${item.color}`}
        >
          <span className="text-xl gap-5 ">{item.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
