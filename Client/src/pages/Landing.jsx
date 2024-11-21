import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import image from "/assets/food-donation-image.jpg"; // Path to the image

const Landing = () => {
  return (
    <div>
      <Navbar />
      <header className="bg-[#e0f5fd] h-[100vh] flex flex-col md:flex-row justify-center items-center p-6">
        {/* Left side (Image) */}
        <div className="flex-1 mb-8 md:mb-0">
          <img
            src={image}
            alt="Food Donation"
            className="w-full h-auto "
          />
        </div>
        
        {/* Right side (Text) */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-center text-4xl font-bold text-[#00baf2]">
            Welcome to FoodDonation
          </h1>
          <p className="text-gray-700 mt-4 text-lg max-w-xl mx-auto md:mx-0">
            Empowering communities through donations. Your small contribution can create a big impact. Join us in making a difference!
          </p>
          <Link to="/sign-in">
            <button className="mt-6 px-6 py-2 bg-[#00baf2] text-white rounded hover:bg-[#44d3ff]">
              Get Started
            </button>
          </Link>
        </div>
      </header>
      
      <main className="p-8">
        {/* Why Choose Us */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-[#00baf2]">Why Choose FoodDonation?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold">Secure Donations</h3>
              <p className="text-gray-700">
                Your donations are encrypted and securely transferred to the intended cause.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Support Diverse Causes</h3>
              <p className="text-gray-700">
                From education to disaster relief, we provide options to support a variety of causes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Real-Time Impact</h3>
              <p className="text-gray-700">
                Track your donation’s impact and receive updates about the beneficiaries.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Global Reach</h3>
              <p className="text-gray-700">
                Donate to projects and individuals worldwide with a few clicks.
              </p>
            </div>
          </div>
        </section>
        
        {/* About Us */}
        <section className="mt-8 bg-gray-100 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-[#00baf2]">About Us</h2>
          <p className="text-gray-700">
            FoodDonation was founded with the mission to make philanthropy easier, more transparent, and impactful. We connect donors to a wide range of charitable causes globally. Our platform allows for secure donations, real-time tracking of funds, and ensures that your contributions make a meaningful difference in the lives of those in need.
          </p>
        </section>
        
        {/* Contact Us */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-[#00baf2]">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            Have questions or want to get in touch? We're here to help! Reach out to us through the following channels:
          </p>
          <div className="bg-gray-100 p-6 rounded-xl">
            <p className="font-semibold">Email:</p>
            <p className="text-gray-700 mb-2">support@FoodDonation.com</p>
            <p className="font-semibold">Phone:</p>
            <p className="text-gray-700">+1 (800) 123-4567</p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Landing;

