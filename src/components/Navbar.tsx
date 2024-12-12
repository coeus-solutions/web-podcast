import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuthContext } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Headphones className="w-8 h-8 text-gray-900" />
            <span className="text-xl font-bold text-gray-900">PodcastManager</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};