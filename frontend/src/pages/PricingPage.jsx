import { Link } from "react-router-dom";
import { Check, X, ArrowRight } from "lucide-react";
import { SECTION_LABEL_STYLES, SECTION_TITLE_STYLES, CARD_STYLES, SECTION_DESCRIPTION_STYLES } from "../constants/formStyles";

const tiers = [
  {
    name: "Starter Presence",
    price: "$79/month",
    subtitle: "12-month minimum",
    description: "For service providers who need a clean, professional online presence.",
    cta: "Start Starter Plan",
    highlight: false,
    includes: [
      "Up to 5-page website",
      "Hosting + security",
      "SSL + maintenance",
      "Contact form setup",
      "1 minor content update per month",
      "Basic SEO setup",
    ],
    excludes: ["Funnels", "Automation", "Payment systems", "Member portals"],
  },
  {
    name: "Growth Engine",
    price: "$149/month",
    subtitle: "12-month minimum",
    description: "For coaches, consultants, and personal brands selling offers.",
    cta: "Launch Growth Plan",
    highlight: true,
    includes: [
      "Everything in Starter",
      "1 revenue funnel",
      "Email automation setup",
      "Payment integration (Stripe)",
      "Booking system integration",
      "Lead magnet setup",
      "2 content updates per month",
      "Podcast/blog posting support (1/month)",
      "Funnel tweaks + automation support",
      "Basic analytics setup",
    ],
    excludes: [],
    launchOffer: "50% off first 3 months. Then standard rate applies.",
  },
  {
    name: "Authority System",
    price: "$249/month",
    subtitle: "12-month minimum",
    description: "For founders building a full ecosystem.",
    cta: "Build Authority System",
    highlight: false,
    includes: [
      "Everything in Growth",
      "Member portal management",
      "Multi-funnel architecture",
      "Advanced automation flows",
      "Payment lifecycle management",
      "Podcast upload support (up to 4/month)",
      "Testimonial uploads",
      "Priority support",
      "Monthly system review",
    ],
    excludes: [],
  },
];

const journeySteps = [
  {
    title: "Choose your path",
    description: "Select Managed Infrastructure or Custom AI & SaaS based on your stage.",
  },
  {
    title: "Submit your brief",
    description: "Share goals, offer details, and technical needs so we can qualify fit.",
  },
  {
    title: "Receive plan confirmation",
    description: "We send recommended scope, inclusions, timeline, and payment instructions.",
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
    q: "Is there a setup fee?",
    a: "No. We operate on a 12-month subscription model instead.",
  },
  {
    q: "What happens if I cancel early?",
    a: "The remaining balance of your 12-month agreement becomes payable.",
  },
  {
    q: "Can I upgrade tiers?",
    a: "Yes, you can upgrade anytime.",
  },
  {
    q: "Is copywriting included?",
    a: "Light refinement is included. Full copywriting projects are quoted separately.",
  },
  {
    q: "What is not included?",
    a: "Major redesigns, rebranding, custom app builds, or large-scale integrations are scoped separately.",
  },
];

export default function PricingPage() {
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
          <span className={SECTION_LABEL_STYLES.primary}>Managed Infrastructure Plans</span>
          <h1 className={`${SECTION_TITLE_STYLES.main} mt-4 max-w-4xl`}>
            Managed Digital Infrastructure for Founders.
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl leading-relaxed max-w-3xl mb-6">
            Websites, funnels, automation, and ongoing system support - built, deployed, and managed for you.
          </p>
          <p className="text-sm text-zinc-400 mb-8">
            Launch in as little as 2 weeks. No upfront build fee. 12-month partnership.
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
          <h2 className={SECTION_TITLE_STYLES.small}>This is for you if...</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mb-8">
            {fitChecks.map((item) => (
              <div key={item} className="flex items-start gap-3 text-zinc-200">
                <Check className="w-5 h-5 mt-0.5 text-emerald-400" strokeWidth={2} />
                <span>{item}</span>
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
            {tiers.map((tier) => (
              <article
                key={tier.name}
                className={`${CARD_STYLES.base} ${tier.highlight ? "ring-emerald-400/70 shadow-[0_0_0_1px_rgba(52,211,153,0.4)]" : ""}`}
              >
                <div className={CARD_STYLES.padding}>
                  {tier.highlight ? (
                    <span className="inline-flex mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-400/10 border border-emerald-400/30 rounded-full px-3 py-1">
                      Most Popular
                    </span>
                  ) : null}
                  <h3 className="font-heading text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-3xl font-extrabold mb-1">{tier.price}</p>
                  <p className="text-sm text-zinc-400 mb-4">{tier.subtitle}</p>
                  <p className="text-zinc-200/90 mb-6">{tier.description}</p>

                  <ul className="space-y-2 mb-6 text-sm text-zinc-200">
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

                  {tier.launchOffer ? (
                    <p className="mb-6 text-sm text-emerald-300 bg-emerald-400/10 border border-emerald-400/30 rounded-md p-3">
                      {tier.launchOffer}
                    </p>
                  ) : null}

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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={SECTION_TITLE_STYLES.small}>Launch Without Upfront Build Fees.</h2>
          <p className="text-zinc-200 max-w-3xl mb-6 leading-relaxed">
            We deploy your website within 2 weeks. No setup fee. No large upfront invoice.
            Instead, we operate on a 12-month partnership model.
          </p>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 max-w-3xl">
            <p className="text-emerald-200 font-medium mb-2">Launch Offer</p>
            <p className="text-zinc-100 mb-2">50% off your first 3 months for selected clients.</p>
            <p className="text-zinc-300 text-sm">Autopay every 30 days. After month 3, standard subscription applies.</p>
          </div>
          <div className="mt-8">
            <Link
              to="/services/ai-saas"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-7 py-3 hover:bg-emerald-300 transition"
            >
              Apply for Launch Offer
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={SECTION_TITLE_STYLES.small}>How It Works</h2>
          <p className={`${SECTION_DESCRIPTION_STYLES} max-w-3xl`}>
            Structured onboarding from qualification to launch - no random checkout, no scope ambiguity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {journeySteps.map((step, index) => (
              <article key={step.title} className="rounded-xl border border-white/10 bg-zinc-900/40 p-5">
                <p className="text-xs uppercase tracking-widest text-emerald-300 mb-2">Step {index + 1}</p>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={SECTION_TITLE_STYLES.small}>Why Not Just Use Wix?</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/40">
            <table className="w-full text-left min-w-[640px]">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-zinc-400 font-medium">DIY Builder</th>
                  <th className="px-6 py-4 text-emerald-300 font-medium">SaaSy Cookies</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["You manage everything", "We manage everything"],
                  ["You build funnels", "We build funnels"],
                  ["You fix problems", "We fix problems"],
                  ["You learn automation", "We run automation"],
                  ["$80-$150 tool stack", "One predictable subscription"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-white/5 last:border-0">
                    <td className="px-6 py-4 text-zinc-300">{row[0]}</td>
                    <td className="px-6 py-4 text-zinc-100">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-zinc-300">We don't sell tools. We manage outcomes.</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className={SECTION_TITLE_STYLES.small}>FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-xl border border-white/10 bg-zinc-900/40 p-5">
                <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className={SECTION_TITLE_STYLES.small}>Stop Managing Your Website. Start Running Your Business.</h2>
          <p className="text-zinc-300 text-lg mb-8">Let us handle the infrastructure.</p>
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
