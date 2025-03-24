import React from 'react';
import { FileText } from 'lucide-react';
import InvoiceForm from './components/InvoiceForm';
import { generatePDF } from './utils/generatePDF';
import { CompanyDetails, InvoiceDetails, StyleOptions } from './types';

function App() {
  const handleGenerateInvoice = (data: {
    company: CompanyDetails;
    invoice: InvoiceDetails;
    style: StyleOptions;
  }) => {
    generatePDF(data.company, data.invoice, data.style);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">NZ Invoice Generator</h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-600 mb-6">
            Generate professional invoices for your business. Include GST and withholding tax calculations,
            customize the layout, and download as PDF.
          </p>
          
          <InvoiceForm onGenerate={handleGenerateInvoice} />
        </div>
      </div>
    </div>
  );
}

export default App;