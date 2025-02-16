import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import axios from "axios";
import { FaEdit, FaSignOutAlt } from "react-icons/fa"; // Importing icons
import { CiLogout } from "react-icons/ci";
import Favorites from "./Favorites";

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
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetchUserProfile();
    fetchUserFavorites();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/auth/profile/${userId}`
      );
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchUserFavorites = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/favorites/user/${userId}`
      );
      if (response.status === 200) {
        setFavorites(response.data);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/explore");
  };

  return (
    <div className="profile-container">
      {/* Profile Section */}
      <div className="profile-card">
        <div className="profile-header">
          <h2>Profile</h2>
          <div className="profile-actions">
            <FaEdit size={'1.5em'} className="icon edit-icon" onClick={() => navigate("/setting")} />

            <CiLogout size={'1.5em'} color="red" className="icon logout-icon" onClick={handleLogout} />
          </div>
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phonenumber}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>

      {/* Favorites Section */}
      <div className="favorites-section">
        <Favorites/>
      </div>
    </div>
  );
};

export default Profile;
