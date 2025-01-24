import React from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card" style={{ backgroundColor: "#ffa726" }}>
          <h3>Recipes</h3>
          <p>120</p>
        </div>
        <div className="stat-card" style={{ backgroundColor: "#4caf50" }}>
          <h3>Users</h3>
          <p>1,024</p>
        </div>
        <div className="stat-card" style={{ backgroundColor: "#29b6f6" }}>
          <h3>Active Sessions</h3>
          <p>300</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
