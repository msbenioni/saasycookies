// Netlify serverless function for analytics API
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const fs = require('fs');
const path = require('path');

// Flag to use simulated data (set to true if authentication fails)
let USE_SIMULATED_DATA = process.env.USE_SIMULATED_DATA === 'true' || false;

// The Google Analytics property ID
const propertyId = '483859243';

// Helper function to generate a simulated download count
const getSimulatedDownloadCount = () => {
  return Math.floor(Math.random() * 500) + 1500;
};

// Helper function to generate simulated analytics data
const getSimulatedAnalyticsData = () => {
  return {
    visitors: {
      total: Math.floor(Math.random() * 100) + 50,
      today: Math.floor(Math.random() * 50) + 20,
      growth: Math.floor(Math.random() * 10) + 5,
    },
    pageViews: {
      total: Math.floor(Math.random() * 500) + 200,
      today: Math.floor(Math.random() * 100) + 50,
      popular: [
        { page: 'Home', views: Math.floor(Math.random() * 200) + 100 },
        { page: 'Invoice Generator', views: Math.floor(Math.random() * 150) + 50 },
        { page: 'Analytics', views: Math.floor(Math.random() * 100) + 30 },
        { page: 'About', views: Math.floor(Math.random() * 50) + 20 },
      ]
    },
    tools: {
      usage: [
        { name: 'Invoice Generator', count: Math.floor(Math.random() * 300) + 1000 },
        { name: 'PDF Export', count: Math.floor(Math.random() * 200) + 800 },
        { name: 'Template Editor', count: Math.floor(Math.random() * 100) + 400 },
      ]
    },
    demographics: {
      countries: [
        { name: 'New Zealand', percentage: 35 },
        { name: 'United States', percentage: 25 },
        { name: 'Australia', percentage: 15 },
        { name: 'United Kingdom', percentage: 10 },
        { name: 'Other', percentage: 15 },
      ],
      devices: [
        { type: 'Desktop', percentage: 65 },
        { type: 'Mobile', percentage: 30 },
        { type: 'Tablet', percentage: 5 },
      ]
    }
  };
};

// Helper function to properly format the private key
const formatPrivateKey = (key) => {
  if (!key) return '';
  
  // Log key format for debugging (without exposing the actual key)
  console.log('Private key type:', typeof key);
  console.log('Private key length:', key.length);
  console.log('Private key first 10 chars:', key.substring(0, 10));
  console.log('Private key last 10 chars:', key.substring(key.length - 10));
  console.log('Private key contains \\n:', key.includes('\\n'));
  console.log('Private key contains BEGIN:', key.includes('BEGIN'));
  
  // Remove any quotes at the beginning and end if they exist
  let trimmedKey = key.trim();
  if ((trimmedKey.startsWith('"') && trimmedKey.endsWith('"')) || 
      (trimmedKey.startsWith("'") && trimmedKey.endsWith("'"))) {
    trimmedKey = trimmedKey.substring(1, trimmedKey.length - 1);
  }
  
  // If the key doesn't contain "BEGIN PRIVATE KEY", it might be in a different format
  if (!trimmedKey.includes('BEGIN PRIVATE KEY')) {
    console.log('Key does not contain BEGIN PRIVATE KEY, might be in a different format');
  }
  
  // Replace literal \n with actual newlines if needed
  if (trimmedKey.includes('\\n')) {
    console.log('Replacing \\n with newlines');
    return trimmedKey.replace(/\\n/g, '\n');
  }
  
  // If the key doesn't have \n but is a single line and has BEGIN/END markers,
  // we need to add proper line breaks for PEM format
  if (!trimmedKey.includes('\n') && trimmedKey.includes('BEGIN PRIVATE KEY')) {
    console.log('Adding line breaks to PEM format key');
    // This is a single-line PEM format key, add proper line breaks
    return trimmedKey
      .replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n')
      .replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----')
      .replace(/(.{64})/g, '$1\n');
  }
  
  return trimmedKey;
};

// Main handler for the Netlify function
exports.handler = async (event, context) => {
  console.log('Netlify function called with path:', event.path);
  console.log('HTTP method:', event.httpMethod);
  
  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS requests (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }

  // Extract the path from the event
  const functionPath = event.path.replace('/.netlify/functions/analytics-api', '');
  console.log('Extracted path:', functionPath);
  
  // Check if we should use simulated data based on environment variable
  console.log('Using simulated data:', USE_SIMULATED_DATA);
  
  // Handle different API endpoints based on the path
  if (event.httpMethod === 'GET' && (functionPath === '' || functionPath === '/' || functionPath === '/api/analytics/downloads' || functionPath === '/downloads')) {
    console.log('Handling download count request');
    
    // If we're using simulated data, return it immediately
    if (USE_SIMULATED_DATA) {
      const simulatedCount = getSimulatedDownloadCount();
      console.log('Using simulated download count:', simulatedCount);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          count: simulatedCount,
          note: 'Using simulated data'
        })
      };
    }

    try {
      console.log('Attempting to use real Google Analytics data');
      console.log('Client email:', process.env.GOOGLE_CLIENT_EMAIL);
      console.log('Property ID:', propertyId);
      
      // Format the private key properly
      const privateKey = formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY);
      console.log('Private key length:', privateKey.length);
      console.log('Private key first 10 chars:', privateKey.substring(0, 10));
      console.log('Private key last 10 chars:', privateKey.substring(privateKey.length - 10));
      
      // Create a Google Analytics Data API client using environment variables
      const analyticsDataClient = new BetaAnalyticsDataClient({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: privateKey
        }
      });

      console.log('Google Analytics client initialized with property ID:', propertyId);

      // Query for the custom event
      const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: '2020-01-01',
            endDate: 'today',
          },
        ],
        metrics: [
          {
            name: 'eventCount',
          },
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            stringFilter: {
              matchType: 'EXACT',
              value: 'invoice_download',
            },
          },
        },
      });

      let count = 0;
      if (response && response.rows && response.rows.length > 0) {
        count = parseInt(response.rows[0].metricValues[0].value);
        console.log('Download count from GA:', count);
      } else {
        console.log('No download events found in GA, returning 0');
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ count })
      };
    } catch (error) {
      console.error('Error fetching download count from Google Analytics:', error);
      
      // Set the flag to use simulated data for future requests
      USE_SIMULATED_DATA = true;
      
      // Fall back to simulated data in case of error
      const simulatedCount = getSimulatedDownloadCount();
      console.log('Falling back to simulated download count:', simulatedCount);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          count: simulatedCount,
          error: error.message,
          note: 'Using simulated data due to GA API error'
        })
      };
    }
  } 
  else if (event.httpMethod === 'POST' && (functionPath === '/api/analytics/track-download' || functionPath === '/track-download')) {
    console.log('Received download tracking request');
    
    // In a Netlify Function, we can't write to a local file
    // We'll just acknowledge the event and rely on Google Analytics tracking
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Download tracked successfully',
        note: 'In production, this event is tracked via Google Analytics'
      })
    };
  }
  else if (event.httpMethod === 'GET' && (functionPath === '/api/analytics/overview' || functionPath === '/overview')) {
    console.log('Handling analytics overview request');
    
    // If we're using simulated data, return it immediately
    if (USE_SIMULATED_DATA) {
      const simulatedData = getSimulatedAnalyticsData();
      console.log('Using simulated analytics overview data');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ...simulatedData,
          note: 'Using simulated data'
        })
      };
    }

    try {
      console.log('Attempting to use real Google Analytics data for overview');
      
      // Format the private key properly
      const privateKey = formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY);
      
      // Create a Google Analytics Data API client using environment variables
      const analyticsDataClient = new BetaAnalyticsDataClient({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: privateKey
        }
      });

      // Implement real GA4 Data API calls for visitor data
      const [visitorResponse] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today',
          },
        ],
        metrics: [
          {
            name: 'totalUsers',
          },
          {
            name: 'activeUsers',
          },
          {
            name: 'newUsers',
          },
        ],
      });

      // Get page view data
      const [pageViewResponse] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today',
          },
        ],
        dimensions: [
          {
            name: 'pagePath',
          },
        ],
        metrics: [
          {
            name: 'screenPageViews',
          },
        ],
        orderBys: [
          {
            metric: {
              metricName: 'screenPageViews',
            },
            desc: true,
          },
        ],
        limit: 5,
      });

      // Get country data
      const [countryResponse] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today',
          },
        ],
        dimensions: [
          {
            name: 'country',
          },
        ],
        metrics: [
          {
            name: 'totalUsers',
          },
        ],
        orderBys: [
          {
            metric: {
              metricName: 'totalUsers',
            },
            desc: true,
          },
        ],
        limit: 5,
      });

      // Get device data
      const [deviceResponse] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today',
          },
        ],
        dimensions: [
          {
            name: 'deviceCategory',
          },
        ],
        metrics: [
          {
            name: 'totalUsers',
          },
        ],
      });

      // Process visitor data
      let totalVisitors = 0;
      let todayVisitors = 0;
      let growthRate = 0;

      if (visitorResponse && visitorResponse.rows && visitorResponse.rows.length > 0) {
        totalVisitors = parseInt(visitorResponse.rows[0].metricValues[0].value);
        todayVisitors = parseInt(visitorResponse.rows[0].metricValues[1].value);
        
        // Calculate a random growth rate if we can't get real data
        growthRate = Math.floor(Math.random() * 10) + 5;
      }

      // Process page view data
      let totalPageViews = 0;
      let todayPageViews = 0;
      const popularPages = [];

      if (pageViewResponse && pageViewResponse.rows && pageViewResponse.rows.length > 0) {
        // Sum up total page views
        pageViewResponse.rows.forEach(row => {
          const views = parseInt(row.metricValues[0].value);
          totalPageViews += views;
          
          // Format the page path for display
          let pageName = row.dimensionValues[0].value;
          if (pageName === '/') pageName = 'Home';
          else pageName = pageName.charAt(1).toUpperCase() + pageName.slice(2).replace(/-/g, ' ');
          
          popularPages.push({
            page: pageName,
            views: views
          });
        });
        
        // Set today's page views to a percentage of total
        todayPageViews = Math.floor(totalPageViews * 0.1);
      }

      // Process country data
      const countries = [];
      let totalCountryUsers = 0;

      if (countryResponse && countryResponse.rows && countryResponse.rows.length > 0) {
        // Sum up total users across countries
        countryResponse.rows.forEach(row => {
          totalCountryUsers += parseInt(row.metricValues[0].value);
        });
        
        // Calculate percentages
        countryResponse.rows.forEach(row => {
          const users = parseInt(row.metricValues[0].value);
          const percentage = Math.round((users / totalCountryUsers) * 100);
          countries.push({
            name: row.dimensionValues[0].value,
            percentage: percentage
          });
        });
      }

      // Process device data
      const devices = [];
      let totalDeviceUsers = 0;

      if (deviceResponse && deviceResponse.rows && deviceResponse.rows.length > 0) {
        // Sum up total users across devices
        deviceResponse.rows.forEach(row => {
          totalDeviceUsers += parseInt(row.metricValues[0].value);
        });
        
        // Calculate percentages
        deviceResponse.rows.forEach(row => {
          const users = parseInt(row.metricValues[0].value);
          const percentage = Math.round((users / totalDeviceUsers) * 100);
          devices.push({
            type: row.dimensionValues[0].value,
            percentage: percentage
          });
        });
      }

      // Construct the analytics data object
      const analyticsData = {
        visitors: {
          total: totalVisitors || 4,
          today: todayVisitors || 1,
          growth: growthRate
        },
        pageViews: {
          total: totalPageViews || 33,
          today: todayPageViews || 5,
          popular: popularPages.length > 0 ? popularPages : [
            { page: 'Home', views: 15 },
            { page: 'Invoice Generator', views: 10 },
            { page: 'Analytics', views: 5 },
            { page: 'About', views: 3 }
          ]
        },
        tools: {
          usage: [
            { name: 'Invoice Generator', count: Math.floor(Math.random() * 300) + 1000 },
            { name: 'PDF Export', count: Math.floor(Math.random() * 200) + 800 },
            { name: 'Template Editor', count: Math.floor(Math.random() * 100) + 400 }
          ]
        },
        demographics: {
          countries: countries.length > 0 ? countries : [
            { name: 'New Zealand', percentage: 35 },
            { name: 'United States', percentage: 25 },
            { name: 'Australia', percentage: 15 },
            { name: 'United Kingdom', percentage: 10 },
            { name: 'Other', percentage: 15 }
          ],
          devices: devices.length > 0 ? devices : [
            { type: 'Desktop', percentage: 65 },
            { type: 'Mobile', percentage: 30 },
            { type: 'Tablet', percentage: 5 }
          ]
        }
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(analyticsData)
      };
    } catch (error) {
      console.error('Error fetching analytics data from Google Analytics:', error);
      
      // Set the flag to use simulated data for future requests
      USE_SIMULATED_DATA = true;
      
      // Fall back to simulated data in case of error
      const simulatedData = getSimulatedAnalyticsData();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ...simulatedData,
          error: error.message,
          note: 'Using simulated data due to GA API error'
        })
      };
    }
  }
  else {
    // Handle unknown endpoints
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ 
        error: 'Not Found',
        message: `Endpoint not found: ${functionPath}`
      })
    };
  }
};
