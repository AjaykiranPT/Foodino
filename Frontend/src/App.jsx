import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import Home from './Pages/Home.jsx'
import Explore from './Pages/Explore.jsx';
import Login from './Pages/Login.jsx';
import Registration from './Pages/Registration.jsx';
import Recipe from './Pages/Recipe';
import Addrecipe from './Pages/Addrecipe';
import Setting from './Pages/Setting.jsx';
import Profile from './Pages/Profile.jsx'
import Favorites from './Pages/Favorites.jsx'

import Layout from './Layouts/Layout.jsx';
import AdminLayout from './Layouts/AdminLayout.jsx';
import AccountLayout from './Layouts/AccountLayout.jsx';

import Dashboard from './admin/pages/Dashboard.jsx';
import ManageUser from './admin/pages/ManageUsers.jsx'
import ManageRecipe from './admin/pages/ManageRecipes.jsx'
import Request from './admin/pages/Request.jsx'
import AdminSetting from './admin/pages/Settings.jsx'
import AdminProfile from './admin/pages/Profile.jsx'


import UserChat from './Pages/UserChat.jsx'
import Broadcast from './Pages/Broadcast.jsx'

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
          <Route path='/chat' element={<UserChat/>}/> 
          <Route path='/Broadcast' element={<Broadcast/>}/> 
        </Route>
        
      <Route element={<AccountLayout/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Route>

        <Route path="/" element={<Home />} />
        
        
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/users" element={<ManageUser/>}/>
          <Route path="/admin/recipes" element={<ManageRecipe/>}/>
          <Route path="/admin/request" element={<Request/>}/>
          <Route path="/admin/settings" element={<AdminSetting/>}/>
          <Route path="/admin/account" element={<AdminProfile/>}/>
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
