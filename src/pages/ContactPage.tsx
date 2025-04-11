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
        <h1 className="text-4xl font-heading font-bold mb-2 text-[#c9d1d9]">Contact Us</h1>
        <p className="text-xl text-[#8b949e] font-body">Let's talk about your cloud & software needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] shadow-md flex flex-col items-center text-center hover:border-[#6e40c9] transition-colors duration-300">
          <div className="h-12 w-12 bg-[#6e40c9]/20 rounded-lg flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-[#6e40c9]" />
          </div>
          <h3 className="text-xl font-heading font-semibold mb-2 text-[#c9d1d9]">Email</h3>
          <a href="mailto:saasycookies@gmail.com" className="text-[#8b949e] hover:text-[#6e40c9]">
            saasycookies@gmail.com
          </a>
        </div>
        
        <div className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] shadow-md flex flex-col items-center text-center hover:border-[#6e40c9] transition-colors duration-300">
          <div className="h-12 w-12 bg-[#3fb950]/20 rounded-lg flex items-center justify-center mb-4">
            <Phone className="h-6 w-6 text-[#3fb950]" />
          </div>
          <h3 className="text-xl font-heading font-semibold mb-2 text-[#c9d1d9]">Phone</h3>
          <a href="tel:+6421123456" className="text-[#8b949e] hover:text-[#3fb950]">
            +64 21 123 456
          </a>
        </div>
        
        <div className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] shadow-md flex flex-col items-center text-center hover:border-[#6e40c9] transition-colors duration-300">
          <div className="h-12 w-12 bg-[#6e40c9]/20 rounded-lg flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-[#6e40c9]" />
          </div>
          <h3 className="text-xl font-heading font-semibold mb-2 text-[#c9d1d9]">Book a Chat</h3>
          <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="text-[#8b949e] hover:text-[#6e40c9]">
            Schedule on Calendly
          </a>
        </div>
      </div>

      <div className="bg-[#161b22] p-8 rounded-lg border border-[#30363d] shadow-md">
        <h2 className="text-2xl font-heading font-bold mb-6 text-[#c9d1d9]">Get in Touch</h2>
        
        {submitted ? (
          <div className="text-center py-8">
            <div className="h-16 w-16 bg-[#3fb950]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3fb950]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2 text-[#c9d1d9]">Message Sent!</h3>
            <p className="text-[#8b949e] mb-6 font-body">
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
              className="inline-flex items-center px-4 py-2 border border-[#30363d] text-sm font-medium rounded-md shadow-sm text-[#c9d1d9] bg-[#0d1117] hover:bg-[#30363d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6e40c9] transition-colors duration-300"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#8b949e] mb-1">
                  Name *
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
                  Email *
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#8b949e] mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#c9d1d9] focus:outline-none focus:ring-2 focus:ring-[#6e40c9] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[#8b949e] mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#c9d1d9] focus:outline-none focus:ring-2 focus:ring-[#6e40c9] focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="preferredContact" className="block text-sm font-medium text-[#8b949e] mb-1">
                Preferred Contact Method
              </label>
              <select
                id="preferredContact"
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#c9d1d9] focus:outline-none focus:ring-2 focus:ring-[#6e40c9] focus:border-transparent"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#8b949e] mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
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
        )}
      </div>
    </div>
  );
};

export default ContactPage;
