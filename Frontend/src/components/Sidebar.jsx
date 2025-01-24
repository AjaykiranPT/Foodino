import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUtensils,
  FaUsers,
  FaCogs,
  FaStar,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'Guest');


  useEffect(() => {
    const handleStorageChange = () => {
      const role = localStorage.getItem('userRole');
      console.log('User role changed to:', role); // Log when user role changes
      setUserRole(role || 'Guest');
    };

    // Listen for storage changes (if you are using multiple tabs)
    window.addEventListener('storage', handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Define the menu items based on user role
  const getMenuItems = (role) => {
    switch (role) {
      case 'masterchef':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
          { path: '/my-recipes', label: 'My Recipes', icon: <FaUtensils /> },
          { path: '/rate-recipes', label: 'Rate Recipes', icon: <FaStar /> },
        ];
      case 'foodie':
        return [
          { path: '/explore', label: 'Explore Recipes', icon: <FaUtensils /> },
          { path: '/favorites', label: 'Favorites', icon: <FaStar /> },
        ];
      case 'Guest':
      default:
        return [
          { path: '/', label: 'Home', icon: <FaHome /> },
          { path: '/explore', label: 'Explore', icon: <FaUtensils /> },
        ];
    }
  };

  const menuItems = getMenuItems(userRole);

  return (
    <div className="sidebar bg-dark text-light mx-2 px-3" style={{ height: 'auto', minHeight:'100vh', width: '250px',borderRadius:'1.5rem'}}>
      <ul className="list-unstyled mt-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`mb-3 ${location.pathname === item.path ? 'bg-secondary rounded' : ''}`}
          >
            <Link
              to={item.path}
              className="text-light text-decoration-none d-flex align-items-center p-2"
              aria-label={item.label}
            >
              {item.icon} <span className="ms-2">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
