import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar or Header */}
      <div className="navbar sticky top-0 z-10 bg-white shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex-grow content mt-5 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
