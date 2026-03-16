import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function CallToAction({
  badge,
  headline,
  subheadline,
  customBriefLink,
  customBriefText = "Submit a Custom Build Brief",
  buttonText = "Submit Project Brief",
  buttonTo = "/services/ai-saas",
  className = "",
}) {
  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 65% 30%, rgba(16,185,129,0.12) 0%, transparent 50%)",
        }}
      />

      <div className="relative w-full px-6 md:px-12 lg:px-24 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-8">
                <CheckCircle className="w-3 h-3" strokeWidth={1.5} />
                {badge}
              </div>
            )}

            <h2 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight leading-[0.95] max-w-[20ch] mx-auto">
              {headline}
            </h2>

            <p className="mt-6 text-lg md:text-xl text-zinc-200 leading-relaxed max-w-[52ch] mx-auto">
              {subheadline}
            </p>

            {customBriefLink && (
              <p className="text-zinc-400 text-sm mb-8">
                Need something beyond these plans?{" "}
                <Link to={customBriefLink} className="text-cyan-300 hover:text-cyan-200 transition">
                  {customBriefText}
                </Link>
                .
              </p>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to={buttonTo}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 text-black hover:bg-emerald-300 px-7 py-3 font-semibold transition"
              >
                {buttonText}
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
