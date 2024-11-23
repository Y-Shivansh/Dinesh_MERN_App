import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ProfileUpdate = () => {
  const [user, setUser] = useState(null); // To store user data
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/profile', {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const formik = useFormik({
    enableReinitialize: true, // Enables reinitializing when `initialValues` change
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      profilePicture: null, // Initialize profile picture as null
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      if (values.profilePicture) {
        formData.append('profilePicture', values.profilePicture);
      }
      
      
      try {
        // 
        
        const response = await axios.put('http://localhost:3000/api/user/profile', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // 
        
        alert('Profile updated successfully');
        
        location.reload('/');
      } catch (err) {
        setError(err.message || "Failed to update profile.");
      }
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        {/* Profile Picture */}
        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-lg font-medium text-gray-700">Profile Picture</label>
          <input
            id="profilePicture"
            name="profilePicture"
            type="file"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            onChange={(e) => formik.setFieldValue('profilePicture', e.currentTarget.files[0])}
            onBlur={formik.handleBlur}
          />
          {formik.touched.profilePicture && formik.errors.profilePicture && (
            <div className="text-red-500 text-sm">{formik.errors.profilePicture}</div>
          )}
        </div>

        {/* Profile Picture Preview */}
        {formik.values.profilePicture && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(formik.values.profilePicture)}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
