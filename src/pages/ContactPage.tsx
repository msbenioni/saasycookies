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
    const subject = `SaaSy Cookies Contact: ${formData.name} from ${formData.company}`;
    const body = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Preferred Contact Method: ${formData.preferredContact}

Message:
${formData.message}`;

    const mailtoLink = `mailto:saasycookies@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the mailto link
    window.location.href = mailtoLink;
    
    // Show success state
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-10">
      <GlassCard className="p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading font-bold mb-2 gradient-heading">Contact Us</h1>
          <p className="text-xl text-[var(--nav-text)] font-body">Let's talk about your cloud & software needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass-card contact-card">
            <div className="contact-icon-container contact-icon-purple">
              <Mail className="contact-icon" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2 heading-secondary">Email</h3>
            <a href="mailto:saasycookies@gmail.com" className="text-[var(--nav-text)] hover:text-[var(--accent-primary)]">
              saasycookies@gmail.com
            </a>
          </div>
          <div className="glass-card contact-card">
            <div className="contact-icon-container contact-icon-green">
              <Phone className="contact-icon" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2 heading-secondary">Phone</h3>
            <a href="tel:+6421123456" className="text-[var(--nav-text)] hover:text-[var(--icon-green)]">
              +64 21 123 456
            </a>
          </div>
          <div className="glass-card contact-card">
            <div className="contact-icon-container contact-icon-purple">
              <MessageSquare className="contact-icon" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2 heading-secondary">Chat</h3>
            <a href="mailto:saasycookies@gmail.com?subject=Let's%20chat!" className="text-[var(--nav-text)] hover:text-[var(--accent-primary)]">
              Start a conversation
            </a>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="glass-card p-8 max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Your Name" className="saasy-input" />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Your Email" className="saasy-input" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone (optional)" className="saasy-input" />
            <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Company (optional)" className="saasy-input" />
          </div>
          <div>
            <textarea name="message" value={formData.message} onChange={handleInputChange} required placeholder="How can we help?" className="saasy-input min-h-[120px]" />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <select name="preferredContact" value={formData.preferredContact} onChange={handleInputChange} className="saasy-input w-full md:w-auto">
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="chat">Chat</option>
            </select>
            <button type="submit" className="saasy-button-primary w-full md:w-auto" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          {submitted && (
            <div className="text-green-400 mt-4 text-center">Thank you! We'll be in touch soon.</div>
          )}
        </form>
      </GlassCard>
    </div>
  );
};

export default ContactPage;
