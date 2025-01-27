import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import Home from './Pages/Home.jsx'
import Explore from './Pages/Explore.jsx';
import Login from './Pages/Login';
import Register from './Pages/Registration';
import Recipe from './Pages/Recipe';
import Addrecipe from './Pages/Addrecipe';
import Setting from './Pages/Setting.jsx';
import Profile from './Pages/Profile.jsx'
import Favorites from './Pages/Favorites.jsx'

import Layout from './Layouts/Layout.jsx';
import AdminLayout from './Layouts/AdminLayout.jsx';

import Dashboard from './admin/pages/Dashboard.jsx';
import ManageUser from './admin/pages/ManageUsers.jsx'
import ManageRecipe from './admin/pages/ManageRecipes.jsx'
import Request from './admin/pages/Request.jsx'

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  return userId ? children : <Navigate to="/login" />; 
};
const   AdminProtectedRoute  = ({chilren}) =>{
  const userRole = localStorage.getItem('userRole');
  return userRole =='admin' ? children : <Navigate to="/login" />; 
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/explore" element={<Explore />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
          <Route path="/addrecipe" element={<ProtectedRoute><Addrecipe /></ProtectedRoute>} />
          <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        </Route>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/users" element={<ManageUser/>}/>
          <Route path="/admin/recipes" element={<ManageRecipe/>}/>
          <Route path="/admin/request" element={<Request/>}/>
          <Route path="/settings" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
