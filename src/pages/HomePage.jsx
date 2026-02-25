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
  HERO: "Home",
  PATH: "Choose Your Path",
  DIFFERENCE: "Difference",
  PRODUCTS: "Featured Products",
  UTILITIES: "Business Utilities",
  INFRASTRUCTURE: "Infrastructure First",
  COMPARISON: "The Better Way",
  CTA: "Ready to Launch",
};

const sections = [
  {
    id: "home-hero",
    tab: HOME_SECTION_LABELS.HERO,
    scrollable: false,
    content: (
      <section data-testid="hero-section" className="relative min-h-[80vh] flex items-center">
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full py-8">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-medium mb-8">
              <Sparkles className="w-3 h-3" strokeWidth={1.5} />
              AI Systems Company
            </div>

            <h1 data-testid="hero-title" className="font-heading text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-6">
              We Build Revenue-Ready
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-senseai bg-clip-text text-transparent">
                Digital Infrastructure.
              </span>
            </h1>

            <p data-testid="hero-description" className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl mb-10">
              Websites, funnels, automation, and AI systems - designed, deployed, and managed for founders who are scaling.
              <br className="hidden sm:block" />
              No DIY tools. No duct-taped tech stacks. Just clean systems that grow with you.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/pricing" data-testid="cta-view-subscription-plans" className="inline-flex items-center gap-2 bg-emerald-400 text-black font-semibold px-8 py-3 rounded-md transition-all duration-300 hover:bg-emerald-300 hover:scale-[1.02]">
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                View Subscription Plans
              </Link>
              <Link to="/services/ai-saas" data-testid="cta-start-custom-ai-project" className="inline-flex items-center gap-2 bg-zinc-900 text-white border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 font-medium px-8 py-3 rounded-md transition-all">
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                Start a Custom AI Project
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
            <span className="text-white font-light">to Work With SaaSy Cookies</span>
          </h2>
          <p className={`${SECTION_DESCRIPTION_STYLES} max-w-3xl`}>
            Choose the model that matches your stage: predictable pricing plans or a custom AI/SaaS product build.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className={`${CARD_STYLES.base} hover:ring-emerald-400/40 flex flex-col h-full`}>
              <div className={`${CARD_STYLES.padding} flex flex-col h-full`}>
                <h3 className={`${CARD_STYLES.lightText.title} text-emerald-600`}>Managed Digital Infrastructure</h3>
                <p className={CARD_STYLES.lightText.description}>
                  For founders who need website, funnels, payments, automation, and ongoing system management.
                </p>
                <ul className={`space-y-2 ${CARD_STYLES.lightText.list} mb-6`}>
                  <li>Predictable subscription.</li>
                  <li>Launched in 2 weeks (most projects).</li>
                  <li>$10 build-fee to begin your project.</li>
                </ul>
                <div className="mt-auto">
                  <Link to="/pricing" className="inline-flex items-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-6 py-3 hover:bg-emerald-300 transition">
                    View Plans
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </article>

            <article className={`${CARD_STYLES.base} hover:ring-cyan-400/40 flex flex-col h-full`}>
              <div className={`${CARD_STYLES.padding} flex flex-col h-full`}>
                <h3 className={`${CARD_STYLES.lightText.title} text-cyan-600`}>Get Quote</h3>
                <p className={CARD_STYLES.lightText.description}>
                  For founders building AI tools, marketplaces, member platforms, and full SaaS products.
                </p>
                <p className={`text-sm ${CARD_STYLES.lightText.muted} mb-6`}>Architecture {"->"} Design {"->"} Build {"->"} Deploy.</p>
                <div className="mt-auto">
                  <Link to="/services/ai-saas" className="inline-flex items-center gap-2 rounded-md border border-cyan-400/40 text-cyan-200 font-semibold px-6 py-3 hover:bg-cyan-500/10 transition">
                    Submit Project Brief
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
            <span className="text-white font-light">. We Build</span>{" "}
            <span className="text-emerald-400 font-extrabold">Systems</span>.
          </h2>
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
            <span className="text-emerald-400 font-extrabold">What We Believe In</span>.
          </h2>
          <p className={SECTION_DESCRIPTION_STYLES}>
            We don&apos;t just build for clients. We build our own platforms too.
            This is how we think: systems, not templates.
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
                  AI-powered journaling that turns reflection into clarity and decision momentum.
                </p>
                <div className="inline-flex items-center gap-2 text-senseai text-sm font-medium group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
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
            <span className="text-red-400 font-extrabold">No Gatekeeping</span>.
          </h2>
          <p className={SECTION_DESCRIPTION_STYLES}>
            Free and premium utilities built for real business workflows.
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
                        Create a shareable digital profile with contact save, QR code, and instant updates.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-indigo-300 text-sm font-medium group-hover:gap-2.5 transition-all">
                    Start free trial <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
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
                        Create professional invoices in seconds. Add line items, taxes, and download as PDF.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-brand-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                    Try it free <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
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
                        Generate QR codes for URLs, text, or contact info. Download as PNG in any size.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-brand-accent text-sm font-medium group-hover:gap-2.5 transition-all">
                    Try it free <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <p className="text-zinc-400 text-sm mt-6">We believe infrastructure should be accessible.</p>
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
              We design infrastructure that removes friction - so you can focus on leadership and growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <div className={`${CARD_STYLES.base} p-6 text-center hover:scale-105 transition-transform duration-300`}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-400/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="font-semibold text-white mb-2">Move Faster</h3>
                <p className={CARD_STYLES.lightText.muted}>Launch in weeks, not months</p>
              </div>
              <div className={`${CARD_STYLES.base} p-6 text-center hover:scale-105 transition-transform duration-300`}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cyan-400/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-cyan-300" />
                </div>
                <h3 className="font-semibold text-white mb-2">Scale Smoother</h3>
                <p className={CARD_STYLES.lightText.muted}>Built for growth from day one</p>
              </div>
              <div className={`${CARD_STYLES.base} p-6 text-center hover:scale-105 transition-transform duration-300`}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-400/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="font-semibold text-white mb-2">Sell With Confidence</h3>
                <p className={CARD_STYLES.lightText.muted}>Reliable systems that convert</p>
              </div>
              <div className={`${CARD_STYLES.base} p-6 text-center hover:scale-105 transition-transform duration-300`}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-pink-400/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-pink-300" />
                </div>
                <h3 className="font-semibold text-white mb-2">Stop Firefighting</h3>
                <p className={CARD_STYLES.lightText.muted}>No more backend emergencies</p>
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
                  <h3 className="text-2xl font-bold text-white mb-2">The Better Way to Build</h3>
                  <p className={CARD_STYLES.lightText.muted}>Compare DIY vs Done-For-You Infrastructure</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 font-medium mb-4">
                    <AlertTriangle className="w-4 h-4" />
                    DIY Builder
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: Clock, text: "You manage everything", subtext: "Endless maintenance" },
                      { icon: BookOpen, text: "You learn automation", subtext: "Steep learning curve" },
                      { icon: Wrench, text: "You fix integrations", subtext: "Constant debugging" },
                      { icon: DollarSign, text: "$80-$150 in tools", subtext: "Multiple subscriptions" },
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
                    SaaSy Cookies
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: Users, text: "We manage everything", subtext: "Hands-off solution" },
                      { icon: Cpu, text: "We build automation", subtext: "Proven systems" },
                      { icon: Plug, text: "We fix integrations", subtext: "Expert support" },
                      { icon: CreditCard, text: "One predictable subscription", subtext: "All-inclusive pricing" },
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
                      Choose the Better Way
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
            <span className="text-zinc-300 font-light">Managing Your Website.</span>
            <br className="block sm:hidden" />
            <span className="text-emerald-400 font-extrabold">Start</span>{" "}
            <span className="text-zinc-300 font-light">Running Your Business.</span>
          </h2>
          <p className="text-zinc-300 text-lg mb-8 font-medium">Let us handle the backend.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/pricing" className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-7 py-3 hover:bg-emerald-300 transition">
              View Subscription Plans
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link to="/services/ai-saas" className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 text-white font-semibold px-7 py-3 hover:bg-zinc-800 transition">
              Start a Custom AI Project
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
