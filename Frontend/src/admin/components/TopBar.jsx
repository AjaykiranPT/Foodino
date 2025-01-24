import React from "react";
import "../styles/TopBar.css";

const Topbar = () => {
  return (
    <div className="admin-topbar">
      <div className="search-bar">
        <input type="text" placeholder="Search Recipes, Users, etc..." />
      </div>
      <div className="profile">
        <img
          src="https://via.placeholder.com/40"
          alt="Admin Profile"
          className="profile-pic"
        />
        <span>Admin</span>
      </div>
    </div>
  );
};

export default Topbar;
