import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LucideIcon } from 'lucide-react';

interface ProductPageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  backLink?: string;
  backLabel?: string;
}

/**
 * ProductPageHeader - Shared header for product tool pages
 */
export const ProductPageHeader: React.FC<ProductPageHeaderProps> = ({
  icon: Icon,
  title,
  description,
  backLink = '/products',
  backLabel = 'Back to Products',
}) => {
  return (
    <div className="mb-8">
      <Link
        to={backLink}
        className="inline-flex items-center text-[#8b949e] hover:text-[#6affd8] mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> {backLabel}
      </Link>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6affd8] via-[#b388ff] to-[#ff6ad5] flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="text-[#8b949e]">{description}</p>
        </div>
      </div>
    </div>
  );
};

interface ProductPageContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ProductPageContainer - Shared container for product tool pages
 */
export const ProductPageContainer: React.FC<ProductPageContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`max-w-5xl mx-auto mb-12 ${className}`}>
      {children}
    </div>
  );
};

interface ProductContentCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ProductContentCard - Shared GlassCard wrapper for product content
 */
export const ProductContentCard: React.FC<ProductContentCardProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`bg-[#161b22] rounded-xl p-6 md:p-8 border border-[#30363d] ${className}`}>
      {children}
    </div>
  );
};
