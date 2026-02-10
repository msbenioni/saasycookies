import React from 'react';
import { FileText, QrCode, Wrench } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import SaasySoftButton from '../../components/SaasySoftButton';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  path: string;
}

const ToolsPage: React.FC = () => {
  const tools: Tool[] = [
    {
      id: 'invoice',
      name: 'Invoice Generator',
      description: 'Create professional invoices with GST and withholding tax calculations for New Zealand businesses.',
      icon: <FileText className="h-6 w-6" />,
      color: '#A78BFA',
      path: '/tools/invoice-generator'
    },
    {
      id: 'qrcode',
      name: 'QR Code Generator',
      description: 'Create customizable QR codes with your branding for websites, business cards, and more.',
      icon: <QrCode className="h-6 w-6" />,
      color: '#60A5FA',
      path: '/tools/qr-generator'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2">
      <GlassCard className="p-8 md:p-12 shadow-none">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4 gradient-heading">Free Tools</h1>
          <p className="text-white max-w-2xl mx-auto">
            Practical tools to help you run your business more efficiently.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="glass-card p-6 flex flex-col items-center text-center shadow-none border border-[var(--glass-border)] transition-colors duration-300"
              style={{ borderColor: tool.color }}
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
              <SaasySoftButton to={tool.path}>
                Launch <span className="ml-1">→</span>
              </SaasySoftButton>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <Wrench className="w-4 h-4 text-[#6affd8]" />
            <span className="text-sm font-medium text-[#b388ff]">More tools coming soon</span>
          </div>
          <p className="text-[var(--text-secondary)]">
            We're constantly building new tools to help you succeed. Check back often for updates!
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default ToolsPage;
