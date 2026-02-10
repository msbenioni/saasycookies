import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Package } from 'lucide-react';
import saasyLogo from '../assets/saasy_logo.png';
import '../styles/colors.css';

// ============================================
// STYLE CONSTANTS
// ============================================
const NAV_LINK_BASE = 'rounded-lg font-medium transition-all duration-200';
const NAV_LINK_ACTIVE = 'text-[#6affd8] bg-[#6e40c9]/20';
const NAV_LINK_INACTIVE = 'text-[#8b949e] hover:text-[#6affd8] hover:bg-[#30363d]';
const FOOTER_LINK = 'text-sm text-[#8b949e] hover:text-[#9e83ff] transition-colors';
const CTA_BUTTON = 'flex items-center justify-center gap-2 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 bg-[#4337a5] hover:bg-[#5447b5]';

// ============================================
// HELPER FUNCTIONS
// ============================================
const getNavLinkClasses = (isActive: boolean, variant: 'desktop' | 'mobile'): string => {
  const base = variant === 'desktop' 
    ? `${NAV_LINK_BASE} px-4 py-2 text-sm`
    : `${NAV_LINK_BASE} px-4 py-3 text-base flex items-center gap-3`;
  
  const activeClasses = variant === 'desktop'
    ? `${NAV_LINK_ACTIVE} shadow-[0_0_8px_2px_#6affd8]`
    : NAV_LINK_ACTIVE;
  
  return `${base} ${isActive ? activeClasses : NAV_LINK_INACTIVE}`;
};

// ============================================
// COMPONENTS
// ============================================
interface FooterLinkProps {
  to?: string;
  href?: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, href, children }) => {
  const className = FOOTER_LINK;
  
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  
  return <Link to={to!} className={className}>{children}</Link>;
};

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  const navItems: any[] = [];

  const headerClasses = scrolled 
    ? 'bg-[#161b22]/70 backdrop-blur-xl shadow-lg border-b border-[#30363d]/50' 
    : 'bg-transparent';

  return (
    <div className="flex flex-col min-h-screen scroll-gradient text-white font-body">
      {/* Navigation Header */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${headerClasses}`}>
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 z-10">
            <img src={saasyLogo} alt="SaaSy Cookies" className="h-16 w-auto" />
            <span className="text-xl font-bold text-white hidden sm:block">SaaSy Cookies</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={getNavLinkClasses(isActive(item.path), 'desktop')}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://senseai.co.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#8b949e] hover:text-[#b388ff] transition-colors"
            >
              SenseAI
            </a>
            <span className="text-[#30363d]">•</span>
            <a
              href="https://pacificmarket.co.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#8b949e] hover:text-[#10b981] transition-colors"
            >
              Pacific Market
            </a>
            <span className="text-[#30363d]">•</span>
            <Link
              to="/tools/invoice-generator"
              className="text-sm text-[#8b949e] hover:text-[#A78BFA] transition-colors"
            >
              Invoice Generator
            </Link>
            <span className="text-[#30363d]">•</span>
            <Link
              to="/tools/qr-generator"
              className="text-sm text-[#8b949e] hover:text-[#60A5FA] transition-colors"
            >
              QR Code Generator
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-[#30363d] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                  className={getNavLinkClasses(isActive(item.path), 'mobile')}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-[#30363d] mt-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#8b949e]">Quick links:</span>
                    <Link
                      to="/tools/invoice-generator"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[#8b949e] hover:text-[#A78BFA] transition-colors"
                    >
                      Invoice Generator
                    </Link>
                    <span className="text-[#30363d]">•</span>
                    <Link
                      to="/tools/qr-generator"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[#8b949e] hover:text-[#60A5FA] transition-colors"
                    >
                      QR Code Generator
                    </Link>
                  </div>
                  <a
                    href="https://senseai.co.nz"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${CTA_BUTTON} w-full px-4 py-3 text-base`}
                  >
                    <Package className="w-5 h-5" />
                    Try SenseAI
                  </a>
                </div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <img src={saasyLogo} alt="SaaSy Cookies" className="h-6 w-auto" />
              <span className="text-sm font-medium text-white">SaaSy Cookies</span>
            </div>
            
            {/* Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <FooterLink to="/contact">Contact</FooterLink>
              <span className="text-[#30363d]">•</span>
              <FooterLink to="/privacy">Privacy</FooterLink>
              <span className="text-[#30363d]">•</span>
              <FooterLink to="/terms">Terms</FooterLink>
            </div>
            
            {/* Copyright */}
            <div className="text-xs text-[#8b949e]">
              © {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
