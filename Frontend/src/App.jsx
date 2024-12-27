import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Pages/Login";
import Register from "./Pages/Registration";
import Home from "./Pages/Home";
import Recipe from "./Pages/Recipe";

axios.defaults.baseURL = "http://localhost:3000/api"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} /> 
      </Routes>
    </Router>
  );
};

export default App;
