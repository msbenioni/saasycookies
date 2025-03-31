import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PageViewData {
  page: string;
  views: number;
}

interface DemographicData {
  name: string;
  percentage: number;
}

interface DeviceData {
  type: string;
  percentage: number;
}

interface ToolUsageData {
  name: string;
  count: number;
}

interface AnalyticsData {
  visitors: {
    total: number;
    today: number;
    growth: number;
  };
  pageViews: {
    total: number;
    today: number;
    popular: PageViewData[];
  };
  tools: {
    usage: ToolUsageData[];
  };
  demographics: {
    countries: DemographicData[];
    devices: DeviceData[];
  };
}

// Colors for the charts
const COLORS = ['#00FFD1', '#FF3CAC', '#784BA0', '#2B86C5', '#FF9E7A'];

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

const AnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Construct the appropriate URL based on environment
      const url = `${API_BASE_URL}/api/analytics/overview`;
      console.log('Fetching analytics data from:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      const data = await response.json();
      console.log('Analytics data received:', data);
      
      setAnalyticsData(data);
      setLastUpdated(new Date().toLocaleString());
      setError(null);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError('Failed to load analytics data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAnalyticsData();
    
    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchAnalyticsData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading && !analyticsData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00FFD1] mx-auto mb-4"></div>
          <p className="text-gray-300">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error && !analyticsData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-900/30 border border-red-500 text-red-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button 
            onClick={fetchAnalyticsData}
            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00FFD1] to-[#FF3CAC] bg-clip-text text-transparent leading-relaxed pb-1">
        Public Analytics Dashboard
      </h1>
      
      <div className="mb-6 text-gray-300">
        <p>At SaaSy Cookies, we believe in transparency. This dashboard shows real-time statistics about our website visitors and tool usage.</p>
        <p className="mt-2 text-sm text-gray-400">Last updated: {lastUpdated}</p>
        <button 
          onClick={fetchAnalyticsData}
          className="mt-2 px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          Refresh Data
        </button>
      </div>
      
      {/* Visitor Stats */}
      {analyticsData && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-400">Total Visitors</h3>
            <p className="text-3xl font-bold text-white mt-2">{analyticsData.visitors.total.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-400">Today's Visitors</h3>
            <p className="text-3xl font-bold text-white mt-2">{analyticsData.visitors.today.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-400">Growth Rate</h3>
            <p className="text-3xl font-bold text-[#00FFD1] mt-2">+{analyticsData.visitors.growth}%</p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Page Views */}
        {analyticsData && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Popular Pages</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.pageViews.popular}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="page" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="views" fill="#00FFD1" name="Views" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {/* Geographic Distribution */}
        {analyticsData && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Geographic Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.demographics.countries}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percentage }: { name: string; percentage: number }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {analyticsData.demographics.countries.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {/* Device Distribution */}
        {analyticsData && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Device Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.demographics.devices}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ type, percentage }: { type: string; percentage: number }) => `${type}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                    nameKey="type"
                  >
                    {analyticsData.demographics.devices.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      
      {/* Tool Usage */}
      {analyticsData && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
          <h2 className="text-xl font-semibold mb-4 text-white">Tool Usage</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analyticsData.tools.usage}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="count" fill="#FF3CAC" name="Usage Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      <div className="text-center text-gray-400 text-sm mb-8">
        <p>This data is collected using Google Analytics with IP anonymization enabled.</p>
        <p>We respect your privacy. Learn more in our <a href="/privacy" className="text-[#00FFD1] hover:underline">Privacy Policy</a>.</p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
