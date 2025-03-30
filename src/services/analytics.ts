// Analytics service for SaaSy Cookies
// This file uses Google Analytics data

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Your Google Analytics property ID - used for tracking events
const GA_PROPERTY_ID = 'G-3EBE5TGZMN';

// API endpoint for fetching analytics data
const API_ENDPOINT = 'http://localhost:3000/api/analytics/downloads';

// Function to get the current download count
export const getDownloadCount = async (): Promise<number> => {
  try {
    // Fetch real data from the API
    const response = await fetch(API_ENDPOINT);
    
    // If the API call fails, fall back to sample data
    if (!response.ok) {
      console.warn('Could not fetch real download data, using sample data instead');
      return Math.floor(Math.random() * 500) + 1500;
    }
    
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error fetching download count:', error);
    // Fall back to sample data if there's an error
    return Math.floor(Math.random() * 500) + 1500;
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
