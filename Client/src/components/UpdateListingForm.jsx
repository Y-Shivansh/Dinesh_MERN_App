import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const UpdateListingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    expirationDate: "",
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null); // For previewing the photo
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for form submission

  // Fetch existing listing data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/listings/FoodListings/${id}`,
          { withCredentials: true }
        );
        const { title, description, quantity, expirationDate } = response.data;
        setFormData({ title, description, quantity, expirationDate, photo: null });
      } catch (error) {
        setError("Failed to load listing details. Please try again later.");
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null); // Clear error when user edits
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: file }));
    if (file) {
      setPhotoPreview(URL.createObjectURL(file)); // Create a preview URL for the image
    }
    if (error) setError(null); // Clear error when user edits
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) formDataToSend.append(key, formData[key]);
      });
  
      // Debugging FormData
      for (let pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      console.log(formData);
      
  
      await axios.put(
        `http://localhost:3000/api/listings/FoodListings/${id}`,
        formDataToSend,
        { withCredentials: true }
      );
  
      alert("Listing updated successfully!");
      navigate("/my-listings");
    } catch (error) {
      console.error(error.status, "Server Error");
      setError("Failed to update the listing. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Update Food Listing</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            // required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Expiration Date</label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {photoPreview && (
            <div className="mt-4">
              <p className="text-gray-600">Photo Preview:</p>
              <img
                src={photoPreview}
                alt="Selected Preview"
                className="w-full h-48 object-cover rounded"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 px-4 rounded`}
        >
          {loading ? "Updating..." : "Update Listing"}
        </button>
      </form>
    </div>
  );
};
