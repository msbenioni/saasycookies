import React from 'react';
import { QrCode } from 'lucide-react';
import QRCodeGenerator from '../../components/QRCodeGenerator';
import { ProductPageContainer, ProductPageHeader, ProductContentCard } from '../../components/ProductPageLayout';

const QRCodePage: React.FC = () => {
  return (
    <ProductPageContainer>
      <ProductPageHeader
        icon={QrCode}
        title="QR Code Generator"
        description="Create customizable QR codes with your brand colors and logo."
      />
      
      <ProductContentCard>
        <QRCodeGenerator />
      </ProductContentCard>
    </ProductPageContainer>
  );
};

export default QRCodePage;
