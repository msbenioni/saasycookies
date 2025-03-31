# Netlify Deployment Guide for SaaSy Cookies Invoice Generator

This guide will help you properly deploy the SaaSy Cookies Invoice Generator to Netlify with working analytics.

## Prerequisites

- A Netlify account
- Your Google Analytics credentials
- Your codebase ready for deployment

## Deployment Steps

### 1. Install Netlify CLI (if not already installed)

```powershell
npm install -g netlify-cli
```

### 2. Login to Netlify

```powershell
netlify login
```

### 3. Initialize Netlify in your project (if not already done)

```powershell
netlify init
```

### 4. Set up Environment Variables in Netlify

In the Netlify dashboard for your site:

1. Go to **Site settings** > **Build & deploy** > **Environment variables**
2. Add the following environment variables:
   - `GOOGLE_ANALYTICS_PROPERTY_ID`: `483859243`
   - `REACT_APP_GA_MEASUREMENT_ID`: `G-3EBE5TGZMN`
   - `USE_SIMULATED_DATA`: `true` (set to `false` when you have proper Google Analytics permissions)
   - `GOOGLE_CLIENT_EMAIL`: Your Google service account email
   - `GOOGLE_PRIVATE_KEY`: Your Google service account private key (make sure to include all newlines)

### 5. Deploy to Netlify

```powershell
npm run netlify:build
netlify deploy --prod
```

## Troubleshooting

### Analytics Not Working

If your analytics are not working in production:

1. **Check Environment Variables**: Ensure all environment variables are correctly set in Netlify.
2. **Check Network Requests**: Use browser developer tools to check for any errors in network requests to your analytics endpoints.
3. **Enable Simulated Data**: If Google Analytics integration is failing, set `USE_SIMULATED_DATA` to `true` as a temporary solution.
4. **Check Function Logs**: In the Netlify dashboard, go to **Functions** to view logs for your serverless functions.

### Google Analytics Service Account Setup

To properly set up the Google Analytics service account:

1. Go to the Google Cloud Console
2. Create a service account with appropriate permissions
3. Generate a JSON key for the service account
4. Extract the `client_email` and `private_key` from the JSON file
5. Add these values to your Netlify environment variables

## Testing Locally

To test the production setup locally:

```powershell
npm run netlify:dev
```

This will run your application with the Netlify functions locally, simulating the production environment.
