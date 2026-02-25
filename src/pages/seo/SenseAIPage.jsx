import { Link } from "react-router-dom";
import {
  Brain, ArrowRight, BookOpen, Lightbulb, Shield,
  TrendingUp, MessageSquare, Sparkles, Heart
} from "lucide-react";
import { PRODUCT_LOGOS } from "../../constants/productLogos";
import { ScrollDeckLayout, SENSEAI_SECTION_LABELS } from "../../components/shared/TabLayout";

const useCases = [
  {
    icon: BookOpen,
    title: "Daily Reflection",
    desc: "Turn scattered thoughts into grounded insight you can carry forward.",
  },
  {
    icon: Lightbulb,
    title: "Creative Thinking",
    desc: "Use prompts that unlock ideas, break mental loops, and move decisions forward.",
  },
  {
    icon: TrendingUp,
    title: "Goal Tracking",
    desc: "Stay consistent with gentle structure—and see patterns in what's helping or holding you back.",
  },
  {
    icon: Shield,
    title: "Emotional Processing",
    desc: "A private space to process feelings safely, with support that guides—not judges.",
  },
];

const sections = [
  { id: "senseai-hero", tab: SENSEAI_SECTION_LABELS.HERO, scrollable: false, content: (
    <div className="relative min-h-[80vh] flex items-center">
      <div
        className="absolute inset-0 animate-glow-pulse"
        style={{
          background:
            "radial-gradient(circle at 40% 30%, rgba(6,182,212,0.12) 0%, transparent 50%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 max-w-3xl">
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
              SenseAI helps you slow down and listen to your own thinking.
              Write freely. Then receive thoughtful prompts and reflections
              that help you grow with intention.
            </p>
          </div>

          {/* Large Hero Logo - Right Side */}
          <div className="flex-shrink-0">
            <div className="relative p-2 rounded-2xl bg-gradient-to-r from-senseai/30 via-senseai/20 to-transparent shadow-[0_0_60px_rgba(6,182,212,0.6),0_0_120px_rgba(6,182,212,0.4)]">
              <img
                src={PRODUCT_LOGOS.SENSEAI.src}
                alt={PRODUCT_LOGOS.SENSEAI.alt}
                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )},
  { id: "senseai-problem", tab: SENSEAI_SECTION_LABELS.PROBLEM, content: (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs font-medium text-senseai uppercase tracking-widest mb-4 block">
            {SENSEAI_SECTION_LABELS.PROBLEM}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
            We lost the art of thinking.
          </h2>
          <p className="text-zinc-200 text-lg leading-relaxed">
            Modern life moves fast.
            Most days, your thoughts never get the space they deserve.
          </p>
          <p className="text-zinc-200 text-lg leading-relaxed mt-6">
            A blank page doesn&apos;t guide you.
            And growth rarely happens by accident.
          </p>
        </div>
        <div className="relative">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/85 p-8">
            <img
              src="/senseai_art_of_thinking.png"
              alt="Person thinking deeply"
              className="w-full h-auto object-contain rounded-xl opacity-70"
            />
          </div>
        </div>
      </div>
    </div>
  )},
  { id: "senseai-shift", tab: SENSEAI_SECTION_LABELS.SHIFT, content: (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-full flex items-center">
      <div className="max-w-3xl mx-auto text-center w-full">
        <span className="text-xs font-medium text-senseai uppercase tracking-widest mb-4 block">
          {SENSEAI_SECTION_LABELS.SHIFT}
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
          What if your journal <span className="text-senseai">talked back?</span>
        </h2>
        <p className="text-zinc-200 text-lg leading-relaxed mb-8">
          SenseAI responds with curiosity, not judgment.
          It highlights patterns, asks deeper questions,
          and helps you notice how you&apos;re evolving over time.
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-zinc-300/80 text-sm">
            <MessageSquare className="w-4 h-4 text-senseai" strokeWidth={1.5} />
            AI-guided prompts
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-600" />
          <div className="flex items-center gap-2 text-zinc-300/80 text-sm">
            <Sparkles className="w-4 h-4 text-senseai" strokeWidth={1.5} />
            Pattern recognition
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-600" />
          <div className="flex items-center gap-2 text-zinc-300/80 text-sm">
            <Shield className="w-4 h-4 text-senseai" strokeWidth={1.5} />
            Private & secure
          </div>
        </div>
      </div>
    </div>
  )},
  { id: "senseai-usecases", tab: SENSEAI_SECTION_LABELS.USECASES, content: (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      <span className="text-xs font-medium text-senseai uppercase tracking-widest mb-4 block">
        {SENSEAI_SECTION_LABELS.USECASES}
      </span>
      <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-16">
        How it supports you daily
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {useCases.map((uc) => {
          const Icon = uc.icon;
          return (
            <div
              key={uc.title}
              data-testid={`usecase-${uc.title.toLowerCase().replace(/\s/g, "-")}`}
              className="group relative overflow-hidden bg-zinc-900/85 border border-white/10 hover:border-senseai/20 transition-all duration-500 rounded-xl p-8"
            >
              <div className="w-10 h-10 rounded-lg bg-senseai/10 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-senseai" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">{uc.title}</h3>
              <p className="text-zinc-200/80 text-sm leading-relaxed">{uc.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  )},
  { id: "senseai-cta", tab: SENSEAI_SECTION_LABELS.CTA, content: (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-full flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center w-full">
        <span className="text-xs font-medium text-senseai uppercase tracking-widest mb-4 block">
          {SENSEAI_SECTION_LABELS.CTA}
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Start journaling smarter
        </h2>
        <p className="text-zinc-300 text-lg mb-8 font-medium max-w-xl mx-auto">
          Start with one honest entry.
          Let clarity build from there.
        </p>
        <p className="text-zinc-400 text-sm mb-6">
          Built for thoughtful humans.
        </p>
        <a
          href="https://www.senseai.co.nz"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="senseai-cta-button"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-senseai text-black font-semibold px-7 py-3 hover:bg-senseai/80 transition"
        >
          <Brain className="w-4 h-4" strokeWidth={1.5} />
          Explore SenseAI
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </a>
      </div>
    </div>
  )},
];

export default function SenseAIPage() {
  return <ScrollDeckLayout sections={sections} topOffset={120} />;
}
