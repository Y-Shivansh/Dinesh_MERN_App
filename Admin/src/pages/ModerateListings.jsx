import React, { useState, useEffect } from "react";
import axios from "axios";

const ModerateListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/super/admin/moderate-listings",
          { withCredentials: true }
        );
        const listingData = Array.isArray(response.data) ? response.data : [];
        setListings(listingData);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const approveListing = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/super/admin/moderate-listings-approve/${id}`,
        {},
        { withCredentials: true }
      );
      location.reload(); // Reload the page after approval
    } catch (err) {
      alert("Failed to approve listing");
    }
  };

  const deleteListing = async () => {
    try {
      if (listingToDelete) {
        await axios.delete(
          `http://localhost:3000/api/super/admin/moderate-listings/${listingToDelete._id}`,
          { withCredentials: true }
        );
        setListings((prevListings) =>
          prevListings.filter((listing) => listing._id !== listingToDelete._id)
        );
        setIsModalOpen(false); // Close modal after delete
      }
    } catch (err) {
      alert("Failed to delete listing");
    }
  };

  const openModal = (listing) => {
    setListingToDelete(listing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setListingToDelete(null);
  };

  if (loading) return <div className="text-center text-xl mt-4">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold text-center py-4">Moderate Listings</h1>

      {listings.length === 0 ? (
        <div className="text-center text-xl text-gray-600">No unmoderated listings are left.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="bg-gray-100 border rounded-lg shadow-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <div className="text-center mb-4">
                {listing.photos && listing.photos.length > 0 ? (
                  <img
                    src={listing.photos[0]}
                    alt={listing.title}
                    className="w-28 h-24 rounded-md mx-auto object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold">{listing.title}</h2>
                <p className="text-gray-600">
                  <strong>Category:</strong> {listing.category}
                </p>
                <p className="text-gray-600">
                  <strong>Quantity:</strong> {listing.quantity}
                </p>
                <p className="text-gray-600">
                  <strong>Expires On:</strong>{" "}
                  {new Date(listing.expirationDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> {listing.location.address}
                </p>
                <p className="text-gray-600">
                  <strong>Moderated:</strong> {listing.isModerated ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex justify-evenly mt-4">
                {!listing.isModerated && (
                  <button
                    className="bg-green-500 w-1/4 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    onClick={() => approveListing(listing._id)}
                  >
                    Approve
                  </button>
                )}
                <button
                  className="bg-red-500 w-1/4 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  onClick={() => openModal(listing)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this listing?
            </h3>
            <p className="text-gray-700 mb-6">
              {listingToDelete?.title} - {listingToDelete?.category}
            </p>
            <div className="flex justify-around">
              <button
                className="bg-red-500 w-1/4 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
                onClick={deleteListing}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 w-1/4 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModerateListings;
