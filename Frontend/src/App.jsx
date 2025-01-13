import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Registration';
import Recipe from './Pages/Recipe';
import Addrecipe from './Pages/Addrecipe';

const App = () => {
  const [token, setTokenState] = useState(localStorage.getItem('token'));

  const setToken = (newToken) => {
    setTokenState(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setTokenState(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setTokenState(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home logout={logout} />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/addrecipe" element={<Addrecipe />} />
      </Routes>
    </Router>
  );
};

export default App;
