import React, { useState } from 'react';
import { X } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SaasyCtaButton from '../components/SaasyCtaButton';

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
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-10">
      <div className="flex flex-col gap-10">
        <GlassCard className="p-8 md:p-12 mb-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold mb-2 gradient-heading">About SaaSy Cookies</h1>
            <p className="text-xl text-[var(--nav-text)] font-body">Making tech feel friendlier.</p>
          </div>
          <div className="space-y-10 font-body">
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4 heading-secondary">Our Story</h2>
              <p className="mb-4 text-[var(--nav-text)]">
                SaaSy Cookies was born from a simple frustration: why does dealing with IT distributors and software licensing have to be so complicated and impersonal?
              </p>
              <p className="mb-4 text-[var(--nav-text)]">
                The name "SaaSy Cookies" is a playful nod to both our Kuki (Cook Islands) heritage and the digital services we provide. In the Cook Islands, community and personal connection are core values, and we bring that spirit to our business by creating a friendly, approachable alternative to the big, corporate IT distributors.
              </p>
              <p className="text-[var(--nav-text)]">
                The "SaaSy" part represents our focus on Software-as-a-Service solutions that help small businesses thrive in the digital world. Just like cookies are a sweet treat that brings joy, we aim to make your tech experience sweeter and more enjoyable.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4 heading-secondary">Our Mission</h2>
              <p className="mb-4 text-[var(--nav-text)]">
                We're on a mission to support small businesses in New Zealand with friendly, jargon-free cloud services and software licensing that doesn't make your head spin.
              </p>
              <p className="text-[var(--nav-text)]">
                We believe that small business owners should be able to focus on what they do best—running their business—without getting bogged down by complicated tech decisions or dealing with faceless corporations. That's why we offer personalized service with real humans who speak plain English and genuinely care about your success.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4 heading-secondary">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-heading font-semibold mb-2 value-title-purple">Human Connection</h3>
                  <p className="text-[var(--nav-text)]">
                    We believe in real relationships. When you call us, you'll talk to a real person who knows your name and understands your business.
                  </p>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-xl font-heading font-semibold mb-2 value-title-green">Transparency</h3>
                  <p className="text-[var(--nav-text)]">
                    No hidden fees, no surprises—just honest advice and clear pricing.
                  </p>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-xl font-heading font-semibold mb-2 value-title-pink">Empowerment</h3>
                  <p className="text-[var(--nav-text)]">
                    We empower small businesses with the tools and knowledge to succeed in a digital world.
                  </p>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-xl font-heading font-semibold mb-2 value-title-mint">Community</h3>
                  <p className="text-[var(--nav-text)]">
                    We support our community and celebrate the success of our clients.
                  </p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4 heading-secondary">Our Services</h2>
              <p className="mb-4 text-[var(--nav-text)]">
                We offer a range of cloud services and software licensing options tailored to small NZ businesses:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-[var(--nav-text)]">
                <li>Microsoft 365 and Google Workspace licensing and setup</li>
                <li>Email and cloud storage solutions</li>
                <li>Cloud backup services</li>
                <li>VMware licensing through Zettagrid</li>
                <li>Ongoing tech support plans</li>
                <li>Free business tools like our invoice generator</li>
              </ul>
              <div className="text-left">
                <SaasyCtaButton to="/contact">
                  Get in Touch
                </SaasyCtaButton>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4 heading-secondary">Looking Forward</h2>
              <p className="mb-6 text-[var(--nav-text)]">
                SaaSy Cookies is just getting started. We're excited to continue growing our services to better support New Zealand's small business community. If you have ideas for how we can help your business with its tech needs, we'd love to hear from you!
              </p>
              <div className="text-left">
                <SaasyCtaButton to="#" onClick={() => setIsModalOpen(true)}>
                  Share Your Ideas
                </SaasyCtaButton>
              </div>
            </section>
          </div>
        </GlassCard>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="modal-close-button"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-heading font-bold mb-6 heading-primary">Share Your Ideas</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="form-input"
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="saasy-button-primary"
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
