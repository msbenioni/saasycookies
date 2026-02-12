import { Link } from "react-router-dom";
import {
  Globe, ArrowRight, Users, Store, Wifi, MapPin,
  Heart, Compass, BarChart3, Handshake
} from "lucide-react";
import { PRODUCT_LOGOS } from "../../constants/productLogos";

const visionPoints = [
  {
    icon: Users,
    title: "Creator Visibility",
    desc: "Give Pacific creators the spotlight they deserve with dedicated storefronts and discovery tools.",
  },
  {
    icon: Store,
    title: "Local Commerce",
    desc: "A marketplace designed for how Pacific businesses actually operate, not how Silicon Valley thinks they should.",
  },
  {
    icon: Wifi,
    title: "Digital Access",
    desc: "Built for real-world connectivity. Works on slow networks, mobile-first, offline-capable.",
  },
  {
    icon: BarChart3,
    title: "Growth Analytics",
    desc: "Simple, actionable insights that help small businesses understand their audience and grow.",
  },
];

export default function PacificMarketPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section data-testid="pacific-hero" className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle at 60% 30%, rgba(245,158,11,0.12) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pacific/10 border border-pacific/20 text-pacific text-xs font-medium mb-8">
                <Globe className="w-3 h-3" strokeWidth={1.5} />
                Pacific Market by SaaSy Cookies
              </div>

              <h1
                data-testid="pacific-title"
                className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-6"
              >
                The Pacific
                <br />
                <span className="text-pacific">deserves better.</span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl mb-10">
                A community marketplace connecting Pacific Island creators,
                businesses, and cultural voices to a global audience.
              </p>
            </div>

            {/* Large Hero Logo - Right Side */}
            <div className="flex-shrink-0">
              <div className="relative p-2 rounded-2xl bg-gradient-to-r from-pacific/30 via-pacific/20 to-transparent shadow-[0_0_60px_rgba(245,158,11,0.6),0_0_120px_rgba(245,158,11,0.4)]">
                <img
                  src={PRODUCT_LOGOS.PACIFIC_MARKET.src}
                  alt={PRODUCT_LOGOS.PACIFIC_MARKET.alt}
                  className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Gap */}
      <section data-testid="pacific-gap" className="py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-medium text-pacific uppercase tracking-widest mb-4 block">
                The Gap
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Invisible to the world.
              </h2>
              <p className="text-zinc-200 text-lg leading-relaxed mb-6">
                Pacific Island creators and small businesses are some of the most
                resourceful, creative people on the planet. But they&apos;re invisible
                online. Global marketplaces weren&apos;t built for them. The tools are
                too complex, the fees too high, and the audience too far away.
              </p>
              <p className="text-zinc-200 text-lg leading-relaxed">
                The Pacific region generates incredible art, food, fashion, and
                services&mdash;but lacks the digital infrastructure to share it
                with the world.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/85 p-8">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop"
                  alt="Pacific island landscape"
                  className="w-full h-64 object-cover rounded-xl opacity-70"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section data-testid="pacific-vision" className="py-24 md:py-32 bg-void-paper/70">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-medium text-pacific uppercase tracking-widest mb-4 block">
              The Vision
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
              A marketplace <span className="text-pacific">built for the Pacific.</span>
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed">
              Pacific Market isn&apos;t another Etsy clone. It&apos;s a platform
              designed from the ground up for Pacific communities, with features
              that respect their culture, connectivity, and commerce patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visionPoints.map((vp) => {
              const Icon = vp.icon;
              return (
                <div
                  key={vp.title}
                  data-testid={`vision-${vp.title.toLowerCase().replace(/\s/g, "-")}`}
                  className="group relative overflow-hidden bg-zinc-900/85 border border-white/10 hover:border-pacific/20 transition-all duration-500 rounded-xl p-8"
                >
                  <div className="w-10 h-10 rounded-lg bg-pacific/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-pacific" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{vp.title}</h3>
                  <p className="text-zinc-200/80 text-sm leading-relaxed">{vp.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech as Enabler */}
      <section data-testid="pacific-tech" className="py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/70 p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-pacific/5 border border-pacific/10 p-5 flex flex-col items-center text-center">
                    <MapPin className="w-6 h-6 text-pacific mb-2" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-zinc-300">Local Discovery</span>
                  </div>
                  <div className="rounded-xl bg-pacific/5 border border-pacific/10 p-5 flex flex-col items-center text-center">
                    <Compass className="w-6 h-6 text-pacific mb-2" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-zinc-300">Global Reach</span>
                  </div>
                  <div className="rounded-xl bg-pacific/5 border border-pacific/10 p-5 flex flex-col items-center text-center">
                    <Handshake className="w-6 h-6 text-pacific mb-2" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-zinc-300">Fair Commerce</span>
                  </div>
                  <div className="rounded-xl bg-pacific/5 border border-pacific/10 p-5 flex flex-col items-center text-center">
                    <Wifi className="w-6 h-6 text-pacific mb-2" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-zinc-300">Low Bandwidth</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs font-medium text-pacific uppercase tracking-widest mb-4 block">
                Tech as Enabler
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Technology that serves, not complicates.
              </h2>
              <p className="text-zinc-300 text-lg leading-relaxed">
                We&apos;re using technology to remove barriers, not create new ones.
                Pacific Market is mobile-first, works on slow connections, and is
                designed so that anyone&mdash;from a weaver in Samoa to a food
                vendor in Fiji&mdash;can set up shop in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section data-testid="pacific-founder" className="py-24 md:py-32 bg-void-paper/70">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-pacific/10 border border-pacific/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-pacific" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                From the Founder
              </span>
            </div>
            <blockquote className="font-heading text-2xl md:text-3xl font-semibold leading-relaxed mb-6 text-zinc-200">
              &ldquo;Growing up Pacific, I saw incredible talent go unnoticed
              because the tools weren&apos;t there. Pacific Market is my way of
              building the bridge I wish existed.&rdquo;
            </blockquote>
            <p className="text-zinc-200/70">
              &mdash; Jasmin Benioni, Founder, SaaSy Cookies
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-testid="pacific-cta" className="py-24 md:py-32 text-center bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Join the Pacific movement
          </h2>
          <p className="text-zinc-200 text-lg mb-10 max-w-xl mx-auto">
            Whether you&apos;re a creator, a business, or someone who believes in
            equitable commerce&mdash;Pacific Market needs you.
          </p>
          <Link
            to="/"
            data-testid="pacific-cta-button"
            className="inline-flex items-center gap-2 bg-pacific text-black font-semibold px-8 py-3 rounded-md transition-all duration-300 hover:bg-pacific/80 hover:scale-[1.02]"
          >
            <Globe className="w-4 h-4" strokeWidth={1.5} />
            Explore Pacific Market
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </div>
  );
}
