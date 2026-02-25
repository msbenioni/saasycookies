import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Layers,
  Calculator,
  TrendingUp,
  Zap,
} from "lucide-react";
import { sendProjectBriefEmail } from "../utils/emailService";
import { recommendPlan, generateBuildPrompt } from "../utils/planRecommendation";
import { clientIntakeAPI } from "../utils/supabaseClient";
import { acceptPlanAndSubscribe } from "../utils/stripeService";
import { usePricing } from "../hooks/usePricing";
import { logger } from "../utils/logger";
import {
  formatPriceForCountry,
  getCurrencyForCountry
} from "../utils/currencyMapping";
import {
  INPUT_CLASS,
  SELECT_CLASS,
  CHECKBOX_LABEL_CLASS,
  CHECKBOX_INPUT_CLASS,
  FOCUS_COLORS,
  TEXT_COLORS,
  BG_COLORS,
  PAGE_HEADER_ICON_CLASS,
  PAGE_HEADER_TITLE_CLASS,
  PAGE_HEADER_DESC_CLASS,
  ICON_BG_COLORS,
  SECTION_CLASS,
  SECTION_TITLE_CLASS,
  FORM_GRID_CLASS,
  PAGE_BACKGROUND_STYLES,
  PAGE_HEADER_TO_FORM_SPACING,
  FORM_LABEL_SPACING,
  FORM_CHECKBOX_LABEL_SPACING,
  FORM_CONTAINER_CLASS,
  CARD_STYLES,
} from "../constants/formStyles";

// NOTE: encode() not used in this file right now, but safe to keep if you’ll use later.
function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

function Field({ label, name, type = "text", required, placeholder }) {
  return (
    <div>
      <label className={`block text-sm text-zinc-300 ${FORM_LABEL_SPACING}`}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={INPUT_CLASS + " " + FOCUS_COLORS.emerald}
        defaultValue=""
      />
    </div>
  );
}

function Select({ label, name, required, options }) {
  return (
    <div>
      <label className={`block text-sm text-zinc-300 ${FORM_LABEL_SPACING}`}>
        {label}
        {required ? " *" : ""}
      </label>
      <select
        name={name}
        required={required}
        className={SELECT_CLASS + " " + FOCUS_COLORS.emerald}
        defaultValue=""
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea({ label, name, required, placeholder, rows = 4 }) {
  return (
    <div>
      <label className={`block text-sm text-zinc-300 ${FORM_LABEL_SPACING}`}>
        {label}
        {required ? " *" : ""}
      </label>
      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className={INPUT_CLASS + " " + FOCUS_COLORS.emerald}
        defaultValue=""
      />
    </div>
  );
}

function CheckboxGroup({ label, name, options, hint }) {
  return (
    <div>
      <div className={`flex items-center justify-between ${FORM_CHECKBOX_LABEL_SPACING}`}>
        <label className="block text-sm text-zinc-300">{label}</label>
        {hint ? <span className="text-xs text-zinc-500">{hint}</span> : null}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <label key={option} className={CHECKBOX_LABEL_CLASS}>
            <input
              type="checkbox"
              name={name}
              value={option}
              className={
                CHECKBOX_INPUT_CLASS +
                " " +
                TEXT_COLORS.emerald +
                " focus:ring-emerald-400/40"
              }
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function RequestAISaaSBriefPage() {
  const [status, setStatus] = useState("idle");
  const [stage, setStage] = useState(1); // 1 = Qualification, 2 = Technical Details
  const [planRecommendation, setPlanRecommendation] = useState(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showPlanComparison, setShowPlanComparison] = useState(false);
  const [stage1Payload, setStage1Payload] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [processingPlan, setProcessingPlan] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { pricingTiers, updateCountry, getPrice } = usePricing();

  // Ref for modal scroll functionality
  const recommendationCardRef = useRef(null);

  // Auto-scroll to modal and lock background scroll
  useEffect(() => {
    if (!showRecommendation) return;

    // Lock background scroll while modal is open (mobile friendly)
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Scroll modal card into view after it mounts
    const id = window.setTimeout(() => {
      recommendationCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);

    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = prevOverflow;
    };
  }, [showRecommendation]);

  async function handleStage1Submit(event) {
    event.preventDefault();
    setStatus("processing");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = { "form-name": "ai-saas-project-brief" };

    formData.forEach((value, key) => {
      if (key === "form-name") return;

      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        payload[key] = Array.isArray(payload[key])
          ? [...payload[key], String(value)]
          : [payload[key], String(value)];
      } else {
        payload[key] = String(value);
      }
    });

    // Calculate plan recommendation
    const recommendation = recommendPlan(payload);
    const buildPrompt = generateBuildPrompt(payload, recommendation);

    setPlanRecommendation(recommendation);
    setStage1Payload(payload);

    // Store stage 1 payload and build prompt for later use
    sessionStorage.setItem("stage1Payload", JSON.stringify(payload));
    sessionStorage.setItem("buildPrompt", buildPrompt);

    // Save country to localStorage for PricingPage
    if (payload.country) {
      localStorage.setItem("userCountry", payload.country);
    }

    setShowRecommendation(true);
    setStatus("idle");
  }

  function goBackToForm() {
    setShowRecommendation(false);
  }

  async function proceedToStripeCheckout() {
    setProcessing(true);

    try {
      // Check if we have a plan recommendation
      if (!planRecommendation) {
        throw new Error("No plan recommendation available. Please complete the form first.");
      }

      // Store plan recommendation for Stripe checkout
      sessionStorage.setItem("planRecommendation", JSON.stringify(planRecommendation));
      sessionStorage.setItem("selectedPlan", planRecommendation.planName);

      // Get all form data from sessionStorage
      const stage1Payload = JSON.parse(sessionStorage.getItem("stage1Payload") || "{}");

      if (!stage1Payload || Object.keys(stage1Payload).length === 0) {
        throw new Error("No form data found. Please complete the form first.");
      }

      // Get build prompt from sessionStorage
      const buildPrompt = sessionStorage.getItem("buildPrompt");

      // Create complete payload with all required fields
      const payload = {
        ...stage1Payload,
        "form-name": "ai-saas-project-brief",
        planRecommendation,
        selectedPlan: planRecommendation.planName,
        buildPrompt,
        action: "stripe-checkout",
        user_agent: navigator.userAgent,
        referrer: document.referrer,
      };

      // Save to Supabase
      const clientIntake = await clientIntakeAPI.createClientIntake(payload);

      if (!clientIntake || !clientIntake.id) {
        throw new Error("Failed to create client intake record.");
      }

      logger.log("Client intake saved for checkout:", clientIntake.id);

      // Send email notification to admin (non-blocking)
      sendProjectBriefEmail(payload).catch(error => {
        logger.warn("Admin email notification failed (non-critical):", error);
      });

      // Proceed to Stripe checkout payment completion
      sessionStorage.setItem("currentIntakeId", clientIntake.id);

      // Create Stripe checkout session and redirect to Stripe
      const checkoutSession = await acceptPlanAndSubscribe(
        planRecommendation.planId,
        stage1Payload.country || "OTHER"
      );

      // Redirect to Stripe's hosted checkout
      window.location.href = checkoutSession.checkoutUrl;
    } catch (error) {
      logger.error("Error preparing checkout:", error);
      setError(error.message || "There was an error preparing your checkout. Please try again.");
      setStatus("error");
      setProcessing(false);
    }
  }

  function viewOtherPlans() {
    // Store plan recommendation for later use
    if (planRecommendation) {
      sessionStorage.setItem("planRecommendation", JSON.stringify(planRecommendation));
    }
    // Show plan comparison modal
    setShowPlanComparison(true);
  }

  async function selectPlanForCheckout(planName, planPrice, country) {
    setProcessingPlan(planName);
    setError(null);

    try {
      // Get build prompt from sessionStorage
      const buildPrompt = sessionStorage.getItem("buildPrompt");

      // Create payload with selected plan
      const payload = {
        ...stage1Payload,
        "form-name": "ai-saas-project-brief",
        planRecommendation: {
          ...planRecommendation,
          planName,
          price: formatPriceForCountry(planPrice, country),
          currency: getCurrencyForCountry(country).code,
        },
        selectedPlan: planName,
        buildPrompt,
        action: "plan-selection-checkout",
        user_agent: navigator.userAgent,
        referrer: document.referrer,
      };

      // Save to Supabase
      const clientIntake = await clientIntakeAPI.createClientIntake(payload);

      // Send email notification to admin (non-blocking)
      sendProjectBriefEmail(payload).catch(error => {
        logger.warn("Admin email notification failed (non-critical):", error);
      });

      // Store intake ID and selected plan for checkout
      sessionStorage.setItem("currentIntakeId", clientIntake.id);
      sessionStorage.setItem("selectedPlan", planName);
      sessionStorage.setItem("planRecommendation", JSON.stringify({
        ...planRecommendation,
        planName,
        price: planPrice,
      }));

      // Close modal and create Stripe checkout session
      setShowPlanComparison(false);

      // Get planId from planName
      const planId = planName.toLowerCase().replace(" ", "-");

      // Create Stripe checkout session and redirect to Stripe
      const checkoutSession = await acceptPlanAndSubscribe(
        planId,
        country || "OTHER"
      );

      // Redirect to Stripe's hosted checkout
      window.location.href = checkoutSession.checkoutUrl;
    } catch (error) {
      logger.error("Error preparing checkout for selected plan:", error);
      setError("There was an error preparing your checkout. Please try again.");
      setStatus("error");
      setProcessingPlan(null);
    }
  }

  return (
    <div className={PAGE_BACKGROUND_STYLES.quote.container}>
      <div
        className={PAGE_BACKGROUND_STYLES.quote.gradientOverlay}
        style={{ background: PAGE_BACKGROUND_STYLES.quote.gradientStyle }}
      />
      <div className={PAGE_BACKGROUND_STYLES.quote.noiseOverlay} />

      {/* PREMIUM SHELL (replaces flat single-column look) */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-10 md:py-14">
          {/* Header */}
          <header className="mb-10 md:mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className={`${PAGE_HEADER_ICON_CLASS} ${ICON_BG_COLORS.emerald}`}>
                <Layers className={`w-5 h-5 ${TEXT_COLORS.emerald}`} strokeWidth={1.5} />
              </div>
              <h1 className={PAGE_HEADER_TITLE_CLASS}>Get Quote</h1>
            </div>

            <p className={`${PAGE_HEADER_DESC_CLASS} max-w-3xl`}>
              Complete this form to receive your personalized plan recommendation immediately. Pay a $10 upfront build fee and we'll start building right away. We'll contact you when your project is ready to demo or if we need any clarification.
            </p>

            <p className="text-sm text-zinc-400 mt-3 ml-[52px]">
              For subscription website plans, see{" "}
              <Link to="/pricing" className="text-emerald-300 hover:text-emerald-200 transition">
                Pricing Plans
              </Link>
              .
            </p>
          </header>

          {/* Error banner */}
          {status === "error" && (
            <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-300" />
              <div>
                <div className="font-semibold mb-1">Something went wrong</div>
                <div className="text-red-200/80 text-sm">
                  Please try again, or email support@saasycookies.com
                </div>
              </div>
            </div>
          )}

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT: Sticky stage / steps */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-4">
                {stage === 1 && (
                  <div className={`${CARD_STYLES.base} p-6 ring-1 ring-white/10 bg-white/[0.03]`}>
                    <h2 className="font-heading text-lg font-semibold text-white mb-3">
                      Quick Qualification
                    </h2>
                    <p className="text-zinc-200 text-sm mb-4">
                      Answer these questions to get your personalized plan recommendation and pricing.
                    </p>
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-emerald-300" />
                        <span>Complexity scoring</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-300" />
                        <span>Plan recommendation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-300" />
                        <span>30-second process</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Optional secondary card (visual balance / premium feel) */}
                <div className="rounded-2xl border border-white/10 bg-zinc-950/20 backdrop-blur-sm p-5">
                  <div className="text-xs text-zinc-400 uppercase tracking-widest mb-2">
                    You'll get
                  </div>
                  <div className="space-y-2 text-sm text-zinc-200">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                      <span>Instant plan recommendation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                      <span>Build starts immediately after payment</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                      <span>Contact when ready for demo</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT: Form surface */}
            <main className="lg:col-span-8">
              <div className="rounded-3xl border border-white/10 bg-zinc-950/30 backdrop-blur-md shadow-[0_30px_120px_-70px_rgba(16,185,129,0.55)]">
                <form
                  onSubmit={handleStage1Submit}
                  className="p-6 md:p-8 lg:p-10 space-y-6"
                >
                  <input type="hidden" name="form-name" value="ai-saas-project-brief" />

                  {/* SECTION WRAPPER HELPERS */}
                  {/* NOTE: content unchanged; wrappers only */}
                  <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7 space-y-6">
                    <h2 className={SECTION_TITLE_CLASS}>Basic Information</h2>
                    <div className={FORM_GRID_CLASS}>
                      <Field label="Full name" name="fullName" required />
                      <Field label="Email" name="email" type="email" required />
                      <Field
                        label="Business / organisation"
                        name="businessName"
                        required
                        placeholder="Your company or brand name"
                      />
                      <Select
                        label="Country"
                        name="country"
                        required
                        options={[
                          { label: "New Zealand", value: "NZ" },
                          { label: "Australia", value: "AU" },
                          { label: "Other", value: "OTHER" },
                        ]}
                      />
                      <Field label="Phone (optional)" name="phone" />
                    </div>
                  </section>

                  <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7 space-y-6">
                    <h2 className={SECTION_TITLE_CLASS}>Professional Email Setup</h2>
                    <p className="text-sm text-zinc-400">
                      Get up to 4 professional domain emails (e.g., hello@yourbusiness.com) forwarded to your existing email - included free!
                    </p>
                    <div className={FORM_GRID_CLASS}>
                      <Select
                        label="Do you want professional domain emails?"
                        name="wantProfessionalEmails"
                        required
                        options={[
                          { label: "Yes, please set this up for me", value: "Yes" },
                          { label: "No, I'll handle emails myself", value: "No" },
                        ]}
                      />
                      <Field
                        label="Primary email address for forwarding"
                        name="primaryGmailAddress"
                        type="email"
                        placeholder="yourname@email.com"
                      />
                      <Field
                        label="Custom email names (up to 4)"
                        name="customEmailNames"
                        placeholder="hello, support, bookings, admin"
                      />
                    </div>
                  </section>

                  <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7 space-y-6">
                    <h2 className={SECTION_TITLE_CLASS}>Business Overview</h2>
                    <Textarea
                      label="Business description"
                      name="businessDescription"
                      required
                      rows={3}
                      placeholder="What do you do and who do you serve?"
                    />
                    <div className={FORM_GRID_CLASS}>
                      <Select
                        label="Annual revenue range"
                        name="annualRevenueRange"
                        required
                        options={[
                          { label: "Pre-revenue", value: "pre-revenue" },
                          { label: "Under $50k", value: "under-50k" },
                          { label: "$50k-$150k", value: "50k-150k" },
                          { label: "$150k-$500k", value: "150k-500k" },
                          { label: "$500k+", value: "500k-plus" },
                        ]}
                      />
                      <Select
                        label="Offer structure"
                        name="offerStructure"
                        required
                        options={[
                          { label: "Single service", value: "single-service" },
                          { label: "Multiple services", value: "multiple-services" },
                          { label: "Course/digital product", value: "course-digital-product" },
                          { label: "Membership/community", value: "membership-community" },
                          { label: "High-ticket funnel", value: "high-ticket-funnel" },
                          { label: "Unsure", value: "unsure" },
                        ]}
                      />
                      <Select
                        label="Monthly leads expected"
                        name="monthlyLeadsExpected"
                        required
                        options={[
                          { label: "Under 20", value: "under-20" },
                          { label: "20–100", value: "20-100" },
                          { label: "100–500", value: "100-500" },
                          { label: "500+", value: "500-plus" },
                        ]}
                      />
                    </div>
                    <Select
                      label="Content frequency"
                      name="contentFrequency"
                      required
                      options={[
                        { label: "Rare updates", value: "rare-updates" },
                        { label: "Monthly updates", value: "monthly-updates" },
                        { label: "Weekly updates", value: "weekly-updates" },
                        { label: "Ongoing marketing machine", value: "ongoing-marketing" },
                      ]}
                    />
                  </section>

                  <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7 space-y-6">
                    <h2 className={SECTION_TITLE_CLASS}>Project Scope</h2>
                    <Select
                      label="Which service are you applying for?"
                      name="servicePath"
                      required
                      options={[
                        {
                          label: "Managed Digital Infrastructure (subscription website plans)",
                          value: "managed",
                        },
                        { label: "Get Quote (quoted project)", value: "custom" },
                      ]}
                    />
                    <Textarea
                      label="What are you building or improving?"
                      name="projectVision"
                      required
                      rows={3}
                      placeholder="Describe the product, platform, or system you want to build"
                    />
                    <CheckboxGroup
                      label="Project type"
                      name="projectType"
                      hint="Select up to 3"
                      options={[
                        "AI automation workflow",
                        "AI feature in existing platform",
                        "New SaaS product (MVP)",
                        "Website (New or Redesign)",
                        "Internal operations tool",
                        "Not sure yet",
                      ]}
                    />
                  </section>

                  <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7 space-y-6">
                    <h2 className={SECTION_TITLE_CLASS}>Required Capabilities</h2>
                    <CheckboxGroup
                      label="Required capabilities"
                      name="requiredCapabilities"
                      options={[
                        "AI assistant or recommendations",
                        "Workflow automation",
                        "Customer portal / dashboard",
                        "Authentication / user roles",
                        "Payments / subscriptions",
                        "3rd-party integrations / APIs",
                        "Analytics / reporting",
                      ]}
                    />
                  </section>

                  <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7 space-y-6">
                    <h2 className={SECTION_TITLE_CLASS}>Timeline & Hosting</h2>
                    <div className={FORM_GRID_CLASS}>
                      <Field
                        label="Desired launch date"
                        name="desiredLaunchDate"
                        placeholder="e.g. Q2 2025, June, ASAP"
                      />
                      <Select
                        label="Hosting expectation"
                        name="hostingExpectation"
                        required
                        options={[
                          { label: "I just want it done", value: "managed-hosting" },
                          { label: "I want ownership access", value: "owner-access" },
                          { label: "I want full control", value: "full-control" },
                        ]}
                      />
                    </div>
                  </section>

                  <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7 space-y-6">
                    <h2 className={SECTION_TITLE_CLASS}>Design & Brand</h2>
                    <div className={FORM_GRID_CLASS}>
                      <Field label="Current website or product URL" name="currentUrl" placeholder="https://" />
                      <Field label="Industry" name="industry" placeholder="e.g. Retail, coaching" />
                    </div>
                    <div className={FORM_GRID_CLASS}>
                      <Textarea
                        label="Brand colors (hex codes)"
                        name="brandColors"
                        placeholder="e.g. #FF6B6B, #4ECDC4, #45B7D1 (separate with commas)"
                        rows={2}
                      />
                      <Textarea
                        label="Preferred fonts/typography"
                        name="preferredFonts"
                        placeholder="e.g. Inter, Poppins, Montserrat (separate with commas)"
                        rows={2}
                      />
                    </div>
                    <div className={FORM_GRID_CLASS}>
                      <Textarea
                        label="3 websites you like and why"
                        name="inspirationWebsites"
                        placeholder="e.g. apple.com (clean design), stripe.com (professional), notion.so (modern interface)"
                        rows={3}
                      />
                      <Textarea
                        label="How do you want your website to look, feel, or vibe?"
                        name="designVibe"
                        required
                        placeholder="Describe the desired aesthetic, mood, and overall feeling you want to convey to visitors..."
                        rows={3}
                      />
                    </div>
                  </section>

                  {/* Pricing Acknowledgement */}
                  <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7 space-y-6">
                    <h2 className={SECTION_TITLE_CLASS}>Pricing acknowledgement</h2>
                    <div className="space-y-3">
                      <label className={CHECKBOX_LABEL_CLASS}>
                        <input
                          type="checkbox"
                          name="pricingAcknowledgement"
                          value="Reviewed pricing page"
                          required
                          className={
                            CHECKBOX_INPUT_CLASS +
                            " " +
                            TEXT_COLORS.emerald +
                            " focus:ring-emerald-400/40"
                          }
                        />
                        <span>
                          I have reviewed the pricing and understand plans are fixed-price subscriptions
                          (when applicable).{" "}
                          <Link
                            to="/pricing"
                            className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
                          >
                            View pricing
                          </Link>
                        </span>
                      </label>

                      <label className={CHECKBOX_LABEL_CLASS}>
                        <input
                          type="checkbox"
                          name="buildPhaseAcknowledgement"
                          value="30-day build phase understood"
                          required
                          className={
                            CHECKBOX_INPUT_CLASS +
                            " " +
                            TEXT_COLORS.emerald +
                            " focus:ring-emerald-400/40"
                          }
                        />
                        <span>
                          I understand this is a 30-Day System Build Phase with 12-month partnership commitment.
                        </span>
                      </label>
                    </div>
                  </section>

                  {/* CTA Row */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                    <button
                      type="submit"
                      disabled={status === "sending" || status === "processing"}
                      className={
                        "inline-flex items-center justify-center gap-2 rounded-xl " +
                        BG_COLORS.emerald +
                        " text-black font-semibold px-6 py-3 hover:opacity-90 transition disabled:opacity-50 flex-1 sm:flex-none"
                      }
                    >
                      {status === "sending"
                        ? "Sending..."
                        : status === "processing"
                          ? "Calculating..."
                          : "Get Plan Recommendation"}
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </button>
                    <p className="text-xs text-zinc-500 sm:ml-4">
                      By submitting, you agree you're happy for SaaSy Cookies to contact you about your request.
                    </p>
                  </div>

                  {/* Plan Recommendation Modal */}
                  {showRecommendation && planRecommendation && (
                    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-4 sm:p-6 z-50">
                      <div
                        ref={recommendationCardRef}
                        className={`${CARD_STYLES.base} p-5 sm:p-6 max-w-2xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`${PAGE_HEADER_ICON_CLASS} ${ICON_BG_COLORS.emerald}`}>
                            <TrendingUp
                              className={`w-5 h-5 ${TEXT_COLORS.emerald}`}
                              strokeWidth={1.5}
                            />
                          </div>
                          <h2 className="text-2xl font-bold text-white">Your Recommended Plan</h2>
                        </div>

                        {error && (
                          <div className={`${CARD_STYLES.base} p-4 mb-4 border-red-400/30 bg-red-400/10`}>
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-semibold text-red-200 mb-1">Error</div>
                                <div className="text-red-200/80 text-sm">{error}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className={`${CARD_STYLES.base} p-6 mb-6 border-emerald-400/30 bg-emerald-400/10`}>
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">
                                {planRecommendation.planName}
                              </h3>

                              <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                                <p className="text-2xl font-bold text-emerald-300">
                                  {planRecommendation.price}
                                </p>

                                <span className="text-sm text-zinc-400">
                                  (First month: $10)
                                </span>

                                {/* Mobile pill so it never gets cut off */}
                                <span className="sm:hidden inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-zinc-200">
                                  Complexity: <span className="ml-1 font-semibold text-white">{planRecommendation.score}/10</span>
                                </span>
                              </div>
                            </div>

                            {/* Desktop / tablet view */}
                            <div className="hidden sm:block text-right">
                              <div className="text-sm text-zinc-400">Complexity Score</div>
                              <div className="text-2xl font-bold text-white">
                                {planRecommendation.score}/10
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <p className="text-sm text-zinc-300">
                              <strong>Why this plan:</strong>
                            </p>
                            <ul className="space-y-1">
                              {planRecommendation.reasoning.map((reason, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-zinc-200 flex items-start gap-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                  <span>{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className={`${CARD_STYLES.base} p-3`}>
                              <p className="text-zinc-400 mb-1">Build Phase</p>
                              <p className="text-white font-semibold">30-Day System Build</p>
                            </div>
                            <div className={`${CARD_STYLES.base} p-3`}>
                              <p className="text-zinc-400 mb-1">Commitment</p>
                              <p className="text-white font-semibold">12-Month Partnership</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            type="button"
                            onClick={proceedToStripeCheckout}
                            disabled={processing}
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-6 py-3 hover:bg-emerald-300 transition disabled:opacity-50"
                          >
                            {processing ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                                Processing...
                              </>
                            ) : (
                              <>
                                Accept Recommended Plan
                                <ArrowRight className="w-4 h-4" strokeWidth={2} />
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={viewOtherPlans}
                            disabled={processing}
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 text-white font-semibold px-6 py-3 hover:bg-zinc-800 transition disabled:opacity-50"
                          >
                            View Other Plans
                          </button>
                        </div>

                        <p className="text-xs text-zinc-500 mt-4 text-center">
                          $10 kickoff deposit today. Monthly plan begins after 30-day build phase.
                        </p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Plan Comparison Modal */}
      {showPlanComparison && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={`${CARD_STYLES.base} p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`${PAGE_HEADER_ICON_CLASS} ${ICON_BG_COLORS.emerald}`}>
                  <Layers className={`w-5 h-5 ${TEXT_COLORS.emerald}`} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-white">Choose Your Plan</h2>
              </div>
              <button
                onClick={() => setShowPlanComparison(false)}
                className="text-zinc-400 hover:text-white transition"
              >
                ×
              </button>
            </div>

            {error && (
              <div className={`${CARD_STYLES.base} p-4 mb-4 border-red-400/30 bg-red-400/10`}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-red-200 mb-1">Error</div>
                    <div className="text-red-200/80 text-sm">{error}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`${CARD_STYLES.base} p-6 ${tier.highlight
                    ? "border-emerald-400/30 bg-emerald-400/5"
                    : tier.planId === "authority"
                      ? "border-purple-400/30 bg-purple-400/5"
                      : "border-zinc-700/50"
                    }`}
                >
                  <div className="text-center mb-6">
                    {tier.highlight && tier.name !== "Growth Engine" && (
                      <div className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-300 text-xs font-medium px-3 py-1 rounded-full mb-3">
                        <CheckCircle className="w-3 h-3" />
                        RECOMMENDED
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                    <p
                      className={`text-3xl font-bold mb-1 ${tier.planId === "authority"
                        ? "text-purple-300"
                        : "text-emerald-300"
                        }`}
                    >
                      {tier.price}
                    </p>
                    <p className="text-zinc-400 text-sm">{tier.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6 text-sm">
                    {tier.includes.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.planId === "authority" ? "text-purple-400" : "text-emerald-400"
                            }`}
                        />
                        <span className="text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      // NOTE: this assumes you have getPrice() in scope in your original file.
                      // If your original file uses getBasePrice or a different helper, swap this line back.
                      const price = getPrice(tier.planId);
                      selectPlanForCheckout(tier.name, price, stage1Payload?.country || "OTHER");
                    }}
                    disabled={processingPlan === tier.name}
                    className={`w-full font-semibold px-4 py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2 ${tier.planId === "authority"
                      ? "bg-purple-500 hover:bg-purple-600 text-white"
                      : tier.highlight
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : "bg-zinc-700 hover:bg-zinc-600 text-white"
                      }`}
                  >
                    {processingPlan === tier.name ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Choose {tier.name.split(" ")[0]}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-zinc-400 text-sm">
                All plans include 30-day build phase and 12-month partnership commitment
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}