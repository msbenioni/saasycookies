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
          <div className="bg-[var(--button-secondary-bg)] rounded-full h-full w-full flex items-center justify-center">
          </div>
        <h1 className="text-4xl font-heading font-bold mb-2 heading-primary">About SaaSy Cookies</h1>
        <p className="text-xl text-[var(--nav-text)] font-body">Making tech feel friendlier.</p>
      </div>

      <div className="space-y-8 font-body">
        <section className="saasy-card saasy-card-dark">
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

        <section className="saasy-card saasy-card-dark">
          <h2 className="text-2xl font-heading font-semibold mb-4 heading-secondary">Our Mission</h2>
          <p className="mb-4 text-[var(--nav-text)]">
            We're on a mission to support small businesses in New Zealand with friendly, jargon-free cloud services and software licensing that doesn't make your head spin.
          </p>
          <p className="text-[var(--nav-text)]">
            We believe that small business owners should be able to focus on what they do best—running their business—without getting bogged down by complicated tech decisions or dealing with faceless corporations. That's why we offer personalized service with real humans who speak plain English and genuinely care about your success.
          </p>
        </section>

        <section className="saasy-card saasy-card-dark">
          <h2 className="text-2xl font-heading font-semibold mb-4 heading-secondary">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="value-card">
              <h3 className="text-xl font-heading font-semibold mb-2 value-title-purple">Human Connection</h3>
              <p className="text-[var(--nav-text)]">
                We believe in real relationships. When you call us, you'll talk to a real person who knows your name and understands your business.
              </p>
            </div>
            <div className="value-card">
              <h3 className="text-xl font-heading font-semibold mb-2 value-title-green">Plain English</h3>
              <p className="text-[var(--nav-text)]">
                We explain tech without the jargon. You shouldn't need a computer science degree to understand your software licensing options.
              </p>
            </div>
            <div className="value-card">
              <h3 className="text-xl font-heading font-semibold mb-2 value-title-purple">Transparency</h3>
              <p className="text-[var(--nav-text)]">
                No hidden fees, no confusing contracts. We're upfront about our pricing and what you're getting for your money.
              </p>
            </div>
            <div className="value-card">
              <h3 className="text-xl font-heading font-semibold mb-2 value-title-green">Small Business Spirit</h3>
              <p className="text-[var(--nav-text)]">
                As a small business ourselves, we understand your challenges and are committed to helping you succeed with the right tech solutions.
              </p>
            </div>
          </div>
        </section>

        <section className="saasy-card saasy-card-dark">
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
          <div className="text-center">
            <Link 
              to="/contact"
              className="saasy-button-primary"
            >
              Get in Touch
            </Link>
          </div>
        </section>

        <section className="saasy-card saasy-card-dark">
          <h2 className="text-2xl font-heading font-semibold mb-4 heading-secondary">Looking Forward</h2>
          <p className="mb-6 text-[var(--nav-text)]">
            SaaSy Cookies is just getting started. We're excited to continue growing our services to better support New Zealand's small business community. If you have ideas for how we can help your business with its tech needs, we'd love to hear from you!
          </p>
          <div className="text-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="saasy-button-secondary"
            >
              Share Your Ideas
            </button>
          </div>
        </section>
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
