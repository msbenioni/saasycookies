import { Link } from "react-router-dom";
import {
  Brain, ArrowRight, BookOpen, Lightbulb, Shield,
  TrendingUp, MessageSquare, Sparkles, Heart
} from "lucide-react";

const useCases = [
  {
    icon: BookOpen,
    title: "Daily Reflection",
    desc: "Capture your thoughts and let AI surface patterns you'd never notice on your own.",
  },
  {
    icon: Lightbulb,
    title: "Creative Thinking",
    desc: "Use guided prompts to unlock ideas, solve problems, and think through decisions.",
  },
  {
    icon: TrendingUp,
    title: "Goal Tracking",
    desc: "Set intentions, track progress, and get AI insights on your personal growth journey.",
  },
  {
    icon: Shield,
    title: "Mental Wellness",
    desc: "Private, secure journaling with AI that helps you process emotions constructively.",
  },
];

export default function SenseAIPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section data-testid="senseai-hero" className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle at 40% 30%, rgba(6,182,212,0.12) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-senseai/10 border border-senseai/20 text-senseai text-xs font-medium mb-8">
              <Brain className="w-3 h-3" strokeWidth={1.5} />
              SenseAI by SaaSy Cookies
            </div>

            <h1
              data-testid="senseai-title"
              className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-6"
            >
              Journaling that
              <br />
              <span className="text-senseai">thinks with you.</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl mb-10">
              Most journals are just blank pages. SenseAI is an AI-powered
              companion that helps you reflect deeper, think clearer, and grow
              faster.
            </p>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section data-testid="senseai-problem" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-medium text-senseai uppercase tracking-widest mb-4 block">
                The Problem
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
                We lost the art of thinking.
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                In a world of endless scrolling and instant answers, deep thinking
                has become a lost skill. We consume more than we create. We react
                more than we reflect. Journaling was supposed to help, but most
                people quit within a week because staring at a blank page feels
                pointless.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/5 bg-zinc-900/40 p-8">
                <img
                  src="https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?w=600&h=400&fit=crop"
                  alt="Person thinking deeply"
                  className="w-full h-64 object-cover rounded-xl opacity-60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Shift */}
      <section data-testid="senseai-shift" className="py-24 md:py-32 bg-void-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-medium text-senseai uppercase tracking-widest mb-4 block">
              The Shift
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
              What if your journal <span className="text-senseai">talked back?</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              SenseAI doesn&apos;t just store your words. It understands them. It
              asks follow-up questions, surfaces patterns across weeks and months,
              and helps you see your life from angles you&apos;d never consider alone.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <MessageSquare className="w-4 h-4 text-senseai" strokeWidth={1.5} />
                AI-guided prompts
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-700" />
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <Sparkles className="w-4 h-4 text-senseai" strokeWidth={1.5} />
                Pattern recognition
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-700" />
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <Shield className="w-4 h-4 text-senseai" strokeWidth={1.5} />
                Private & secure
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section data-testid="senseai-usecases" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4 block">
            Use Cases
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-16">
            Built for how you actually think
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div
                  key={uc.title}
                  data-testid={`usecase-${uc.title.toLowerCase().replace(/\s/g, "-")}`}
                  className="group relative overflow-hidden bg-zinc-900/40 border border-white/5 hover:border-senseai/20 transition-all duration-500 rounded-xl p-8"
                >
                  <div className="w-10 h-10 rounded-lg bg-senseai/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-senseai" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{uc.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{uc.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder POV */}
      <section data-testid="senseai-founder" className="py-24 md:py-32 bg-void-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-senseai/10 border border-senseai/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-senseai" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                From the Founder
              </span>
            </div>
            <blockquote className="font-heading text-2xl md:text-3xl font-semibold leading-relaxed mb-6 text-zinc-200">
              &ldquo;I built SenseAI because I needed it. I journaled for years
              but never saw the bigger picture. AI changed that&mdash;it showed me
              patterns in my thinking I was completely blind to.&rdquo;
            </blockquote>
            <p className="text-zinc-500">
              &mdash; Founder, SaaSy Cookies
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-testid="senseai-cta" className="py-24 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Start journaling smarter
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
            SenseAI is the journaling tool for people who think deeply. Try it and
            discover what your mind has been trying to tell you.
          </p>
          <Link
            to="/"
            data-testid="senseai-cta-button"
            className="inline-flex items-center gap-2 bg-senseai text-black font-semibold px-8 py-3 rounded-md transition-all duration-300 hover:bg-senseai/80 hover:scale-[1.02]"
          >
            <Brain className="w-4 h-4" strokeWidth={1.5} />
            Explore SenseAI
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </div>
  );
}
