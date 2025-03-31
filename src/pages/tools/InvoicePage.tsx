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
          className="inline-flex items-center text-[#00FFD1] hover:text-[#00FFD1]/80 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tools
        </Link>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-[#00FFD1]" />
            <h1 className="text-3xl font-bold">NZ Invoice Generator</h1>
          </div>
        </div>
        <p className="text-gray-400">
          Generate professional invoices for your business. Include GST and withholding tax calculations,
          customize the layout, and download as PDF.
        </p>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <InvoiceForm onGenerate={onGenerate} />
      </div>
    </div>
  );
};

export default InvoicePage;
