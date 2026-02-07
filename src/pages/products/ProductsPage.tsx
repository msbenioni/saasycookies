import React from 'react';
import { FileText, QrCode, Sparkles } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import SaasySoftButton from '../../components/SaasySoftButton';

interface ExternalProduct {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  external: true;
  url: string;
}

interface InternalProduct {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  external: false;
  path: string;
}

type Product = ExternalProduct | InternalProduct;

const ProductsPage: React.FC = () => {
  const products: Product[] = [
    {
      id: 'senseai',
      name: 'SenseAI',
      description: 'AI-powered journaling system. Type it, say it, scan it.',
      icon: <Sparkles className="h-6 w-6" />,
      color: '#b388ff',
      external: true,
      url: 'https://senseai.co.nz'
    },
    {
      id: 'invoice',
      name: 'Invoice Generator',
      description: 'Create professional invoices with GST and withholding tax calculations.',
      icon: <FileText className="h-6 w-6" />,
      color: '#A78BFA',
      external: false,
      path: '/products/invoice'
    },
    {
      id: 'qrcode',
      name: 'QR Code Generator',
      description: 'Create customizable QR codes with your branding for websites, business cards, and more.',
      icon: <QrCode className="h-6 w-6" />,
      color: '#60A5FA',
      external: false,
      path: '/products/qrcode'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2">
      <GlassCard className="p-8 md:p-12 shadow-none">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4 gradient-heading">Products</h1>
          <p className="text-white max-w-2xl mx-auto">
            AI-powered tools for journaling, invoicing, and QR code generation.
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
                  Try Now <span className="ml-1">→</span>
                </a>
              ) : (
                <SaasySoftButton to={product.path}>
                  Launch <span className="ml-1">→</span>
                </SaasySoftButton>
              )}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default ProductsPage;
