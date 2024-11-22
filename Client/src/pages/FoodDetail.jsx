import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { toast,ToastContainer  } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const viewProfileHandler = () => {
  // Show toast notification when the button is clicked
  toast.success('Viewing profile...');
};
const FoodDetail = () => {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const [userRatings, setUserRatings] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false); // State to manage overlay visibility
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/listings/FoodListings/${id}`, { withCredentials: true });
        const data = response.data;
        if (response.status === 200) {
          // console.log(data.data.foodItem);
          setFoodItem(data.data.foodItem);
          toast.success('Food item loaded successfully!');
        } else {
          setFoodItem(null);
        }
      } catch (error) {
        console.error('Error fetching food item:', error);
        setFoodItem(null);
        toast.error('Food item not found!');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItem();
  }, [id]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/rating/${foodItem?.postedBy}`,{ withCredentials: true });
        setUserRatings(response.data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        setError('Failed to load ratings');
      }
    };

    if (foodItem) {
      fetchRatings();
    }
  }, [foodItem]);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay); // Toggle overlay visibility
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading...</div>;
  }

  if (!foodItem) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Food item not found</div>;
  }

  return (
    <div className="flex items-center justify-center h-[100vh] w-[100vw] bg-primaryColHover rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Food Image */}
        <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/2">
          <img src={foodItem.photos[0] || 'https://via.placeholder.com/300'} alt={foodItem.title} className="w-full h-96 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300" />
        </div>

        {/* Food Details */}
        <div className="md:ml-8 md:w-2/3 text-headingCol flex flex-col space-y-3">
          <div>
            <h2 className="text-3xl font-bold leading-tight mb-4">{foodItem.title}</h2>
            <p className="text-lg font-light text-headingColHover mb-4">{foodItem.description}</p>
            <div className="space-y-2">
              <p className="text-lg font-medium">Category: <span className="font-light">{foodItem.category}</span></p>
              <p className="text-lg font-medium">Quantity: <span className="font-light">{foodItem.quantity}</span></p>
              <p className="text-lg font-medium">Expires on: <span className="font-light">{new Date(foodItem.expirationDate).toLocaleDateString()}</span></p>
              <p className="text-lg font-medium">Location: <span className="font-light">{foodItem.location.address}</span></p>
            </div>
          </div>
          <div className="flex space-x-2 w-full">
            <Button label="Request" />
            <Button label="View Profile" onClick={toggleOverlay} /> {/* Show overlay on click */}
          </div>
        </div>
      </div>

      {/* Overlay for User Ratings */}
      {showOverlay && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">User Ratings</h2>
            <ul>
              {userRatings.map((rating) => (
                <li key={rating._id} className="mb-3">
                  <p className="font-medium">{rating.ratedBy.username}</p>
                  <p className="text-sm text-gray-600">{rating.comment}</p>
                  <p className="text-sm text-gray-500">Rating: {rating.rating}</p>
                </li>
              ))}
            </ul>
            <Button label="Close" onClick={vierProfileHandler} /> {/* Button to close overlay */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetail;
