import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight, Mail, Phone } from "lucide-react";
import {
  PAGE_HEADER_ICON_CLASS,
  PAGE_HEADER_TITLE_CLASS,
  PAGE_HEADER_DESC_CLASS,
  CARD_STYLES,
  BG_COLORS,
  TEXT_COLORS,
  PAGE_BACKGROUND_STYLES,
  PAGE_CONTAINER_STYLES,
} from "../constants/formStyles";

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear checkout-related session storage
    sessionStorage.removeItem("planRecommendation");
    sessionStorage.removeItem("selectedPlan");
    sessionStorage.removeItem("stage1Payload");
  }, []);

  return (
    <div className={PAGE_BACKGROUND_STYLES.quote.container}>
      <div
        className={PAGE_BACKGROUND_STYLES.quote.gradientOverlay}
        style={{ background: PAGE_BACKGROUND_STYLES.quote.gradientStyle }}
      />
      <div className={PAGE_BACKGROUND_STYLES.quote.noiseOverlay} />

      <div className={PAGE_CONTAINER_STYLES} style={{ position: "relative", zIndex: 10 }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Success Icon */}
          <div className={`${PAGE_HEADER_ICON_CLASS} ${BG_COLORS.emerald} mx-auto mb-6`}>
            <CheckCircle className={`w-8 h-8 ${TEXT_COLORS.emerald}`} strokeWidth={1.5} />
          </div>

          {/* Success Message */}
          <h1 className={PAGE_HEADER_TITLE_CLASS}>Payment Successful!</h1>
          <p className={PAGE_HEADER_DESC_CLASS}>
            Thank you for choosing SaaSy Cookies. Your $10 kickoff deposit has been received and your 30-day build phase has begun.
          </p>

          {/* Next Steps Card */}
          <div className={`${CARD_STYLES.base} max-w-2xl mx-auto mt-8`}>
            <h2 className="text-2xl font-bold text-white mb-6">What Happens Next</h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-400 text-xs font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Project Review</h3>
                  <p className="text-zinc-400 text-sm">
                    Our team will review your project requirements and confirm the build timeline.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-400 text-xs font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Build Phase Begins</h3>
                  <p className="text-zinc-400 text-sm">
                    We'll start building your digital infrastructure within 24-48 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-400 text-xs font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Regular Updates</h3>
                  <p className="text-zinc-400 text-sm">
                    You'll receive regular progress updates and can review the build as it develops.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-400 text-xs font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Launch & Support</h3>
                  <p className="text-zinc-400 text-sm">
                    After successful launch, your monthly partnership begins with ongoing support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`${CARD_STYLES.base} max-w-2xl mx-auto mt-6`}>
            <h3 className="text-lg font-semibold text-white mb-4">Need to Contact Us?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@saasycookies.com"
                className="flex items-center gap-2 text-zinc-300 hover:text-emerald-300 transition"
              >
                <Mail className="w-4 h-4" />
                support@saasycookies.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-zinc-300 hover:text-emerald-300 transition"
              >
                <Phone className="w-4 h-4" />
                +1 (234) 567-890
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate("/")}
              className={`inline-flex items-center justify-center gap-2 ${BG_COLORS.emerald} text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition`}
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/pricing")}
              className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-zinc-800 transition"
            >
              View Pricing Plans
            </button>
          </div>

          {/* Receipt Information */}
          <div className="mt-8 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
            <p className="text-zinc-400 text-sm mb-2">Payment Receipt</p>
            <p className="text-zinc-500 text-xs">
              A receipt for your $10.00 kickoff deposit has been sent to your email address. 
              You will also receive a detailed project confirmation within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
