import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import saasyLogo from '../assets/saasy_logo.png';
import CookieConsent from '../components/CookieConsent';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Function to check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navigation Header */}
      <header className="bg-gray-800 border-b border-gray-700 relative">
        {/* Centered Logo Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-5">
          <Link to="/">
            <img src={saasyLogo} alt="SaaSy Cookies Logo" className="pt-3 h-32 w-32 sm:h-36 sm:w-36" />
          </Link>
        </div>
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Text */}
            <div className="hidden md:flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#00FFD1] to-[#FF3CAC] bg-clip-text text-transparent leading-relaxed pb-1">
                  SaaSy Cookies
                </span>
              </Link>
            </div>
            
            {/* Hamburger Menu Button (Mobile Only) */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded={mobileMenuOpen ? 'true' : 'false'}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg
                  className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Icon when menu is open */}
                <svg
                  className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            {/* Desktop Navigation Links (Hidden on Mobile) */}
            <nav className="hidden md:flex space-x-2 sm:space-x-4">
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
                to="/analytics" 
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive('/analytics') 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-[#00FFD1]'
                }`}
              >
                Analytics
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
        
        {/* Mobile Menu (Shown when hamburger is clicked) */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 shadow-lg">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-[#00FFD1]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/tools" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/tools') 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-[#FF3CAC]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tools
            </Link>
            <Link 
              to="/analytics" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/analytics') 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-[#00FFD1]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/about') 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-[#00FFD1]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
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
              <Link to="/analytics" className="text-gray-400 hover:text-[#00FFD1] transition-colors duration-300">
                Analytics
              </Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
};

export default MainLayout;
