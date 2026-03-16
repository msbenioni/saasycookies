import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Check, X, ArrowRight, AlertTriangle, CheckCircle, Sparkles, ChevronRight, CreditCard, ShieldCheck, ClipboardCheck, FileText } from "lucide-react";
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
import { ScrollDeckLayout } from "../components/shared/TabLayout";
import { PRODUCT_LOGOS } from "../constants/productLogos";
import { createAuditCheckout } from "../utils/auditService";
import CallToAction from "../components/shared/CallToAction";

const AUDIT_SECTION_LABELS = {
  HERO: "What We Do",
  FIT: "Fit Check",
  AUDIT: "Audit My Business",
  START: "Start for $10",
  HOW: "How It Works",
  WHY: "Why Not DIY",
  FAQ: "FAQs",
  CTA: "Submit Brief",
};

const journeySteps = [
  {
    title: "Pay the audit fee",
    description: "Secure your $10 audit payment to unlock the guided onboarding wizard.",
  },
  {
    title: "Complete the wizard",
    description: "Answer questions about your tools, processes, and infrastructure in our guided wizard.",
  },
  {
    title: "We analyze & score",
    description: "Our team reviews your data, scores risk factors, and identifies optimization opportunities.",
  },
  {
    title: "Get your audit report",
    description: "Receive a comprehensive infrastructure audit with clear recommendations and next steps.",
  },
];

const fitChecks = [
  "You're not sure what tools you actually need",
  "Your tech stack feels messy or outdated",
  "You want to reduce costs without losing functionality",
  "You need a clear infrastructure roadmap",
  "You want expert eyes on your setup before scaling",
];

export default function AuditBusinessPage() {
  const location = useLocation();
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
      const response = await createAuditCheckout({
        fullName: auditForm.fullName,
        email: auditForm.email,
        companyName: auditForm.companyName,
      });

      if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      setAuditError(error.message || "Failed to start audit. Please try again.");
      setAuditProcessing(false);
    }
  };

  const sections = [
    {
      id: "audit-hero",
      tab: AUDIT_SECTION_LABELS.HERO,
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
                      <ShieldCheck className="w-3 h-3" strokeWidth={1.5} />
                      {AUDIT_SECTION_LABELS.HERO}
                    </div>

                    <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] max-w-[20ch]">
                      Infrastructure
                      <br />
                      <span className="text-emerald-400">Audit & Analysis</span>
                      <br />
                      for Your Business.
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-zinc-200 leading-relaxed max-w-[52ch]">
                      Get a complete analysis of your current tools, costs, and infrastructure.
                      We'll identify risks, optimization opportunities, and provide a clear roadmap.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={startAudit}
                        disabled={auditProcessing || !canStartAudit}
                        className={`inline-flex items-center justify-center gap-2 rounded-xl ${BG_COLORS.emerald} text-black font-semibold px-7 py-3 hover:opacity-90 transition disabled:opacity-60`}
                      >
                        {auditProcessing ? "Processing..." : "Start Your Audit ($10)"}
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      </button>
                      <Link
                        to="#audit"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-7 py-3 font-semibold text-white transition"
                      >
                        Learn More
                      </Link>
                    </div>

                    {auditError && (
                      <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                        {auditError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-400/10 rounded-3xl blur-3xl" />
                    <div className="relative bg-[#0b0f14] border border-white/10 rounded-3xl p-8">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-emerald-300" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">Complete Analysis</div>
                            <div className="text-sm text-zinc-400">Tools, costs, risks</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
                            <ClipboardCheck className="w-5 h-5 text-emerald-300" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">Expert Review</div>
                            <div className="text-sm text-zinc-400">Professional assessment</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-emerald-300" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">Risk Scoring</div>
                            <div className="text-sm text-zinc-400">Identify vulnerabilities</div>
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
      id: "audit-fit",
      tab: AUDIT_SECTION_LABELS.FIT,
      content: (
        <section className="py-10 md:py-14 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{AUDIT_SECTION_LABELS.FIT}</span>
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
              <button
                onClick={startAudit}
                disabled={auditProcessing || !canStartAudit}
                className={`inline-flex items-center justify-center gap-2 rounded-xl ${BG_COLORS.emerald} text-black font-semibold px-7 py-3 hover:opacity-90 transition disabled:opacity-60`}
              >
                {auditProcessing ? "Processing..." : "Start Your Audit ($10)"}
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "audit",
      tab: AUDIT_SECTION_LABELS.AUDIT,
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
      id: "audit-start",
      tab: AUDIT_SECTION_LABELS.START,
      content: (
        <section className="py-10 md:py-14 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{AUDIT_SECTION_LABELS.START}</span>
            </div>

            <h2 className={SECTION_TITLE_STYLES.small}>Start for $10</h2>

            <div className="mt-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">What happens next</h3>
                  <ol className="space-y-3 text-sm text-zinc-300">
                    <li>1. Pay the $10 audit fee</li>
                    <li>2. Complete the guided wizard</li>
                    <li>3. We analyze your infrastructure</li>
                    <li>4. Receive your audit report</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">What we need from you</h3>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li>• Basic business information</li>
                    <li>• Current tools and systems</li>
                    <li>• Pain points and goals</li>
                    <li>• 15-20 minutes of your time</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={startAudit}
                  disabled={auditProcessing || !canStartAudit}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl ${BG_COLORS.emerald} text-black font-semibold px-7 py-3 hover:opacity-90 transition disabled:opacity-60`}
                >
                  {auditProcessing ? "Processing..." : "Start Your Audit ($10)"}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </section>
      ),
    },

    {
      id: "audit-how",
      tab: AUDIT_SECTION_LABELS.HOW,
      content: (
        <section className="py-10 md:py-14 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{AUDIT_SECTION_LABELS.HOW}</span>
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
      id: "audit-why",
      tab: AUDIT_SECTION_LABELS.WHY,
      content: (
        <section className="py-10 md:py-14 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.emerald}>{AUDIT_SECTION_LABELS.WHY}</span>
            </div>

            <h2 className={SECTION_TITLE_STYLES.small}>Why not DIY</h2>

            <div className="mt-10 space-y-6">
              {[
                {
                  diy: "You guess at problems",
                  diySub: "blind spots, unknown risks, wasted time",
                  saasy: "You get expert analysis",
                  saasySub: "professional review + risk scoring",
                },
                {
                  diy: "You miss optimization",
                  diySub: "overpaying, redundant tools, inefficiencies",
                  saasy: "We find cost savings",
                  saasySub: "tool consolidation + better pricing",
                },
                {
                  diy: "You lack a roadmap",
                  diySub: "reactive fixes, no long-term plan",
                  saasy: "You get a clear plan",
                  saasySub: "prioritized improvements + timeline",
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
      id: "audit-cta",
      tab: AUDIT_SECTION_LABELS.CTA,
      scrollable: false,
      content: (
        <CallToAction
          badge={AUDIT_SECTION_LABELS.CTA}
          headline={
            <>
              Ready to optimize your
              <br />
              <span className="text-emerald-400">business infrastructure?</span>
            </>
          }
          subheadline="Start your audit — we'll analyze your setup and provide clear recommendations."
          buttonText="Start Your Audit"
          buttonTo="#audit"
        />
      ),
    },
  ];

  return (
    <>
      <div data-scroll-container>
        <ScrollDeckLayout sections={sections} />
      </div>
    </>
  );
}
