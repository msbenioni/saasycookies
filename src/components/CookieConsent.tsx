import React, { useState, useEffect } from 'react';

// Define the window interface to include gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
    
    // Enable Google Analytics tracking
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowBanner(false);
    
    // Disable Google Analytics tracking
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 text-gray-300">
            <p className="text-sm">
              We use cookies to analyze site usage and improve your experience. 
              By continuing to use our site, you consent to our use of cookies in accordance with our{' '}
              <a href="/privacy" className="text-[#00FFD1] hover:underline">
                Privacy Policy
              </a>.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors duration-300"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-gradient-to-r from-[#00FFD1] to-[#00FFD1]/70 rounded-md hover:from-[#00FFD1]/90 hover:to-[#00FFD1]/60 transition-colors duration-300"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
