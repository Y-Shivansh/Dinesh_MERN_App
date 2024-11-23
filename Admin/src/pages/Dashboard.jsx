import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const DashBoard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/super/admin/logout",
        {}, // POST body, if empty, send an empty object
        { withCredentials: true } // Config object
      );
  
      if (response.status === 200) {
        navigate("/"); // Redirect user after successful logout
      } else {
        console.error("Failed to log out:", response.data);
        alert("Logout failed! Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md transition-all"
          onClick={() => navigate("/manage-user")}
        >
          Manage Users
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-md transition-all"
          onClick={() => navigate("/moderate-listings")}
        >
          Moderate Listings
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg shadow-md transition-all"
          onClick={() => navigate("/app-statistics")}
        >
          App Statistics
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-md transition-all"
          onClick={() => navigate("/handle-reports")}
        >
          Handle Reports
        </button>
      </div>
      <button
        className="w-1/4 mt-10 bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-lg shadow-md transition-all"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
