import React from 'react';
import { Link } from 'react-router-dom';

const FoodGrid = ({ foodItems }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {foodItems.map((foodItem) => (
        <div
          key={foodItem._id}
          className="bg-white rounded-lg shadow-lg p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl ease-in-out"
        >
          <Link to={`/food-detail/${foodItem._id}`} className="block no-underline">
            {/* Handling photos as an array */}
            <img 
              src={foodItem.photos[0]} 
              alt={foodItem.title} 
              className="w-full h-48 object-cover rounded-lg" 
            />
            <h3 className="text-xl font-semibold mt-2">{foodItem.title}</h3>
            <p className="text-gray-600">{foodItem.description}</p>
            <p className="text-gray-500 mt-2">Category: {foodItem.category}</p>
            <p className="text-gray-500">Quantity: {foodItem.quantity}</p>
            <p className="text-gray-500">Expires on: {new Date(foodItem.expirationDate).toLocaleDateString()}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FoodGrid;


