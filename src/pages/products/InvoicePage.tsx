import React from 'react';
import { FileText } from 'lucide-react';
import InvoiceForm from '../../components/InvoiceForm';
import { CompanyDetails, InvoiceDetails, StyleOptions } from '../../types';
import { ProductPageContainer, ProductPageHeader, ProductContentCard } from '../../components/ProductPageLayout';

interface InvoicePageProps {
  onGenerate: (data: {
    company: CompanyDetails;
    invoice: InvoiceDetails;
    style: StyleOptions;
  }) => void;
}

const InvoicePage: React.FC<InvoicePageProps> = ({ onGenerate }) => {
  return (
    <ProductPageContainer>
      <ProductPageHeader
        icon={FileText}
        title="Invoice Generator"
        description="Create professional invoices with GST and withholding tax calculations."
      />
      
      <ProductContentCard>
        <InvoiceForm onGenerate={onGenerate} />
      </ProductContentCard>
    </ProductPageContainer>
  );
};

export default InvoicePage;
