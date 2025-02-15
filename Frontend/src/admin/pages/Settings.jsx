import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phonenumber: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`http://localhost:3000/auth/profile/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.patch(`http://localhost:3000/auth/profile/${userId}`, profileData);
      if (response.status === 200) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile.");
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordChangeMessage("New passwords do not match!");
      return;
    }

    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.put(`http://localhost:3000/auth/change-password`, {
        userId,
        currentPassword,
        newPassword,
      });
      setPasswordChangeMessage(response.data.message || "Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      setPasswordChangeMessage(error.response?.data || "An error occurred while changing password.");
    }
  };

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h1>Settings</h1>
        <nav>
          <button
            className={activeTab === "Profile" ? "active" : ""}
            onClick={() => setActiveTab("Profile")}
          >
            Profile
          </button>
          <button
            className={activeTab === "Security" ? "active" : ""}
            onClick={() => setActiveTab("Security")}
          >
            Security
          </button>
        </nav>
      </header>

      <div className="settings-content">
        {activeTab === "Profile" && (
          <div className="profile-tab">
            <h2>Profile Settings</h2>
            <label>
              Name:
              <input type="text" name="name" value={profileData.name} onChange={handleInputChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={profileData.email} onChange={handleInputChange} />
            </label>
            <label>
              Phone Number:
              <input type="text" name="phonenumber" value={profileData.phonenumber} onChange={handleInputChange} />
            </label>
            <button onClick={handleSaveChanges} className="save-button">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === "Security" && (
          <div className="security-tab">
            <h2>Security Settings</h2>
            <label>
              Current Password:
              <input type="password" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </label>
            <label>
              New Password:
              <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </label>
            <label>
              Confirm New Password:
              <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <button onClick={handlePasswordChange} className="change-password-button">
              Change Password
            </button>
            {passwordChangeMessage && <p>{passwordChangeMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
