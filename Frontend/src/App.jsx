import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import Home from './Pages/Home.jsx'
import Explore from './Pages/Explore.jsx';
import Login from './Pages/Login';
import Register from './Pages/Registration';
import Recipe from './Pages/Recipe';
import Addrecipe from './Pages/Addrecipe';
import Layout from './components/Layout';
import Setting from './Pages/Setting.jsx';



const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  return userId ? children : <Navigate to="/login" />; 
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/explore" element={<Explore />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/profile" element={<Recipe />} />
          <Route path="/addrecipe" element={<ProtectedRoute><Addrecipe /></ProtectedRoute>} />
          <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </Router>
  );
};

export default App;
