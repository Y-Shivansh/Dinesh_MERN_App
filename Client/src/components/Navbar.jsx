// components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility on small screens
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#00baf2] p-4 text-white shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-[#44d3ff] no-underline">
            FoodDonation
          </Link>
        </div>

        {/* Hamburger Menu Icon (for small screens) */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links (for large screens) */}
        <ul className="pt-2 hidden lg:flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-[#44d3ff] no-underline">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              className="text-white hover:text-[#44d3ff] no-underline"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact-us"
              className="text-white hover:text-[#44d3ff] no-underline"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Sign In and Sign Up (for large screens) */}
        <div className="hidden lg:flex space-x-4">
          <Link
            to="/sign-in"
            className="mr-4 px-3 py-2 bg-[#e0f5fd] text-black rounded hover:bg-[#a9d8f1] no-underline"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="px-3 py-2 bg-[#e0f5fd] text-black rounded hover:bg-[#a9d8f1] no-underline"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-[#00baf2] text-white p-4`}
      >
        <ul>
          <li className="py-2">
            <Link
              to="/"
              className="block text-white hover:text-[#44d3ff] no-underline"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li className="py-2">
            <Link
              to="/about-us"
              className="block text-white hover:text-[#44d3ff] no-underline"
              onClick={toggleMenu}
            >
              About Us
            </Link>
          </li>
          <li className="py-2">
            <Link
              to="/contact-us"
              className="block text-white hover:text-[#44d3ff] no-underline"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
          </li>

          {/* Sign In and Sign Up in Mobile Menu */}
          <li className="py-2">
            <Link
              to="/sign-in"
              className="block px-3 py-2 bg-[#e0f5fd] text-black rounded hover:bg-[#a9d8f1] no-underline"
              onClick={toggleMenu}
            >
              Sign In
            </Link>
          </li>
          <li className="py-2">
            <Link
              to="/sign-up"
              className="block px-3 py-2 bg-[#e0f5fd] text-black rounded hover:bg-[#a9d8f1] no-underline"
              onClick={toggleMenu}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


