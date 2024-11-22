import React, { useEffect, useState } from "react";
import FoodGrid from "../components/FoodGrid";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { NestedMenu } from "../components/MenuComponent";
import { Search } from "../components/SearchComponent";

// Loader Component
const Loader = () => <div className="text-center mt-6">Loading...</div>;

// Error Display Component
const ErrorDisplay = ({ message }) => (
  <div className="text-center mt-6 text-red-600">Error: {message}</div>
);

const FoodListingPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API:
    const fetchFoodListings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/listings/FoodListings', { withCredentials: true });
        const data = response.data

        if (response.status != 200) {
          throw new Error(`Error: ${response.statusText}`);
        }

        setFoodItems(data.allFoodItems); // Assuming `data.data.newFood` contains the array
      } catch (err) {
        setError(err.message || "Something went wrong while fetching food items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodListings();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div>
      <nav className="bg-transparent sm:flex-row py-2 px-2 text-white  w-full top-0 z-10 flex flex-col justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/food-listings" className="text-headingCol sm:text-2xl hover:text-headingColHover no-underline">
            FoodDonation
          </Link>
        </div>
        <div className='w-full sm:w-1/2 flex justify-center'>
          <Search />
        </div>
        <div>
          <NestedMenu title={"Menu"}
            m1={"All Listings"}
            m3={"Profile"}
            mn1={"Profile Picture"}
            mn2={"Update Password"}
            mn3={"Log Out"}
            m4={"Requests"} />
        </div>

      </nav>

      <h1 className="text-3xl font-bold text-center mt-14 text-headingCol">FOOD LISTINGS!</h1>
      <FoodGrid foodItems={foodItems} />
      <Footer />
    </div>
  );
};

export default FoodListingPage;

