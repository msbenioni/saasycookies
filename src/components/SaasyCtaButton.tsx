import React from "react";
import { Link } from "react-router-dom";

interface SaasyCtaButtonProps {
  to?: string;
  as?: "link" | "button";
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}

// For bold/primary CTA buttons like "Get Started"
const SaasyCtaButton: React.FC<SaasyCtaButtonProps> = ({ 
  to = "#", 
  as = "link", 
  type = "button",
  children, 
  className = "", 
  ...props 
}) => {
  const baseClasses = `saasy-button-cta px-8 py-4 text-lg font-medium rounded-md ${className}`;
  
  if (as === "button") {
    return (
      <button type={type} className={baseClasses} {...props}>
        {children}
      </button>
    );
  }
  
  return (
    <Link to={to} className={baseClasses} {...props}>
      {children}
    </Link>
  );
};

export default SaasyCtaButton;
