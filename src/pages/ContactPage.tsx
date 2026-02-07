import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SaasyCtaButton from '../components/SaasyCtaButton';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = `SaaSy Cookies Contact: ${formData.name}${formData.company ? ` from ${formData.company}` : ''}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:saasycookies@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="scene-section">
      <GlassCard className="w-full max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold heading-primary flex items-center justify-center gap-3">
            Lets talk
            <Coffee className="w-8 h-8 text-[#f0883e]" />
          </h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Send us a message and we'll get back to you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg bg-[#21262d] border border-[#30363d] text-white placeholder-[#8b949e] focus:border-[#9e83ff] focus:outline-none transition-colors"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg bg-[#21262d] border border-[#30363d] text-white placeholder-[#8b949e] focus:border-[#9e83ff] focus:outline-none transition-colors"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone (optional)"
            className="w-full px-4 py-3 rounded-lg bg-[#21262d] border border-[#30363d] text-white placeholder-[#8b949e] focus:border-[#9e83ff] focus:outline-none transition-colors"
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company (optional)"
            className="w-full px-4 py-3 rounded-lg bg-[#21262d] border border-[#30363d] text-white placeholder-[#8b949e] focus:border-[#9e83ff] focus:outline-none transition-colors"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
            placeholder="How can we help?"
            className="w-full px-4 py-3 rounded-lg bg-[#21262d] border border-[#30363d] text-white placeholder-[#8b949e] focus:border-[#9e83ff] focus:outline-none transition-colors resize-none"
          />
          <div className="pt-2">
            <SaasyCtaButton to="#" as="button" type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SaasyCtaButton>
          </div>
          {submitted && (
            <p className="text-[#6affd8] text-center">Thank you! We'll be in touch soon.</p>
          )}
        </form>
      </GlassCard>
    </div>
  );
};

export default ContactPage;
