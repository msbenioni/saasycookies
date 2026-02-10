import React from 'react';
import { ArrowRight, Mic, Sparkles, PenLine, Brain } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const SenseAIPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <GlassCard className="p-8 md:p-12 shadow-none">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#b388ff]" />
              <span className="text-sm font-medium text-[#b388ff]">SenseAI • Thought Leadership</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 heading-primary">
              The AI Journaling Shift: Why Reflection Needs Better Tools
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-6">
              SenseAI explores how AI can make journaling more consistent, more insightful, and more accessible. This page is an educational overview of the problem, the shift in behavior, and the real-world use cases that led us to build SenseAI.
            </p>
            <div className="flex flex-wrap gap-3">
              {['AI journaling app', 'voice to text journaling', 'reflective journaling tools', 'AI mental wellness tools'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs text-[#8b949e] bg-white/10 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[360px]">
            <div className="rounded-2xl border border-[#6e40c9] bg-[#161b22] p-6">
              <img src="/senseai_logo.png" alt="SenseAI" className="w-20 h-20 rounded-2xl object-cover mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Explore SenseAI</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                SenseAI is an AI-powered journaling system for capturing thoughts through text, voice, or scans.
              </p>
              <a
                href="https://senseai.co.nz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#4337a5] hover:bg-[#5447b5] transition-all"
              >
                Explore SenseAI
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">The Problem: Journaling Is Hard to Maintain</h2>
            <p className="text-[var(--text-secondary)]">
              Traditional journaling relies on time, energy, and consistency. Most people start with intention, then fall off. The result is fragmented reflection and missed growth over time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">The Shift: AI Makes Reflection Easier</h2>
            <p className="text-[var(--text-secondary)]">
              AI can remove friction: summarizing entries, detecting patterns, and prompting deeper reflection. The goal isn’t to replace human thinking — it’s to support it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Real-World Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl border border-[#30363d] bg-[#0d1117]">
                <Mic className="w-6 h-6 text-[#6affd8] mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Voice journaling for busy parents</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Capture quick voice notes on the go, then review structured insights later.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-[#30363d] bg-[#0d1117]">
                <PenLine className="w-6 h-6 text-[#b388ff] mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Guided reflection for growth</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Prompts and summaries help turn scattered thoughts into clear next steps.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-[#30363d] bg-[#0d1117]">
                <Brain className="w-6 h-6 text-[#ff6ad5] mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Pattern tracking over time</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Detect habits, moods, and cycles to build a more intentional life.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#6e40c9] bg-[#161b22] p-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Why We Built SenseAI</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              We built SenseAI to make reflection less intimidating and more useful. It’s designed for real people who want clarity without the pressure of perfect journaling.
            </p>
            <a
              href="https://senseai.co.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#6affd8] via-[#b388ff] to-[#ff6ad5] hover:scale-105 transition-all"
            >
              Explore SenseAI
              <ArrowRight className="w-4 h-4" />
            </a>
          </section>
        </div>
      </GlassCard>
    </div>
  );
};

export default SenseAIPage;
