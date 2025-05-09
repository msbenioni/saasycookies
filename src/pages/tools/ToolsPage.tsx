import React from 'react';
import { FileText, Clock, CreditCard, QrCode } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import SaasySoftButton from '../../components/SaasySoftButton';

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
      id: 'qrcode',
      name: 'QR Code Generator',
      description: 'Create customizable QR codes with your branding for websites, business cards, and more.',
      icon: <QrCode className="h-6 w-6" />,
      color: '#60A5FA', 
      available: true,
      path: '/tools/qrcode'
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
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2">
      <GlassCard className="p-8 md:p-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4 gradient-heading">Tools</h1>
          <p className="text-white max-w-2xl mx-auto">
            Online tools designed to help New Zealand freelancers, contractors, and small businesses work smarter.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <div 
              key={tool.id}
              className={`glass-card p-6 flex flex-col items-center text-center shadow-none border border-[var(--glass-border)] ${tool.available ? `hover:border-[${tool.color}]` : 'opacity-70'} transition-colors duration-300`}
              style={tool.available ? { borderColor: tool.color } : {}}
            >
              <div 
                className="h-12 w-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${tool.color}20` }}
              >
                <div style={{ color: tool.color }}>{tool.icon}</div>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2 heading-secondary" style={{ color: tool.color }}>{tool.name}</h3>
              <p className="text-white mb-4">
                {tool.description}
              </p>
              {tool.available ? (
                <SaasySoftButton to={tool.path}>
  Launch Tool <span className="ml-1">→</span>
</SaasySoftButton>
              ) : (
                <span className="inline-flex items-center text-text-secondary">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default ToolsPage;
