import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CreditCard } from 'lucide-react';
import { createSparkles } from '../utils/animationUtils';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-14 px-4 fade-in-up">
        <h1 className="text-5xl font-bold mb-4 text-transparent" style={{ 
          background: 'linear-gradient(to right, #00FFD1, #FF3CAC)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          paddingBottom: '4px',
          lineHeight: '1.3'
        }}>
          SaaSy Cookies
        </h1>
        <p className="text-2xl text-gray-300 mb-8">Sweet solutions for smart work.</p>
        <p className="max-w-3xl mx-auto text-gray-400 mb-8 text-lg">
          A growing collection of online tools built for New Zealand sole traders, contractors, and creative freelancers.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/tools"
            className="sparkle-btn px-6 py-3 bg-gradient-to-r from-[#00FFD1] via-[#00FFD1] to-[#00FFD1]/70 text-gray-900 font-medium rounded-lg hover:from-[#00FFD1]/90 hover:to-[#00FFD1]/60 transition-all duration-300 btn-bounce"
            onClick={createSparkles}
          >
            Explore Tools
          </Link>
          <Link
            to="/about"
            className="sparkle-btn px-6 py-3 bg-gray-800 text-white font-medium rounded-lg border border-gray-700 hover:bg-gray-700 transition-all duration-300 btn-glow"
            onClick={createSparkles}
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center fade-in-up">Featured Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-fade-in">
          {/* Invoice Generator */}
          <div className="cookie-gradient-bg rounded-xl p-6 border border-gray-700 hover:border-[#00FFD1] transition-colors duration-300">
            <div className="flex justify-between mb-4">
              <div className="h-12 w-12 bg-[#00FFD1]/20 rounded-lg flex items-center justify-center pulse">
                <FileText className="h-6 w-6 text-[#00FFD1]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Invoice Generator</h3>
            <p className="text-gray-400 mb-4">
              Create professional invoices for your clients with our easy-to-use generator. Customizable and ready to download.
            </p>
            <Link 
              to="/invoice" 
              className="sparkle-btn inline-block px-4 py-2 bg-gradient-to-r from-[#00FFD1]/20 to-[#00FFD1]/10 text-[#00FFD1] rounded-lg hover:from-[#00FFD1]/30 hover:to-[#00FFD1]/20 transition-all duration-300 btn-bounce"
              onClick={createSparkles}
            >
              Create Invoice
            </Link>
          </div>

          {/* Time Tracker (Coming Soon) */}
          <div className="cookie-gradient-bg rounded-xl p-6 border border-gray-700 hover:border-[#FF3CAC] transition-colors duration-300">
            <div className="flex justify-between mb-4">
              <div className="h-12 w-12 bg-[#FF3CAC]/20 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#FF3CAC]" />
              </div>
              <span className="text-xs font-medium bg-gray-700 text-gray-300 px-2 py-1 rounded">Coming Soon</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Time Tracker</h3>
            <p className="text-gray-400 mb-4">
              Track your billable hours with ease. Set hourly rates, track projects, and generate reports.
            </p>
            <button 
              className="cursor-not-allowed opacity-70 inline-block px-4 py-2 bg-gradient-to-r from-[#FF3CAC]/20 to-[#FF3CAC]/10 text-[#FF3CAC] rounded-lg transition-all duration-300"
              disabled
            >
              Coming Soon
            </button>
          </div>

          {/* Payment Calculator (Coming Soon) */}
          <div className="cookie-gradient-bg rounded-xl p-6 border border-gray-700 hover:border-[#00FFD1] transition-colors duration-300">
            <div className="flex justify-between mb-4">
              <div className="h-12 w-12 bg-[#00FFD1]/20 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-[#00FFD1]" />
              </div>
              <span className="text-xs font-medium bg-gray-700 text-gray-300 px-2 py-1 rounded">Coming Soon</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Payment Calculator</h3>
            <p className="text-gray-400 mb-4">
              Calculate tax, GST, and other deductions for your payments. Perfect for contractors and freelancers.
            </p>
            <button 
              className="cursor-not-allowed opacity-70 inline-block px-4 py-2 bg-gradient-to-r from-[#00FFD1]/20 to-[#00FFD1]/10 text-[#00FFD1] rounded-lg transition-all duration-300"
              disabled
            >
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center fade-in-up">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to simplify your workflow?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Our tools are designed to save you time and reduce administrative headaches.
          </p>
          <Link
            to="/invoice"
            className="sparkle-btn px-6 py-3 bg-gradient-to-r from-[#FF3CAC] to-[#00FFD1] text-gray-900 font-bold rounded-lg hover:opacity-90 transition-opacity duration-300 btn-bounce"
            onClick={createSparkles}
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
