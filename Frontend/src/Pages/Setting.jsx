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
  const [role, setRole] = useState(null); // Use state for userRole
  const [image, setImage] = useState(null); // Store the selected image for verification
  const [showConfirm, setShowConfirm] = useState(false); // Show confirm button after image upload
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
  const navigate = useNavigate();

  // Fetch userRole from localStorage on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);

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

  // Save updated profile data to the backend
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setShowConfirm(true); // Show confirm button after image selection
    }
  };

  // Submit the upgrade request with the uploaded image
  const handleConfirmUpgrade = async () => {
    if (image) {
      const userId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("proofFile", image);

      try {
        const response = await axios.post("http://localhost:3000/auth/submit", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          alert("Upgrade request submitted successfully!");
          // Reset states
          setImage(null);
          setShowConfirm(false);
        } else {
          alert("Failed to submit upgrade request. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting upgrade request:", error);
        alert("An error occurred while submitting your upgrade request.");
      }
    } else {
      alert("Please upload an image for verification.");
    }
  };

  // Handle password change
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
      setPasswordChangeMessage(error.response.data || "An error occurred while changing password.");
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
          {role === "foodie" && (
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
            <button onClick={handleSaveChanges} className="save-button">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === "Upgrade" && role === "foodie" && (
          <div className="upgrade-tab">
            <h2>Upgrade to Master Chef</h2>
            <p>
              Unlock exclusive features and share your expertise with others by
              upgrading to Master Chef!
            </p>
            <label className="upload-label">
              Upload an image for verification:
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </label>
            {showConfirm && (
              <button onClick={handleConfirmUpgrade} className="confirm-button upgrade-button">
                Confirm Upgrade
              </button>
            )}
          </div>
        )}

        {activeTab === "Security" && (
          <div className="security-tab">
            <h2>Security Settings</h2>
            <label>
              Current Password:
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
            <label>
              New Password:
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label>
              Confirm New Password:
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
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
