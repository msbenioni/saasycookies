import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from "./components/ErrorBoundary";
import SEO from "./components/SEO";
import { Toaster } from "./components/Toast";
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
import RequestAISaaSBriefPage from "./pages/RequestAISaaSBriefPage";
import ProjectBriefThankYouPage from "./pages/ProjectBriefThankYouPage";
import PricingPage from "./pages/PricingPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import NotFoundPage from "./pages/NotFoundPage";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnMount from "./components/ScrollToTopOnMount";
import { useAnalytics } from "./hooks/useAnalytics";
import { site } from "./config/site";

function AppContent() {
  const location = useLocation();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    // Track page views
    trackPageView(location.pathname);
  }, [location.pathname, trackPageView]);

  useEffect(() => {
    // Disable browser scroll restoration
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <>
      <ScrollToTopOnMount />
      <SEO />
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
          <Route path="/services/ai-saas" element={<RequestAISaaSBriefPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
          <Route path="/project-brief-thank-you" element={<ProjectBriefThankYouPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ScrollToTop />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
