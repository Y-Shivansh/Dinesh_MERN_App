import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import axios from "axios";
import { NestedMenu } from "./MenuComponent";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const [user, setUser] = useState(null); 
  useEffect(() => {
    const fetchUserProfile = async () => {
      
      try {
        const res = await axios.get("http://localhost:3000/api/user/profile", { withCredentials: true });
        setUser(res.data);
        // console.log(res.data);
        
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, []);

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
          <button onClick={toggleMenu} className="text-headingCol focus:outline-none">
            <svg
              className="w-8 h-8"
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
              className="text-headingCol hover:text-headingColHover cursor-pointer no-underline"
            >
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="text-headingCol hover:text-headingColHover cursor-pointer no-underline"
            >
              About Us
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="text-headingCol hover:text-headingColHover cursor-pointer no-underline"
            >
              Contact Us
            </ScrollLink>
          </li>
        </ul>

        {/* User Info or Auth Links */}
        <div className="hidden lg:flex space-x-4 justify-center items-center">
          {user ? (
            // If the user is signed in, display their image and name
            <div className="flex items-center space-x-3">
              {/* <img
                src={user.image}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              /> */}
              {/* <span className="text-black">{user.name}</span> */}
              <NestedMenu title={<img src={user.profilePicture}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"/>}
            m1={"All Listings"}
            m3={"Profile"}
            mn1={"Profile Picture"}
            mn2={"Update Password"}
            mn3={"Log Out"}
            m4={"Requests"} 
            m5={"Edit Your Details"}/>
            </div>
          ) : (
            // If no user is signed in, show Sign In and Sign Up links
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-gray-200 text-headingCol p-4`}
      >
        <ul>
          <li className="py-2">
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              className="block text-headingCol hover:text-secondaryColHover cursor-pointer no-underline"
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
              className="block text-headingCol hover:text-secondaryColHover cursor-pointer no-underline"
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
              className="block text-headingCol hover:text-secondaryColHover cursor-pointer no-underline"
              onClick={toggleMenu}
            >
              Contact Us
            </ScrollLink>
          </li>

          {/* User Info or Auth Links in Mobile Menu */}
          {user ? (
            <li className="py-2 flex items-center space-x-3">
              <NestedMenu title={<img src={user.profilePicture}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"/>}
            m1={"All Listings"}
            m3={"Profile"}
            mn1={"Profile Picture"}
            mn2={"Update Password"}
            mn3={"Log Out"}
            m4={"Requests"} />
            </li>
          ) : (
            <>
              <li className="py-2">
                <Link
                  to="/sign-in"
                  className="block px-3 py-2 bg-secondaryCol text-white rounded hover:bg-secondaryColHover no-underline"
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
              </li>
              <li className="py-2">
                <Link
                  to="/sign-up"
                  className="block px-3 py-2 bg-secondaryCol text-white rounded hover:bg-secondaryColHover no-underline"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
