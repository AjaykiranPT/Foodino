import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    recipeCount: 0,
    pendingRequests: 0,
    todayRecipes: 0,
    todayUsers: 0,
  });

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
      <div className="dashboard-grid">
        <div
          className="stat-card span-2-rows"
          style={{ backgroundColor: "#ff5722" }}
          onClick={() => handleNavigation("/admin/recipes")}
        >
          <h3>Recipes</h3>
          <p>{stats.recipeCount}</p>
        </div>
        <div
          className="stat-card span-2-cols"
          style={{ backgroundColor: "#4caf50" }}
          onClick={() => handleNavigation("/admin/users")}
        >
          <h3>Users</h3>
          <p>{stats.userCount}</p>
        </div>
        <div
          className="stat-card small-card"
          style={{ backgroundColor: "#ff9800" }}
        >
          <h3>Today's Recipes</h3>
          <p>{stats.todayRecipes}</p>
        </div>
        <div
          className="stat-card small-card"
          style={{ backgroundColor: "#9c27b0" }}
        >
          <h3>Today's Users</h3>
          <p>{stats.todayUsers}</p>
        </div>
        <div
          className="stat-card span-2-cols"
          style={{ backgroundColor: "#2196f3" }}
          onClick={() => handleNavigation("/admin/requests")}
        >
          <h3>Pending Requests</h3>
          <p>{stats.pendingRequests}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
