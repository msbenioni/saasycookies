import { Link } from "react-router-dom";
import {
  Globe, ArrowRight, Users, Store, Wifi, MapPin,
  Heart, Compass, BarChart3, Handshake
} from "lucide-react";
import { PRODUCT_LOGOS } from "../../constants/productLogos";
import { ScrollDeckLayout, PACIFIC_SECTION_LABELS } from "../../components/shared/TabLayout";

const visionPoints = [
  {
    icon: Users,
    title: "Find Pacific First",
    desc: "Show up in the right places with creator profiles, collections, and smart discovery built for the Pacific.",
  },
  {
    icon: Store,
    title: "Share Beyond Borders",
    desc: "Simple storefronts that match how you actually operate—without complicated tools or expensive overhead.",
  },
];

const sections = [
  { id: "pacific-hero", tab: PACIFIC_SECTION_LABELS.HERO, scrollable: false, content: (
    <div className="relative min-h-[80vh] flex items-center">
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
              Pacific Market connects you with creators, makers, and small businesses
              across the Pacific—so your support flows directly into communities,
              not just platforms.
            </p>
            <p className="text-zinc-300 text-base mt-4 max-w-xl">
              When you buy Pacific, you uplift families, culture, and stories that deserve to be seen.
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
    </div>
  )},
  { id: "pacific-gap", tab: PACIFIC_SECTION_LABELS.GAP, content: (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs font-medium text-pacific uppercase tracking-widest mb-4 block">
            {PACIFIC_SECTION_LABELS.GAP}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
            The Pacific has always created.
            <br />
            <span className="text-pacific">The world just hasn't always seen it.</span>
          </h2>

          <p className="text-zinc-200 text-lg leading-relaxed">
            Across the Pacific, creativity is woven into daily life—food, fashion, carving,
            storytelling, entrepreneurship. But global platforms were never designed
            with Pacific realities in mind.
          </p>

          <p className="text-zinc-200 text-lg leading-relaxed mt-6">
            That makes it harder for supporters like you to find and uplift Pacific businesses in one place.
            Not because the talent isn't there—because the infrastructure hasn't been.
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
  )},
  { id: "pacific-vision", tab: PACIFIC_SECTION_LABELS.VISION, content: (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-xs font-medium text-pacific uppercase tracking-widest mb-4 block">
          {PACIFIC_SECTION_LABELS.VISION}
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
          A marketplace <span className="text-pacific">built for the Pacific.</span>
        </h2>
        <p className="text-zinc-300 text-lg leading-relaxed">
          Pacific Market is a digital village square.
          A place where culture stays intact, commerce stays fair,
          and discovery feels intentional.
        </p>

        <p className="text-zinc-300 text-lg leading-relaxed mt-6">
          Here, supporting Pacific creators isn&apos;t an afterthought.
          It&apos;s the foundation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visionPoints.map((vp) => {
          const Icon = vp.icon;
          return (
            <div
              key={vp.title}
              data-testid={`vision-${vp.title?.toLowerCase().replace(/\s/g, "-") || ""}`}
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
  )},
  { id: "pacific-tech", tab: PACIFIC_SECTION_LABELS.IMPACT, content: (
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
            {PACIFIC_SECTION_LABELS.IMPACT}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Every action creates ripple effects.
          </h2>
          <p className="text-zinc-200 text-lg leading-relaxed">
            Every visit increases visibility.
            Every purchase circulates income locally.
            Every share strengthens cultural continuity.
          </p>
          <p className="text-zinc-200 text-lg leading-relaxed mt-6">
            You&apos;re not just buying a product.
            You&apos;re participating in a movement toward digital equity for the Pacific.
          </p>
        </div>
      </div>
    </div>
  )},
  { id: "pacific-cta", tab: PACIFIC_SECTION_LABELS.CTA, content: (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-full flex items-center justify-center">
      <div className="text-center">
        <span className="text-xs font-medium text-pacific uppercase tracking-widest mb-4 block">
          {PACIFIC_SECTION_LABELS.CTA}
        </span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Join the Pacific movement
        </h2>
        <p className="text-zinc-200 text-lg mb-10 max-w-xl mx-auto">
          Explore Pacific creators. Share their stories.
          Choose platforms that reflect your values.
          Stand with communities building their own digital future.
        </p>
        <p className="text-zinc-400 text-sm mt-4">
          Built for Pacific communities.
        </p>
        <a
          href="https://www.pacificmarket.co.nz"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="pacific-cta-button"
          className="inline-flex items-center gap-2 bg-pacific text-black font-semibold px-8 py-3 rounded-md transition-all duration-300 hover:bg-pacific/80 hover:scale-[1.02]"
        >
          <Globe className="w-4 h-4" strokeWidth={1.5} />
          Explore Pacific Market
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </a>
      </div>
    </div>
  )},
];

export default function PacificMarketPage() {
  return <ScrollDeckLayout sections={sections} topOffset={120} />;
}
