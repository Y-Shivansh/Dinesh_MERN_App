import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

// Loader Component
const Loader = () => <div className="text-center mt-6">Loading...</div>;

// Error Display Component
const ErrorDisplay = ({ message }) => (
  <div className="text-center mt-6 text-red-600">Error: {message}</div>
);

export const MyListing = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the listings when the component mounts
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/listings/user-FoodListings",
          { withCredentials: true }
        );
        setFoodItems(response.data.listings);
      } catch (error) {
        setError(error.message || "Something went wrong while fetching your listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Handle Update
  const handleUpdate = (id) => {
    navigate(`/update-listing/${id}`);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/listings/FoodListings/${id}`, { withCredentials: true });
        console.log(response);
        if(response.status !== 200){
            setError("Error Deleting")
        }
        alert("Listing deleted successfully!");
        setFoodItems((prev) => prev.filter((item) => item._id !== id)); // Remove the deleted item
      } catch (error) {
        console.error(error);
        alert("Failed to delete the listing. Please try again.");
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-14 text-headingCol">MY FOOD LISTINGS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 mt-10">
        {foodItems.map((item) => (
          <div key={item._id} className="border rounded-lg p-6 shadow-lg bg-gray-100">
            {/* Item Details */}
            <img
              src={item.photo || "https://via.placeholder.com/150"}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-lg font-bold mt-4">{item.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-sm text-gray-600">Expires: {new Date(item.expirationDate).toLocaleDateString()}</p>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleUpdate(item._id)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Update List
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
              >
                Delete List
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};
