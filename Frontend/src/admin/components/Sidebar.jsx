import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, List, ListItem, ListItemText, Divider, Typography } from "@mui/material";
import { Logout, Dashboard, Restaurant, People, Assignment } from "@mui/icons-material";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out!");
    navigate("/");
  };

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-sidebar">
      <div className="sidebar-shade"></div> {/* One Mode Shade Div */}
      <div className="sidebar-header">
        <Typography variant="h4" component="h2" className="sidebar-title">
          WELCOME
        </Typography>
      </div>
      <Divider style={{ backgroundColor: "white", margin: "20px 0" }} />
      <List className="sidebar-menu">
        <ListItem
          button
          component={Link}
          to="/admin/dashboard"
          className={isActive("/admin/dashboard") ? "active-link" : ""}
        >
          <Dashboard className="sidebar-icon" />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/admin/recipes"
          className={isActive("/admin/recipes") ? "active-link" : ""}
        >
          <Restaurant className="sidebar-icon" />
          <ListItemText primary="Manage Recipes" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/admin/users"
          className={isActive("/admin/users") ? "active-link" : ""}
        >
          <People className="sidebar-icon" />
          <ListItemText primary="Manage Users" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/admin/request"
          className={isActive("/admin/request") ? "active-link" : ""}
        >
          <Assignment className="sidebar-icon" />
          <ListItemText primary="Requests" />
        </ListItem>
      </List>
      <div className="logout-section">
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          className="logout-btn"
          size="large"
          startIcon={<Logout />} // Added Logout Icon
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
