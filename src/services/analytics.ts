// Analytics service for SaaSy Cookies
// This file uses Google Analytics data

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Get the API base URL based on environment
const getApiBaseUrl = () => {
  // In production, use relative URLs or environment variables if configured
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // For local development, use localhost
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:3000';
  }
  
  // For production, use the Netlify function URL
  return '/.netlify/functions/analytics-api';
};

// Determine if we're in production (Netlify) or development environment
const isProduction = window.location.hostname !== 'localhost';

// API endpoint for fetching analytics data
const API_BASE_URL = getApiBaseUrl();

// Function to get the current download count
export const getDownloadCount = async (): Promise<number> => {
  try {
    console.log('Fetching download count...');
    
    // Construct the appropriate URL based on environment
    const url = isProduction 
      ? `${API_BASE_URL}` 
      : `${API_BASE_URL}/api/analytics/downloads`;
    
    console.log('Fetching from URL:', url);
    
    // Fetch real data from the API
    const response = await fetch(url);
    
    // If the API call fails, fall back to sample data
    if (!response.ok) {
      console.warn('Could not fetch real download data, using sample data instead');
      return Math.floor(Math.random() * 500) + 1500;
    }
    
    const data = await response.json();
    console.log('Download count data received:', data);
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
      // Construct the appropriate URL based on environment
      const url = isProduction 
        ? `${API_BASE_URL}/track-download` 
        : `${API_BASE_URL}/api/analytics/track-download`;
      
      console.log('Sending download event to backend API at:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
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
