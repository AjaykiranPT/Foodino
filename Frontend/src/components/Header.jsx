import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import '../styles/header.css';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const userId = localStorage.getItem('userId');

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    closeDropdown();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header bg-dark">
      <Link className="text-decoration-none" to="/">
        <h1 className="header-brand">Foodino</h1>
      </Link>

      <div className="header-icons">
        <IoMdSettings
          size={25}
          className="header-icon"
          onClick={() => navigate('/setting')}
        />
        <div className="dropdown-container" ref={dropdownRef}>
          <FaUserCircle
            size={20}
            className="header-icon"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="dropdown-menu">
              {userId ? (
                <>
                  <div className="dropdown-item" onClick={() => navigate('/profile')}>
                    Profile
                  </div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <div className="dropdown-item" onClick={() => navigate('/login')}>
                    Login
                  </div>
                  <div className="dropdown-item" onClick={() => navigate('/register')}>
                    Signup
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
