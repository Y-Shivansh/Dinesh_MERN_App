import React from 'react';
import FoodCard from './FoodCard';

const FoodGrid = ({ foodItems }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {foodItems.map((food) => (
        <FoodCard
          key={food._id}
          title={food.title}
          description={food.description}
          category={food.category}
          quantity={food.quantity}
          expirationDate={food.expirationDate}
          location={food.location}
          photos={food.photos}
        />
      ))}
    </div>
  );
};

export default FoodGrid;
