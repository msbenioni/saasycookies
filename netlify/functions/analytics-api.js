// Netlify serverless function for analytics API
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const fs = require('fs');
const path = require('path');

// Flag to use simulated data (set to false to use real Google Analytics data)
const USE_SIMULATED_DATA = false;

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
  const useSimulatedData = process.env.USE_SIMULATED_DATA === 'true' || USE_SIMULATED_DATA;
  
  // Handle different API endpoints based on the path
  if (event.httpMethod === 'GET' && (functionPath === '' || functionPath === '/' || functionPath === '/api/analytics/downloads' || functionPath === '/downloads')) {
    console.log('Handling download count request');
    
    // If we're using simulated data, return it immediately
    if (useSimulatedData) {
      const simulatedCount = getSimulatedDownloadCount();
      console.log('Using simulated download count:', simulatedCount);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ count: simulatedCount })
      };
    }

    try {
      console.log('Attempting to use real Google Analytics data');
      
      // Create a Google Analytics Data API client using environment variables
      const analyticsDataClient = new BetaAnalyticsDataClient({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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
    if (useSimulatedData) {
      const simulatedData = getSimulatedAnalyticsData();
      console.log('Using simulated analytics overview data');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(simulatedData)
      };
    }

    try {
      console.log('Attempting to use real Google Analytics data for overview');
      
      // Create a Google Analytics Data API client using environment variables
      const analyticsDataClient = new BetaAnalyticsDataClient({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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
        limit: 10,
      });

      // Get download count
      const [downloadResponse] = await analyticsDataClient.runReport({
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

      // Process visitor data
      let totalUsers = 0;
      let newUsers = 0;
      if (visitorResponse && visitorResponse.rows && visitorResponse.rows.length > 0) {
        totalUsers = parseInt(visitorResponse.rows[0].metricValues[0].value);
        newUsers = parseInt(visitorResponse.rows[0].metricValues[1].value);
      }

      // Process page view data
      let totalPageViews = 0;
      const pageViews = [];
      if (pageViewResponse && pageViewResponse.rows) {
        pageViewResponse.rows.forEach(row => {
          const page = row.dimensionValues[0].value;
          const views = parseInt(row.metricValues[0].value);
          totalPageViews += views;
          pageViews.push({ page, views });
        });
      }

      // Process download data
      let downloadCount = 0;
      if (downloadResponse && downloadResponse.rows && downloadResponse.rows.length > 0) {
        downloadCount = parseInt(downloadResponse.rows[0].metricValues[0].value);
      }

      // Process country data
      const countries = [];
      if (countryResponse && countryResponse.rows) {
        countryResponse.rows.forEach(row => {
          const country = row.dimensionValues[0].value;
          const users = parseInt(row.metricValues[0].value);
          countries.push({ country, users });
        });
      }

      // Construct the response data
      const analyticsData = {
        visitors: {
          total: totalUsers,
          newUsers: newUsers,
          returningUsers: totalUsers - newUsers,
        },
        pageViews: {
          total: totalPageViews,
          perPage: pageViews,
        },
        downloads: {
          total: downloadCount,
        },
        geography: {
          countries: countries,
        }
      };

      console.log('Successfully retrieved analytics overview data');
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(analyticsData)
      };
    } catch (error) {
      console.error('Error fetching analytics overview data:', error);
      
      // Return simulated data in case of error
      const fallbackData = getSimulatedAnalyticsData();
      console.log('Falling back to simulated analytics data');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ...fallbackData,
          error: error.message,
          note: 'Using simulated data due to GA API error'
        })
      };
    }
  }
  else {
    // Handle unknown routes
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not Found' })
    };
  }
};
