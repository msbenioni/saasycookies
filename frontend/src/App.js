import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import SenseAIPage from "./pages/seo/SenseAIPage";
import PacificMarketPage from "./pages/seo/PacificMarketPage";
import InvoicePage from "./pages/products/InvoicePage";
import QRCodePage from "./pages/products/QRCodePage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/senseai" element={<SenseAIPage />} />
          <Route path="/pacificmarket" element={<PacificMarketPage />} />
          <Route path="/tools/invoice-generator" element={<InvoicePage />} />
          <Route path="/tools/qr-generator" element={<QRCodePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
