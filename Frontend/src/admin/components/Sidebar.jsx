import React from "react";
import { Link, useLocation } from "react-router-dom";
import { List, ListItem, ListItemText, Divider, Typography } from "@mui/material";
import { Dashboard, Restaurant, People, Assignment, Settings, AccountCircle } from "@mui/icons-material";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Get the current location

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
        <ListItem
          button
          component={Link}
          to="/admin/settings"
          className={isActive("/admin/settings") ? "active-link" : ""}
        >
          <Settings className="sidebar-icon" />
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/admin/account"
          className={isActive("/admin/account") ? "active-link" : ""}
        >
          <AccountCircle className="sidebar-icon" />
          <ListItemText primary="Account" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
