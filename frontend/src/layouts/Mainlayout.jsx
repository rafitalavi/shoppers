import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/ui/NavBar';
import Footer from '../components/ui/Footer';

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-grow-1">
        <Outlet /> {/* All child routes will be rendered here */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
