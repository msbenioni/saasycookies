import React, { useState } from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold mb-2 heading-primary">Contact Us</h1>
        <p className="text-xl text-[var(--nav-text)] font-body">Let's talk about your cloud & software needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="contact-card">
          <div className="contact-icon-container contact-icon-purple">
            <Mail className="contact-icon" />
          </div>
          <h3 className="text-xl font-heading font-semibold mb-2 heading-secondary">Email</h3>
          <a href="mailto:saasycookies@gmail.com" className="text-[var(--nav-text)] hover:text-[var(--accent-primary)]">
            saasycookies@gmail.com
          </a>
        </div>
        
        <div className="contact-card">
          <div className="contact-icon-container contact-icon-green">
            <Phone className="contact-icon" />
          </div>
          <h3 className="text-xl font-heading font-semibold mb-2 heading-secondary">Phone</h3>
          <a href="tel:+6421123456" className="text-[var(--nav-text)] hover:text-[var(--icon-green)]">
            +64 21 123 456
          </a>
        </div>
        
        <div className="contact-card">
          <div className="contact-icon-container contact-icon-purple">
            <MessageSquare className="contact-icon" />
          </div>
          <h3 className="text-xl font-heading font-semibold mb-2 heading-secondary">Book a Chat</h3>
          <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="text-[var(--nav-text)] hover:text-[var(--accent-primary)]">
            Schedule on Calendly
          </a>
        </div>
      </div>

      <div className="saasy-card saasy-card-dark">
        <h2 className="text-2xl font-heading font-bold mb-6 heading-secondary">Get in Touch</h2>
        
        {submitted ? (
          <div className="text-center py-8">
            <div className="contact-icon-container contact-icon-green mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2 heading-secondary">Message Sent!</h3>
            <p className="text-[var(--nav-text)] mb-6 font-body">
              Thanks for reaching out. We'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  company: '',
                  message: '',
                  preferredContact: 'email'
                });
              }}
              className="saasy-button-secondary"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="form-label">
                  Name *
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
                  Email *
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="preferredContact" className="form-label">
                Preferred Contact Method
              </label>
              <select
                id="preferredContact"
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="form-label">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="form-input"
              ></textarea>
            </div>
            
            <div className="text-right">
              <button
                type="submit"
                disabled={isSubmitting}
                className="saasy-button-primary"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
