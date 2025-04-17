import React from "react";
import { Link } from "react-router-dom";

interface SaasySoftButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

// For secondary/soft CTA buttons like "Learn More About Us"
const SaasySoftButton: React.FC<SaasySoftButtonProps> = ({ to, children, className = "", ...props }) => (
  <Link
    to={to}
    className={`saasy-button-soft-cta px-8 py-4 text-lg font-medium rounded-md ${className}`}
    {...props}
  >
    {children}
  </Link>
);

export default SaasySoftButton;
