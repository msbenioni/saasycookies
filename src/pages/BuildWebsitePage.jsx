import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Check, X, ArrowRight, AlertTriangle, CheckCircle, Sparkles, CreditCard, ShieldCheck, ClipboardCheck, FileText } from "lucide-react";
import {
  SECTION_LABEL_STYLES,
  SECTION_TITLE_STYLES,
  CARD_STYLES,
  SECTION_DESCRIPTION_STYLES,
  FORM_GRID_CLASS,
  PAGE_BACKGROUND_STYLES,
  PAGE_HEADER_DESC_CLASS,
  PAGE_HEADER_ICON_CLASS,
  PAGE_HEADER_TITLE_CLASS,
  SECTION_TITLE_CLASS,
  TEXT_COLORS,
  BG_COLORS,
} from "../constants/formStyles";
import { usePricing } from "../hooks/usePricing";
import { ScrollDeckLayout } from "../components/shared/TabLayout";
import { PRODUCT_LOGOS } from "../constants/productLogos";
import CallToAction from "../components/shared/CallToAction";

const BUILD_SECTION_LABELS = {
  HERO: "What We Do",
  FIT: "Fit Check",
  PLANS: "Build Me A Website",
  START: "Start for $10",
  HOW: "How It Works",
  WHY: "Why Not DIY",
  FAQ: "FAQs",
  CTA: "Submit Brief",
};

const journeySteps = [
  {
    title: "Pick a plan (don't overthink it)",
    description: "Choose Starter, Growth, or Authority based on your stage. We'll confirm fit after your brief.",
  },
  {
    title: "Submit your project brief",
    description: "Share your offer, goals, pages/funnels needed, and any integrations so we can scope correctly.",
  },
  {
    title: "We confirm plan + scope",
    description: "You'll receive a recommended plan, inclusions, timeline, and any add-ons (if needed).",
  },
  {
    title: "Secure your build",
    description: "Once payment is confirmed, your build is scheduled and onboarding begins.",
  },
  {
    title: "Build + deploy",
    description: "We design, configure, and launch your infrastructure (most subscription builds go live ~2 weeks).",
  },
  {
    title: "Ongoing management",
    description: "We maintain, improve, and support your system so you can focus on growth.",
  },
];

const fitChecks = [
  "You're done with DIY website builders",
  "You want a system that sells (not just pages)",
  "You sell programs, services, products, or expertise",
  "You want the backend handled (hosting, security, integrations)",
  "You value clarity, structure, and long-term growth",
];

const faqItems = [];

function getTierSlug(tier) {
  return (
    tier.slug ||
    tier.name
      .toLowerCase()
      .replace(/\$/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  );
}

function isMostPopularTier(tier) {
  const price = String(tier.price || "");
  return tier.highlight || price.includes("79");
}

function TierCardV2({ tier, onOpenModal }) {
  const popular = isMostPopularTier(tier);
  const slug = getTierSlug(tier);

  return (
    <article
      className={[
        "relative overflow-hidden rounded-3xl border",
        popular
          ? "border-emerald-400/40 bg-emerald-400/5"
          : "border-white/10 bg-white/[0.02]",
      ].join(" ")}
    >
      {popular && (
        <div className="absolute top-4 right-4">
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/30">
            <Sparkles className="w-3 h-3 text-emerald-300" />
            <span className="text-xs font-medium text-emerald-300">Most Popular</span>
          </div>
        </div>
      )}

      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">{tier.name}</h3>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{tier.price}</div>
            <div className="text-sm text-zinc-400">/month</div>
          </div>
        </div>

        <p className="text-zinc-300 mb-6">{tier.description}</p>

        <ul className="space-y-3 mb-8">
          {tier.features?.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-zinc-200">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <button
            onClick={() => onOpenModal(tier)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 text-black hover:bg-emerald-300 px-6 py-3 font-semibold transition"
          >
            Get Started
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </button>
          <button
            className="w-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm text-cyan-200 hover:text-cyan-100 font-semibold"
          >
            View inclusions
          </button>
        </div>
      </div>
    </article>
  );
}

export default function BuildWebsitePage() {
  const { pricingTiers } = usePricing();
  const location = useLocation();
  const [selectedTier, setSelectedTier] = useState(null);

  // Show loading state while pricing data is loading
  if (!pricingTiers || pricingTiers.length === 0) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Modal component
  const InclusionsModal = () => {
    if (!selectedTier) return null;

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={() => setSelectedTier(null)}
      >
        <div 
          className="bg-[#0b0f14] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedTier.name} — Inclusions
              </h2>
              <button
                onClick={() => setSelectedTier(null)}
                className="text-zinc-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="text-3xl font-bold text-white">
                {selectedTier.price}
                <span className="text-lg text-zinc-400 font-normal">/month</span>
              </div>
            </div>

            <div className="space-y-4">
              {selectedTier.inclusions?.map((inclusion, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-white">{inclusion.title}</div>
                    <div className="text-sm text-zinc-400 mt-1">{inclusion.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                to="/services/ai-saas"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 text-black hover:bg-emerald-300 px-6 py-3 font-semibold transition"
              >
                Get Started
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <button
                onClick={() => setSelectedTier(null)}
                className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3 text-white font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const sections = [
    {
      id: "build-hero",
      tab: BUILD_SECTION_LABELS.HERO,
      scrollable: false,
      content: (
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, rgba(16,185,129,0.14) 0%, transparent 55%)",
            }}
          />

          <div className="relative w-full px-6 md:px-12 lg:px-24 py-24">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <div className="max-w-[70ch]">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-8">
                      <CreditCard className="w-3 h-3" strokeWidth={1.5} />
                      {BUILD_SECTION_LABELS.HERO}
                    </div>

                    <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] max-w-[20ch]">
                      Managed
                      <br />
                      <span className="text-emerald-400">Website + Funnel Infrastructure</span>
                      <br />
                      for Founders.
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-zinc-200 leading-relaxed max-w-[52ch]">
                      Stop wrestling with DIY tools. We build and manage your complete website,
                      funnel, and payment infrastructure so you can focus on growing your business.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/services/ai-saas"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 text-black hover:bg-emerald-300 px-7 py-3 font-semibold transition"
                      >
                        Start Your Build
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      </Link>
                      <Link
                        to="#plans"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-7 py-3 font-semibold text-white transition"
                      >
                        View Plans
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-400/10 rounded-3xl blur-3xl" />
                    <div className="relative bg-[#0b0f14] border border-white/10 rounded-3xl p-8">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-emerald-300" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">30-Day Build Phase</div>
                            <div className="text-sm text-zinc-400">Launch in 2 weeks or less</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-emerald-300" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">Fully Managed</div>
                            <div className="text-sm text-zinc-400">Hosting, security, updates</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
                            <ClipboardCheck className="w-5 h-5 text-emerald-300" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">Revenue Ready</div>
                            <div className="text-sm text-zinc-400">Payments, funnels, automation</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "build-fit",
      tab: BUILD_SECTION_LABELS.FIT,
      content: (
        <section className="py-10 md:py-14 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{BUILD_SECTION_LABELS.FIT}</span>
            </div>

            <h2 className={SECTION_TITLE_STYLES.small}>Is this for you?</h2>

            <div className="mt-10 space-y-4">
              {fitChecks.map((check, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-200">{check}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="#plans"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 text-black hover:bg-emerald-300 px-7 py-3 font-semibold transition"
              >
                See Plans & Pricing
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "plans",
      tab: BUILD_SECTION_LABELS.PLANS,
      content: (
        <section className="py-10 md:py-14 bg-white/[0.02]">
          <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{BUILD_SECTION_LABELS.PLANS}</span>
            </div>

            <div className="mt-10 mx-auto w-full max-w-[1480px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricingTiers.map((tier) => (
                  <TierCardV2 key={tier.name} tier={tier} onOpenModal={setSelectedTier} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "build-start",
      tab: BUILD_SECTION_LABELS.START,
      content: (
        <section className="py-10 md:py-14 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{BUILD_SECTION_LABELS.START}</span>
            </div>

            <h2 className={SECTION_TITLE_STYLES.small}>Start for $10</h2>

            <div className="mt-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">What happens next</h3>
                  <ol className="space-y-3 text-sm text-zinc-300">
                    <li>1. Submit your project brief</li>
                    <li>2. We review and confirm the best plan</li>
                    <li>3. We send a custom quote (if needed)</li>
                    <li>4. You approve and we begin the build</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">What we need from you</h3>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li>• Your business goals and offer</li>
                    <li>• Required pages and features</li>
                    <li>• Any existing tools/integrations</li>
                    <li>• Timeline and budget expectations</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Link
                  to="/services/ai-saas"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 text-black hover:bg-emerald-300 px-7 py-3 font-semibold transition"
                >
                  Submit Project Brief
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "build-how",
      tab: BUILD_SECTION_LABELS.HOW,
      content: (
        <section className="py-10 md:py-14 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{BUILD_SECTION_LABELS.HOW}</span>
            </div>

            <h2 className={SECTION_TITLE_STYLES.small}>How it works</h2>

            <div className="mt-10 space-y-6">
              {journeySteps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-sm font-semibold text-emerald-300">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm text-zinc-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "build-why",
      tab: BUILD_SECTION_LABELS.WHY,
      content: (
        <section className="py-10 md:py-14 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{BUILD_SECTION_LABELS.WHY}</span>
            </div>

            <h2 className={SECTION_TITLE_STYLES.small}>Why not DIY</h2>

            <div className="mt-10 space-y-6">
              {[
                {
                  diy: "You manage hosting",
                  diySub: "hosting, security, updates, maintenance",
                  saasy: "We manage the stack",
                  saasySub: "stable hosting + monitoring + fixes",
                },
                {
                  diy: "You troubleshoot growth",
                  diySub: "integrations break, leads leak, time drains",
                  saasy: "We handle integrations",
                  saasySub: "forms → CRM → email → booking → payments",
                },
                {
                  diy: "You patch revenue flow",
                  diySub: "funnels, checkout, follow-up don't connect",
                  saasy: "You get a revenue-ready flow",
                  saasySub: "website → funnel → payment → automation",
                },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <X className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">{row.diy}</p>
                      <p className="text-zinc-400 text-sm mt-1">{row.diySub}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">{row.saasy}</p>
                      <p className="text-zinc-400 text-sm mt-1">{row.saasySub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "build-cta",
      tab: BUILD_SECTION_LABELS.CTA,
      scrollable: false,
      content: (
        <CallToAction
          badge={BUILD_SECTION_LABELS.CTA}
          headline={
            <>
              Stop managing your website.
              <br />
              <span className="text-emerald-400">Start running your business.</span>
            </>
          }
          subheadline="Submit a brief — we'll confirm the best plan and next steps."
          customBriefLink="/services/ai-saas"
          customBriefText="Submit a Custom Build Brief"
        />
      ),
    },
  ];

  return (
    <>
      <div data-scroll-container>
        <ScrollDeckLayout sections={sections} />
      </div>
      <InclusionsModal />
    </>
  );
}
