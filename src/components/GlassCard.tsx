import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * GlassCard - A reusable glassmorphism card with neon glow border.
 * Usage: <GlassCard>...</GlassCard>
 */
const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', style = {} }) => {
  return (
    <div
      className={`glass-card ${className}`}
      style={style}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default GlassCard;
