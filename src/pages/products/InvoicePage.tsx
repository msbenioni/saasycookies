import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import InvoiceForm from '../../components/InvoiceForm';
import { CompanyDetails, InvoiceDetails, StyleOptions } from '../../types';
import GlassCard from '../../components/GlassCard';

interface InvoicePageProps {
  onGenerate: (data: {
    company: CompanyDetails;
    invoice: InvoiceDetails;
    style: StyleOptions;
  }) => void;
}

const InvoicePage: React.FC<InvoicePageProps> = ({ onGenerate }) => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/products" 
          className="inline-flex items-center text-[#b388ff] hover:text-[#6affd8] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6affd8] via-[#b388ff] to-[#ff6ad5] flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold heading-primary">Invoice Generator</h1>
            <p className="text-[#8b949e]">
              Create professional invoices with GST and withholding tax calculations.
            </p>
          </div>
        </div>
      </div>
      
      {/* Form Container */}
      <GlassCard className="p-6 md:p-8 shadow-none">
        <InvoiceForm onGenerate={onGenerate} />
      </GlassCard>
    </div>
  );
};

export default InvoicePage;
