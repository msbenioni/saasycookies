// Analytics service for SaaSy Cookies
// This file uses Google Analytics data

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Your Google Analytics property ID - used for tracking events
const GA_PROPERTY_ID = 'G-3EBE5TGZMN';

// Function to get the current download count
export const getDownloadCount = async (): Promise<number> => {
  try {
    // For development/demo purposes, simulate a download count
    // Comment this out when you're ready to use real data
    const mockResponse = { count: Math.floor(Math.random() * 500) + 1500 };
    return mockResponse.count;
    
    // REAL DATA IMPLEMENTATION:
    // This requires setting up a proxy server to handle authentication and CORS
    // 1. Create a simple API endpoint on your server (e.g., /api/analytics/downloads)
    // 2. On your server, use the Google Analytics Data API with service account auth
    // 3. Call this endpoint from your client-side code
    
    // Client-side implementation:
    // const response = await fetch('/api/analytics/downloads');
    // const data = await response.json();
    // return data.count;
  } catch (error) {
    console.error('Error fetching download count:', error);
    return 0;
  }
};

// Function to track a download event in Google Analytics
export const incrementDownloadCount = async (): Promise<void> => {
  try {
    // Track the download event in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'invoice_download', {
        'event_category': 'engagement',
        'event_label': 'Invoice PDF',
        'send_to': GA_PROPERTY_ID
      });
      
      console.log('Download event tracked in Google Analytics');
    }
  } catch (error) {
    console.error('Error tracking download event:', error);
  }
};
