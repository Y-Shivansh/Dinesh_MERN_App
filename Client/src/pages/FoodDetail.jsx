import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const viewProfileHandler = () => {
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
        // console.log(data.foodItem);
        
        if (response.status === 200) {
          setFoodItem(data.foodItem);
          toast.success('Food item loaded successfully!'); // Show toast on successful data load
        } else {
          setFoodItem(null);
        }

      } catch (error) {
        console.error('Error fetching food item:', error);
        setFoodItem(null);
        toast.error('Food item not found!'); // Show toast if there's an error

      } finally {
        setLoading(false);
      }
    };

    fetchFoodItem();
  }, [id]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/ratings/user-rating/${foodItem.postedBy}`, { withCredentials: true });
        console.log(response.data);
        setUserRatings(response.data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        setError('Failed to load ratings');
        toast.error('Failed to load ratings'); // Show toast on error fetching ratings
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
    <div className=" flex items-center justify-center h-screen w-screen bg-primaryColHover rounded-lg shadow-lg p-4">
      <div className='my-4'>
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-screen-lg mx-auto">
          {/* Food Image */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/2 w-full">
            <img src={foodItem.photos[0] || 'https://via.placeholder.com/300'} alt={foodItem.title} className="w-full h-96 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Food Details */}
          <div className="md:ml-8 md:w-2/3 w-full text-headingCol flex flex-col space-y-3">
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
              <div className="bg-gray-500 hover:bg-gray-600 text-white rounded-md py-2 px-6 w-full md:w-auto cursor-pointer transition-all duration-200 transform text-center">
                Request
              </div>
              <div
                onClick={() => { toggleOverlay(); viewProfileHandler(); }}
                className="bg-green-500 hover:bg-green-600 text-white rounded-md py-2 px-6 w-full md:w-auto cursor-pointer transition-all duration-200 transform text-center"
              >
                View Profile
              </div>
            </div>
          </div>
        </div>
        {/* Overlay for User Ratings */}
        {showOverlay && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 opacity-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
              <h2 className="text-2xl font-semibold mb-4 text-center text-primaryCol">User Ratings</h2>
              <div className="space-y-3">
                {userRatings.length === 0 ? (
                  <p className="text-center text-lg text-gray-500">No ratings yet</p>
                ) : (
                  userRatings.map((rating) => (
                    <div key={rating._id} className="flex flex-col p-4 rounded-lg shadow-sm border border-gray-200">
                      <p className="font-medium">{rating.ratedBy.username}</p>
                      <p className="text-sm text-gray-600">{rating.comment}</p>
                      <p className="text-sm text-gray-500">Rating: {rating.rating}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-center mt-4">
                <div
                  onClick={() => setShowOverlay(false)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md py-2 px-4 cursor-pointer transition-all duration-200 transform"
                >
                  Close
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Container */}
        <ToastContainer position="top-right" autoClose={500} hideProgressBar newestOnTop closeButton />

      </div>
    </div>
  );
};

export default FoodDetail;