import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}`
        );

        if (response.status !== 200) {
          throw new Error(`Failed to fetch user profile: ${response.statusText}`);
        }

        setUser(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-page">
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio}</p>
      {/* Add more user fields as needed */}
    </div>
  );
};

export default UserProfilePage;
