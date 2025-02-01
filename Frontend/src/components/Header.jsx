import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="header">
      
      <div className="logo-container">
    
        <img className='orange1' src="/orange.png" alt="" />
        <img className='orange2' src="/orange2.png" alt="" />

        <Link className="text-decoration-none" to="/">
          <h1 className="header-brand">Foodino</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
