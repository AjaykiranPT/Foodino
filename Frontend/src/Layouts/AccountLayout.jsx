import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../styles/AccountLayout.css"; // Custom styles for stickers and layout

const AccountLayout = () => {
  const location = useLocation();

  return (
    <div className="account-layout">
      {/* Animated Stickers */}
      <img src="/meals.png" alt="Biryani" className="sticker sticker1" />
      <img src="/burger.png" alt="Spoon" className="sticker sticker2" />
      <img src="/pizza.png" alt="Chili" className="sticker sticker3" />
      
      <Outlet />
    </div>
  );
};

export default AccountLayout;
