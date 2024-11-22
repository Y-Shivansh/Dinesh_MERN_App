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
  const [lists, setLists] = useState([]);
  const [user, setUser] = useState(null); 
  
  useEffect(() => {
    // Fetch data from the API:
    const fetchFoodListings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/listings/FoodListings', { withCredentials: true });
        const data = response.data
        if (response.status != 200) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const res = await axios.get("http://localhost:3000/api/user/profile", { withCredentials: true });
        setUser(res.data);

        setFoodItems(data.allFoodItems); 
      } catch (err) {
        setError(err.message || "Something went wrong while fetching food items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodListings();
  }, []);

  const renderFoodItems = lists.length > 0 ? lists : foodItems;
  
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
          <Search setLists={setLists}/>
        </div>
        <div>
          <NestedMenu title={<img src={user.profilePicture}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"/>}
            m1={"All Listings"}
            m3={"Profile"}
            mn1={"Profile Picture"}
            mn2={"Update Password"}
            mn3={"Log Out"}
            m4={"Requests"} />
        </div>

      </nav>

      <h1 className="text-3xl font-bold text-center mt-14 text-headingCol">FOOD LISTINGS!</h1>
      <FoodGrid foodItems={renderFoodItems} />
      <Footer />
    </div>
  );
};

export default FoodListingPage;

