import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
