import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import SenseAIPage from "./pages/seo/SenseAIPage";
import PacificMarketPage from "./pages/seo/PacificMarketPage";
import InvoicePage from "./pages/products/InvoicePage";
import QRCodePage from "./pages/products/QRCodePage";
import DigitalCardPage from "./pages/products/DigitalCardPage";
import DigitalCardPublicPage from "./pages/products/DigitalCardPublicPage";
import DigitalCardEditPage from "./pages/products/DigitalCardEditPage";
import DigitalCardSuccessPage from "./pages/products/DigitalCardSuccessPage";
import DigitalCardCancelPage from "./pages/products/DigitalCardCancelPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import RequestWebsiteQuotePage from "./pages/RequestWebsiteQuotePage";
import QuoteThankYouPage from "./pages/QuoteThankYouPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  useEffect(() => {
    // Disable browser scroll restoration
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/senseai" element={<SenseAIPage />} />
          <Route path="/pacificmarket" element={<PacificMarketPage />} />
          <Route path="/tools/invoice-generator" element={<InvoicePage />} />
          <Route path="/tools/qr-generator" element={<QRCodePage />} />
          <Route path="/tools/digital-card" element={<DigitalCardPage />} />
          <Route path="/tools/digital-card/success" element={<DigitalCardSuccessPage />} />
          <Route path="/tools/digital-card/cancel" element={<DigitalCardCancelPage />} />
          <Route path="/card/:slug" element={<DigitalCardPublicPage />} />
          <Route path="/edit/:token" element={<DigitalCardEditPage />} />
          <Route path="/services/websites" element={<RequestWebsiteQuotePage />} />
          <Route path="/quote-thank-you" element={<QuoteThankYouPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
