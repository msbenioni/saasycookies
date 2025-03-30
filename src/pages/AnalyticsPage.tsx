import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data - this would be replaced with actual data from your Google Analytics API
const sampleData = {
  pageViews: [
    { name: 'Home', views: 1240 },
    { name: 'Invoice Tool', views: 890 },
    { name: 'About', views: 320 },
    { name: 'Terms', views: 110 },
    { name: 'Privacy', views: 95 },
  ],
  demographics: [
    { name: 'New Zealand', value: 65 },
    { name: 'Australia', value: 15 },
    { name: 'United States', value: 10 },
    { name: 'United Kingdom', value: 5 },
    { name: 'Other', value: 5 },
  ],
  ageGroups: [
    { name: '18-24', value: 10 },
    { name: '25-34', value: 35 },
    { name: '35-44', value: 30 },
    { name: '45-54', value: 15 },
    { name: '55+', value: 10 },
  ],
  gender: [
    { name: 'Male', value: 55 },
    { name: 'Female', value: 42 },
    { name: 'Other', value: 3 },
  ],
  toolUsage: [
    { name: 'Invoice Generator', value: 75 },
    { name: 'Time Tracker', value: 15 },
    { name: 'Tax Calculator', value: 10 },
  ],
};

// Colors for the charts
const COLORS = ['#00FFD1', '#FF3CAC', '#784BA0', '#2B86C5', '#FF9E7A'];

const AnalyticsPage: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState<string>('');
  
  useEffect(() => {
    // This would be replaced with actual data fetching from Google Analytics API
    const now = new Date();
    setLastUpdated(now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString());
    
    // In a real implementation, you would fetch data from Google Analytics here
    // Example:
    // fetchGoogleAnalyticsData().then(data => {
    //   setPageViews(data.pageViews);
    //   setDemographics(data.demographics);
    //   // etc.
    // });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00FFD1] to-[#FF3CAC] bg-clip-text text-transparent leading-relaxed pb-1">
        Public Analytics Dashboard
      </h1>
      
      <div className="mb-6 text-gray-300">
        <p>At SaaSy Cookies, we believe in transparency. This dashboard shows real-time statistics about our website visitors and tool usage.</p>
        <p className="mt-2 text-sm text-gray-400">Last updated: {lastUpdated}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Page Views */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Page Views</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sampleData.pageViews}
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
                <Bar dataKey="views" fill="#00FFD1" name="Views" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Geographic Distribution */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Geographic Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sampleData.demographics}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sampleData.demographics.map((entry, index) => (
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
        
        {/* Age Distribution */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Age Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sampleData.ageGroups}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sampleData.ageGroups.map((entry, index) => (
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
        
        {/* Gender Distribution */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Gender Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sampleData.gender}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sampleData.gender.map((entry, index) => (
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
      </div>
      
      {/* Tool Usage */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
        <h2 className="text-xl font-semibold mb-4 text-white">Tool Usage</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sampleData.toolUsage}
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
              <Bar dataKey="value" fill="#FF3CAC" name="Usage %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">About This Dashboard</h2>
        <div className="text-gray-300">
          <p>This dashboard displays anonymized data collected through Google Analytics. We respect your privacy and do not collect personally identifiable information.</p>
          <p className="mt-2">The data shown here is updated daily and represents aggregate statistics about our visitors and how they use our tools.</p>
          <p className="mt-4 text-sm text-gray-400">Note: This is a public dashboard showing real usage statistics. No personal data is ever shared.</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
