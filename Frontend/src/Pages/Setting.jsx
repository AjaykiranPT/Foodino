import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/settings.css";
import axios from "axios";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phonenumber: "",
  });
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  // Fetch profile data from the database
  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`http://localhost:3000/auth/profile/${userId}`);
        setProfileData(response.data); // Axios automatically parses JSON
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  // Handle profile data updates
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.put(`http://localhost:3000/auth/profile/${userId}`, profileData);
      if (response.status === 200) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="settings-container">
      {/* Header */}
      <header className="settings-header">
        <h1>Settings</h1>
        <nav>
          <button
            className={activeTab === "Profile" ? "active" : ""}
            onClick={() => setActiveTab("Profile")}
          >
            Profile
          </button>
          {userRole === "Foodie" && (
            <button
              className={activeTab === "Upgrade" ? "active" : ""}
              onClick={() => setActiveTab("Upgrade")}
            >
              Upgrade
            </button>
          )}
          <button
            className={activeTab === "Security" ? "active" : ""}
            onClick={() => setActiveTab("Security")}
          >
            Security
          </button>
        </nav>
      </header>

      {/* Content */}
      <div className="settings-content">
        {activeTab === "Profile" && (
          <div className="profile-tab">
            <h2>Profile Settings</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="phonenumber"
                value={profileData.phonenumber}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleSaveProfile} className="save-button">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === "Upgrade" && userRole === "Foodie" && (
          <div className="upgrade-tab">
            <h2>Upgrade to Master Chef</h2>
            <p>
              Unlock exclusive features and share your expertise with others by
              upgrading to Master Chef!
            </p>
            <button className="upgrade-button">Upgrade Now</button>
          </div>
        )}

        {activeTab === "Security" && (
          <div className="security-tab">
            <h2>Security Settings</h2>
            <label>
              Current Password:
              <input type="password" name="currentPassword" />
            </label>
            <label>
              New Password:
              <input type="password" name="newPassword" />
            </label>
            <button className="change-password-button">Change Password</button>
            <div className="danger-zone">
              <h3>Danger Zone</h3>
              <button className="delete-account-button">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
