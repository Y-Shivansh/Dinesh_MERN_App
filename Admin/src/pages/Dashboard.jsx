import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faClipboardList, faChartBar, faFlag, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-12">
        <FontAwesomeIcon icon={faClipboardList} className="mr-3 text-blue-500" />
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        {/* Manage Users */}
        <div
          className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transform transition-all cursor-pointer"
          onClick={() => navigate("/manage-user")}
        >
          <FontAwesomeIcon icon={faUsers} className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">Manage Users</h2>
        </div>
        {/* Moderate Listings */}
        <div
          className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transform transition-all cursor-pointer"
          onClick={() => navigate("/moderate-listings")}
        >
          <FontAwesomeIcon icon={faClipboardList} className="text-4xl text-green-500 mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">Moderate Listings</h2>
        </div>
        {/* App Statistics */}
        <div
          className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transform transition-all cursor-pointer"
          onClick={() => navigate("/app-statistics")}
        >
          <FontAwesomeIcon icon={faChartBar} className="text-4xl text-purple-500 mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">App Statistics</h2>
        </div>
        {/* Handle Reports */}
        <div
          className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transform transition-all cursor-pointer"
          onClick={() => navigate("/handle-reports")}
        >
          <FontAwesomeIcon icon={faFlag} className="text-4xl text-red-500 mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">Handle Reports</h2>
        </div>
      </div>
      {/* Logout Button */}
      <button
        className="mt-10 flex items-center bg-gray-800 hover:bg-gray-900 text-white py-3 px-8 rounded-lg shadow-md transition-all transform hover:scale-105"
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-lg" />
        Logout
      </button>
    </div>
  );
};

