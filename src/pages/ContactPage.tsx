import React, { useState } from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    preferredContact: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    const subject = `SaaSy Cookies Contact: ${formData.name}${formData.company ? ` from ${formData.company}` : ''}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`;

    const mailtoLink = `mailto:saasycookies@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the mailto link in the user's default email client
    window.location.href = mailtoLink;

    // Show success state
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-10">
      <GlassCard className="p-3 md:p-5 max-w-2xl mx-auto" style={{ borderRadius: '4px', minHeight: 'unset' }}>
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-1 gradient-heading">Contact Us</h2>
          <p className="text-text-secondary max-w-md mx-auto text-base">
            Let's talk about your cloud & software needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="glass-card contact-card shadow-none border border-[var(--glass-border)] p-3" style={{ borderRadius: '4px' }}>
            <div className="contact-icon-container contact-icon-purple">
              <Mail className="contact-icon" />
            </div>
            <h3 className="text-lg font-heading font-semibold mb-1 heading-secondary">Email</h3>
            <a href="mailto:saasycookies@gmail.com" className="text-[var(--nav-text)] hover:text-[var(--accent-primary)] text-sm">
              saasycookies@gmail.com
            </a>
          </div>
          <div className="glass-card contact-card shadow-none border border-[var(--glass-border)] p-3" style={{ borderRadius: '4px' }}>
            <div className="contact-icon-container contact-icon-green">
              <Phone className="contact-icon" />
            </div>
            <h3 className="text-lg font-heading font-semibold mb-1 heading-secondary">Phone</h3>
            <a href="tel:+6421123456" className="text-[var(--nav-text)] hover:text-[var(--icon-green)] text-sm">
              +64 21 123 456
            </a>
          </div>
          <div className="glass-card contact-card shadow-none border border-[var(--glass-border)] p-3" style={{ borderRadius: '4px' }}>
            <div className="contact-icon-container contact-icon-purple">
              <MessageSquare className="contact-icon" />
            </div>
            <h3 className="text-lg font-heading font-semibold mb-1 heading-secondary">Chat</h3>
            <a href="mailto:saasycookies@gmail.com?subject=Let's%20chat!" className="text-[var(--nav-text)] hover:text-[var(--accent-primary)] text-sm">
              Start a conversation
            </a>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="glass-card p-2 md:p-3 max-w-full mx-auto space-y-2 shadow-none border border-[var(--glass-border)]">
          <div className="flex flex-col md:flex-row gap-3">
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Your Name" className="saasy-input min-h-[40px] w-full text-black" />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Your Email" className="saasy-input min-h-[40px] w-full text-black" />
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone (optional)" className="saasy-input min-h-[40px] w-full text-black" />
            <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Company (optional)" className="saasy-input min-h-[40px] w-full text-black" />
          </div>
          <div>
            <textarea name="message" value={formData.message} onChange={handleInputChange} required placeholder="How can we help?" className="saasy-input min-h-[60px] w-full text-black" />
          </div>
          <div className="flex justify-center mt-2">
            <button type="submit" className="saasy-button-primary w-full md:w-auto" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          {submitted && (
            <div className="text-green-400 mt-2 text-center">Thank you! We'll be in touch soon.</div>
          )}
        </form>
      </GlassCard>
    </div>
  );
};

export default ContactPage;
