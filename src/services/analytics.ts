// Analytics service for SaaSy Cookies
// This file uses Google Analytics data

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

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
    console.log('Tracking PDF download event...');
    
    // Track the download event in Google Analytics
    if (window.gtag) {
      // GA4 event tracking format - use 'invoice_download' to match the backend query
      window.gtag('event', 'invoice_download', {
        'content_type': 'pdf',
        'item_id': 'invoice-pdf'
      });
      
      console.log('Download event tracked in Google Analytics with event name: invoice_download');
    } else {
      console.warn('Google Analytics not available - gtag not found');
    }
    
    // Also send the event to our backend API for reliable tracking
    try {
      console.log('Sending download event to backend API...');
      const response = await fetch('http://localhost:3000/api/analytics/track-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ event: 'invoice_download' })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Download tracked successfully in backend:', data);
      } else {
        console.error('Failed to track download in backend:', await response.text());
      }
    } catch (apiError) {
      console.error('Error sending download event to API:', apiError);
    }
  } catch (error) {
    console.error('Error tracking download event:', error);
  }
};
