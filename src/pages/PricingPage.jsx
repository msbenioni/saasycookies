import { Link } from "react-router-dom";
import { Check, X, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react";
import { SECTION_LABEL_STYLES, SECTION_TITLE_STYLES, CARD_STYLES, SECTION_DESCRIPTION_STYLES } from "../constants/formStyles";
import { usePricing } from "../hooks/usePricing";

const journeySteps = [
  {
    title: "Choose your path",
    description: "View Pricing Plans or Get Quote based on your stage.",
  },
  {
    title: "Submit your brief",
    description: "Share goals, offer details, and technical needs so we can qualify fit.",
  },
  {
    title: "Receive plan confirmation",
    description: "We send recommended scope, inclusions, and timeline for your build.",
  },
  {
    title: "Secure your build",
    description: "Once payment is confirmed, your project is scheduled and onboarding begins.",
  },
  {
    title: "Build and deploy",
    description: "We design, configure, and launch your infrastructure (typically within 2 weeks for subscriptions).",
  },
  {
    title: "Ongoing management",
    description: "We maintain, optimize, and support your systems while you focus on growth.",
  },
];

const fitChecks = [
  "You're done with DIY website builders",
  "You want systems, not just pages",
  "You sell programs, services, or expertise",
  "You want someone to manage the backend",
  "You value clarity, structure, and long-term growth",
];

const faqItems = [
  {
    q: "What is the 30-Day Build Phase?",
    a: "We build your system during the first 30 days. Billing begins after successful launch. This protects both parties - you get a working system before paying, we get commitment to the partnership.",
  },
  {
    q: "What happens if I cancel early?",
    a: "The remaining balance of your 12-month agreement becomes payable.",
  },
  {
    q: "Can I upgrade tiers?",
    a: "Yes, you can upgrade anytime. Price adjusts pro-rata.",
  },
  {
    q: "What's included in 'Payment lifecycle management'?",
    a: "Stripe setup, checkout optimization, subscription handling, webhook processing, and basic CRM integration for Authority plan.",
  },
  {
    q: "Is copywriting included?",
    a: "Light refinement is included. Full copywriting projects are quoted separately.",
  },
  {
    q: "What are the scope limits?",
    a: "Starter: 5 pages, Growth: 10 pages + 1 funnel, Authority: 15 pages + 3 funnels. Additional scope quoted separately.",
  },
  {
    q: "What is not included?",
    a: "Major redesigns, rebranding, custom app builds, or large-scale integrations are scoped separately.",
  },
];

export default function PricingPage() {
  const { pricingTiers, country, currency } = usePricing();

  return (
    <div className="bg-void text-white">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 20% 25%, rgba(6,182,212,0.14) 0%, transparent 55%), radial-gradient(circle at 80% 35%, rgba(16,185,129,0.14) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <span className={SECTION_LABEL_STYLES.primary}>Pricing Plans</span>
          <h1 className={`${SECTION_TITLE_STYLES.main} mt-4 max-w-4xl`}>
            <span className="text-emerald-400 font-extrabold">Website & Funnel</span>{" "}
            <span className="text-white font-light">Management for Founders.</span>
          </h1>
          <p className={`${SECTION_DESCRIPTION_STYLES} max-w-3xl mb-6`}>
            Complete digital infrastructure built and managed for you - websites, funnels, automation, and ongoing support.
          </p>
          <p className={`${SECTION_DESCRIPTION_STYLES} mb-8`}>
            Launch in as little as 2 weeks (most projects). $10 build-fee. 12-month partnership.
          </p>
          <p className={`${SECTION_DESCRIPTION_STYLES} mb-6`}>
            <span className="font-semibold">Managed Infrastructure:</span> We handle the technical setup, hosting, security, and maintenance so you can focus on growing your business.
          </p>
          <p className={`${SECTION_DESCRIPTION_STYLES} max-w-3xl mb-6`}>
            Looking for a custom AI or SaaS build?{" "}
            <Link to="/services/ai-saas" className="text-cyan-300 hover:text-cyan-200 transition">
              Submit a Project Brief
            </Link>
            .
          </p>
          <a
            href="#plans"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-7 py-3 hover:bg-emerald-300 transition"
          >
            View Plans
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={SECTION_TITLE_STYLES.main}>
            <span className="text-emerald-400 font-extrabold">This is for you if</span>{" "}
            <span className="text-white font-light">...</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mb-8">
            {fitChecks.map((item) => (
              <div key={item} className={`${CARD_STYLES.base} p-4 flex items-start gap-3`}>
                <Check className="w-5 h-5 mt-0.5 text-emerald-400 flex-shrink-0" strokeWidth={2} />
                <span className="text-zinc-200">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-zinc-300 border-l-2 border-emerald-400 pl-4">
            We don't build brochure sites. We build revenue-ready digital foundations.
          </p>
        </div>
      </section>

      <section id="plans" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={SECTION_TITLE_STYLES.main}>Subscription Plans</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <article
                key={tier.name}
                className={`${CARD_STYLES.base} ${tier.highlight ? "ring-emerald-400/70 shadow-[0_0_0_1px_rgba(52,211,153,0.4)]" : ""} flex flex-col h-full`}
              >
                <div className={`${CARD_STYLES.padding} flex-1 flex flex-col`}>
                  {tier.highlight ? (
                    <span className="inline-flex mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-400/10 border border-emerald-400/30 rounded-full px-3 py-1">
                      Most Popular
                    </span>
                  ) : null}
                  <h3 className="font-heading text-2xl font-bold mb-2 text-white">{tier.name}</h3>
                  <p className="text-3xl font-extrabold mb-1">{tier.price}</p>
                  <p className="text-sm text-zinc-400 mb-4">{tier.subtitle}</p>
                  <p className="text-zinc-200/90 mb-6">{tier.description}</p>

                  <ul className="space-y-2 mb-6 text-sm text-zinc-200 flex-1">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 text-emerald-400" strokeWidth={2} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.excludes.length ? (
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Not included</p>
                      <ul className="space-y-2 text-sm text-zinc-400">
                        {tier.excludes.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <X className="w-4 h-4 mt-0.5 text-zinc-500" strokeWidth={2} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}


                  <div className="mt-auto">
                    <Link
                      to="/services/ai-saas"
                      className={`inline-flex items-center justify-center w-full gap-2 rounded-md px-5 py-3 font-semibold transition ${
                        tier.highlight
                          ? "bg-emerald-400 text-black hover:bg-emerald-300"
                          : "bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800"
                      }`}
                    >
                      {tier.cta}
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={SECTION_TITLE_STYLES.small}>Launch With A $10 Build-Fee.</h2>
          <p className="text-zinc-200 max-w-3xl mb-6 leading-relaxed">
            We deploy most websites within 2 weeks. Just $10 to begin your project.
            Then start your monthly plan after 30 days. We operate on a 12-month partnership model.
          </p>
          <div className="mt-8">
            <Link
              to="/services/ai-saas"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-7 py-3 hover:bg-emerald-300 transition"
            >
              Submit Project Brief
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={SECTION_TITLE_STYLES.main}>
            <span className="text-emerald-400 font-extrabold">How It</span>{" "}
            <span className="text-white font-light">Works</span>
          </h2>
          <p className={`${SECTION_DESCRIPTION_STYLES} max-w-3xl`}>
            Structured onboarding from qualification to launch - no random checkout, no scope ambiguity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={SECTION_TITLE_STYLES.main}>
            <span className="text-red-400 font-extrabold">Why Not Just Use</span>{" "}
            <span className="text-white font-light">Wix?</span>
          </h2>
          <div className={`${CARD_STYLES.base} p-8 mt-8`}>
            <div className="flex items-center justify-center mb-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">The Better Way to Build</h3>
                <p className="text-zinc-400">Compare DIY vs Done-For-You Infrastructure</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DIY Column */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 font-medium mb-4">
                  <AlertTriangle className="w-4 h-4" />
                  DIY Builder
                </div>
                <div className="space-y-3">
                  {[
                    "You manage everything",
                    "You build funnels", 
                    "You fix problems",
                    "You handle payments",
                    "You deal with hosting",
                    "You figure out SEO"
                  ].map((item, index) => (
                    <div key={index} className="bg-zinc-800/50 rounded-lg p-3 text-sm text-zinc-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {/* SaaSy Cookies Column */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium mb-4">
                  <CheckCircle className="w-4 h-4" />
                  SaaSy Cookies
                </div>
                <div className="space-y-3">
                  {[
                    "We manage everything",
                    "We build funnels",
                    "We fix problems", 
                    "We handle payments",
                    "We deal with hosting",
                    "We optimize SEO"
                  ].map((item, index) => (
                    <div key={index} className="bg-zinc-800/50 rounded-lg p-3 text-sm text-emerald-300">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    to="/pricing"
                    className="inline-flex items-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-6 py-3 hover:bg-emerald-300 transition w-full justify-center"
                  >
                    Choose the Better Way
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-zinc-300">We don't sell tools. We manage outcomes.</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={SECTION_TITLE_STYLES.main}>
            <span className="text-cyan-400 font-extrabold">Frequently Asked</span>{" "}
            <span className="text-white font-light">Questions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqItems.map((item) => (
              <div key={item.q} className={`${CARD_STYLES.base} p-6`}>
                <h3 className="font-semibold text-white mb-3">{item.q}</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className={SECTION_TITLE_STYLES.small}>Stop Managing Your Website. Start Running Your Business.</h2>
          <p className="text-zinc-300 text-lg mb-8">Let us handle the infrastructure while you focus on growth.</p>
          <p className="text-zinc-400 text-sm mb-8">
            Need something beyond these plans?{" "}
            <Link to="/services/ai-saas" className="text-cyan-300 hover:text-cyan-200 transition">
              Apply for a Custom Build
            </Link>
            .
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/services/ai-saas"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-7 py-3 hover:bg-emerald-300 transition"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 text-white font-semibold px-7 py-3 hover:bg-zinc-800 transition"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
