import React from 'react';
import { Link } from 'react-router-dom';

const FoodGrid = ({ foodItems }) => {
  return (
    <div className="p-4">
      {foodItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-8">
          <p>🎉 No Listings Available!</p>
          <p>Start donating food to help those in need.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {foodItems.map((foodItem) => (
            <div
              key={foodItem._id}
              className="bg-white rounded-lg shadow-lg p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl ease-in-out"
            >
              <Link to={`/food-detail/${foodItem._id}`} className="block no-underline">
                <img
                  src={foodItem.photo}
                  alt={foodItem.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-xl font-semibold mt-2 text-headingCol">{foodItem.title}</h3>
                <p className="text-gray-700">{foodItem.description}</p>
                <p className="text-gray-500 mt-2">Category: {foodItem.category}</p>
                <p className="text-gray-500">Quantity: {foodItem.quantity}</p>
                <p className="text-gray-500">Expires on: {new Date(foodItem.expirationDate).toLocaleDateString()}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodGrid;
