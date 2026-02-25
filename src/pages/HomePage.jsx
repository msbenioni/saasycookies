import { Link } from "react-router-dom";
import {
  FileText, QrCode, ArrowRight,
  Sparkles, ChevronRight, CreditCard,
  AlertTriangle, CheckCircle, Clock, BookOpen, Wrench, DollarSign, Users, Cpu, Plug, Zap, TrendingUp, Target, Shield
} from "lucide-react";
import { PRODUCT_LOGOS } from "../constants/productLogos";
import { ScrollDeckLayout } from "../components/shared/TabLayout";
import { SECTION_TITLE_STYLES, SECTION_LABEL_STYLES, CARD_STYLES, SECTION_DESCRIPTION_STYLES } from "../constants/formStyles";

const HOME_SECTION_LABELS = {
  HERO: "Overview",
  PATH: "Choose Your Path",
  DIFFERENCE: "Systems vs Pages",
  PRODUCTS: "Proof We Build",
  UTILITIES: "Free Tools",
  INFRASTRUCTURE: "Infrastructure First",
  COMPARISON: "DIY vs Done-For-You",
  CTA: "Start Here",
};

const sections = [
  {
    id: "home-hero",
    tab: HOME_SECTION_LABELS.HERO,
    scrollable: false,
    content: (
      <section data-testid="hero-section" className="relative min-h-[80vh] flex items-center">
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full py-8 z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-medium mb-8">
              <Sparkles className="w-3 h-3" strokeWidth={1.5} />
              Built for Founders Past DIY
            </div>

            <h1 data-testid="hero-title" className="font-heading text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-6">
              We Build Revenue-Ready Systems
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-senseai bg-clip-text text-transparent">
                So You Can Scale Without Tech Chaos.
              </span>
            </h1>

            <p data-testid="hero-description" className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl mb-10">
              Websites, funnels, payments, automation, and AI — designed, deployed, and managed as one clean system.
              <br className="hidden sm:block" />
              No duct-taped tools. No "figure it out later." Just infrastructure that supports real growth.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/pricing" data-testid="cta-view-subscription-plans" className="inline-flex items-center gap-2 bg-emerald-400 text-black font-semibold px-8 py-3 rounded-md transition-all duration-300 hover:bg-emerald-300 hover:scale-[1.02]">
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                See Plans & What's Included
              </Link>
              <Link to="/services/ai-saas" data-testid="cta-start-custom-ai-project" className="inline-flex items-center gap-2 bg-zinc-900 text-white border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 font-medium px-8 py-3 rounded-md transition-all">
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                Request a Custom Build
              </Link>
            </div>
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "home-choose-path",
    tab: HOME_SECTION_LABELS.PATH,
    content: (
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
            <span className={SECTION_LABEL_STYLES.primary}>{HOME_SECTION_LABELS.PATH}</span>
          </div>
          <h2 className={SECTION_TITLE_STYLES.main}>
            <span className="text-emerald-400 font-extrabold">Two Ways</span>{" "}
            <span className="text-white font-light">to Build With Us</span>
          </h2>
          <p className={`${SECTION_DESCRIPTION_STYLES} max-w-3xl`}>
            Choose the model that fits your stage — a predictable managed subscription, or a custom build for ambitious platforms and AI products.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className={`${CARD_STYLES.base} hover:ring-emerald-400/40 flex flex-col h-full`}>
              <div className={`${CARD_STYLES.padding} flex flex-col h-full`}>
                <h3 className={`${CARD_STYLES.lightText.title} text-emerald-600`}>Managed Infrastructure<br />(Done-For-You)</h3>
                <p className={CARD_STYLES.lightText.description}>
                  For founders who want a high-performing website, funnel, payments, and automation — without hiring a team or managing tools.
                </p>
                <ul className={`space-y-2 ${CARD_STYLES.lightText.list} mb-6`}>
                  <li>One monthly investment. No tool stack juggling.</li>
                  <li>Most projects live in ~2 weeks.</li>
                  <li>Start with a $10 activation to kick off.</li>
                </ul>
                <div className="mt-auto">
                  <Link to="/pricing" className="inline-flex items-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-6 py-3 hover:bg-emerald-300 transition">
                    Explore Managed Plans
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </article>

            <article className={`${CARD_STYLES.base} hover:ring-cyan-400/40 flex flex-col h-full`}>
              <div className={`${CARD_STYLES.padding} flex flex-col h-full`}>
                <h3 className={`${CARD_STYLES.lightText.title} text-cyan-600`}>Custom AI & Platform Builds</h3>
                <p className={CARD_STYLES.lightText.description}>
                  For founders building marketplaces, member platforms, AI tools, internal systems, or full SaaS products.
                </p>
                <p className={`text-sm ${CARD_STYLES.lightText.muted} mb-6`}>Architecture → Design → Build → Launch</p>
                <div className="mt-auto">
                  <Link to="/services/ai-saas" className="inline-flex items-center gap-2 rounded-md border border-cyan-400/40 text-cyan-200 font-semibold px-6 py-3 hover:bg-cyan-500/10 transition">
                    Submit a Project Brief
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "home-difference",
    tab: HOME_SECTION_LABELS.DIFFERENCE,
    content: (
      <section data-testid="difference-section" className="py-10 md:py-14 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
            <span className={SECTION_LABEL_STYLES.primary}>{HOME_SECTION_LABELS.DIFFERENCE}</span>
          </div>
          <h2 className={SECTION_TITLE_STYLES.main}>
            <span className="text-white font-light">We Don&apos;t Build</span>{" "}
            <span className="text-red-400 font-extrabold">Pages</span>{" "}
            <span className="text-white font-light">.</span>{" "}
            <span className="text-white font-light">We Build</span>{" "}
            <span className="text-emerald-400 font-extrabold">Revenue Systems</span>.
          </h2>
          <p className={`${SECTION_DESCRIPTION_STYLES} max-w-3xl`}>
            Design matters — but growth comes from structure. We build the infrastructure behind the visuals so your business can scale without breaking.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className={CARD_STYLES.base}>
              <div className={CARD_STYLES.padding}>
                <h3 className="font-heading text-2xl font-bold text-zinc-200 mb-4">Most "website builds" deliver</h3>
                <ul className="space-y-3 text-zinc-300">
                  <li>Pretty pages with no conversion strategy</li>
                  <li>Tool stacking with fragile integrations</li>
                  <li>A launch… then you're on your own</li>
                </ul>
              </div>
            </article>

            <article className={`${CARD_STYLES.base} ring-emerald-400/30`}>
              <div className={CARD_STYLES.padding}>
                <h3 className="font-heading text-2xl font-bold text-emerald-300 mb-4">We deliver</h3>
                <ul className="space-y-3 text-zinc-100">
                  <li>Clear revenue flow (how people buy)</li>
                  <li>Automation (so work doesn't pile up)</li>
                  <li>Infrastructure (payments, email, tracking, CRM)</li>
                  <li>Scalability (ready for the next stage)</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "home-featured-products",
    tab: HOME_SECTION_LABELS.PRODUCTS,
    content: (
      <section data-testid="featured-products-section" className="py-10 md:py-14 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
            <span className={SECTION_LABEL_STYLES.primary}>{HOME_SECTION_LABELS.PRODUCTS}</span>
          </div>
          <h2 data-testid="featured-products-title" className={SECTION_TITLE_STYLES.main}>
            <span className="text-white font-light">We Build</span>{" "}
            <span className="text-emerald-400 font-extrabold">What We Use</span>.
          </h2>
          <p className={SECTION_DESCRIPTION_STYLES}>
            We don&apos;t just build for clients — we build and run our own platforms.
            That means you get systems tested in real-world operations, not theory.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Link to="/senseai" data-testid="featured-senseai-card" className={`${CARD_STYLES.base} hover:ring-cyan-400/40`}>
              <div className={CARD_STYLES.overlay} style={{ background: "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.08) 0%, transparent 70%)" }} />
              <div className={CARD_STYLES.padding}>
                <div className="flex items-center gap-3 mb-6">
                  <img src={PRODUCT_LOGOS.SENSEAI.src} alt={PRODUCT_LOGOS.SENSEAI.alt} className={PRODUCT_LOGOS.SENSEAI.classes.CARD} />
                  <span className="font-heading text-2xl font-bold text-senseai">SenseAI</span>
                </div>
                <p className="text-zinc-200 leading-relaxed mb-6 max-w-md">
                  AI-powered journaling that turns reflection into clarity, focus, and better decisions.
                </p>
                <div className="inline-flex items-center gap-2 text-senseai text-sm font-medium group-hover:gap-3 transition-all">
                  See how it works <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-senseai/50 via-senseai/20 to-transparent" />
            </Link>

            <Link to="/pacificmarket" data-testid="featured-pacific-card" className={`${CARD_STYLES.base} hover:ring-pacific/40`}>
              <div className={CARD_STYLES.overlay} style={{ background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 70%)" }} />
              <div className={CARD_STYLES.padding}>
                <div className="flex items-center gap-3 mb-6">
                  <img src={PRODUCT_LOGOS.PACIFIC_MARKET.src} alt={PRODUCT_LOGOS.PACIFIC_MARKET.alt} className={PRODUCT_LOGOS.PACIFIC_MARKET.classes.CARD} />
                  <span className="font-heading text-2xl font-bold text-pacific">Pacific Market</span>
                </div>
                <p className="text-zinc-200 leading-relaxed mb-6 max-w-md">
                  A global directory and future marketplace uplifting Pacific creators through visibility and opportunity.
                </p>
                <div className="inline-flex items-center gap-2 text-pacific text-sm font-medium group-hover:gap-3 transition-all">
                  See how it works <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-pacific/50 via-pacific/20 to-transparent" />
            </Link>
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "home-business-utilities",
    tab: HOME_SECTION_LABELS.UTILITIES,
    content: (
      <section data-testid="tools-section" className="py-10 md:py-14 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
            <span className={SECTION_LABEL_STYLES.primary}>{HOME_SECTION_LABELS.UTILITIES}</span>
          </div>
          <h2 data-testid="tools-title" className={SECTION_TITLE_STYLES.main}>
            <span className="text-cyan-400 font-extrabold">Practical Tools.</span>{" "}
            <span className="text-white font-light">Built for Real Work</span>.
          </h2>
          <p className={SECTION_DESCRIPTION_STYLES}>
            Free and premium tools that remove friction for founders — fast, simple, and designed to look professional.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <Link to="/tools/digital-card" data-testid="tool-digital-card" className={`${CARD_STYLES.base} hover:ring-indigo-400/40 flex flex-col h-full group`}>
              <div className={`${CARD_STYLES.padding} flex flex-col h-full`}>
                <div className="flex-1">
                  <div className={CARD_STYLES.contentLayout}>
                    <div className="w-12 h-12 rounded-xl bg-indigo-400/10 border border-indigo-400/20 flex items-center justify-center shrink-0">
                      <CreditCard className="w-6 h-6 text-indigo-300" strokeWidth={1.5} />
                    </div>

                    <div className="flex-1">
                      <h3 className={SECTION_TITLE_STYLES.card}>Digital Business Card</h3>
                      <p className="text-zinc-200/80 text-sm leading-relaxed">
                        Create a shareable digital profile with contact-save, QR code, and instant updates — perfect for events and referrals.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-indigo-300 text-sm font-medium group-hover:gap-2.5 transition-all">
                    Create Yours <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/tools/invoice-generator" data-testid="tool-invoice-card" className={`${CARD_STYLES.base} hover:ring-violet-400/40 flex flex-col h-full group`}>
              <div className={`${CARD_STYLES.padding} flex flex-col h-full`}>
                <div className="flex-1">
                  <div className={CARD_STYLES.contentLayout}>
                    <div className={CARD_STYLES.iconContainer}>
                      <FileText className="w-6 h-6 text-brand-primary" strokeWidth={1.5} />
                    </div>

                    <div className="flex-1">
                      <h3 className={SECTION_TITLE_STYLES.card}>Invoice Generator</h3>
                      <p className="text-zinc-200/80 text-sm leading-relaxed">
                        Generate clean invoices in minutes — line items, taxes, branding, and instant PDF download.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-brand-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                    Generate an Invoice <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>

            <Link to="/tools/qr-generator" data-testid="tool-qr-card" className={`${CARD_STYLES.base} hover:ring-pink-400/40 flex flex-col h-full group`}>
              <div className={`${CARD_STYLES.padding} flex flex-col h-full`}>
                <div className="flex-1">
                  <div className={CARD_STYLES.contentLayout}>
                    <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shrink-0">
                      <QrCode className="w-6 h-6 text-brand-accent" strokeWidth={1.5} />
                    </div>

                    <div className="flex-1">
                      <h3 className={SECTION_TITLE_STYLES.card}>QR Code Generator</h3>
                      <p className="text-zinc-200/80 text-sm leading-relaxed">
                        Create QR codes for links, text, or contact details — download as high-quality PNG in any size.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-brand-accent text-sm font-medium group-hover:gap-2.5 transition-all">
                    Create a QR Code <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <p className="text-zinc-400 text-sm mt-6">Infrastructure should be accessible — not locked behind agencies or expensive stacks.</p>
        </div>
      </section>
    ),
  },
  {
    id: "home-infrastructure-first",
    tab: HOME_SECTION_LABELS.INFRASTRUCTURE,
    content: (
      <section data-testid="infrastructure-first-section" className="py-10 md:py-14 relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.primary}>{HOME_SECTION_LABELS.INFRASTRUCTURE}</span>
            </div>
            <h2 className={SECTION_TITLE_STYLES.main}>
              <span className="text-white font-light">Your</span>{" "}
              <span className="text-red-400 font-extrabold">website</span>{" "}
              <span className="text-white font-light">is not your business.</span>
              <br />
              <span className="text-white font-light">Your</span>{" "}
              <span className="text-emerald-400 font-extrabold">systems</span>{" "}
              <span className="text-white font-light">are.</span>
            </h2>
            <p className={`${SECTION_DESCRIPTION_STYLES} mb-12`}>
              Without infrastructure, growth creates chaos. We build the engine behind the brand — so your business runs smoother as demand increases.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <div className={`${CARD_STYLES.base} p-6 text-center hover:scale-105 transition-transform duration-300`}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-400/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="font-semibold text-white mb-2">Launch Faster</h3>
                <p className={CARD_STYLES.lightText.muted}>Weeks, not months</p>
              </div>
              <div className={`${CARD_STYLES.base} p-6 text-center hover:scale-105 transition-transform duration-300`}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cyan-400/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-cyan-300" />
                </div>
                <h3 className="font-semibold text-white mb-2">Scale Cleanly</h3>
                <p className={CARD_STYLES.lightText.muted}>Built to evolve, not rebuild</p>
              </div>
              <div className={`${CARD_STYLES.base} p-6 text-center hover:scale-105 transition-transform duration-300`}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-400/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="font-semibold text-white mb-2">Convert Consistently</h3>
                <p className={CARD_STYLES.lightText.muted}>Clear flows that drive action</p>
              </div>
              <div className={`${CARD_STYLES.base} p-6 text-center hover:scale-105 transition-transform duration-300`}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-pink-400/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-pink-300" />
                </div>
                <h3 className="font-semibold text-white mb-2">Stop Firefighting</h3>
                <p className={CARD_STYLES.lightText.muted}>No more "something broke" weeks</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "home-infrastructure-comparison",
    tab: HOME_SECTION_LABELS.COMPARISON,
    content: (
      <section className="py-10 md:py-14 relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-zinc-700" />
              <span className={SECTION_LABEL_STYLES.primary}>{HOME_SECTION_LABELS.COMPARISON}</span>
            </div>

            <div className={`${CARD_STYLES.base} p-8`}>
              <div className="flex items-center justify-center mb-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">DIY vs Done-For-You Infrastructure</h3>
                  <p className={CARD_STYLES.lightText.muted}>See the true cost of building alone.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 font-medium mb-4">
                    <AlertTriangle className="w-4 h-4" />
                    DIY / Tool Stack
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: Clock, text: "You manage everything", subtext: "Maintenance never ends" },
                      { icon: BookOpen, text: "You learn automation", subtext: "Time drain + overwhelm" },
                      { icon: Wrench, text: "You fix integrations", subtext: "Constant debugging" },
                      { icon: DollarSign, text: "You pay for tools", subtext: "Multiple subscriptions" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                        <item.icon className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <div className="text-left">
                          <p className="text-white font-medium">{item.text}</p>
                          <p className="text-zinc-400 text-sm">{item.subtext}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium mb-4">
                    <CheckCircle className="w-4 h-4" />
                    SaaSy Cookies (Managed)
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: Users, text: "We manage the system", subtext: "Hands-off delivery" },
                      { icon: Cpu, text: "We build automation", subtext: "Proven workflows" },
                      { icon: Plug, text: "We maintain integrations", subtext: "Expert support" },
                      { icon: CreditCard, text: "One predictable plan", subtext: "No stack sprawl" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <item.icon className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div className="text-left">
                          <p className="text-white font-medium">{item.text}</p>
                          <p className="text-zinc-400 text-sm">{item.subtext}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Link to="/pricing" className="inline-flex items-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-6 py-3 hover:bg-emerald-300 transition w-full justify-center">
                      See Plans & Start
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </Link>
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
    id: "home-final-cta",
    tab: HOME_SECTION_LABELS.CTA,
    content: (
      <section className="py-10 md:py-14 h-full flex items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-red-400 font-extrabold">Stop</span>{" "}
            <span className="text-zinc-300 font-light">Managing Tech.</span>
            <br className="block sm:hidden" />
            <span className="text-emerald-400 font-extrabold">Start</span>{" "}
            <span className="text-zinc-300 font-light">Building Momentum.</span>
          </h2>
          <p className="text-zinc-300 text-lg mb-8 font-medium">If you're ready for infrastructure that supports growth — pick a plan or request a custom build.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/pricing" className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-7 py-3 hover:bg-emerald-300 transition">
              See Plans
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link to="/services/ai-saas" className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 text-white font-semibold px-7 py-3 hover:bg-zinc-800 transition">
              Request a Custom Build
            </Link>
          </div>
        </div>
      </section>
    ),
  },
];

export default function HomePage() {
  return <ScrollDeckLayout sections={sections} topOffset={120} />;
}
