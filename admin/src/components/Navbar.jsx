import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";

const backendUrl = "http://localhost:5000";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  // ================= AUTH =================
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      const userRaw = localStorage.getItem("user");

      if (!token || !userRaw) {
        setIsLoggedIn(false);
        setUserName("");
        return;
      }

      try {
        // Optional: verify token with backend
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success && res.data.user) {
          setIsLoggedIn(true);
          setUserName(res.data.user.name || "");
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err.response?.data || err.message);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };

    checkLogin();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  const toggleMenu = (menu) => setOpenMenu((prev) => (prev === menu ? "" : menu));

  const menuItems = [
    { name: "Dashboard", icon: assets.note, path: "/dashboard" },
    {
      name: "Exam Access Control",
      icon: assets.book,
      submenu: [{ name: "Access List", icon: assets.list, path: "/exam-access/list" }],
    },
    {
      name: "Exams",
      icon: assets.book,
      submenu: [
        { name: "Exam List", icon: assets.list, path: "/exams/list" },
        { name: "Add Exam", icon: assets.add, path: "/exams/add" },
      ],
    },
    {
      name: "Courses",
      icon: assets.book,
      submenu: [
        { name: "Category List", icon: assets.list, path: "/courses/category-list" },
        { name: "Add Category", icon: assets.add, path: "/courses/add-category" },
        { name: "Course List", icon: assets.list, path: "/courses/list" },
        { name: "Add Course", icon: assets.add, path: "/courses/add-course" },
      ],
    },
    { name: "Orders", icon: assets.order_icon, path: "/orders" },
    { name: "Payment", icon: assets.pay, path: "/pay" },
  ];

  return (
    <>
      {/* Mobile top bar */}
      <div
        className={`sm:hidden p-3 shadow flex items-center justify-between ${
          isLoggedIn ? "" : "bg-white"
        }`}
      >
        <button onClick={() => setMenuOpen(true)}>
          <GiHamburgerMenu size={28} />
        </button>
        <img src={assets.logo} alt="logo" className="h-10" />
        {isLoggedIn && <span className="text-blue-600 font-bold">{userName}</span>}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed sm:static top-0 left-0 h-full w-64 border-r shadow-md p-4 transition-transform duration-300 z-50
        ${menuOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        ${isLoggedIn ? "bg-gray-100" : "bg-white"}`}
      >
        {/* Mobile close */}
        <div className="sm:hidden flex justify-end mb-4">
          <button onClick={() => setMenuOpen(false)}>
            <img className="w-8" src={assets.back} alt="close" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-3 mt-3">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 w-full text-left"
                  >
                    <img src={item.icon} className="w-5 h-5" />
                    <span>{item.name}</span>
                    <span className="ml-auto">
                      <img
                        src={openMenu === item.name ? assets.left : assets.right}
                        className="w-4 h-4"
                      />
                    </span>
                  </button>

                  <div
                    className={`ml-6 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
                      openMenu === item.name ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {item.submenu.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 ${
                            isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"
                          }`
                        }
                      >
                        <img src={sub.icon} className="w-4 h-4" />
                        {sub.name}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 ${
                      isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"
                    }`
                  }
                >
                  <img src={item.icon} className="w-5 h-5" />
                  {item.name}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* Logout button */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="mt-4 text-x w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}

        {/* Login button */}
        {!isLoggedIn && (
          <NavLink
            to="/login"
            className="mt-6 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center block"
          >
            Login
          </NavLink>
        )}
      </div>
    </>
  );
};

export default Navbar;