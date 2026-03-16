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
import { createAuditCheckout } from "../utils/auditService";
import CallToAction from "../components/shared/CallToAction";

const PRICING_SECTION_LABELS = {
  HERO: "What We Do",
  FIT: "Fit Check",
  PLANS: "Build Me A Website",
  AUDIT: "Audit My Business",
  START: "Start for $10",
  HOW: "How It Works",
  WHY: "Why Not DIY",
  CTA: "Submit Brief",
};

const journeySteps = [
  {
    title: "Pick a plan (don’t overthink it)",
    description: "Choose Starter, Growth, or Authority based on your stage. We’ll confirm fit after your brief.",
  },
  {
    title: "Submit your project brief",
    description: "Share your offer, goals, pages/funnels needed, and any integrations so we can scope correctly.",
  },
  {
    title: "We confirm plan + scope",
    description: "You’ll receive a recommended plan, inclusions, timeline, and any add-ons (if needed).",
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
  "You’re done with DIY website builders",
  "You want a system that sells (not just pages)",
  "You sell programs, services, products, or expertise",
  "You want the backend handled (hosting, security, integrations)",
  "You value clarity, structure, and long-term growth",
];

const faqItems = [];

function getTierSlug(tier) {
  // Prefer tier.slug if you add it in usePricing(); fallback to name parsing.
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
  // Force $79 to be "Most Popular" even if highlight is not set.
  // If your tier.price includes currency symbols, this still catches "$79".
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
        popular ? "border-emerald-400/40" : "border-white/10",
        popular
          ? "bg-gradient-to-b from-emerald-500/10 via-white/[0.02] to-white/[0.01] shadow-[0_24px_80px_-50px_rgba(16,185,129,0.8)]"
          : "bg-white/[0.02] hover:bg-white/[0.03]",
        "transition"
      ].join(" ")}
    >
      {/* ambient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background: popular
            ? "radial-gradient(circle at 20% 0%, rgba(16,185,129,0.25) 0%, transparent 55%), radial-gradient(circle at 80% 30%, rgba(6,182,212,0.16) 0%, transparent 60%)"
            : "radial-gradient(circle at 30% 0%, rgba(6,182,212,0.12) 0%, transparent 55%)",
        }}
      />

      {/* top accent bar */}
      <div className={popular
        ? "h-1 bg-gradient-to-r from-emerald-400 via-cyan-300 to-transparent"
        : "h-1 bg-gradient-to-r from-zinc-700 via-zinc-800 to-transparent"
      } />

      <div className="relative p-6 md:p-7 flex flex-col h-full">
        {/* Header content */}
        <div>
          {/* Badge */}
          {popular ? (
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-200 bg-emerald-400/10 border border-emerald-400/30 rounded-full px-3 py-1 mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              Most Popular
            </div>
          ) : (
            <div className="text-xs text-zinc-400 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4 inline-flex w-fit">
              {tier.badge || "Plan"}
            </div>
          )}

          {/* Plan name */}
          <h3 className="font-heading text-2xl font-extrabold text-white leading-tight">
            {tier.name}
          </h3>

          {/* Price */}
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-white leading-none">
              {tier.price}
            </div>
            <div className="text-sm text-zinc-400 mt-2">
              {tier.subtitle || "12-month minimum"}
            </div>
          </div>

          {/* Best for */}
          <p className="text-zinc-300 mt-4 leading-relaxed">
            <span className="text-white font-semibold">Best for:</span>{" "}
            {tier.description}
          </p>
        </div>

        {/* Spacer to push View inclusions to same row */}
        <div className="flex-1 min-h-[20px]" />

        {/* View inclusions button */}
        <div className="mt-6">
          <button
            onClick={() => onOpenModal(tier)}
            className="w-full rounded-xl border border-white/10 bg-zinc-950/30 hover:bg-zinc-950/40 transition px-4 py-3 text-sm text-cyan-200 hover:text-cyan-100 font-semibold"
          >
            View inclusions
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ServicesPage() {
  const { pricingTiers } = usePricing();
  const location = useLocation();
  const [selectedTier, setSelectedTier] = useState(null);
  const [auditForm, setAuditForm] = useState({
    fullName: "",
    email: "",
    companyName: "",
  });
  const [auditProcessing, setAuditProcessing] = useState(false);
  const [auditError, setAuditError] = useState("");

  // Handle hash navigation to tabs
  useEffect(() => {
    const hash = location.hash.slice(1); // remove #
    if (hash) {
      const section = sections.find((s) => s.id === hash);
      if (section) {
        const index = sections.indexOf(section);
        setTimeout(() => {
          const containerEl = document.querySelector('[data-scroll-container]');
          if (containerEl) {
            const scrollTarget = containerEl.scrollHeight / sections.length * index;
            containerEl.scrollTo({
              top: scrollTarget,
              behavior: 'smooth',
            });
          }
        }, 300);
      }
    }
  }, [location.hash]);

  const updateAuditField = (field, value) => {
    setAuditForm((prev) => ({ ...prev, [field]: value }));
  };

  const canStartAudit = Boolean(auditForm.fullName && auditForm.email && auditForm.companyName);

  const startAudit = async () => {
    setAuditProcessing(true);
    setAuditError("");

    try {
      const payload = {
        fullName: auditForm.fullName,
        email: auditForm.email,
        companyName: auditForm.companyName,
        source: "pricing-page",
      };
      const { checkoutUrl } = await createAuditCheckout(payload);
      window.location.href = checkoutUrl;
    } catch (checkoutError) {
      setAuditError(checkoutError.message || "Unable to start the audit checkout.");
      setAuditProcessing(false);
    }
  };

  const sections = [
    {
      id: "pricing-hero",
      tab: PRICING_SECTION_LABELS.HERO,
      scrollable: false,
      content: (
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background / ambient (optional) */}
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
                {/* LEFT: Text (always visible, full width on mobile) */}
                <div className="lg:col-span-7">
                  <div className="max-w-[70ch]">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-8">
                      <CreditCard className="w-3 h-3" strokeWidth={1.5} />
                      {PRICING_SECTION_LABELS.HERO}
                    </div>

                    <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] max-w-[20ch]">
                      Managed
                      <br />
                      <span className="text-emerald-400">Website + Funnel Infrastructure</span>
                      <br />
                      for Founders.
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-zinc-200 leading-relaxed max-w-[52ch]">
                      We build, launch, and manage the system behind your business:
                      website, funnels, payments, automation, hosting, and support.
                    </p>
                  </div>
                </div>

                {/* RIGHT: Image (hidden on mobile, ALWAYS visible on desktop) */}
                <div className="hidden lg:block lg:col-span-5">
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]">
                    {/* subtle scrim so it matches your dark theme */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.35) 100%)",
                      }}
                    />

                    <img
                      src="/pricing_hero.webp"
                      alt="SaaSy Cookies pricing hero"
                      className="w-full h-[520px] object-cover object-[85%_center]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "pricing-fit",
      tab: PRICING_SECTION_LABELS.FIT,
      content: (
        <section className="py-10 md:py-14 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{PRICING_SECTION_LABELS.FIT}</span>
            </div>

            <h2 className={SECTION_TITLE_STYLES.main}>
              <span className="text-emerald-400 font-extrabold">This is for you</span>{" "}
              <span className="text-white font-light">if…</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mt-8">
              {fitChecks.map((item) => (
                <div key={item} className={`${CARD_STYLES.base} p-4 flex items-start gap-3`}>
                  <Check className="w-5 h-5 mt-0.5 text-emerald-400 flex-shrink-0" strokeWidth={2} />
                  <span className="text-zinc-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="text-zinc-300 border-l-2 border-emerald-400 pl-4">
                We don’t build brochure sites. We build revenue-ready infrastructure that supports growth.
              </div>
              <div className="text-zinc-400 border-l-2 border-zinc-700 pl-4">
                Not ideal if you only need a single static page or you want to self-manage everything.
              </div>
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "plans",
      tab: PRICING_SECTION_LABELS.PLANS,
      content: (
        <section className="py-10 md:py-14 bg-white/[0.02]">
          <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{PRICING_SECTION_LABELS.PLANS}</span>
            </div>

            <div className="mt-10 mx-auto w-full max-w-[1480px]">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
                {pricingTiers.map((tier) => (
                  <TierCardV2 key={tier.name} tier={tier} onOpenModal={setSelectedTier} />
                ))}
              </div>

              {/* Single CTA for all plans */}
              <div className="mt-8 text-center">
                <Link
                  to="/services/ai-saas"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 text-black hover:bg-emerald-300 px-7 py-3 font-semibold transition text-lg"
                >
                  Submit Project Brief
                  <ArrowRight className="w-5 h-5" strokeWidth={2} />
                </Link>
                <p className="text-xs text-zinc-400 mt-3 text-center">
                  We confirm plan + scope before billing.
                </p>
              </div>
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "audit",
      tab: PRICING_SECTION_LABELS.AUDIT,
      scrollable: false,
      content: (
        <div className={PAGE_BACKGROUND_STYLES.quote.container}>
          <div
            className={PAGE_BACKGROUND_STYLES.quote.gradientOverlay}
            style={{ background: PAGE_BACKGROUND_STYLES.quote.gradientStyle }}
          />
          <div className={PAGE_BACKGROUND_STYLES.quote.noiseOverlay} />

          <div className="relative z-10">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-12 md:py-16">
              <header className="mb-10 md:mb-12">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`${PAGE_HEADER_ICON_CLASS} bg-emerald-500/15`}>
                    <ShieldCheck className={`w-5 h-5 ${TEXT_COLORS.emerald}`} strokeWidth={1.5} />
                  </div>
                  <h1 className={PAGE_HEADER_TITLE_CLASS}>Audit My Business</h1>
                </div>

                <p className={`${PAGE_HEADER_DESC_CLASS} max-w-3xl`}>
                  Pay the $10 audit fee to start. You'll complete a guided onboarding wizard that maps your tools,
                  scores risk, and generates a clear infrastructure plan. No downloads—everything is done online.
                </p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                <aside className="lg:col-span-5 space-y-4">
                  <div className={`${CARD_STYLES.base} p-6 border-emerald-400/20`}>
                    <div className="flex items-center gap-3 mb-4">
                      <ClipboardCheck className="w-5 h-5 text-emerald-300" />
                      <h2 className="text-white font-semibold">What you get</h2>
                    </div>
                    <ul className="space-y-3 text-sm text-zinc-200">
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-emerald-300 mt-0.5" />
                        Full system mapping + cost baseline
                      </li>
                      <li className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-300 mt-0.5" />
                        Risk scoring + architecture recommendations
                      </li>
                      <li className="flex items-start gap-2">
                        <ClipboardCheck className="w-4 h-4 text-emerald-300 mt-0.5" />
                        Guided wizard with autosave and resume links
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-zinc-950/30 p-6">
                    <h3 className={SECTION_TITLE_CLASS}>Process</h3>
                    <ol className="mt-4 space-y-3 text-sm text-zinc-300">
                      <li>1. Pay the $10 audit fee to start the wizard.</li>
                      <li>2. Complete the guided steps (autosave + resume links).</li>
                      <li>3. We score your data and deliver a summary plan.</li>
                    </ol>
                  </div>
                </aside>

                <main className="lg:col-span-7">
                  <div className={`${CARD_STYLES.base} p-8 md:p-10`}>
                    <h2 className="text-2xl font-semibold text-white mb-4">Start your audit</h2>
                    <p className="text-zinc-300 mb-6">
                      The $10 audit fee confirms commitment and unlocks the guided onboarding wizard.
                    </p>

                    {auditError ? (
                      <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                        {auditError}
                      </div>
                    ) : null}

                    <div className={FORM_GRID_CLASS}>
                      <div>
                        <label className="block text-sm text-zinc-300 mb-2">Full name</label>
                        <input
                          value={auditForm.fullName}
                          onChange={(event) => updateAuditField("fullName", event.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-zinc-300 mb-2">Email</label>
                        <input
                          type="email"
                          value={auditForm.email}
                          onChange={(event) => updateAuditField("email", event.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                          placeholder="you@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-zinc-300 mb-2">Company</label>
                        <input
                          value={auditForm.companyName}
                          onChange={(event) => updateAuditField("companyName", event.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                          placeholder="Business name"
                        />
                      </div>
                    </div>

                    <div className={FORM_GRID_CLASS}>
                      <button
                        type="button"
                        onClick={startAudit}
                        disabled={auditProcessing || !canStartAudit}
                        className={`inline-flex items-center justify-center gap-2 rounded-xl ${BG_COLORS.emerald} text-black font-semibold px-6 py-3 hover:opacity-90 transition disabled:opacity-60`}
                      >
                        {auditProcessing ? "Redirecting..." : "Pay Audit Fee ($10)"}
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      </button>
                      <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-white px-6 py-3 text-sm">
                        Pay to start the wizard
                      </div>
                    </div>

                    <p className="mt-6 text-xs text-zinc-500">
                      After payment, you'll be taken to the audit start page to complete the onboarding steps.
                    </p>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    {
      id: "pricing-start",
      tab: PRICING_SECTION_LABELS.START,
      content: (
        <section className="py-10 md:py-14 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{PRICING_SECTION_LABELS.START}</span>
            </div>

            <h2 className={SECTION_TITLE_STYLES.main}>
              <span className="text-emerald-400 font-extrabold">Start for $10.</span>{" "}
              <span className="text-white font-light">Move fast with a real build.</span>
            </h2>

            <div className={`${CARD_STYLES.base} p-8 mt-8 max-w-4xl`}>
              <p className="text-zinc-200 leading-relaxed">
                Pay <span className="text-white font-semibold">$10</span> to begin. We build and launch most subscription projects in{" "}
                <span className="text-white font-semibold">~2 weeks</span> (within 30 days). Your monthly plan begins after launch.
              </p>
              <p className="text-zinc-400 text-sm mt-4">
                No checkout surprises — we confirm plan + scope first.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/services/ai-saas"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 text-black hover:bg-emerald-300 px-7 py-3 font-semibold transition"
              >
                Submit Project Brief
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <p className="text-xs text-zinc-400 mt-3">
                We confirm plan + scope before billing.
              </p>
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "pricing-how",
      tab: PRICING_SECTION_LABELS.HOW,
      content: (
        <section className="py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{PRICING_SECTION_LABELS.HOW}</span>
            </div>

            <h2 className={SECTION_TITLE_STYLES.main}>
              <span className="text-white font-light">How it works</span>{" "}
              <span className="text-emerald-400 font-extrabold">(no ambiguity)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {journeySteps.map((step, index) => (
                <article key={step.title} className={`${CARD_STYLES.base} p-6`}>
                  <p className="text-xs uppercase tracking-widest text-emerald-300 mb-3">Step {index + 1}</p>
                  <h3 className="font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "pricing-why",
      tab: PRICING_SECTION_LABELS.WHY,
      content: (
        <section className="py-10 md:py-14 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{PRICING_SECTION_LABELS.WHY}</span>
            </div>


            <div className="mt-10 space-y-6">
              {/* Comparison cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${CARD_STYLES.base} p-6 border-l-4 border-red-500/50`}>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-red-200 font-semibold">DIY Builder</span>
                  </div>
                  <p className="text-zinc-300">
                    You're responsible for setup, fixes, and keeping the revenue flow working.
                  </p>
                </div>

                <div className={`${CARD_STYLES.base} p-6 border-l-4 border-emerald-500/50`}>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-200 font-semibold">SaaSy Cookies</span>
                  </div>
                  <p className="text-zinc-300">
                    We build and manage the system so you can focus on delivery + growth.
                  </p>
                </div>
              </div>

              {/* Feature comparison */}
              <div className={`${CARD_STYLES.base} p-6`}>
                <h3 className="text-white font-semibold mb-6">What you get vs what you handle</h3>
                <div className="space-y-4">
                  {[
                    {
                      diy: "You run the stack",
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
                        <Check className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">{row.saasy}</p>
                          <p className="text-zinc-400 text-sm mt-1">{row.saasySub}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/services/ai-saas"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 text-black hover:bg-emerald-300 px-7 py-3 font-semibold transition"
              >
                Submit Project Brief
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <p className="text-xs text-zinc-400 mt-3">
                We confirm plan + scope before billing.
              </p>
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "cta",
      tab: PRICING_SECTION_LABELS.CTA,
      scrollable: false,
      content: (
        <CallToAction
          badge={PRICING_SECTION_LABELS.CTA}
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
              </div>
              <div className="text-sm text-zinc-400 mt-1">
                {selectedTier.subtitle || "12-month minimum"}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-zinc-400 mb-3">
                  Included
                </h3>
                <ul className="space-y-2 text-sm text-zinc-200">
                  {(selectedTier.includes || []).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 text-emerald-300" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {(selectedTier.excludes || []).length ? (
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-zinc-400 mb-3">
                    Not included
                  </h3>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    {(selectedTier.excludes || []).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <X className="w-4 h-4 mt-0.5 text-zinc-500" strokeWidth={2} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div data-scroll-container>
        <ScrollDeckLayout sections={sections} />
      </div>
      <InclusionsModal />
    </>
  );
}