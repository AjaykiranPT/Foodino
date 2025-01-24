import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Perform logout logic
    localStorage.clear(); // Clear user-related data from local storage
    alert("You have been logged out!");
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin</h2>
      </div>
      <ul className="sidebar-menu">
        <li><a href="/admin/dashboard">Dashboard</a></li>
        <li><a href="/admin/recipes">Manage Recipes</a></li>
        <li><a href="/admin/users">Manage Users</a></li>
      </ul>
      {/* Logout Section */}
      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
