import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Phone, Mail } from "lucide-react";
import { SECTION_LABEL_STYLES, SECTION_TITLE_STYLES, SECTION_DESCRIPTION_STYLES } from "../constants/formStyles";

export default function SubscriptionCancelledPage() {

  return (
    <div className="bg-void text-white">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 20% 25%, rgba(239,68,68,0.14) 0%, transparent 55%), radial-gradient(circle at 80% 35%, rgba(239,68,68,0.14) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-400/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" strokeWidth={2} />
            </div>
          </div>
          
          <span className={SECTION_LABEL_STYLES.primary}>Payment Cancelled</span>
          <h1 className={`${SECTION_TITLE_STYLES.main} mt-4`}>
            Subscription Setup Incomplete
          </h1>
          <p className={SECTION_DESCRIPTION_STYLES}>
            No worries! Your information has been saved and you can try again whenever you're ready.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="bg-zinc-800/50 rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">What Happened?</h2>
            
            <div className="space-y-4 text-zinc-200 mb-8">
              <p>
                The payment setup process was cancelled. This could happen for several reasons:
              </p>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>You closed the payment window before completing the process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Your payment method was declined</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>You encountered a technical issue</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-white mb-4">Good News!</h3>
              <div className="space-y-3 text-sm text-zinc-200">
                <p>✅ Your project qualification and plan recommendation have been saved</p>
                <p>✅ You can restart the payment process at any time</p>
                <p>✅ No charges were made to your payment method</p>
              </div>
            </div>

            <h3 className="font-semibold text-white mb-4">Next Steps</h3>
            <div className="space-y-4">
              <div className="bg-zinc-900/50 rounded-xl p-6">
                <h4 className="font-medium text-emerald-300 mb-2">Option 1: Try Again</h4>
                <p className="text-zinc-300 text-sm mb-4">
                  Return to the plan selection and restart the payment process. Your previous information will be preserved.
                </p>
                <Link
                  to="/plan-recommendation"
                  className="inline-flex items-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-6 py-3 hover:bg-emerald-300 transition"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                  Back to Plan Selection
                </Link>
              </div>

              <div className="bg-zinc-900/50 rounded-xl p-6">
                <h4 className="font-medium text-blue-300 mb-2">Option 2: Get Help</h4>
                <p className="text-zinc-300 text-sm mb-4">
                  If you encountered any issues or have questions about the payment process, we're here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 text-white font-semibold px-6 py-3 hover:bg-zinc-800 transition"
                  >
                    <Mail className="w-4 h-4" />
                    Email Support
                  </Link>
                  <a
                    href="tel:+1234567890"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 text-white font-semibold px-6 py-3 hover:bg-zinc-800 transition"
                  >
                    <Phone className="w-4 h-4" />
                    Call Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
