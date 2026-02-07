import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, QrCode } from 'lucide-react';
import QRCodeGenerator from '../../components/QRCodeGenerator';

const QRCodePage: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/products" 
          className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
        </Link>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <QrCode className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-heading font-bold">QR Code Generator</h1>
          </div>
        </div>
        <p className="text-text-secondary">
          Create customizable QR codes for your website, business cards, and more. Add your brand colors, logo, and download in multiple formats.
        </p>
      </div>
      
      <div className="brand-card">
        <QRCodeGenerator />
      </div>
    </div>
  );
};

export default QRCodePage;
