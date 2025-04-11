import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import InvoiceForm from '../../components/InvoiceForm';
import { CompanyDetails, InvoiceDetails, StyleOptions } from '../../types';

interface InvoicePageProps {
  onGenerate: (data: {
    company: CompanyDetails;
    invoice: InvoiceDetails;
    style: StyleOptions;
  }) => void;
}

const InvoicePage: React.FC<InvoicePageProps> = ({ onGenerate }) => {
  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/tools" 
          className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tools
        </Link>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-heading font-bold">NZ Invoice Generator</h1>
          </div>
        </div>
        <p className="text-text-secondary">
          Generate professional invoices for your business. Include GST and withholding tax calculations,
          customize the layout, and download as PDF.
        </p>
      </div>
      
      <div className="brand-card">
        <InvoiceForm onGenerate={onGenerate} />
      </div>
    </div>
  );
};

export default InvoicePage;
