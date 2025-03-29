import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import saasyLogo from '../assets/saasy_logo.png';

const MainLayout: React.FC = () => {
  const location = useLocation();
  
  // Function to check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navigation Header */}
      <header className="bg-gray-800 border-b border-gray-700 relative">
        {/* Centered Logo Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-5">
          <Link to="/">
            <img src={saasyLogo} alt="SaaSy Cookies Logo" className="h-32 w-32 sm:h-36 sm:w-36" />
          </Link>
        </div>
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Text */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#00FFD1] to-[#FF3CAC] bg-clip-text text-transparent">
                  SaaSy Cookies
                </span>
              </Link>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex space-x-2 sm:space-x-4">
              <Link 
                to="/" 
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive('/') 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-[#00FFD1]'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/tools" 
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive('/tools') 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-[#FF3CAC]'
                }`}
              >
                Tools
              </Link>
              <Link 
                to="/about" 
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive('/about') 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-[#00FFD1]'
                }`}
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 mt-10">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-4 sm:py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} SaaSy Cookies. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/terms" className="text-gray-400 hover:text-[#00FFD1] transition-colors duration-300">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-[#FF3CAC] transition-colors duration-300">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
