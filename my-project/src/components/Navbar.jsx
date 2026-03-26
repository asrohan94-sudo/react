import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import useShopContext from "../hooks/context/useShopContext";
import ShopContext from "../context/ShopContext";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartCount } = useContext(ShopContext);
  const { showSearch, setShowSearch } = useShopContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  // ---------------- FETCH USER PROFILE ----------------
  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) setUser(res.data.user);
      } catch (err) {
        console.error("Fetch user error:", err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleToggleSearch = () => {
    setShowSearch(prev => !prev);
  };

  const desktopLinks = [
    { name: "Home", path: "/" },
    { name: "Course", path: "/admission" },
    { name: "About us", path: "/about" },
    { name: "Join-Telegram", path: "/telegram" },
  ];

  return (
    <>
      {/* ------------------ TOP NAVBAR ------------------ */}
      <div className="flex items-center justify-between font-medium py-5 px-5 bg-white shadow-md">
        {/* Logo */}
        <img
          src={assets.logo}
          alt="Logo"
          className="w-36 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-5 text-sm">
          {desktopLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex flex-col items-center transition-colors duration-200 ${
                  isActive ? "text-indigo-600 font-semibold" : "text-gray-800 hover:text-indigo-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {token && (
            <NavLink
              to="/Dashboard"
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive ? "text-indigo-600 font-semibold" : "text-gray-800 hover:text-indigo-600"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
        </ul>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">
          {/* Search */}
          

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} alt="Cart" className="w-5" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* User / Logout */}
          {token ? (
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:block text-sm font-medium">
              Login
            </Link>
          )}

          {/* Mobile Hamburger */}
          <div className="sm:hidden">
            <button onClick={() => setMenuOpen(true)}>
              <GiHamburgerMenu size={25} />
            </button>
          </div>
        </div>
      </div>

      {/* ------------------ MOBILE SLIDE MENU ------------------ */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button className="p-4 text-lg" onClick={() => setMenuOpen(false)}>
          Back
        </button>

        <ul className="flex flex-col gap-4 mt-6 px-6">
          {desktopLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 ${
                  isActive ? "text-indigo-600" : "text-gray-800 hover:text-indigo-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {token && (
            <NavLink
              to="/Dashboard"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 ${
                  isActive ? "text-indigo-600" : "text-gray-800 hover:text-indigo-600"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-lg text-red-500 font-medium text-left"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 ${
                  isActive ? "text-indigo-600" : "text-gray-800 hover:text-indigo-600"
                }`
              }
            >
              Login
            </NavLink>
          )}
        </ul>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;