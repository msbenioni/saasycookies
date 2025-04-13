import React from 'react';
import { Link } from 'react-router-dom';
import { FaCloud, FaLaptopCode, FaShieldAlt, FaUsers, FaChartLine, FaHeadset, FaGlobe, FaServer } from 'react-icons/fa';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-24 px-4 min-h-[90vh] flex items-center" id="hero-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-heading font-bold mb-6 text-white leading-tight heading-primary">
                Cloud services on a single, collaborative platform
              </h1>
              <p className="text-xl text-[var(--text-secondary)] mb-8 font-body">
                SaaSy Cookies helps NZ small businesses get their cloud, software & licensing sorted — with real humans, plain English & good vibes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="saasy-button-primary px-6 py-3 font-medium rounded-md"
                >
                  Talk to Us
                </Link>
                <Link
                  to="/contact"
                  className="saasy-button-secondary px-6 py-3 font-medium rounded-md"
                >
                  Book a Free Cloud Chat
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--terminal-purple)] opacity-10 rounded-full blur-3xl"></div>
                <div className="saasy-card saasy-card-dark p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="terminal-dot terminal-dot-red"></div>
                    <div className="terminal-dot terminal-dot-orange"></div>
                    <div className="terminal-dot terminal-dot-green"></div>
                  </div>
                  <div className="terminal-text">
                    <p><span className="terminal-command">$</span> saasy-cookies init</p>
                    <p className="terminal-output">✓ Initializing your cloud services...</p>
                    <p className="terminal-output">✓ Setting up Microsoft 365...</p>
                    <p className="terminal-output">✓ Configuring email protection...</p>
                    <p className="terminal-output">✓ Adding cloud backups...</p>
                    <p className="terminal-success">✓ All done! Your cloud is ready to use.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mascot Section - New */}
      <section className="py-24 px-4 min-h-[90vh] flex items-center" id="mascot-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center heading-primary">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="saasy-card saasy-card-light flex flex-col items-center text-center p-8">
              <div className="mascot-container mascot-float mb-4">
                <img src="/mascots/cookie-cloud.svg" alt="Cookie Cloud" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-[var(--card-text-light)] mb-2">Cookie Cloud</h3>
              <p className="text-[var(--card-text-light)] opacity-80">
                Your friendly cloud services guide. Cookie Cloud helps you navigate the world of cloud computing with ease.
              </p>
            </div>
            
            <div className="saasy-card saasy-card-light flex flex-col items-center text-center p-8">
              <div className="mascot-container mascot-float mb-4">
                <img src="/mascots/byte-buddy.svg" alt="Byte Buddy" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-[var(--card-text-light)] mb-2">Byte Buddy</h3>
              <p className="text-[var(--card-text-light)] opacity-80">
                Your tech-savvy assistant. Byte Buddy makes complex software solutions simple and accessible.
              </p>
            </div>
            
            <div className="saasy-card saasy-card-light flex flex-col items-center text-center p-8">
              <div className="mascot-container mascot-float mb-4">
                <img src="/mascots/safety-sprinkle.svg" alt="Safety Sprinkle" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-[var(--card-text-light)] mb-2">Safety Sprinkle</h3>
              <p className="text-[var(--card-text-light)] opacity-80">
                Your security specialist. Safety Sprinkle ensures your data stays protected with proper backups and security measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 min-h-[90vh] flex items-center" id="features-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-4 text-center heading-primary">SaaSy Cookies Features</h2>
          <p className="text-xl text-center text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto font-body">
            Get your cloud services sorted with a friendly, human touch. No technical jargon, just solutions that work.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={<FaCloud className="feature-icon" />}
              title="Accelerate performance"
              description="Work smarter with optimized cloud solutions. Get your team up and running with the right tools, configured for your specific needs."
            />
            
            <FeatureCard 
              icon={<FaShieldAlt className="feature-icon" />}
              title="Built-in security"
              description="Keep your business data safe with properly configured security settings, backups, and best practices for your cloud services."
            />
            
            <FeatureCard 
              icon={<FaUsers className="feature-icon" />}
              title="Work together, achieve more"
              description="Collaborate seamlessly with properly configured Microsoft 365 or Google Workspace tools that help your team work better together."
            />
            
            <FeatureCard 
              icon={<FaGlobe className="feature-icon" />}
              title="Scale with your business"
              description="From startups to established businesses, our cloud solutions grow with you. Add users, services, and features as you need them."
            />
            
            <FeatureCard 
              icon={<FaChartLine className="feature-icon" />}
              title="Analytics & Insights"
              description="Make data-driven decisions with powerful analytics that provide actionable insights."
            />
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 px-4 min-h-[90vh] flex items-center" id="what-we-do-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-4 text-center heading-primary">What We Do</h2>
          <p className="text-xl text-center text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto font-body">
            We help you get the right software, set it up, and support it — so you never have to talk to Microsoft or other vendors directly.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="saasy-card saasy-card-light flex flex-col items-center text-center p-6">
              <div className="feature-icon-container">
                <FaCloud className="feature-icon" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-[var(--card-text-light)] mb-2">Email & Cloud Setup</h3>
              <p className="text-[var(--card-text-light)] opacity-80">
                Professional email setup with spam protection
              </p>
            </div>
            
            <div className="saasy-card saasy-card-light flex flex-col items-center text-center p-6">
              <div className="feature-icon-container">
                <FaLaptopCode className="feature-icon" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-[var(--card-text-light)] mb-2">Microsoft 365 / Google</h3>
              <p className="text-[var(--card-text-light)] opacity-80">
                Complete workspace setup and management
              </p>
            </div>
            
            <div className="saasy-card saasy-card-light flex flex-col items-center text-center p-6">
              <div className="feature-icon-container">
                <FaShieldAlt className="feature-icon" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-[var(--card-text-light)] mb-2">Cloud Backups</h3>
              <p className="text-[var(--card-text-light)] opacity-80">
                Secure, automated data protection
              </p>
            </div>
            
            <div className="saasy-card saasy-card-light flex flex-col items-center text-center p-6">
              <div className="feature-icon-container">
                <FaServer className="feature-icon" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-[var(--card-text-light)] mb-2">VMware Licensing</h3>
              <p className="text-[var(--card-text-light)] opacity-80">
                Simplified virtualization licensing
              </p>
            </div>
            
            <div className="saasy-card saasy-card-light flex flex-col items-center text-center p-6">
              <div className="feature-icon-container">
                <FaHeadset className="feature-icon" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-[var(--card-text-light)] mb-2">Ongoing Support</h3>
              <p className="text-[var(--card-text-light)] opacity-80">
                Human tech support when you need it
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Saasy Cookies Exists */}
      <section className="py-24 px-4 min-h-[90vh] flex items-center" id="why-saasy-cookies-section">
        <div className="max-w-6xl mx-auto">
          <div className="saasy-card saasy-card-dark p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-6 text-center heading-primary">Why SaaSy Cookies Exists</h2>
            <p className="text-xl text-center text-[var(--text-secondary)] mb-4 font-body">
              We're not a big corporate distributor. We're not a giant tech company.
            </p>
            <p className="text-xl text-center text-[var(--text-secondary)] font-body">
              We're just a small NZ business (like you) that wanted tech to feel friendlier.
            </p>
          </div>
        </div>
      </section>

      {/* Packages & Pricing */}
      <section className="py-24 px-4 min-h-[90vh] flex items-center relative" id="packages-pricing-section">
        {/* Special background for pricing section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-light-purple)] to-[var(--bg-purple)] opacity-40"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4 heading-primary">Packages & Pricing</h2>
            <p className="text-xl text-[var(--text-secondary)] font-body max-w-2xl mx-auto">Clear & simple pricing for NZ businesses.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="saasy-card saasy-card-light pricing-card p-8 flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-2xl font-heading font-bold mb-4 text-[var(--card-text-light)]">Starter</h3>
                <p className="text-4xl font-bold mb-6 text-[var(--card-text-light)]">$99<span className="text-base font-normal text-gray-500">/month</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Microsoft 365 Business Basic</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Email setup & configuration</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Basic spam protection</span>
                  </li>
                </ul>
              </div>
              <Link to="/contact" className="saasy-button-primary w-full text-center py-3 rounded-md">
                Get Started
              </Link>
            </div>
            
            {/* Business Plan - Featured */}
            <div className="saasy-card saasy-card-light pricing-card-featured p-8 flex flex-col h-full relative">
              <div className="absolute -top-4 left-0 right-0 mx-auto w-max bg-[var(--accent-primary)] text-white px-6 py-1 rounded-full font-medium">
                Most Popular
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-heading font-bold mb-4 text-[var(--card-text-light)]">Business</h3>
                <p className="text-4xl font-bold mb-6 text-[var(--card-text-light)]">$199<span className="text-base font-normal text-gray-500">/month</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Microsoft 365 Business Standard</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Advanced email security</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Cloud backup for critical data</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Monthly support hours</span>
                  </li>
                </ul>
              </div>
              <Link to="/contact" className="saasy-button-primary w-full text-center py-3 rounded-md bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)]">
                Get Started
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div className="saasy-card saasy-card-light pricing-card p-8 flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-2xl font-heading font-bold mb-4 text-[var(--card-text-light)]">Enterprise</h3>
                <p className="text-4xl font-bold mb-6 text-[var(--card-text-light)]">$399<span className="text-base font-normal text-gray-500">/month</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Microsoft 365 Business Premium</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Enterprise-grade security</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Full cloud backup solution</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Priority support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Quarterly strategy sessions</span>
                  </li>
                </ul>
              </div>
              <Link to="/contact" className="saasy-button-primary w-full text-center py-3 rounded-md">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 min-h-[50vh] flex items-center" id="call-to-action-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-6 heading-primary">
            Ready to get started?
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            Let's chat about your cloud needs and find the perfect solution for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="saasy-button-primary px-8 py-4 text-lg font-medium rounded-md"
            >
              Contact Us
            </Link>
            <Link
              to="/tools"
              className="saasy-button-secondary px-8 py-4 text-lg font-medium rounded-md"
            >
              Explore Our Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="saasy-card saasy-card-dark p-8 transition-colors duration-200">
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h3 className="text-xl font-heading font-semibold heading-primary">{title}</h3>
      </div>
      <p className="text-[var(--text-secondary)]">{description}</p>
    </div>
  );
};

export default HomePage;
