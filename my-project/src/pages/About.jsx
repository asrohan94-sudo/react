import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaYoutube, FaFacebook } from "react-icons/fa";
import { assets } from "../assets/assets";

// Team data
const people = [
  {
    name: "Mejbaur Rahman",
    title: "Founder & CEO",
    dept: "Expert Admission Mentor",
    img: assets.mejbaur,
    socials: [
      { icon: <FaYoutube />, link: "https://www.youtube.com/@expertadmissionmentor" },
      { icon: <FaFacebook />, link: "https://www.facebook.com/AdmissionWithMejbaVai" },
    ],
  },
  {
    name: "Sanjida Sultana",
    title: "Co Founder",
    dept: "Head of Management Team",
    img: assets.sanjida,
    socials: [{ icon: <FaFacebook />, link: "#" }],
  },
  {
    name: "Nasim Reza",
    title: "Communication Manager",
    dept: "Management Team",
    img: assets.reza,
    socials: [
      { icon: <FaYoutube />, link: "#" },
      { icon: <FaFacebook />, link: "#" },
    ],
  },
  {
    name: "Nirjarony Meghla",
    title: "Exam Controller",
    dept: "Exam Department",
    img: assets.meghla,
    socials: [
      { icon: <FaYoutube />, link: "#" },
      { icon: <FaFacebook />, link: "#" },
    ],
  },
];

// Contact info
const contacts = [
  {
    icon: <FaEnvelope size={22} />,
    title: "Email Us",
    info: "xamly@gmail.com",
    sub: "Send us an email anytime",
    color: "blue",
  },
  {
    icon: <FaPhone size={22} />,
    title: "Call Us",
    info: "+880 123 456 7890",
    sub: "Sat - Thu: 9:00 AM - 6:00 PM",
    color: "blue",
  },
  {
    icon: <FaMapMarkerAlt size={22} />,
    title: "Visit Us",
    info: "123 Main Street, Dhaka, Bangladesh",
    sub: "Come say hello at our office",
    color: "blue",
  },
];

// Social links
const socialLinks = [
  { icon: <FaYoutube className="text-red-600" />, label: "Xamly" },
  { icon: <FaFacebook className="text-blue-600" />, label: "Xamly" },
];

const DirectorSection = () => {
  return (
    <section className="py-10  bg-gradient-to-b from-[#f5effe] to-[#dff1ff]">
      {/* Director Panel */}
      <h2 className="text-center text-2xl font-bold text-blue-700 mb-5">Director Panel</h2>
      <div className="flex flex-col gap-10 px-5 md:flex-row md:flex-wrap md:justify-center">
        {people.map((p, i) => (
          <div key={i} className="bg-white rounded-3xl shadow-2xl p-6 mx-auto max-w-xs">
            <img
              src={p.img}
              alt={p.name}
              className="w-40 h-40 rounded-xl object-cover mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-center">{p.name}</h3>
            <p className="text-sm text-blue-600 text-center font-semibold">{p.title}</p>
            <p className="text-xs text-gray-500 text-center">{p.dept}</p>
            <div className="flex justify-center gap-4 mt-4">
              {p.socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-16 px-5 py-10 bg-gradient-to-b from-[#eef1ff] to-[#dff1ff]">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">Get In Touch</h1>
        <p className="text-center text-gray-600 max-w-md mx-auto mb-10">
          Have questions about our courses? Need support? We'd love to hear from you.
          Send us a message and we'll respond as soon as possible.
        </p>

        {/* Contact Cards */}
        <div className="flex flex-col gap-5 max-w-lg mx-auto mb-10">
          {contacts.map((c, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl shadow-lg flex items-start gap-4">
              <div className={`p-3 bg-${c.color}-50 rounded-xl text-${c.color}-600`}>
                {c.icon}
              </div>
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className={`text-${c.color}-600 font-medium`}>{c.info}</p>
                <p className="text-gray-500 text-sm">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="bg-white p-5 rounded-3xl shadow-lg max-w-lg mx-auto">
          <h2 className="font-bold text-gray-800 mb-4">Follow Us</h2>
          <div className="flex flex-col gap-3">
            {socialLinks.map((s, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl">
                {s.icon}
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorSection;
