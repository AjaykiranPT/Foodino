import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure proper import

const Navigation = ({ clearToken }) => {
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role || '');
      } catch (error) {
        console.error('Invalid token:', error);
        clearToken();
      }
    }
  }, [clearToken]);

  const handleLogout = () => {
    clearToken(); // Clear the token using the provided function
    navigate('/login'); // Navigate to the login page
  };

  const renderLinks = () => {
    switch (userRole) {
      case 'Admin':
        return (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        );
      case 'MasterChef':
        return (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/broadcast">
                Broadcast
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/recipe">
                Manage Recipes
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        );
      case 'Foodie':
        return (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/recipe">
                Recipes
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        );
      default:
        return (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </>
        );
    }
  };

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">{renderLinks()}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
