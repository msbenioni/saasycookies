// Server-side implementation for Google Analytics Data API
const express = require('express');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Create a Google Analytics Data API client using service account credentials
// The credentials should be stored in a secure environment variable or file
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// Your Google Analytics 4 property ID
const propertyId = 'G-3EBE5TGZMN';

// API endpoint to get download count
app.get('/api/analytics/downloads', async (req, res) => {
  try {
    // Query the Google Analytics Data API for invoice_download events
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
            value: 'invoice_download',
            matchType: 'EXACT',
          },
        },
      },
    });

    // Extract the count from the response
    let count = 0;
    if (response.rows && response.rows.length > 0) {
      count = parseInt(response.rows[0].metricValues[0].value, 10);
    }

    // Return the count as JSON
    res.json({ count });
  } catch (error) {
    console.error('Error fetching download count from Google Analytics:', error);
    res.status(500).json({ error: 'Failed to fetch download count' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Analytics API server running on port ${PORT}`);
});

// To run this server with PowerShell:
// 1. Install dependencies: npm install express @google-analytics/data cors dotenv
// 2. Set environment variable for credentials:
//    $env:GOOGLE_APPLICATION_CREDENTIALS="path\to\your-service-account-key.json"
// 3. Start the server: node server/analytics-api.js
