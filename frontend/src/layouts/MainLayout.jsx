import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { Brain, Globe, FileText, QrCode, Menu, X, Layers, CreditCard, DollarSign } from "lucide-react";
import { LOGO_CLASSES } from "../constants/logo";
import { PRODUCT_LOGOS } from "../constants/productLogos";

const navLinks = [
  { 
    to: "/senseai", 
    label: "SenseAI", 
    icon: Brain, 
    color: "text-senseai",
    hasLogo: true,
    logoKey: "SENSEAI"
  },
  { 
    to: "/pacificmarket", 
    label: "Pacific Market", 
    icon: Globe, 
    color: "text-pacific",
    hasLogo: true,
    logoKey: "PACIFIC_MARKET"
  },
  { to: "/pricing", label: "Managed Infrastructure", icon: DollarSign, color: "text-emerald-300" },
  { to: "/services/ai-saas", label: "Custom AI & SaaS", icon: Layers, color: "text-cyan-300" },
  { to: "/tools/digital-card", label: "Digital BusinessCard", icon: CreditCard, color: "text-cyan-400" },
  { to: "/tools/invoice-generator", label: "Invoice Generator", icon: FileText, color: "text-purple-500" },
  { to: "/tools/qr-generator", label: "QR Code Generator", icon: QrCode, color: "text-pink-500" },
];

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-void text-white font-body">
      <header
        data-testid="main-header"
        className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/5"
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
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.hasLogo ? (
                    <img
                      src={PRODUCT_LOGOS[link.logoKey].src}
                      alt={PRODUCT_LOGOS[link.logoKey].alt}
                      className={PRODUCT_LOGOS[link.logoKey].classes.NAV}
                    />
                  ) : (
                    <Icon className={`w-3.5 h-3.5 ${active ? link.color : ""}`} strokeWidth={1.5} />
                  )}
                  <span className={link.color}>{link.label}</span>
                </Link>
              );
            })}
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
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-1"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? link.color : link.color}`} strokeWidth={1.5} />
                  <span className={link.color}>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer
        data-testid="main-footer"
        className="border-t border-white/5 bg-void-paper"
      >
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <img 
              src="/SAASY_logo_transparent.png" 
              alt="SaaSy Cookies Logo" 
              className={LOGO_CLASSES.FOOTER}
            />
            <span>&copy; {new Date().getFullYear()} SaaSy Cookies. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/contact"
              data-testid="footer-contact"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              data-testid="footer-privacy"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              data-testid="footer-terms"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
