import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/super/admin/manage-users",
          { withCredentials: true }
        );
        const userData = Array.isArray(response.data.users) ? response.data.users : [];
        setUsers(userData);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUserStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/super/admin/manage-users/${id}`,
        { status },
        { withCredentials: true }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, status } : user
        )
      );
    } catch (err) {
      alert("Failed to update user status");
    }
  };

  const deleteUser = async () => {
    try {
      if (userToDelete) {
        await axios.delete(
          `http://localhost:3000/api/super/admin/manage-users/${userToDelete._id}`,
          { withCredentials: true }
        );
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userToDelete._id));
        setIsModalOpen(false); // Close modal after delete
      }
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const openModal = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  if (loading) return <div className="text-center text-xl mt-4">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold text-center py-4">MANAGE USERS!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white border rounded-lg shadow-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <div className="text-center mb-4">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mx-auto object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                  No Picture
                </div>
              )}
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-600"><strong>Role:</strong> {user.role}</p>
              <p className="text-gray-600"><strong>Status:</strong> {user.status}</p>
              <p className="text-gray-600"><strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}</p>
            </div>
            <div className="flex justify-evenly mt-4">
              <button
                className="bg-blue-500 w-1/4 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={() =>
                  updateUserStatus(user._id, user.status === "active" ? "suspended" : "active")
                }
              >
                {user.status === "active" ? "Suspend" : "Activate"}
              </button>
              <button
                className="bg-red-500 w-1/4 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                onClick={() => openModal(user)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this user?</h3>
            <p className="text-gray-700 mb-6">
              {userToDelete?.name} ({userToDelete?.email})
            </p>
            <div className="flex justify-around">
              <button
                className="bg-red-500 w-1/4 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
                onClick={deleteUser}
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

export default ManageUsers;
