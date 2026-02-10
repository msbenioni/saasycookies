import React from 'react';
import { ArrowRight, Globe, Users, HeartHandshake, Sparkles } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const PacificMarketPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <GlassCard className="p-8 md:p-12 shadow-none">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#10b981]" />
              <span className="text-sm font-medium text-[#10b981]">Pacific Market • Impact</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 heading-primary">
              Pacific creators deserve visibility, ownership, and digital opportunity
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-6">
              Pacific Market is a platform dedicated to helping Pacific creators and businesses become visible online. This page shares the story, the gap, and how technology can support cultural and community-led growth.
            </p>
            <div className="flex flex-wrap gap-3">
              {['support Pacific creators', 'Pacific artists online', 'Pacific small businesses digital', 'technology for indigenous creators'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs text-[#8b949e] bg-white/10 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[360px]">
            <div className="rounded-2xl border border-[#10b981] bg-[#161b22] p-6">
              <img src="/pacificmarket_logo.png" alt="Pacific Market" className="w-20 h-20 rounded-2xl object-cover mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Visit Pacific Market</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                A global directory for Pacific businesses, creators, and cultural practitioners.
              </p>
              <a
                href="https://pacificmarket.co.nz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#10b981] border border-[#10b981] hover:bg-[#10b981]/20 transition-all"
              >
                Visit Pacific Market
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">The Gap: Visibility for Pacific creators</h2>
            <p className="text-[var(--text-secondary)]">
              Pacific creators and small businesses often struggle to be found online. Platforms are crowded, discovery is hard, and cultural work can get overlooked.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">The Vision: A platform that elevates community</h2>
            <p className="text-[var(--text-secondary)]">
              Pacific Market exists to highlight Pacific excellence, connect audiences with creators, and help businesses grow with visibility and trust.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Technology as an enabler</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl border border-[#30363d] bg-[#0d1117]">
                <Globe className="w-6 h-6 text-[#10b981] mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Discovery & reach</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  A trusted directory helps Pacific creators get found by local and global audiences.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-[#30363d] bg-[#0d1117]">
                <Users className="w-6 h-6 text-[#6affd8] mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Community connection</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Build networks, collaborations, and cultural visibility in one place.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-[#30363d] bg-[#0d1117]">
                <HeartHandshake className="w-6 h-6 text-[#ff6ad5] mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Impact & legacy</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  A mission-driven platform that prioritizes long-term community impact.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#10b981] bg-[#161b22] p-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Why this matters to us</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Pacific Market is a long-term impact project. It’s about creating opportunity, supporting cultural practitioners, and building a platform that can grow into a future charity arm.
            </p>
            <a
              href="https://pacificmarket.co.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#10b981] hover:bg-[#0fa97a] transition-all"
            >
              Visit Pacific Market
              <ArrowRight className="w-4 h-4" />
            </a>
          </section>
        </div>
      </GlassCard>
    </div>
  );
};

export default PacificMarketPage;
