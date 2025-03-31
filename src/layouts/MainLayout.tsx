import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import saasyLogo from '../assets/saasy_logo.png';
import CookieConsent from '../components/CookieConsent';
import { initScrollAnimations } from '../utils/animationUtils';

const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Initialize scroll animations when component mounts
  useEffect(() => {
    const observer = initScrollAnimations();
    
    // Re-initialize animations on route change
    const reinitAnimations = () => {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        initScrollAnimations();
      }, 100);
    };
    
    // Call on route changes
    reinitAnimations();
    
    return () => {
      // Clean up observer when component unmounts
      if (observer) {
        observer.disconnect();
      }
    };
  }, [location.pathname]);

  // Function to check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col cookie-gradient-bg">
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
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white btn-bounce"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link 
                to="/" 
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 btn-bounce ${
                  isActive('/') 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-[#00FFD1]'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/invoice" 
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 btn-bounce ${
                  isActive('/invoice') 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-[#FF3CAC]'
                }`}
              >
                Invoice
              </Link>
              <Link 
                to="/tools" 
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 btn-bounce ${
                  isActive('/tools') 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-[#FF3CAC]'
                }`}
              >
                Tools
              </Link>
              <Link 
                to="/about" 
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 btn-bounce ${
                  isActive('/about') 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-[#00FFD1]'
                }`}
              >
                About
              </Link>
            </div>
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
              to="/invoice" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/invoice') 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-[#FF3CAC]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Invoice
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
      <main className="flex-grow px-4 py-8">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="soft-gradient-1 border-t border-gray-800">
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
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
};

export default MainLayout;
