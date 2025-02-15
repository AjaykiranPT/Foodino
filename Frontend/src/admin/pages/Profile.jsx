import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const Profile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({
    name: "",
    email: "",
    phonenumber: "",
    role: "",
  });

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetchUserProfile();
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

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Admin Profile</h2>
          <div className="profile-actions">
            <FaEdit size={'1.5em'} className="icon edit-icon" onClick={() => navigate("/admin/settings")} />
            <CiLogout size={'1.5em'} color="red" className="icon logout-icon" onClick={handleLogout} />
          </div>
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phonenumber}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
