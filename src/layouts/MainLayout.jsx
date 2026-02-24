import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Brain, Globe, FileText, QrCode, Menu, X, Layers, CreditCard, DollarSign, ChevronDown, ArrowRight } from "lucide-react";
import { LOGO_CLASSES } from "../constants/logo";
import { PRODUCT_LOGOS } from "../constants/productLogos";

const navigationStructure = {
  main: [
    { to: "/", label: "Home" },
    { label: "Products", hasDropdown: true },
    { label: "Tools", hasDropdown: true },
    { label: "Services", hasDropdown: true },
  ],
  products: [
    { to: "/senseai", label: "SenseAI", icon: Brain, color: "text-senseai", hasLogo: true, logoKey: "SENSEAI" },
    { to: "/pacificmarket", label: "Pacific Market", icon: Globe, color: "text-pacific", hasLogo: true, logoKey: "PACIFIC_MARKET" },
  ],
  tools: [
    { to: "/tools/digital-card", label: "Digital Business Card", icon: CreditCard, color: "text-cyan-400" },
    { to: "/tools/invoice-generator", label: "Invoice Generator", icon: FileText, color: "text-purple-500" },
    { to: "/tools/qr-generator", label: "QR Code Generator", icon: QrCode, color: "text-pink-500" },
  ],
  services: [
    { to: "/pricing", label: "Pricing", icon: DollarSign, color: "text-emerald-300" },
  ],
};

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const FOOTER_HEIGHT = 80;
  const dropdownRefs = useRef({});

  const handleNavigation = (to) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    navigate(to);
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !dropdownRefs.current[activeDropdown]?.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const DropdownMenu = ({ items, label }) => {
    const isOpen = activeDropdown === label;
    
    return (
      <div className="relative" ref={(el) => dropdownRefs.current[label] = el}>
        <button
          onClick={() => setActiveDropdown(isOpen ? null : label)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          {label}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg overflow-hidden">
            {items.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <button
                  key={item.to}
                  onClick={() => handleNavigation(item.to)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.hasLogo ? (
                    <img
                      src={PRODUCT_LOGOS[item.logoKey].src}
                      alt={PRODUCT_LOGOS[item.logoKey].alt}
                      className={PRODUCT_LOGOS[item.logoKey].classes.NAV}
                    />
                  ) : (
                    <Icon className={`w-4 h-4 ${active ? item.color : item.color}`} strokeWidth={1.5} />
                  )}
                  <span className={item.color}>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-void text-white font-body">
      <header
        data-testid="main-header"
        className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            data-testid="logo-link"
            className="flex items-center gap-2.5 group"
          >
            <img 
              src="/SAASY_logo_transparent.png" 
              alt="SaaSy Cookies Logo" 
              className={LOGO_CLASSES.NAVIGATION}
            />
            <span className="brand-title text-xl">
              SaaSy <span className="text-white">Cookies</span>
            </span>
          </Link>

          <nav data-testid="desktop-nav" className="hidden md:flex items-center gap-1">
            {navigationStructure.main.map((item) => {
              if (item.hasDropdown) {
                return (
                  <DropdownMenu
                    key={item.label}
                    label={item.label}
                    items={navigationStructure[item.label.toLowerCase()]}
                  />
                );
              }
              
              const active = location.pathname === item.to;
              return (
                <button
                  key={item.to}
                  onClick={() => handleNavigation(item.to)}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <button
              onClick={() => handleNavigation("/services/ai-saas")}
              data-testid="nav-get-quote"
              className="flex items-center gap-2 bg-emerald-500 text-black font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-emerald-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Get Quote
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </nav>

          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div
            data-testid="mobile-menu"
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 space-y-1"
          >
            <button
              onClick={() => {
                handleNavigation("/");
                setMobileOpen(false);
              }}
              data-testid="mobile-nav-home"
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                location.pathname === "/"
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </button>
            
            <div className="space-y-1">
              <div className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Products</div>
              {navigationStructure.products.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.to;
                return (
                  <button
                    key={item.to}
                    onClick={() => {
                      handleNavigation(item.to);
                      setMobileOpen(false);
                    }}
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.hasLogo ? (
                      <img
                        src={PRODUCT_LOGOS[item.logoKey].src}
                        alt={PRODUCT_LOGOS[item.logoKey].alt}
                        className={PRODUCT_LOGOS[item.logoKey].classes.NAV}
                      />
                    ) : (
                      <Icon className={`w-4 h-4 ${active ? item.color : item.color}`} strokeWidth={1.5} />
                    )}
                    <span className={item.color}>{item.label}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="space-y-1">
              <div className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Tools</div>
              {navigationStructure.tools.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.to;
                return (
                  <button
                    key={item.to}
                    onClick={() => {
                      handleNavigation(item.to);
                      setMobileOpen(false);
                    }}
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? item.color : item.color}`} strokeWidth={1.5} />
                    <span className={item.color}>{item.label}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="space-y-1">
              <div className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Services</div>
              {navigationStructure.services.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.to;
                return (
                  <button
                    key={item.to}
                    onClick={() => {
                      handleNavigation(item.to);
                      setMobileOpen(false);
                    }}
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? item.color : item.color}`} strokeWidth={1.5} />
                    <span className={item.color}>{item.label}</span>
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => {
                handleNavigation("/services/ai-saas");
                setMobileOpen(false);
              }}
              data-testid="mobile-nav-get-quote"
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-black font-semibold px-4 py-3 rounded-md transition-all duration-300 hover:bg-emerald-400 hover:scale-[1.02]"
            >
              Get Quote
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </header>

      <main className={["pt-16", isHome ? "pb-[80px]" : ""].join(" ")}>
        <Outlet />
      </main>

      <footer
        data-testid="main-footer"
        style={isHome ? { height: `${FOOTER_HEIGHT}px` } : undefined}
        className={[
          "border-t border-white/5 bg-void-paper",
          isHome ? "fixed bottom-0 left-0 right-0 z-[9999]" : "relative",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-6 h-full py-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <img 
              src="/SAASY_logo_transparent.png" 
              alt="SaaSy Cookies Logo" 
              className={LOGO_CLASSES.FOOTER}
            />
            <span>&copy; {new Date().getFullYear()} SaaSy Cookies. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavigation("/contact")}
              data-testid="footer-contact"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => handleNavigation("/privacy")}
              data-testid="footer-privacy"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => handleNavigation("/terms")}
              data-testid="footer-terms"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
