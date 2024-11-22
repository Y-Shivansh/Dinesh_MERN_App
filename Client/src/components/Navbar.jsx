import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-primaryCol p-1 text-heading static w-full top-0 z-10">
      <div className="px-3 py-1 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-semibold">
          <Link
            to="/"
            className="text-heading text-headingCol hover:text-headingColHover no-underline"
          >
            FoodDonation
          </Link>
        </div>

        {/* Hamburger Menu Icon (for small screens) */}
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
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
        <ul className="hidden lg:flex space-x-6">
          <li>
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              className="text-headingCol hover:text-headingColHover cursor-pointer"
            >
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="text-headingCol hover:text-headingColHover cursor-pointer"
            >
              About Us
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="text-headingCol hover:text-headingColHover cursor-pointer"
            >
              Contact Us
            </ScrollLink>
          </li>
        </ul>

        {/* Sign In and Sign Up (for large screens) */}
        <div className="hidden lg:flex space-x-4 justify-center items-center">
          <Link
            to="/sign-in"
            className="mr-2 py-2 px-3 text-center bg-secondaryCol text-white rounded hover:bg-secondaryColHover no-underline"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="py-2 px-3 bg-secondaryCol text-white rounded hover:bg-secondaryColHover no-underline"
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
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              className="block text-white hover:text-secondaryColHover cursor-pointer"
              onClick={toggleMenu}
            >
              Home
            </ScrollLink>
          </li>
          <li className="py-2">
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="block text-white hover:text-secondaryColHover cursor-pointer"
              onClick={toggleMenu}
            >
              About Us
            </ScrollLink>
          </li>
          <li className="py-2">
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="block text-white hover:text-[#44d3ff] cursor-pointer"
              onClick={toggleMenu}
            >
              Contact Us
            </ScrollLink>
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
