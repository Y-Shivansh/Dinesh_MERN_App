import React, { useRef ,useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import image from "/assets/food-donation-image.jpg";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";


const Landing = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  // const user = {
  //   name: "John Doe",
  //   image: "https://res.cloudinary.com/dn6fyhicj/image/upload/v1732257919/ql6gqomfjqygrghkpdzy.webp",
  // };
 
  return (
    <div>
      <Navbar 
        onHomeClick={() => scrollToSection(homeRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onContactClick={() => scrollToSection(contactRef)}
      />
      <header ref={homeRef} className="bg-primaryCol h-[100vh] flex flex-col md:flex-row justify-center items-center p-6">
        {/* Left side (Image) */}
        <div className="flex-1 mb-8 md:mb-0">
          <img src={image} alt="Food Donation" className="w-full h-auto" />
        </div>

        {/* Right side (Text) */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-center text-4xl font-bold text-headingCol">Welcome to FoodDonation</h1>
          <p className="text-paraText mt-4 text-lg max-w-xl mx-auto md:mx-0">
            Empowering communities through donations. Your small contribution can create a big impact. Join us in making a difference!
          </p>
          
          <Link to="/sign-in">
            <button className="mt-6 px-6 py-2 bg-secondaryCol text-white rounded hover:bg-secondaryColHover">
              Get Started
            </button>
          </Link>
        </div>
      </header>
      <Carousel />
      <main className="p-8">
        {/* About Us Section */}
          <h2 className="text-2xl font-bold mb-4 text-secondaryCol">About Us</h2>
        <section ref={aboutRef} className="mt-8 bg-gray-100 p-6 rounded-xl" id="about">
          <p className="text-paraText">
            FoodDonation was founded with the mission to make philanthropy easier, more transparent, and impactful. We connect donors to a wide range of charitable causes globally. Our platform allows for secure donations, real-time tracking of funds, and ensures that your contributions make a meaningful difference in the lives of those in need.
          </p>
        </section>

        {/* Contact Us Section */}
        <section ref={contactRef} className="mt-8" id="contact">
          <h2 className="text-2xl font-bold mb-4 text-secondaryCol">Contact Us</h2>
          <p className="text-paraText mb-4">
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
