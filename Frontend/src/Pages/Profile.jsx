import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/profile.css'

const Profile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({
    name: "",
    email: "",
    phonenumber: "",
    age: "",
    role: "",
  });

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3000/auth/profile/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phonenumber}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <div className="profile-actions">
        <button onClick={() => navigate("/setting")}>Edit Profile</button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
