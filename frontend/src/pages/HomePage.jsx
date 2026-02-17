import { Link } from "react-router-dom";
import {
  FileText, QrCode, ArrowRight,
  Sparkles, ChevronRight, CreditCard
} from "lucide-react";
import { PRODUCT_LOGOS } from "../constants/productLogos";
import { SECTION_TITLE_STYLES, SECTION_LABEL_STYLES, CARD_STYLES, SECTION_DESCRIPTION_STYLES } from "../constants/formStyles";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section data-testid="hero-section" className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(6,182,212,0.1) 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.03%22/%3E%3C/svg%3E')]" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-medium mb-8 opacity-0 animate-fade-in">
              <Sparkles className="w-3 h-3" strokeWidth={1.5} />
              AI Systems Company
            </div>

            <h1
              data-testid="hero-title"
              className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-6 opacity-0 animate-fade-in-delay-1"
            >
              We Build Revenue-Ready
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-senseai bg-clip-text text-transparent">
                Digital Infrastructure.
              </span>
            </h1>

            <p
              data-testid="hero-description"
              className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl mb-10 opacity-0 animate-fade-in-delay-2"
            >
              Websites, funnels, automation, and AI systems - designed, deployed, and managed for founders who are scaling.
              <br className="hidden sm:block" />
              No DIY tools. No duct-taped tech stacks. Just clean systems that grow with you.
            </p>

            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-delay-3">
              <Link
                to="/pricing"
                data-testid="cta-view-subscription-plans"
                className="inline-flex items-center gap-2 bg-emerald-400 text-black font-semibold px-8 py-3 rounded-md transition-all duration-300 hover:bg-emerald-300 hover:scale-[1.02]"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                View Subscription Plans
              </Link>
              <Link
                to="/services/ai-saas"
                data-testid="cta-start-custom-ai-project"
                className="inline-flex items-center gap-2 bg-zinc-900 text-white border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 font-medium px-8 py-3 rounded-md transition-all"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                Start a Custom AI Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="py-20 md:py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
            <span className={SECTION_LABEL_STYLES.emerald}>Choose Your Path</span>
          </div>
          <h2 className={SECTION_TITLE_STYLES.main}>Two Ways to Work With SaaSy Cookies</h2>
          <p className={`${SECTION_DESCRIPTION_STYLES} max-w-3xl`}>
            Choose the model that matches your stage: predictable managed infrastructure or a custom AI/SaaS product build.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className={`${CARD_STYLES.base} hover:ring-emerald-400/40`}>
              <div className={CARD_STYLES.padding}>
                <h3 className="font-heading text-2xl font-bold text-emerald-300 mb-3">Managed Digital Infrastructure</h3>
                <p className="text-zinc-200 mb-5">
                  For founders who need website, funnels, payments, automation, and ongoing system management.
                </p>
                <ul className="space-y-2 text-sm text-zinc-300 mb-6">
                  <li>Predictable subscription.</li>
                  <li>Launched in 2 weeks.</li>
                  <li>No upfront build fees.</li>
                </ul>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-6 py-3 hover:bg-emerald-300 transition"
                >
                  View Plans
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
              </div>
            </article>

            <article className={`${CARD_STYLES.base} hover:ring-cyan-400/40`}>
              <div className={CARD_STYLES.padding}>
                <h3 className="font-heading text-2xl font-bold text-cyan-300 mb-3">Custom AI & SaaS Systems</h3>
                <p className="text-zinc-200 mb-5">
                  For founders building AI tools, marketplaces, member platforms, and full SaaS products.
                </p>
                <p className="text-sm text-cyan-200/90 mb-6">Architecture {"->"} Design {"->"} Build {"->"} Deploy.</p>
                <Link
                  to="/services/ai-saas"
                  className="inline-flex items-center gap-2 rounded-md border border-cyan-400/40 text-cyan-200 font-semibold px-6 py-3 hover:bg-cyan-500/10 transition"
                >
                  Submit Project Brief
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section data-testid="difference-section" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
            <span className={SECTION_LABEL_STYLES.primary}>Difference</span>
          </div>
          <h2 className={SECTION_TITLE_STYLES.main}>We Don&apos;t Build Pages. We Build Systems.</h2>
          <p className={`${SECTION_DESCRIPTION_STYLES} max-w-3xl`}>
            Because growth doesn&apos;t come from design alone. It comes from architecture.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className={CARD_STYLES.base}>
              <div className={CARD_STYLES.padding}>
                <h3 className="font-heading text-2xl font-bold text-zinc-200 mb-4">Most builders focus on</h3>
                <ul className="space-y-3 text-zinc-300">
                  <li>How it looks</li>
                  <li>What theme to use</li>
                  <li>How many pages</li>
                </ul>
              </div>
            </article>

            <article className={`${CARD_STYLES.base} ring-emerald-400/30`}>
              <div className={CARD_STYLES.padding}>
                <h3 className="font-heading text-2xl font-bold text-emerald-300 mb-4">We focus on</h3>
                <ul className="space-y-3 text-zinc-100">
                  <li>Revenue flow</li>
                  <li>Automation</li>
                  <li>Infrastructure</li>
                  <li>Scalability</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Flagship Products */}
      <section data-testid="featured-products-section" className="py-24 md:py-32 relative bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
            <span className={SECTION_LABEL_STYLES.primary}>
              Featured Products
            </span>
          </div>
          <h2
            data-testid="featured-products-title"
            className={SECTION_TITLE_STYLES.main}
          >
            We Build What We Believe In.
          </h2>
          <p className={SECTION_DESCRIPTION_STYLES}>
            We don&apos;t just build for clients. We build our own platforms too.
            This is how we think: systems, not templates.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* SenseAI */}
            <Link
              to="/senseai"
              data-testid="featured-senseai-card"
              className={`${CARD_STYLES.base} hover:ring-cyan-400/40`}
            >
              <div className={CARD_STYLES.overlay} style={{ background: "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.08) 0%, transparent 70%)" }} />
              <div className={CARD_STYLES.padding}>
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={PRODUCT_LOGOS.SENSEAI.src}
                    alt={PRODUCT_LOGOS.SENSEAI.alt}
                    className={PRODUCT_LOGOS.SENSEAI.classes.CARD}
                  />
                  <span className="font-heading text-2xl font-bold text-senseai">SenseAI</span>
                </div>
                <p className="text-zinc-200 leading-relaxed mb-6 max-w-md">
                  AI-powered journaling that turns reflection into clarity and decision momentum.
                </p>
                <div className="inline-flex items-center gap-2 text-senseai text-sm font-medium group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-senseai/50 via-senseai/20 to-transparent" />
            </Link>

            {/* Pacific Market */}
            <Link
              to="/pacificmarket"
              data-testid="featured-pacific-card"
              className={`${CARD_STYLES.baseOverride} hover:ring-pacific/40`}
            >
              <div className={CARD_STYLES.overlay} style={{ background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 70%)" }} />
              <div className={CARD_STYLES.padding}>
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={PRODUCT_LOGOS.PACIFIC_MARKET.src}
                    alt={PRODUCT_LOGOS.PACIFIC_MARKET.alt}
                    className={PRODUCT_LOGOS.PACIFIC_MARKET.classes.CARD}
                  />
                  <span className="font-heading text-2xl font-bold text-pacific">Pacific Market</span>
                </div>
                <p className="text-zinc-200 leading-relaxed mb-6 max-w-md">
                  A global directory and marketplace supporting Pacific creators.
                </p>
                <div className="inline-flex items-center gap-2 text-pacific text-sm font-medium group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-pacific/50 via-pacific/20 to-transparent" />
            </Link>
          </div>
        </div>
      </section>

      {/* Business Utilities */}
      <section data-testid="tools-section" className="py-24 md:py-32 relative bg-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
            <span className={SECTION_LABEL_STYLES.primary}>
              Business Utilities
            </span>
          </div>
          <h2
            data-testid="tools-title"
            className={SECTION_TITLE_STYLES.main}
          >
            Practical Tools. No Gatekeeping.
          </h2>
          <p className={SECTION_DESCRIPTION_STYLES}>
            Free and premium utilities built for real business workflows.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/tools/digital-card"
              data-testid="tool-digital-card"
              className={`${CARD_STYLES.base} hover:ring-indigo-400/40`}
            >
              <div className={CARD_STYLES.padding}>
                <div className={CARD_STYLES.contentLayout}>
                  <div className="w-12 h-12 rounded-xl bg-indigo-400/10 border border-indigo-400/20 flex items-center justify-center shrink-0">
                    <CreditCard className="w-6 h-6 text-indigo-300" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className={SECTION_TITLE_STYLES.card}>Digital Business Card</h3>
                    <p className="text-zinc-200/80 text-sm leading-relaxed mb-4">
                      Create a shareable digital profile with contact save, QR code, and instant updates.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-indigo-300 text-sm font-medium group-hover:gap-2.5 transition-all">
                      Start free trial <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/tools/invoice-generator"
              data-testid="tool-invoice-card"
              className={`${CARD_STYLES.base} hover:ring-violet-400/40`}
            >
              <div className={CARD_STYLES.padding}>
                <div className={CARD_STYLES.contentLayout}>
                  <div className={CARD_STYLES.iconContainer}>
                    <FileText className="w-6 h-6 text-brand-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className={SECTION_TITLE_STYLES.card}>Invoice Generator</h3>
                    <p className="text-zinc-200/80 text-sm leading-relaxed mb-4">
                      Create professional invoices in seconds. Add line items, taxes,
                      and download as PDF.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-brand-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                      Try it free <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/tools/qr-generator"
              data-testid="tool-qr-card"
              className={`${CARD_STYLES.base} hover:ring-pink-400/40`}
            >
              <div className={CARD_STYLES.padding}>
                <div className={CARD_STYLES.contentLayout}>
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shrink-0">
                    <QrCode className="w-6 h-6 text-brand-accent" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className={SECTION_TITLE_STYLES.card}>QR Code Generator</h3>
                    <p className="text-zinc-200/80 text-sm leading-relaxed mb-4">
                      Generate QR codes for URLs, text, or contact info. Download as PNG
                      in any size.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-brand-accent text-sm font-medium group-hover:gap-2.5 transition-all">
                      Try it free <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <p className="text-zinc-400 text-sm mt-6">We believe infrastructure should be accessible.</p>
        </div>
      </section>

      {/* Infrastructure Philosophy */}
      <section data-testid="infrastructure-first-section" className="py-24 md:py-32 relative bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.primary}>Infrastructure First</span>
            </div>
            <h2 className={SECTION_TITLE_STYLES.main}>Your website is not your business. Your systems are.</h2>
            <p className={`${SECTION_DESCRIPTION_STYLES} mb-6`}>
              We design infrastructure that removes friction - so you can focus on leadership and growth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-200 mb-10">
              <div className="rounded-lg border border-white/10 bg-zinc-900/30 p-4">You move faster</div>
              <div className="rounded-lg border border-white/10 bg-zinc-900/30 p-4">You scale smoother</div>
              <div className="rounded-lg border border-white/10 bg-zinc-900/30 p-4">You sell with confidence</div>
              <div className="rounded-lg border border-white/10 bg-zinc-900/30 p-4">You stop firefighting backend problems</div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/40">
              <table className="w-full text-left min-w-[620px]">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-zinc-400 font-medium">DIY Builder</th>
                    <th className="px-6 py-4 text-emerald-300 font-medium">SaaSy Cookies</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["You manage everything", "We manage everything"],
                    ["You learn automation", "We build automation"],
                    ["You fix integrations", "We fix integrations"],
                    ["$80-$150 in tools", "One predictable subscription"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-white/5 last:border-0">
                      <td className="px-6 py-4 text-zinc-300">{row[0]}</td>
                      <td className="px-6 py-4 text-zinc-100">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className={SECTION_TITLE_STYLES.small}>Stop Managing Your Website. Start Running Your Business.</h2>
          <p className="text-zinc-300 text-lg mb-8">Let us handle the backend.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-7 py-3 hover:bg-emerald-300 transition"
            >
              View Subscription Plans
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link
              to="/services/ai-saas"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 text-white font-semibold px-7 py-3 hover:bg-zinc-800 transition"
            >
              Start a Custom AI Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
