import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Wrench, Home, Mail, ArrowRight } from 'lucide-react';
import saasyLogo from '../assets/saasy_logo.png';
import CookieConsent from '../components/CookieConsent';
import '../styles/colors.css';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/tools', label: 'Tools', icon: Wrench },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="flex flex-col min-h-screen scroll-gradient text-white font-body">
      {/* Navigation Header */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-[#161b22]/70 backdrop-blur-xl shadow-lg border-b border-[#30363d]/50' 
          : 'bg-transparent'
      }`}>
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 z-10">
            <img src={saasyLogo} alt="SaaSy Cookies" className="h-16 w-auto" />
            <span className="text-xl font-bold text-white hidden sm:block">
              SaaSy Cookies
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path) 
                    ? 'text-[#6affd8] bg-[#6e40c9]/20 shadow-[0_0_8px_2px_#6affd8]' 
                    : 'text-[#8b949e] hover:text-[#6affd8] hover:bg-[#30363d]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/tools/invoice"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 shadow-lg bg-[#4337a5] hover:bg-[#5447b5]"
            >
              Try Free Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-[#30363d] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-[#161b22] shadow-xl border-t border-[#30363d]">
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-[#6affd8] bg-[#6e40c9]/20'
                      : 'text-[#8b949e] hover:text-[#6affd8] hover:bg-[#30363d]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-[#30363d] mt-2">
                <Link
                  to="/tools/invoice"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-base font-semibold text-white bg-[#4337a5] hover:bg-[#5447b5]"
                >
                  <Wrench className="w-5 h-5" />
                  Try Free Tools
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="site-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src={saasyLogo} alt="SaaSy Cookies" className="h-8 w-auto" />
                <span className="text-lg font-bold text-white">
                  SaaSy Cookies
                </span>
              </div>
              <p className="text-sm text-[#8b949e] max-w-xs">
                A product studio crafting innovative digital tools with style and purpose.
              </p>
            </div>
            
            {/* Products */}
            <div>
              <h4 className="font-semibold mb-4 text-white">
                Products
              </h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://senseai.co.nz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-[#8b949e] hover:text-[#9e83ff] transition-colors"
                  >
                    SenseAI Journal
                  </a>
                </li>
                <li>
                  <Link 
                    to="/tools/invoice"
                    className="text-sm text-[#8b949e] hover:text-[#9e83ff] transition-colors"
                  >
                    Invoice Generator
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/tools/qrcode"
                    className="text-sm text-[#8b949e] hover:text-[#9e83ff] transition-colors"
                  >
                    QR Code Generator
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-white">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/contact"
                    className="text-sm text-[#8b949e] hover:text-[#9e83ff] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/privacy"
                    className="text-sm text-[#8b949e] hover:text-[#9e83ff] transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms"
                    className="text-sm text-[#8b949e] hover:text-[#9e83ff] transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#30363d] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#8b949e]">
              © {new Date().getFullYear()} SaaSy Cookies. All rights reserved.
            </p>
            <p className="text-sm text-[#8b949e]">
              Made with care in New Zealand 🇳🇿
            </p>
          </div>
        </div>
      </footer>
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
};

export default MainLayout;
