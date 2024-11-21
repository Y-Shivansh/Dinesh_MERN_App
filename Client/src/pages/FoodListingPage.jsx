import React, { useEffect, useState } from 'react';
import FoodGrid from '../components/FoodGrid'
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
const FoodListingPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchFoodListings = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/listings/FoodListings');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setFoodItems(data.data.newFood); // Assuming `data.data.newFood` contains the array
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
        <nav className="bg-[#00baf2] p-4 text-white shadow-md fixed w-full top-0 z-10">
     
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-[#44d3ff] no-underline">
            FoodDonation
          </Link>
        </div>

        
     
    </nav>
      <h1 className="text-3xl pt-20 font-bold text-center mt-6">Food Listings</h1>
      <FoodGrid foodItems={foodItems} />
      <Footer/>
    </div>

  );
};

export default FoodListingPage;
