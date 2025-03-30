import React, { useState } from 'react';
import { X } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    
    // Reset form and close modal
    setFormData({ name: '', email: '', message: '' });
    setIsModalOpen(false);
    
    // Show a success message (in a real app, you might use a toast notification)
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
          <div className="bg-gray-900 rounded-full h-full w-full flex items-center justify-center">
          </div>
        <h1 className="text-4xl font-bold mb-2">About SaaSy Cookies</h1>
        <p className="text-xl text-gray-400">Sweet solutions.</p>
      </div>

      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Story</h2>
          <p className="mb-4">
            SaaSy Cookies was born from the intersection of two worlds: the rich cultural heritage of the Pacific and the modern digital landscape of software-as-a-service (SaaS) solutions.
          </p>
          <p className="mb-4">
            The name "SaaSy Cookies" is a playful nod to both our Kuki (Cook Islands) heritage and the digital tools we create. In the Cook Islands, community and resourcefulness are core values, and we bring that spirit to our platform by creating practical tools that help independent workers thrive.
          </p>
          <p>
            The "SaaSy" part represents our focus on creating software-as-a-service tools that are both sophisticated and accessible. Just like cookies are bite-sized treats that bring joy, our tools are designed to be easy to use while solving real problems for freelancers and small businesses.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
          <p className="mb-4">
            We're on a mission to support freelancers, contractors, and small business owners in New Zealand with sweet digital tools that simplify the administrative side of running a business.
          </p>
          <p>
            We believe that independent workers should be able to focus on what they do best—creating value for their clients—without getting bogged down by paperwork, calculations, and administrative tasks. That's why we're building a collection of, user-friendly tools specifically designed for the New Zealand market.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-medium mb-2 text-[#00FFD1]">Simplicity</h3>
              <p>
                We believe in creating tools that are intuitive and easy to use, cutting through complexity to deliver solutions that just work.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-medium mb-2 text-[#FF3CAC]">Community</h3>
              <p>
                We're building for the community of independent workers who contribute so much to New Zealand's economy and culture.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-medium mb-2 text-[#00FFD1]">Accessibility</h3>
              <p>
                We're committed to making our tools available to everyone, which is why our core offerings will either be free or in some cases a small payment will be required to use.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-medium mb-2 text-[#FF3CAC]">Innovation</h3>
              <p>
                We're constantly looking for new ways to solve problems and make life easier for freelancers and small businesses.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Looking Forward</h2>
          <p className="mb-6">
            SaaSy Cookies is just getting started. We're excited to continue building tools that address the unique needs of New Zealand's independent workers. If you have ideas for tools that would help you in your work, we'd love to hear from you!
          </p>
          <div className="text-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#00FFD1] to-[#00FFD1]/70 text-gray-900 font-medium rounded-lg hover:from-[#00FFD1]/90 hover:to-[#00FFD1]/60 transition-all duration-300"
            >
              Share Your Ideas
            </button>
          </div>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-bold mb-6 text-white">Share Your Ideas</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent"
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#00FFD1] to-[#FF3CAC] text-gray-900 font-medium rounded-md hover:opacity-90 transition-opacity duration-300"
                >
                  Send Message
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
