import { ChevronRight } from "lucide-react";
import {
  SECTION_LABEL_STYLES,
  SECTION_TITLE_STYLES,
  PAGE_BACKGROUND_STYLES,
} from "../constants/formStyles";

const faqItems = [
  {
    q: "What is the 30-Day Build Phase?",
    a: "We build and launch within the first 30 days (most projects ~2 weeks). Your monthly plan begins after launch — this keeps things fair and ensures you receive a working system before ongoing billing.",
  },
  {
    q: "What happens if I cancel early?",
    a: "We operate as a 12-month partnership. If you cancel early, the remaining months on the agreement are due.",
  },
  {
    q: "Can I upgrade tiers?",
    a: "Yes — you can upgrade anytime. We apply a pro-rata adjustment.",
  },
  {
    q: "What's included in 'Payment lifecycle management'?",
    a: "Stripe setup, checkout optimization, subscriptions, webhooks, and a basic CRM handoff (Authority plan).",
  },
  {
    q: "Is copywriting included?",
    a: "Light refinement is included. Full copywriting is available as an add-on.",
  },
  {
    q: "What are the scope limits?",
    a: "Starter: up to 5 pages. Growth: up to 10 pages + 1 funnel. Authority: up to 15 pages + 3 funnels. Extra scope is quoted.",
  },
  {
    q: "What's not included?",
    a: "Rebrands, major redesigns, custom apps, or large-scale integrations — these are scoped separately.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-void text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at 30% 20%, rgba(16,185,129,0.22) 0%, transparent 55%), radial-gradient(circle at 70% 40%, rgba(6,182,212,0.14) 0%, transparent 60%)"
        }}
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.7%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.03%22/%3E%3C/svg%3E')]" />

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-8">
              FAQ
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[0.95] max-w-[20ch] mx-auto text-white">
              Frequently Asked
              <br />
              <span className="text-emerald-400">Questions</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-zinc-200 leading-relaxed max-w-[52ch] mx-auto">
              Short, direct answers — if something is unusual, we'll confirm it during scoping.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-zinc-950/20 hover:bg-zinc-950/30 transition p-6"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white text-lg">{item.q}</h3>
                  </div>
                  <div className="shrink-0 mt-1 text-zinc-400 group-open:rotate-180 transition">
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </div>
                </summary>

                <div className="mt-4 text-sm text-zinc-300 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
