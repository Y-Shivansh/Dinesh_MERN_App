import React from 'react';

const FoodCard = ({ title, description, category, quantity, expirationDate, location, photo }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 w-80">
      <img
        src={photo}
        alt={title}
        className="h-48 w-full object-cover rounded-t-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-gray-500">Category: {category}</p>
      <p className="text-sm text-gray-500">Quantity: {quantity}</p>
      <p className="text-sm text-gray-500">Expires on: {new Date(expirationDate).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">Location: {location.address}</p>
    </div>
  );
};

export default FoodCard;
