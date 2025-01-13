import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation'; 

const Header = ({ clearToken }) => { 
  return (
    <header className="bg-dark d-flex align-items-center p-3">
      <Link
        className="fw-bold text-decoration-none fs-4 text-light me-auto"
        to={'/'}
      >
        Foodino
      </Link>
      <Navigation clearToken={clearToken} />
    </header>
  );
};

export default Header;
