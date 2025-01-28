import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [stats, setStats] = useState({ userCount: 0, recipeCount: 0, pendingRequests: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/admin/stats");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Handlers for navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard container">
      <h1 className="text-center my-4">Admin Dashboard</h1>
      <div className="row justify-content-center">
        <div
          className="stat-card col-12 col-md-4 mb-4"
          style={{ backgroundColor: "#ffa726", cursor: "pointer" }}
          onClick={() => handleNavigation("../admin/recipes")}
        >
          <h3>Recipes</h3>
          <p>{stats.recipeCount}</p>
        </div>
        <div
          className="stat-card col-12 col-md-4 mb-4"
          style={{ backgroundColor: "#4caf50", cursor: "pointer" }}
          onClick={() => handleNavigation("../admin/users")}
        >
          <h3>Users</h3>
          <p>{stats.userCount}</p>
        </div>
        <div
          className="stat-card col-12 col-md-4 mb-4"
          style={{ backgroundColor: "#29b6f6", cursor: "pointer" }}
          onClick={() => handleNavigation("../admin/requests")}
        >
          <h3>Pending Requests</h3>
          <p>{stats.pendingRequests}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
