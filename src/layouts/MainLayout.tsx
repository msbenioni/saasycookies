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

  useEffect(() => {
    // Instantly scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen scroll-gradient text-white font-body">
      {/* Navigation Header */}
      <header className="nav-header sticky top-0 z-50 w-full bg-black/20 backdrop-blur-xl bg-opacity-60">
        <div className="w-full relative flex items-center justify-between h-24 px-4">
          {/* Logo Centered */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
            <img src={saasyLogo} alt="SaaSy Cookies Logo" className="h-40 w-40 drop-shadow-lg mt-12" />
          </Link>
          
          {/* Desktop Navigation - Right Aligned */}
          <div className="hidden md:block">
            <nav className="flex items-center space-x-4">
              <Link 
                to="/" 
                className={`neon-nav-link px-6 py-2 ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`neon-nav-link px-6 py-2 ${isActive('/about') ? 'active' : ''}`}
              >
                About
              </Link>
              <Link 
                to="/tools" 
                className={`neon-nav-link px-6 py-2 ${isActive('/tools') ? 'active' : ''}`}
              >
                Tools
              </Link>
              <Link 
                to="/contact" 
                className={`neon-nav-link px-6 py-2 ${isActive('/contact') ? 'active' : ''}`}
              >
                Contact
              </Link>
            </nav>
          </div>
          
          {/* Hamburger Menu Button (Mobile Only) - RIGHT SIDE ONLY */}
          <div className="md:hidden ml-2 z-10 absolute right-2 top-1/2 -translate-y-1/2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md nav-link-inactive hover:bg-[var(--nav-hover-bg)] hover:text-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent-primary)]"
              aria-expanded={mobileMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Menu</span>
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
          
          {/* Mobile Menu (Shown when hamburger is clicked) */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden fixed top-24 left-0 w-full bg-black/90 backdrop-blur-xl shadow-lg z-30 overflow-hidden transition-all duration-300 ease-in-out`}>
            <div className="px-4 py-4 space-y-3 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <Link 
                to="/" 
                className={`block p-3 rounded-lg ${isActive('/') ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]' : 'text-white hover:bg-[var(--accent-primary)]/10'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-lg font-medium">Home</span>
              </Link>
              <Link 
                to="/about" 
                className={`block p-3 rounded-lg ${isActive('/about') ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]' : 'text-white hover:bg-[var(--accent-primary)]/10'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-lg font-medium">About</span>
              </Link>
              <Link 
                to="/tools" 
                className={`block p-3 rounded-lg ${isActive('/tools') ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]' : 'text-white hover:bg-[var(--accent-primary)]/10'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-lg font-medium">Tools</span>
              </Link>
              <Link 
                to="/contact" 
                className={`block p-3 rounded-lg ${isActive('/contact') ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]' : 'text-white hover:bg-[var(--accent-primary)]/10'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-lg font-medium">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 mt-10">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="site-footer py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-[var(--nav-text)]">
                &copy; {new Date().getFullYear()} SaaSy Cookies. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/about" className="footer-link">
                About
              </Link>
              <Link to="/tools" className="footer-link">
                Tools
              </Link>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
              <Link to="/privacy" className="footer-link">
                Privacy
              </Link>
              <Link to="/terms" className="footer-link">
                Terms
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
