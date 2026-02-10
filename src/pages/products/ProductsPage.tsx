import React from 'react';
import GlassCard from '../../components/GlassCard';

interface Product {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  external: true;
  url: string;
}

const ProductsPage: React.FC = () => {
  const products: Product[] = [
    {
      id: 'senseai',
      name: 'SenseAI',
      description: 'AI-powered journaling system. Type it, say it, scan it.',
      icon: <img src="/senseai_logo.png" alt="SenseAI" className="h-full w-full object-cover rounded-lg" />,
      color: '#b388ff',
      external: true,
      url: 'https://senseai.co.nz'
    },
    {
      id: 'pacificmarket',
      name: 'Pacific Market',
      description: 'Global directory for Pacific businesses, creators, and cultural practitioners. Made in the Pacific, shared with the world.',
      icon: <img src="/pacificmarket_logo.png" alt="Pacific Market" className="h-full w-full object-cover rounded-lg" />,
      color: '#10b981',
      external: true,
      url: 'https://pacificmarket.co.nz'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2">
      <GlassCard className="p-8 md:p-12 shadow-none">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4 gradient-heading">Products</h1>
          <p className="text-white max-w-2xl mx-auto">
            Our flagship platforms designed to empower communities and businesses.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="glass-card p-6 flex flex-col items-center text-center shadow-none border border-[var(--glass-border)] transition-colors duration-300"
              style={{ borderColor: product.color }}
            >
              <div
                className="h-12 w-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${product.color}20` }}
              >
                <div style={{ color: product.color }}>{product.icon}</div>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2 heading-secondary" style={{ color: product.color }}>{product.name}</h3>
              <p className="text-white mb-4">
                {product.description}
              </p>
              {product.external ? (
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="saasy-button-soft-cta px-8 py-4 text-lg font-medium rounded-md"
                >
                  Visit <span className="ml-1">→</span>
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default ProductsPage;
