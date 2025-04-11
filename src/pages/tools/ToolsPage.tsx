import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CreditCard } from 'lucide-react';

const ToolsPage: React.FC = () => {
  const tools = [
    {
      id: 'invoice',
      name: 'Invoice Generator',
      description: 'Create professional invoices with GST and withholding tax calculations for your NZ business.',
      icon: <FileText className="h-6 w-6" />,
      color: '#A78BFA', 
      available: true,
      path: '/tools/invoice'
    },
    {
      id: 'time-tracker',
      name: 'Time Tracker',
      description: 'Track your billable hours and generate reports for clients and projects.',
      icon: <Clock className="h-6 w-6" />,
      color: '#F9A8D4', 
      available: false,
      path: '/tools/time-tracker'
    },
    {
      id: 'expense-tracker',
      name: 'Expense Tracker',
      description: 'Log and categorize your business expenses for easy tax reporting.',
      icon: <CreditCard className="h-6 w-6" />,
      color: '#34D399', 
      available: false,
      path: '/tools/expense-tracker'
    }
  ];

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">Tools</h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Online tools designed to help New Zealand freelancers, contractors, and small businesses work smarter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <div 
            key={tool.id}
            className={`brand-card ${
              tool.available ? `hover:border-[${tool.color}]` : 'opacity-70'
            } transition-colors duration-300`}
          >
            <div 
              className="h-12 w-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `${tool.color}20` }}
            >
              <div style={{ color: tool.color }}>{tool.icon}</div>
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">{tool.name}</h3>
            <p className="text-text-secondary mb-4">
              {tool.description}
            </p>
            {tool.available ? (
              <Link
                to={tool.path}
                className="inline-flex items-center font-medium"
                style={{ color: tool.color }}
              >
                Launch Tool <span className="ml-1">→</span>
              </Link>
            ) : (
              <span className="inline-flex items-center text-text-secondary">
                Coming Soon
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
