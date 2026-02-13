import { Link } from "react-router-dom";
import {
  Brain, Globe, FileText, QrCode, ArrowRight, Zap,
  Layers, Sparkles, Code2, Rocket, ChevronRight
} from "lucide-react";
import { PRODUCT_LOGOS } from "../constants/productLogos";
import { SECTION_TITLE_STYLES, SECTION_LABEL_STYLES, CARD_STYLES, SECTION_DESCRIPTION_STYLES } from "../constants/formStyles";

const categoryCards = [
  {
    icon: Brain,
    title: "AI Products",
    desc: "Intelligent tools that think with you, not for you.",
    color: "text-senseai",
    ring: "hover:ring-cyan-400/40",
    hasLogo: true,
    logoKey: "SENSEAI"
  },
  {
    icon: Globe,
    title: "Community Platforms",
    desc: "Connecting creators and businesses across the Pacific.",
    color: "text-pacific",
    ring: "hover:ring-amber-400/40",
    hasLogo: true,
    logoKey: "PACIFIC_MARKET"
  },
  {
    icon: Code2,
    title: "Developer Tools",
    desc: "Free utilities built for speed, simplicity, and real work.",
    color: "text-brand-primary",
    ring: "hover:ring-violet-400/40",
    hasLogo: false
  },
];

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
              Product Studio
            </div>

            <h1
              data-testid="hero-title"
              className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-6 opacity-0 animate-fade-in-delay-1"
            >
              We build tools
              <br />
              <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-senseai bg-clip-text text-transparent">
                that matter.
              </span>
            </h1>

            <p
              data-testid="hero-description"
              className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl mb-10 opacity-0 animate-fade-in-delay-2"
            >
              SaaSy Cookies is a product studio crafting AI-powered apps,
              community platforms, and free developer utilities from New Zealand.
            </p>

            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-delay-3">
              <Link
                to="/senseai"
                data-testid="cta-senseai"
                className="inline-flex items-center gap-2 bg-senseai text-black font-semibold px-8 py-3 rounded-md transition-all duration-300 hover:bg-senseai/80 hover:scale-[1.02]"
              >
                <Brain className="w-4 h-4" strokeWidth={1.5} />
                Explore SenseAI
              </Link>
              <Link
                to="/pacificmarket"
                data-testid="cta-pacific"
                className="inline-flex items-center gap-2 bg-pacific text-black border border-pacific/40 hover:bg-pacific/80 hover:border-pacific/60 font-medium px-8 py-3 rounded-md transition-all"
              >
                <Globe className="w-4 h-4" strokeWidth={1.5} />
                Pacific Market
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section data-testid="services-section" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.16) 0%, transparent 55%), radial-gradient(circle at 80% 40%, rgba(6,182,212,0.12) 0%, transparent 55%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
            <span className={SECTION_LABEL_STYLES.primary}>
              Services
            </span>
          </div>
          <h2
            data-testid="services-title"
            className={SECTION_TITLE_STYLES.main}
          >
            Custom websites built for clarity and conversion
          </h2>
          <p className={SECTION_DESCRIPTION_STYLES}>
            From strategy to launch, we design and ship websites that show your value and
            turn visitors into customers.
          </p>

          <Link
            to="/services/websites"
            data-testid="service-website-card"
            className={`${CARD_STYLES.base} hover:ring-emerald-400/40`}
          >
            <div className={CARD_STYLES.padding}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
                </div>
                <span className="font-heading text-2xl font-bold text-emerald-400">Website Development</span>
              </div>
              <p className="text-zinc-200 leading-relaxed mb-6 max-w-md">
                From strategy to launch, we design and ship websites that show your value and
                turn visitors into customers. A guided discovery + build process tailored to your brand, goals, and audience.
              </p>
              <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium group-hover:gap-3 transition-all">
                Request a quote <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-emerald-400/50 via-emerald-400/20 to-transparent" />
          </Link>
        </div>
      </section>

      {/* What We Build */}
      <section data-testid="what-we-build-section" className="py-24 md:py-32 relative bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[40px] bg-brand-primary/50" />
            <span className={SECTION_LABEL_STYLES.primary}>
              What We Build
            </span>
          </div>
          <h2
            data-testid="what-we-build-title"
            className={SECTION_TITLE_STYLES.main}
          >
            Products with purpose
          </h2>
          <p className={SECTION_DESCRIPTION_STYLES}>
            Every tool we ship solves a real problem. We focus on craft,
            usability, and impact over vanity metrics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`${CARD_STYLES.base} ${card.ring} rounded-xl`}
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-white/[0.02] to-transparent" />
                  <div className={CARD_STYLES.categoryLayout}>
                    <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-5 ${card.color}`}>
                      {card.hasLogo ? (
                        <img
                          src={PRODUCT_LOGOS[card.logoKey].src}
                          alt={PRODUCT_LOGOS[card.logoKey].alt}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      )}
                    </div>
                    <h3 className={SECTION_TITLE_STYLES.card}>{card.title}</h3>
                    <p className="text-zinc-200/80 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
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
            Flagship launches
          </h2>
          <p className={SECTION_DESCRIPTION_STYLES}>
            Our signature products that showcase what's possible when design meets functionality.
            Each one solves real problems with thoughtful, user-centered experiences.
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
                  AI-powered journaling that helps you think clearly, reflect deeply,
                  and grow intentionally. Your thoughts, amplified.
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
              className={`${CARD_STYLES.base} hover:ring-amber-400/40`}
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
                  Connecting Pacific creators, businesses, and communities.
                  A marketplace built for visibility, impact, and growth.
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

      {/* Free Business Tools */}
      <section data-testid="tools-section" className="py-24 md:py-32 relative bg-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
            <span className={SECTION_LABEL_STYLES.primary}>
              Free Tools
            </span>
          </div>
          <h2
            data-testid="tools-title"
            className={SECTION_TITLE_STYLES.main}
          >
            Business utilities, on the house
          </h2>
          <p className={SECTION_DESCRIPTION_STYLES}>
            No sign-up. No paywall. Just useful tools built with care.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </section>

      {/* More Tools Coming Soon */}
      <section data-testid="coming-soon-section" className="py-24 md:py-32 relative bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mx-auto mb-8">
              <Rocket className="w-7 h-7 text-brand-primary" strokeWidth={1.5} />
            </div>
            <h2
              data-testid="coming-soon-title"
              className={SECTION_TITLE_STYLES.small}
            >
              More tools on the way
            </h2>
            <p className="text-zinc-200 text-lg leading-relaxed mb-10">
              We&apos;re always building. Templates, trackers, and
              more free tools are in the pipeline.
            </p>
            <Link
              to="/contact"
              data-testid="cta-stay-updated"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 font-medium px-8 py-3 rounded-md transition-all"
            >
              <Zap className="w-4 h-4" strokeWidth={1.5} />
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
