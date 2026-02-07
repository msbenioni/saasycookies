import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Briefcase, Wrench, ArrowRight, Sparkles, FileText, ExternalLink } from 'lucide-react';
import { brand } from '../design-tokens';
import GlassCard from '../components/GlassCard';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen scroll-gradient text-white font-body">
      {/* Hero Section */}
      <section className="scene-section relative overflow-hidden" id="hero-section">
        <div className="parallax-bg" aria-hidden="true"></div>
        <GlassCard className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 relative z-10">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#6affd8]" />
              <span className="text-sm font-medium text-[#b388ff]">Product Studio</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 heading-primary">
              Building the future,
              <br />
              <span className="gradient-heading">one line at a time</span>
            </h1>
            <p className="text-xl mb-8 text-[var(--text-secondary)]">
              We design practical AI-powered apps that support everyday people, creators, and small businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-[#4337a5] hover:bg-[#5447b5] transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Explore Our Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://senseai.co.nz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 border border-[#6e40c9] text-[#b388ff] hover:bg-[#6e40c9]/20"
              >
                Try SenseAI
                <ExternalLink className="w-5 h-5" />
              </a>
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
                <p className="terminal-output">✓ Initializing AI tools...</p>
                <p className="terminal-output">✓ Loading SenseAI Journal...</p>
                <p className="terminal-output">✓ Configuring Invoice Generator...</p>
                <p className="terminal-output">✓ Ready for launch.</p>
                <p className="terminal-success">✓ All systems online.</p>
              </div>
            </GlassCard>
          </div>
        </GlassCard>
      </section>

      {/* What We Build Section */}
      <section className="scene-section">
        <GlassCard className="w-full max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-primary">
              What We Build
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Practical AI tools that solve real problems for real people
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Personal Growth */}
            <div className="p-6 rounded-xl bg-[#161b22] border border-[#30363d] transition-all duration-300 hover:border-[#9e83ff] hover:shadow-[0_0_16px_2px_#9e83ff]">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-[#6e40c9]/20">
                <Brain className="w-7 h-7 text-[#9e83ff]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {brand.categories.personal.title}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {brand.categories.personal.description}
              </p>
            </div>

            {/* Small Business */}
            <div className="p-6 rounded-xl bg-[#161b22] border border-[#30363d] transition-all duration-300 hover:border-[#6affd8] hover:shadow-[0_0_16px_2px_#6affd8]">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-[#3fb950]/20">
                <Briefcase className="w-7 h-7 text-[#6affd8]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {brand.categories.business.title}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {brand.categories.business.description}
              </p>
            </div>

            {/* Utility Tools */}
            <div className="p-6 rounded-xl bg-[#161b22] border border-[#30363d] transition-all duration-300 hover:border-[#ff6ad5] hover:shadow-[0_0_16px_2px_#ff6ad5]">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-[#ff6ad5]/20">
                <Wrench className="w-7 h-7 text-[#ff6ad5]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {brand.categories.utility.title}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {brand.categories.utility.description}
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Our Products Section */}
      <section className="scene-section">
        <GlassCard className="w-full max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-primary">
              Our Products
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Built with care, designed for humans
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* SenseAI Journal */}
            <div className="group p-8 rounded-2xl bg-[#161b22] border border-[#6e40c9] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_4px_#6e40c9] flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r from-[#6affd8] via-[#b388ff] to-[#ff6ad5]">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#3fb950]/20 text-[#3fb950]">
                  Live
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-white">
                {brand.products.senseai.name}
              </h3>
              <p className="text-lg mb-3 font-medium text-[#b388ff]">
                {brand.products.senseai.tagline}
              </p>
              <p className="mb-6 text-[var(--text-secondary)] flex-grow">
                {brand.products.senseai.description}
              </p>
              
              <a
                href={brand.products.senseai.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 group-hover:gap-3 bg-[#6e40c9]/20 text-[#b388ff] hover:bg-[#6e40c9]/30 border border-[#6e40c9] mt-auto"
              >
                Try App
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Smart Invoice Generator */}
            <div className="group p-8 rounded-2xl bg-[#161b22] border border-[#f0883e] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_4px_#f0883e] flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#f0883e]">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#3fb950]/20 text-[#3fb950]">
                  Free
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-white">
                {brand.products.invoice.name}
              </h3>
              <p className="text-lg mb-3 font-medium text-[#f0883e]">
                {brand.products.invoice.tagline}
              </p>
              <p className="mb-6 text-[var(--text-secondary)] flex-grow">
                {brand.products.invoice.description}
              </p>
              
              <Link
                to="/tools/invoice"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 group-hover:gap-3 bg-[#f0883e]/20 text-[#f0883e] hover:bg-[#f0883e]/30 border border-[#f0883e] mt-auto"
              >
                Use Tool
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {/* See More Indicator */}
          <div className="mt-8 text-center">
            <Link 
              to="/tools" 
              className="inline-flex items-center gap-2 text-[#8b949e] hover:text-[#b388ff] transition-colors group"
            >
              <span className="text-sm font-medium">See all tools</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* Why SaaSy Cookies Exists */}
      <section className="scene-section">
        <GlassCard className="w-full max-w-4xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 heading-primary">
              Why {brand.name} Exists
            </h2>
            <p className="text-lg leading-relaxed mb-6 text-[var(--text-secondary)]">
              {brand.name} was created to make AI feel less overwhelming and more human. 
              We believe AI should support everyday thinking, creativity, and small business life — 
              not replace people, but empower them.
            </p>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              Every tool we build starts with a simple question: <em className="text-[#b388ff]">How can we make this actually useful for real people?</em>
            </p>
          </div>
        </GlassCard>
      </section>

      {/* Call to Action */}
      <section className="scene-section">
        <GlassCard className="w-full max-w-4xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 heading-primary">
              Ready to try our tools?
            </h2>
            <p className="text-lg mb-8 text-[var(--text-secondary)]">
              Explore our growing collection of AI-powered tools designed for real life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg bg-gradient-to-r from-[#6affd8] via-[#b388ff] to-[#ff6ad5]"
              >
                <Wrench className="w-5 h-5" />
                Browse All Tools
              </Link>
              <Link
                to="/tools/invoice"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 border-2 border-[#9e83ff] text-[#9e83ff] hover:bg-[#9e83ff]/20"
              >
                <FileText className="w-5 h-5" />
                Create Invoice
              </Link>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Up Button */}
      <button
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed right-6 bottom-8 z-40 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 bg-gradient-to-r from-[#6affd8] via-[#b388ff] to-[#ff6ad5] text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default HomePage;
