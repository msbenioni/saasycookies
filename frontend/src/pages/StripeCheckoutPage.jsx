import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import { sendProjectBriefEmail } from "../utils/emailService";
import { clientIntakeAPI } from "../utils/supabaseClient";
import {
  PAGE_HEADER_ICON_CLASS,
  PAGE_HEADER_TITLE_CLASS,
  PAGE_HEADER_DESC_CLASS,
  CARD_STYLES,
  SHARED_BACKGROUNDS,
  BG_COLORS,
  TEXT_COLORS,
  PAGE_BACKGROUND_STYLES,
  PAGE_CONTAINER_STYLES,
  SECTION_LABEL_STYLES,
  SECTION_TITLE_STYLES,
  SECTION_DESCRIPTION_STYLES,
} from "../constants/formStyles";

export default function StripeCheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [planRecommendation, setPlanRecommendation] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [stage1Payload, setStage1Payload] = useState(null);

  useEffect(() => {
    // Load stored data from sessionStorage
    const storedPlanRecommendation = sessionStorage.getItem("planRecommendation");
    const storedSelectedPlan = sessionStorage.getItem("selectedPlan");
    const storedStage1Payload = sessionStorage.getItem("stage1Payload");

    if (!storedPlanRecommendation || !storedSelectedPlan) {
      // No plan data, redirect to pricing
      navigate("/pricing");
      return;
    }

    try {
      setPlanRecommendation(JSON.parse(storedPlanRecommendation));
      setSelectedPlan(storedSelectedPlan);
      setStage1Payload(JSON.parse(storedStage1Payload || "{}"));
      setLoading(false);
    } catch (err) {
      console.error("Error loading plan data:", err);
      navigate("/pricing");
    }
  }, [navigate]);

  async function handleCheckout() {
    setProcessing(true);
    setError(null);

    try {
      // Check if data is already saved (intake ID exists)
      const existingIntakeId = sessionStorage.getItem("currentIntakeId");
      
      if (!existingIntakeId) {
        // Only save if not already saved
        const payload = {
          ...stage1Payload,
          "form-name": "ai-saas-project-brief",
          planRecommendation,
          selectedPlan,
          checkoutStep: "stripe-initiated",
          detected_currency: localStorage.getItem("geo_currency") || null,
          detected_country: localStorage.getItem("geo_country") || null,
          user_agent: navigator.userAgent,
          referrer: document.referrer,
        };

        // Save to Supabase
        const clientIntake = await clientIntakeAPI.createClientIntake(payload);
        console.log("Client intake saved for checkout:", clientIntake.id);

        // Send email notification
        await sendProjectBriefEmail(payload);

        // Store intake ID for payment completion
        sessionStorage.setItem("currentIntakeId", clientIntake.id);
      } else {
        console.log("Data already saved, proceeding with checkout using intake ID:", existingIntakeId);
      }

      // TODO: Initialize Stripe checkout
      // For now, redirect to success page
      navigate("/checkout-success");

    } catch (err) {
      console.error("Checkout error:", err);
      setError("There was an error processing your checkout. Please try again.");
      setProcessing(false);
    }
  }

  function goBack() {
    navigate(-1); // Go back to previous page
  }

  if (loading) {
    return (
      <div className={PAGE_BACKGROUND_STYLES.quote.container}>
        <div
          className={PAGE_BACKGROUND_STYLES.quote.gradientOverlay}
          style={{ background: PAGE_BACKGROUND_STYLES.quote.gradientStyle }}
        />
        <div className={PAGE_BACKGROUND_STYLES.quote.noiseOverlay} />
        <div className={PAGE_CONTAINER_STYLES} style={{ position: "relative", zIndex: 10 }}>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
              <p className="text-white">Loading checkout...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={PAGE_BACKGROUND_STYLES.quote.container}>
      <div
        className={PAGE_BACKGROUND_STYLES.quote.gradientOverlay}
        style={{ background: PAGE_BACKGROUND_STYLES.quote.gradientStyle }}
      />
      <div className={PAGE_BACKGROUND_STYLES.quote.noiseOverlay} />

      <div className={PAGE_CONTAINER_STYLES} style={{ position: "relative", zIndex: 10 }}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className={`${PAGE_HEADER_ICON_CLASS} ${BG_COLORS.emerald} mx-auto mb-4`}>
              <CreditCard className={`w-5 h-5 ${TEXT_COLORS.emerald}`} strokeWidth={1.5} />
            </div>
            <h1 className={PAGE_HEADER_TITLE_CLASS}>Complete Your Order</h1>
            <p className={PAGE_HEADER_DESC_CLASS}>
              Secure checkout powered by Stripe. Your $10 kickoff deposit starts the 30-day build phase.
            </p>
          </div>

          {error && (
            <div className={`${CARD_STYLES.base} p-4 mb-6 border-red-400/30 bg-red-400/10`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-red-200 mb-1">Payment Error</div>
                  <div className="text-red-200/80 text-sm">{error}</div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-6">
              <div className={CARD_STYLES.base}>
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                
                {/* Selected Plan */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {planRecommendation?.planName}
                    </h3>
                    <p className="text-zinc-400 text-sm">Monthly subscription</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-300">
                      {planRecommendation?.price}
                    </p>
                  </div>
                </div>

                {/* Build Phase Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-zinc-200">30-Day System Build Phase</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-zinc-200">12-Month Partnership Commitment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-zinc-200">Complete Digital Infrastructure Setup</span>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t border-zinc-700 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-zinc-300">
                      <span>Today (Kickoff Deposit)</span>
                      <span className="font-semibold">$10.00</span>
                    </div>
                    <div className="flex justify-between text-zinc-400 text-sm">
                      <span>Monthly plan begins after build phase</span>
                      <span>{planRecommendation?.price}/month</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-zinc-700 mt-4 pt-4">
                    <div className="flex justify-between text-white font-semibold text-lg">
                      <span>Total Due Today</span>
                      <span className="text-emerald-300">$10.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className={CARD_STYLES.base}>
                <h2 className="text-xl font-bold text-white mb-6">Payment Information</h2>
                
                {/* Stripe Elements Placeholder */}
                <div className="space-y-4">
                  <div className={`${SHARED_BACKGROUNDS.card} border border-zinc-800 rounded-lg p-4`}>
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-4 h-4 text-zinc-400" />
                      <span className="text-zinc-300 text-sm">Card Information</span>
                    </div>
                    <div className="text-zinc-500 text-sm">
                      Stripe payment form will be integrated here
                    </div>
                  </div>

                  <div className={`${SHARED_BACKGROUNDS.card} border border-zinc-800 rounded-lg p-4`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-zinc-400" />
                      <span className="text-zinc-300 text-sm">Billing Information</span>
                    </div>
                    <div className="text-zinc-500 text-sm">
                      Billing details will be collected here
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Security Badge */}
              <div className={CARD_STYLES.base}>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Secure Checkout</h3>
                  <p className="text-zinc-400 text-sm">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>

              {/* What's Included */}
              <div className={CARD_STYLES.base}>
                <h3 className="text-white font-semibold mb-4">What's Included</h3>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-400 mt-1 flex-shrink-0" />
                    <span>Custom website & funnel build</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-400 mt-1 flex-shrink-0" />
                    <span>Automation setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-400 mt-1 flex-shrink-0" />
                    <span>Hosting & maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-400 mt-1 flex-shrink-0" />
                    <span>Ongoing support</span>
                  </li>
                </ul>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={processing}
                className={`w-full ${BG_COLORS.emerald} text-black font-semibold px-6 py-4 rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2`}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Pay $10.00
                    <CreditCard className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-xs text-zinc-500 text-center">
                By completing this purchase, you agree to our 12-month partnership terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
