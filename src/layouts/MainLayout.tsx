import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import saasyLogo from '../assets/saasy_logo.png';
import CookieConsent from '../components/CookieConsent';
import '../styles/colors.css'; // Import the global color palette

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

  // Scroll-based gradient effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.body.scrollHeight - window.innerHeight;
      
      // Calculate scroll percentage with a bit more precision
      let scrollPercentage = (scrollPosition / documentHeight) * 100;
      
      // Ensure the percentage stays within 0-100 range
      scrollPercentage = Math.max(0, Math.min(100, scrollPercentage));
      
      // Calculate background position based on scroll percentage
      // This creates the dark-to-light-to-dark effect as you scroll
      const backgroundPosition = `0% ${scrollPercentage}%`;
      
      // Apply the background position to the root element with the CSS variable
      document.documentElement.style.setProperty('--scroll-position', backgroundPosition);
      
      // Optional: Add section-specific classes based on scroll position
      // This helps create more distinct transitions between sections
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          // Add a data attribute to track which section is currently in view
          document.documentElement.setAttribute('data-active-section', `${index}`);
        }
      });
    };

    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set the gradient
    handleScroll();
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen scroll-gradient text-white font-body">
      {/* Navigation Header */}
      <header className="bg-[#161b22] border-b border-[#30363d] shadow-sm relative">
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
                <span className="text-lg sm:text-xl font-heading font-bold text-white leading-relaxed pb-1">
                  SaaSy Cookies
                </span>
              </Link>
            </div>
            
            {/* Hamburger Menu Button (Mobile Only) */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#8b949e] hover:text-white hover:bg-[#30363d] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent-primary)]"
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
                    ? 'bg-[#30363d] text-white' 
                    : 'text-[#8b949e] hover:bg-[#30363d] hover:text-[var(--accent-primary)]'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/tools" 
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive('/tools') 
                    ? 'bg-[#30363d] text-white' 
                    : 'text-[#8b949e] hover:bg-[#30363d] hover:text-[var(--accent-primary)]'
                }`}
              >
                Tools
              </Link>
              <Link 
                to="/about" 
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive('/about') 
                    ? 'bg-[#30363d] text-white' 
                    : 'text-[#8b949e] hover:bg-[#30363d] hover:text-[var(--accent-primary)]'
                }`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive('/contact') 
                    ? 'bg-[#30363d] text-white' 
                    : 'text-[#8b949e] hover:bg-[#30363d] hover:text-[var(--accent-primary)]'
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
        
        {/* Mobile Menu (Shown when hamburger is clicked) */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#161b22] shadow-lg">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-[#30363d] text-white' 
                  : 'text-[#8b949e] hover:bg-[#30363d] hover:text-[var(--accent-primary)]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/tools" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/tools') 
                  ? 'bg-[#30363d] text-white' 
                  : 'text-[#8b949e] hover:bg-[#30363d] hover:text-[var(--accent-primary)]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tools
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/about') 
                  ? 'bg-[#30363d] text-white' 
                  : 'text-[#8b949e] hover:bg-[#30363d] hover:text-[var(--accent-primary)]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/contact') 
                  ? 'bg-[#30363d] text-white' 
                  : 'text-[#8b949e] hover:bg-[#30363d] hover:text-[var(--accent-primary)]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 mt-10">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-[#161b22] border-t border-[#30363d] py-4 sm:py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-[#8b949e]">
                &copy; {new Date().getFullYear()} SaaSy Cookies. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/tools" className="text-[#8b949e] hover:text-[var(--accent-primary)] transition-colors duration-300">
                Tools
              </Link>
              <Link to="/contact" className="text-[#8b949e] hover:text-[var(--accent-primary)] transition-colors duration-300">
                Contact
              </Link>
              <Link to="/about" className="text-[#8b949e] hover:text-[var(--accent-primary)] transition-colors duration-300">
                About
              </Link>
              <Link to="/terms" className="text-[#8b949e] hover:text-[var(--accent-primary)] transition-colors duration-300">
                Terms
              </Link>
              <Link to="/privacy" className="text-[#8b949e] hover:text-[var(--accent-primary)] transition-colors duration-300">
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
