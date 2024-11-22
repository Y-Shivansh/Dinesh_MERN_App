import React, { useEffect, useState } from 'react';
import FoodGrid from '../components/FoodGrid';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { NestedMenu } from '../components/MenuComponent';

const FoodListingPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API:
    const fetchFoodListings = async () => {
      try {
        const response =  await axios.get('http://localhost:3000/api/listings/FoodListings', {withCredentials: true});
        const data = response.data
        console.log(data.newFood);
        
        if (response.status != 200) {
          throw new Error(`Error: ${response.statusText}`);
        }
        setFoodItems(data.newFood); // Assuming `data.data.newFood` contains the array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodListings();
  }, []);

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div>
      <nav className="bg-transparent px-2 text-white fixed w-full top-0 z-10 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-headingCol hover:text-headingColHover no-underline">
            FoodDonation
          </Link>
        </div>

        {/* Request Donation Button */}
        <div>
          {/* <Link 
            to="/requests" 
            className="bg-white no-underline text-green-400 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-[#e3f7ff] hover:text-green-600 transition"
          >
            Requess
          </Link> */}
        <NestedMenu title={"Menu"} m1={"All Listings"} m3={"Profile"} mn1={"Profile Picture"} mn2={"Update Password"} mn3={"Log Out"} m4={"Requests"}/>
        </div>
        
      </nav>

      <h1 className="text-3xl pt-20 font-bold text-center mt-6">FOOD LISTINGS!</h1>
      <FoodGrid foodItems={foodItems} />
      <Footer />
    </div>
  );
};

export default FoodListingPage;

