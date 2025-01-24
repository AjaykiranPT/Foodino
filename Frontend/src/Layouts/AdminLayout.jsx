import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../admin/components/Sidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <div className="content">
          <Outlet /> {/* Dynamic content area */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
