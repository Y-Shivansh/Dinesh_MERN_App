import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FoodDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all food items from the API
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/listings/Foodlistings'); // Fetch all food items
        const data = await response.json();

        console.log('API response data:', data); // Log the response to see its structure

        // Access the newFood array in the response
        if (data.status === 'success' && Array.isArray(data.data.newFood)) {
          const foundItem = data.data.newFood.find(item => item._id === id); // Find the item by its ID
          if (foundItem) {
            setFoodItem(foundItem); // Set the found food item
          } else {
            console.log('Food item not found');
            setFoodItem(null); // Ensure foodItem is null if not found
          }
        } else {
          console.log('Invalid data format or no food items found');
          setFoodItem(null); // Handle invalid format
        }
      } catch (error) {
        console.error('Error fetching food items:', error);
        setFoodItem(null); // Ensure foodItem is null in case of error
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchFoodItems();
  }, [id]); // Run when the `id` changes

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    ); // Show a loading message while data is being fetched
  }

  if (!foodItem) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Food item not found</div>
      </div>
    ); // Show a message if the item is not found
  }

  return (
    <div className="flex items-center justify-center h-[100vh] w-[100vw] bg-secondaryCol rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Food Image */}
        <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/2">
          <img
            src={foodItem.photos[0] || 'https://via.placeholder.com/300'}
            alt={foodItem.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Food Details */}
        <div className="md:ml-8 md:w-1/2 text-white">
          <h2 className="text-4xl font-bold leading-tight mb-4">{foodItem.title}</h2>
          <p className="text-lg font-light text-gray-200 mb-4">{foodItem.description}</p>
          <div className="space-y-2">
            <p className="text-lg font-medium">Category: <span className="font-light">{foodItem.category}</span></p>
            <p className="text-lg font-medium">Quantity: <span className="font-light">{foodItem.quantity}</span></p>
            <p className="text-lg font-medium">Expires on: <span className="font-light">{new Date(foodItem.expirationDate).toLocaleDateString()}</span></p>
            <p className="text-lg font-medium">Location: <span className="font-light">{foodItem.location.address}</span></p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;



