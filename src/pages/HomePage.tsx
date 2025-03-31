import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CreditCard } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-14 px-4">
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
            className="px-6 py-3 bg-gradient-to-r from-[#00FFD1] via-[#00FFD1] to-[#00FFD1]/70 text-gray-900 font-medium rounded-lg hover:from-[#00FFD1]/90 hover:to-[#00FFD1]/60 transition-all duration-300"
          >
            Explore Tools
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg border border-gray-700 hover:bg-gray-700 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Invoice Generator */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#00FFD1] transition-colors duration-300">
            <div className="flex justify-between mb-4">
              <div className="h-12 w-12 bg-[#00FFD1]/20 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#00FFD1]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Invoice Generator</h3>
            <p className="text-gray-400 mb-4">
              Create professional invoices with GST and withholding tax calculations for your NZ business.
            </p>
            <Link
              to="/tools/invoice"
              className="inline-flex items-center text-[#00FFD1] hover:text-[#00FFD1]/80"
            >
              Launch Tool <span className="ml-1">→</span>
            </Link>
          </div>

          {/* Time Tracker (Coming Soon) */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 opacity-70">
            <div className="h-12 w-12 bg-[#FF3CAC]/20 rounded-lg flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-[#FF3CAC]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Time Tracker</h3>
            <p className="text-gray-400 mb-4">
              Track your billable hours and generate reports for clients and projects.
            </p>
            <span className="inline-flex items-center text-gray-500">
              Coming Soon
            </span>
          </div>

          {/* Expense Tracker (Coming Soon) */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 opacity-70">
            <div className="h-12 w-12 bg-[#00FFD1]/20 rounded-lg flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-[#00FFD1]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expense Tracker</h3>
            <p className="text-gray-400 mb-4">
              Log and categorize your business expenses for easy tax reporting.
            </p>
            <span className="inline-flex items-center text-gray-500">
              Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 bg-gray-800 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Freelancers Love Us</h2>
        <div className="max-w-4xl mx-auto">
          <blockquote className="text-center">
            <p className="text-xl text-gray-300 italic mb-4">
              "SaaSy Cookies has simplified my invoicing process and saved me hours of admin work each month. Can't wait to see what other tools they develop!"
            </p>
            <footer className="text-gray-400">
              — Sarah T., Freelance Designer
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
