import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { generatePDF } from './utils/generatePDF';
import { CompanyDetails, InvoiceDetails, StyleOptions } from './types';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import InvoicePage from './pages/products/InvoicePage';
import QRCodePage from './pages/products/QRCodePage';
import SenseAIPage from './pages/seo/SenseAIPage';
import PacificMarketPage from './pages/seo/PacificMarketPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';

function App() {
  const handleGenerateInvoice = (data: {
    company: CompanyDetails;
    invoice: InvoiceDetails;
    style: StyleOptions;
  }) => {
    generatePDF(data.invoice, data.company, data.style);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="senseai" element={<SenseAIPage />} />
          <Route path="pacificmarket" element={<PacificMarketPage />} />
          <Route path="tools/invoice-generator" element={<InvoicePage onGenerate={handleGenerateInvoice} />} />
          <Route path="tools/qr-generator" element={<QRCodePage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;