  import React from 'react';
  import Header from './Header';
  import Sidebar from './Sidebar';
  import { Outlet } from 'react-router-dom'; // Import Outlet

  const Layout = () => {
    return (
      <div>
        <Header />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '20px' }}>
            <Outlet /> {/* This renders the child components */}
          </main>
        </div>
      </div>
    );
  };

  export default Layout;
