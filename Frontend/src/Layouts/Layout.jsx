  import React from 'react';
  import Header from '../components/Header';
  import Sidebar from '../components/Sidebar';
  import { Outlet } from 'react-router-dom'; // Import Outlet
  import '../styles/layout.css'

  const Layout = () => {
    return (
      <>
        <Header />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main className='maindiv' style={{ flex: 1, padding: '20px' }}>
            <Outlet /> {/* This renders the child components */}
          </main>
        </div>
      </>
    );
  };

  export default Layout;
