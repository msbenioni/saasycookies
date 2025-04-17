import React from "react";
import { Link } from "react-router-dom";

interface SaasyCtaButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

// For bold/primary CTA buttons like "Get Started"
const SaasyCtaButton: React.FC<SaasyCtaButtonProps> = ({ to, children, className = "", ...props }) => (
  <Link
    to={to}
    className={`saasy-button-cta px-8 py-4 text-lg font-medium rounded-md ${className}`}
    {...props}
  >
    {children}
  </Link>
);

export default SaasyCtaButton;
