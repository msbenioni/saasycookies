import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import SaasyCtaButton from '../components/SaasyCtaButton';
import SaasySoftButton from '../components/SaasySoftButton';
import { QrCode, FileSpreadsheet } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="scene-section relative overflow-hidden" id="hero-section">
        <div className="parallax-bg" aria-hidden="true"></div>
        <GlassCard className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 relative z-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 heading-primary">
              Cloud & Software Help for NZ Small Businesses
            </h1>
            <p className="text-xl mb-8 text-[var(--text-secondary)]">
              We provide cloud services and software solutions tailored for local legends running real NZ businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <SaasyCtaButton to="/contact">Get Started</SaasyCtaButton>
              <SaasySoftButton to="/about">Learn More About Us</SaasySoftButton>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <GlassCard className="w-full max-w-md p-6 shadow-xl bg-transparent border-0 inner-card">
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
            </GlassCard>
          </div>
        </GlassCard>
      </section>

      {/* Meet Our Team Section */}
      <section id="team-section" className="scene-section">
        <GlassCard className="w-full max-w-6xl mx-auto flex flex-col items-center relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 heading-primary">Meet Our Team</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              The friendly faces behind SaaSy Cookies who make cloud services simple.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Team Member 1 */}
            <GlassCard className="flex flex-col items-center text-center p-8 inner-card">
              <div className="feature-icon-container icon-purple mb-4" style={{width: "100px", height: "100px", margin: "0 auto"}}>
                <svg className="h-12 w-12 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="team-member-name text-[var(--text-primary)]">Cookie Cloud</h3>
              <p className="team-member-role text-[var(--accent-primary)]">Cloud Specialist</p>
              <p className="team-member-bio text-[var(--text-secondary)]">
                Specializes in Microsoft 365 and cloud security solutions.
              </p>
            </GlassCard>
            {/* Team Member 2 */}
            <GlassCard className="flex flex-col items-center text-center p-8 inner-card">
              <div className="feature-icon-container icon-purple mb-4" style={{width: "100px", height: "100px", margin: "0 auto"}}>
                <svg className="h-12 w-12 text-[#3fb950]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3 className="team-member-name text-[var(--text-primary)]">SaaSy Sam</h3>
              <p className="team-member-role text-[#3fb950]">Software Engineer</p>
              <p className="team-member-bio text-[var(--text-secondary)]">
                Builds custom solutions and integrations for small businesses.
              </p>
            </GlassCard>
            {/* Team Member 3 */}
            <GlassCard className="flex flex-col items-center text-center p-8 inner-card">
              <div className="feature-icon-container icon-purple mb-4" style={{width: "100px", height: "100px", margin: "0 auto"}}>
                <svg className="h-12 w-12 text-[#f0883e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="6" stroke="currentColor" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v4" />
                </svg>
              </div>
              <h3 className="team-member-name text-[var(--text-primary)]">Glow Cookie</h3>
              <p className="team-member-role text-[#f0883e]">Support & Training</p>
              <p className="team-member-bio text-[var(--text-secondary)]">
                Helps you and your team get the most from your cloud tools.
              </p>
            </GlassCard>
          </div>
        </GlassCard>
      </section>

      {/* Spacer Section */}
      <section className="h-10 md:h-16"></section>

      <section className="scene-section" id="why-we-exist-section">
        <GlassCard className="w-full max-w-3xl mx-auto flex flex-col items-center relative z-10">
          <h3 className="text-center gradient-heading text-2xl mb-4">Why SaaSy Cookies Exists</h3>
          <p className="mb-4">
            We created SaaSy Cookies because we believe NZ small businesses deserve cloud services that are easy to understand, 
            fairly priced, and supported by real humans who speak plain English.
          </p>
          <p>
            No technical jargon, no overseas call centers, just straightforward cloud solutions from local experts 
            who understand the unique needs of Kiwi businesses.
          </p>
        </GlassCard>
      </section>

      {/* Spacer Section */}
      <section className="h-10 md:h-16"></section>

      {/* Features Section */}
      <section className="scene-section" id="features-section">
        <GlassCard className="w-full max-w-6xl mx-auto flex flex-col items-center relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 heading-primary">SaaSy Features</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Our cloud services are designed to make your business more efficient and secure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {/* Feature 1 */}
            <GlassCard className="flex flex-col items-center text-center p-8 inner-card">
              <div className="feature-icon-container icon-purple mb-4">
                <svg className="h-8 w-8 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 flex items-center text-[var(--text-primary)]">
                Microsoft 365 Setup
                <span className="fun-fact-container">
                  <svg className="h-5 w-5 fun-fact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="fun-fact-tooltip">Secretly loves spreadsheets and can automate your Excel formulas!</span>
                </span>
              </h3>
              <p className="text-[var(--text-secondary)]">Seamless onboarding and setup for your team.</p>
            </GlassCard>
            {/* Feature 2 */}
            <GlassCard className="flex flex-col items-center text-center p-8 inner-card">
              <div className="feature-icon-container icon-green mb-4">
                <svg className="h-8 w-8 text-[var(--icon-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 flex items-center text-[var(--text-primary)]">Cloud Security</h3>
              <p className="text-[var(--text-secondary)]">Protect your data with best-in-class security tools.</p>
            </GlassCard>
            {/* Feature 3 */}
            <GlassCard className="flex flex-col items-center text-center p-8 inner-card">
              <div className="feature-icon-container icon-blue mb-4">
                <svg className="h-8 w-8 text-[#2196f3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 flex items-center text-[var(--text-primary)]">Cloud Backup</h3>
              <p className="text-[var(--text-secondary)]">Automatic, encrypted backups for peace of mind.</p>
            </GlassCard>
            {/* Feature 4 */}
            <GlassCard className="flex flex-col items-center text-center p-8 inner-card">
              <div className="feature-icon-container icon-orange mb-4">
                <svg className="h-8 w-8 text-[#f0883e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 flex items-center text-[var(--text-primary)]">Email Protection</h3>
              <p className="text-[var(--text-secondary)]">Keep your inbox safe from spam and phishing.</p>
            </GlassCard>
            {/* Feature 5 */}
            <GlassCard className="flex flex-col items-center text-center p-8 inner-card">
              <div className="feature-icon-container icon-purple mb-4">
                <svg className="h-8 w-8 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 flex items-center text-[var(--text-primary)]">Local Support</h3>
              <p className="text-[var(--text-secondary)]">Real people, real help, right here in NZ.</p>
            </GlassCard>
            {/* Feature 6 */}
            <GlassCard className="flex flex-col items-center text-center p-8 inner-card">
              <div className="feature-icon-container icon-mint mb-4">
                <svg className="h-8 w-8 text-[var(--neon-mint)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 flex items-center text-[var(--text-primary)]">Integrations</h3>
              <p className="text-[var(--text-secondary)]">Connect your favourite apps and automate workflows.</p>
            </GlassCard>
          </div>
        </GlassCard>
      </section>

      {/* Spacer Section */}
      <section className="h-10 md:h-16"></section>
      
      {/* Free Tools Section */}
      <section className="scene-section" id="tools-section">
        <GlassCard className="w-full max-w-6xl mx-auto flex flex-col items-center relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 heading-primary">Free Tools</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Try our free business tools designed to make your work easier. No sign-up required!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Tool 1: Invoice Generator */}
            <GlassCard className="flex flex-col items-center text-center p-8 inner-card h-full">
              <div className="feature-icon-container icon-blue mb-6">
                <FileSpreadsheet className="h-8 w-8 text-[#2196f3]" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[var(--text-primary)]">Invoice Generator</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Create professional invoices for your clients in seconds. Customize with your logo, download as PDF, and more.
              </p>
              <Link to="/tools/invoice" className="saasy-button-secondary mt-auto w-full py-3 rounded-md">
                Create Invoice
              </Link>
            </GlassCard>
            
            {/* Tool 2: QR Code Generator */}
            <GlassCard className="flex flex-col items-center text-center p-8 inner-card h-full">
              <div className="feature-icon-container icon-purple mb-6">
                <QrCode className="h-8 w-8 text-[var(--accent-primary)]" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[var(--text-primary)]">QR Code Generator</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Generate custom QR codes for your URLs, contact info, WiFi networks, and more. Add your logo and customize colors.
              </p>
              <Link to="/tools/qrcode" className="saasy-button-secondary mt-auto w-full py-3 rounded-md">
                Create QR Code
              </Link>
            </GlassCard>
          </div>
        </GlassCard>
      </section>

      {/* Spacer Section */}
      <section className="h-10 md:h-16"></section>

      {/* Pricing Section */}
      <section className="scene-section" id="pricing-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 heading-primary">Simple, Transparent Pricing</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Choose the plan that works best for your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <GlassCard className="flex flex-col h-full p-6 inner-card">
              <div className="mb-6">
                <span className="plan-tag plan-tag-starter">Best for Solopreneurs</span>
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <p className="text-3xl font-bold mb-4">$99<span className="text-lg font-normal">/month</span></p>
                <p className="text-[var(--text-secondary)] mb-6">Perfect for freelancers and small startups.</p>
              </div>
              <div className="flex-grow">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Microsoft 365 setup</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Email protection</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Basic cloud backup</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Email support</span>
                  </li>
                </ul>
              </div>
              <Link to="/contact" className="saasy-button-primary w-full text-center py-3 rounded-md">
                Get Started
              </Link>
            </GlassCard>
            
            {/* Business Plan */}
            <GlassCard className="flex flex-col h-full p-6 relative transform scale-105 z-10 shadow-xl inner-card">
              <div className="absolute top-0 right-0 bg-[var(--accent-primary)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <div className="mb-6">
                <span className="plan-tag plan-tag-business">Most Popular for SMEs</span>
                <h3 className="text-2xl font-bold mb-2">Business</h3>
                <p className="text-3xl font-bold mb-4">$199<span className="text-lg font-normal">/month</span></p>
                <p className="text-[var(--text-secondary)] mb-6">Ideal for growing businesses with multiple employees.</p>
              </div>
              <div className="flex-grow">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Everything in Starter</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Advanced security</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Cloud file sharing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Phone & email support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Monthly check-ins</span>
                  </li>
                </ul>
              </div>
              <Link to="/contact" className="saasy-button-primary w-full text-center py-3 rounded-md">
                Get Started
              </Link>
            </GlassCard>
            
            {/* Enterprise Plan */}
            <GlassCard className="flex flex-col h-full p-6 inner-card">
              <div className="mb-6">
                <span className="plan-tag plan-tag-enterprise">Best for Larger Teams</span>
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-3xl font-bold mb-4">$399<span className="text-lg font-normal">/month</span></p>
                <p className="text-[var(--text-secondary)] mb-6">For established businesses with advanced needs.</p>
              </div>
              <div className="flex-grow">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Everything in Business</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Custom integrations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Advanced analytics</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-[#3fb950] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Dedicated account manager</span>
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
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Spacer Section */}
      <section className="h-10 md:h-16"></section>

      {/* Call to Action */}
      <section className="scene-section" id="call-to-action-section">
        {/* Cloud-like background patterns */}
        <div className="cloud-pattern cloud-pattern-1"></div>
        <div className="cloud-pattern cloud-pattern-3"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-6 heading-primary">
            Still not sure what you need? Let's chat.
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            We're here to help local NZ businesses find the perfect cloud solution. No tech jargon, just friendly advice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="saasy-button-cta px-8 py-4 text-lg font-medium rounded-md"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="saasy-button-soft-cta px-8 py-4 text-lg font-medium rounded-md"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Up Button (Scroll to Top) */}
      <button
        aria-label="Scroll to top"
        className="fixed right-6 bottom-8 z-40 bg-[var(--accent-primary)] text-white rounded-full shadow-lg p-3 hover:bg-[var(--accent-secondary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
        style={{display: 'inline-flex', alignItems: 'center'}}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default HomePage;
