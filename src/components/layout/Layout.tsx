import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  const handleContentClick = () => {
    if (isSidebarOpen && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen container-safe">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 relative container-safe">
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={handleContentClick}
            aria-hidden="true"
          />
        )}
        
        <main 
          className="flex-1 p-3 sm:p-4 md:p-6 pb-20 md:pb-6 page-transition container-safe"
          onClick={handleContentClick}
        >
          <Outlet />
        </main>
      </div>
      
      <MobileNav />
    </div>
  );
};

export default Layout;