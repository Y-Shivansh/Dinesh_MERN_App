import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const navigate=useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    // Clear previous error and success messages
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(
        'http://localhost:3000/api/user/update-password', // Your backend endpoint
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      setSuccess(response.data.message);
      navigate("/")
        // Assuming the success message comes in response data
    } catch (err) {
      console.log(err);
      
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Update Password</h2>

        {/* Display error or success message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-group">
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="input-group">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;


