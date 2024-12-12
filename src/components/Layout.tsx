import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './layout/Sidebar';
import { ThemeToggle } from './ThemeToggle';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <div className="fixed top-0 right-4 z-50">
          <ThemeToggle />
        </div>
        <main className="flex-1 py-0 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout; 