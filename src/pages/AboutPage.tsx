import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto link with form data
    const subject = `SaaSy Cookies Contact: ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:saasycookies@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the mailto link
    window.location.href = mailtoLink;
    
    // Reset form and close modal after a short delay
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsModalOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
          <div className="bg-[#0d1117] rounded-full h-full w-full flex items-center justify-center">
          </div>
        <h1 className="text-4xl font-heading font-bold mb-2 text-[#c9d1d9]">About SaaSy Cookies</h1>
        <p className="text-xl text-[#8b949e] font-body">Making tech feel friendlier.</p>
      </div>

      <div className="space-y-8 font-body">
        <section className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] shadow-md">
          <h2 className="text-2xl font-heading font-semibold mb-4 text-[#c9d1d9]">Our Story</h2>
          <p className="mb-4 text-[#8b949e]">
            SaaSy Cookies was born from a simple frustration: why does dealing with IT distributors and software licensing have to be so complicated and impersonal?
          </p>
          <p className="mb-4 text-[#8b949e]">
            The name "SaaSy Cookies" is a playful nod to both our Kuki (Cook Islands) heritage and the digital services we provide. In the Cook Islands, community and personal connection are core values, and we bring that spirit to our business by creating a friendly, approachable alternative to the big, corporate IT distributors.
          </p>
          <p className="text-[#8b949e]">
            The "SaaSy" part represents our focus on Software-as-a-Service solutions that help small businesses thrive in the digital world. Just like cookies are a sweet treat that brings joy, we aim to make your tech experience sweeter and more enjoyable.
          </p>
        </section>

        <section className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] shadow-md">
          <h2 className="text-2xl font-heading font-semibold mb-4 text-[#c9d1d9]">Our Mission</h2>
          <p className="mb-4 text-[#8b949e]">
            We're on a mission to support small businesses in New Zealand with friendly, jargon-free cloud services and software licensing that doesn't make your head spin.
          </p>
          <p className="text-[#8b949e]">
            We believe that small business owners should be able to focus on what they do best—running their business—without getting bogged down by complicated tech decisions or dealing with faceless corporations. That's why we offer personalized service with real humans who speak plain English and genuinely care about your success.
          </p>
        </section>

        <section className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] shadow-md">
          <h2 className="text-2xl font-heading font-semibold mb-4 text-[#c9d1d9]">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d] hover:border-[#6e40c9] transition-colors duration-300">
              <h3 className="text-xl font-heading font-semibold mb-2 text-[#6e40c9]">Human Connection</h3>
              <p className="text-[#8b949e]">
                We believe in real relationships. When you call us, you'll talk to a real person who knows your name and understands your business.
              </p>
            </div>
            <div className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d] hover:border-[#6e40c9] transition-colors duration-300">
              <h3 className="text-xl font-heading font-semibold mb-2 text-[#3fb950]">Plain English</h3>
              <p className="text-[#8b949e]">
                We explain tech without the jargon. You shouldn't need a computer science degree to understand your software licensing options.
              </p>
            </div>
            <div className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d] hover:border-[#6e40c9] transition-colors duration-300">
              <h3 className="text-xl font-heading font-semibold mb-2 text-[#6e40c9]">Transparency</h3>
              <p className="text-[#8b949e]">
                No hidden fees, no confusing contracts. We're upfront about our pricing and what you're getting for your money.
              </p>
            </div>
            <div className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d] hover:border-[#6e40c9] transition-colors duration-300">
              <h3 className="text-xl font-heading font-semibold mb-2 text-[#3fb950]">Small Business Spirit</h3>
              <p className="text-[#8b949e]">
                As a small business ourselves, we understand your challenges and are committed to helping you succeed with the right tech solutions.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] shadow-md">
          <h2 className="text-2xl font-heading font-semibold mb-4 text-[#c9d1d9]">Our Services</h2>
          <p className="mb-4 text-[#8b949e]">
            We offer a range of cloud services and software licensing options tailored to small NZ businesses:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-[#8b949e]">
            <li>Microsoft 365 and Google Workspace licensing and setup</li>
            <li>Email and cloud storage solutions</li>
            <li>Cloud backup services</li>
            <li>VMware licensing through Zettagrid</li>
            <li>Ongoing tech support plans</li>
            <li>Free business tools like our invoice generator</li>
          </ul>
          <div className="text-center">
            <Link 
              to="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6e40c9] hover:bg-[#8957e5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6e40c9] transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </section>

        <section className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] shadow-md">
          <h2 className="text-2xl font-heading font-semibold mb-4 text-[#c9d1d9]">Looking Forward</h2>
          <p className="mb-6 text-[#8b949e]">
            SaaSy Cookies is just getting started. We're excited to continue growing our services to better support New Zealand's small business community. If you have ideas for how we can help your business with its tech needs, we'd love to hear from you!
          </p>
          <div className="text-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-[#30363d] text-sm font-medium rounded-md shadow-sm text-[#c9d1d9] bg-[#0d1117] hover:bg-[#30363d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6e40c9] transition-colors duration-300"
            >
              Share Your Ideas
            </button>
          </div>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#161b22] rounded-lg p-6 w-full max-w-md border border-[#30363d] shadow-lg relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#8b949e] hover:text-[#c9d1d9]"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-heading font-bold mb-6 text-[#c9d1d9]">Share Your Ideas</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#8b949e] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#c9d1d9] focus:outline-none focus:ring-2 focus:ring-[#6e40c9] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#8b949e] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#c9d1d9] focus:outline-none focus:ring-2 focus:ring-[#6e40c9] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#8b949e] mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#c9d1d9] focus:outline-none focus:ring-2 focus:ring-[#6e40c9] focus:border-transparent"
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6e40c9] hover:bg-[#8957e5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6e40c9] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
