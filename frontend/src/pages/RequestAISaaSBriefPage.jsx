import { useState } from "react";
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
  PAGE_CONTAINER_STYLES,
  PAGE_HEADER_TO_FORM_SPACING,
  FORM_LABEL_SPACING,
  FORM_CHECKBOX_LABEL_SPACING,
  FORM_CONTAINER_CLASS,
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
  const [stage1Payload, setStage1Payload] = useState(null);
  const navigate = useNavigate();

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
    setPlanRecommendation(recommendation);
    setStage1Payload(payload);

    // Store stage 1 payload for later use in Stripe checkout
    sessionStorage.setItem("stage1Payload", JSON.stringify(payload));

    setShowRecommendation(true);
    setStatus("idle");
  }

  async function handleFinalSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = { "form-name": "ai-saas-project-brief" };

    // Include Stage 1 data
    if (stage1Payload) {
      Object.entries(stage1Payload).forEach(([key, value]) => {
        if (key === "form-name") return;

        if (Array.isArray(value)) {
          value.forEach((val) => {
            if (Object.prototype.hasOwnProperty.call(payload, key)) {
              payload[key] = Array.isArray(payload[key])
                ? [...payload[key], String(val)]
                : [payload[key], String(val)];
            } else {
              payload[key] = String(val);
            }
          });
        } else {
          payload[key] = String(value);
        }
      });
    }

    // Include Stage 2 data
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

    // Generate build prompt and add to payload
    const buildPrompt = generateBuildPrompt(payload, planRecommendation);
    payload.buildPrompt = buildPrompt;

    // Keep planRecommendation as object
    payload.planRecommendation = planRecommendation;

    // Add browser-specific data for Supabase (client-only)
    payload.detected_currency = localStorage.getItem("geo_currency") || null;
    payload.detected_country = localStorage.getItem("geo_country") || null;
    payload.user_agent = navigator.userAgent;
    payload.referrer = document.referrer;

    try {
      // Save to Supabase first
      const clientIntake = await clientIntakeAPI.createClientIntake(payload);
      console.log("Client intake saved to database:", clientIntake.id);

      // Send email notification
      await sendProjectBriefEmail(payload);

      // Store intake ID for potential Stripe integration
      sessionStorage.setItem("currentIntakeId", clientIntake.id);

      navigate("/project-brief-thank-you");
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  }

  function acceptRecommendedPlan() {
    // Always proceed to stage 2 (your logic collapses to this)
    setStage(2);
    setShowRecommendation(false);
  }

  function viewOtherPlans() {
    if (planRecommendation) {
      sessionStorage.setItem("planRecommendation", JSON.stringify(planRecommendation));
    }
    navigate("/plan-recommendation");
  }

  return (
    <div className={PAGE_BACKGROUND_STYLES.quote.container}>
      <div
        className={PAGE_BACKGROUND_STYLES.quote.gradientOverlay}
        style={{ background: PAGE_BACKGROUND_STYLES.quote.gradientStyle }}
      />
      <div className={PAGE_BACKGROUND_STYLES.quote.noiseOverlay} />

      <div className={PAGE_CONTAINER_STYLES} style={{ position: "relative", zIndex: 10 }}>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className={`${PAGE_HEADER_ICON_CLASS} ${ICON_BG_COLORS.emerald}`}>
              <Layers className={`w-5 h-5 ${TEXT_COLORS.emerald}`} strokeWidth={1.5} />
            </div>
            <h1 className={PAGE_HEADER_TITLE_CLASS}>Custom AI & SaaS Systems</h1>
          </div>

          <p className={PAGE_HEADER_DESC_CLASS}>
            Launch in as little as 2 weeks for most projects. No upfront build fee. 12-month
            partnership. We review every brief and reply with strategic direction. For subscription
            plans, we confirm the right tier first - then send a payment link to begin. Where
            relevant, we may also send a visual preview of our vision for your build so you can
            decide with confidence.
          </p>

          <p className="text-sm text-zinc-400 mb-6 ml-[52px]">
            For subscription website plans, see{" "}
            <Link to="/pricing" className="text-emerald-300 hover:text-emerald-200 transition">
              Pricing Plans
            </Link>
            .
          </p>

          {stage === 1 && (
            <div
              className={`${PAGE_HEADER_TO_FORM_SPACING} rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6`}
            >
              <h2 className="font-heading text-lg font-semibold text-white mb-3">
                Stage 1: Quick Qualification
              </h2>
              <p className="text-zinc-200 text-sm mb-4">
                Answer these questions to get your personalized plan recommendation and pricing.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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

          {stage === 2 && (
            <div
              className={`${PAGE_HEADER_TO_FORM_SPACING} rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-6`}
            >
              <h2 className="font-heading text-lg font-semibold text-white mb-3">
                Stage 2: Technical Details
              </h2>
              <p className="text-zinc-200 text-sm mb-4">
                Recommended:{" "}
                <span className="font-bold text-cyan-300">{planRecommendation?.planName}</span>{" "}
                ({planRecommendation?.price})
              </p>
              <div className="text-xs text-zinc-400">
                Complexity Score: {planRecommendation?.score}/10 | 30-Day Build Phase Applies
              </div>
            </div>
          )}
        </div>

        {status === "error" && (
          <div
            className={`${PAGE_HEADER_TO_FORM_SPACING} rounded-md border border-red-500/30 bg-red-500/10 p-5 flex items-start gap-3`}
          >
            <AlertTriangle className="w-5 h-5 text-red-300" />
            <div>
              <div className="font-semibold mb-1">Something went wrong</div>
              <div className="text-red-200/80 text-sm">
                Please try again, or email support@saasycookies.com
              </div>
            </div>
          </div>
        )}

        <section
          className={`${PAGE_HEADER_TO_FORM_SPACING} rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6`}
        >
          <h2 className="font-heading text-2xl font-semibold text-white mb-3">
            What Happens After You Submit
          </h2>
          <ul className="space-y-2 text-zinc-200 text-sm md:text-base">
            <li>- We review your project and confirm the right plan.</li>
            <li>- You receive inclusions, timeline, and a payment link.</li>
            <li>- Where relevant, we may also send a visual preview of our proposed direction.</li>
            <li>- Once confirmed, we begin your build.</li>
          </ul>
        </section>

        <form
          onSubmit={stage === 1 ? handleStage1Submit : handleFinalSubmit}
          className={FORM_CONTAINER_CLASS}
        >
          <input type="hidden" name="form-name" value="ai-saas-project-brief" />

          {/* Stage 1 */}
          {stage === 1 && (
            <>
              <section className={SECTION_CLASS}>
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
                    label="Annual revenue range"
                    name="annualRevenueRange"
                    required
                    options={[
                      { label: "Pre-revenue", value: "pre-revenue" },
                      { label: "Under $50k", value: "under-50k" },
                      { label: "$50k–$150k", value: "50k-150k" },
                      { label: "$150k–$500k", value: "150k-500k" },
                      { label: "$500k+", value: "500k-plus" },
                    ]}
                  />
                </div>
              </section>

              <section className={SECTION_CLASS}>
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

              <section className={SECTION_CLASS}>
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
                    { label: "Custom AI & SaaS Systems (quoted project)", value: "custom" },
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

              <section className={SECTION_CLASS}>
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

              <section className={SECTION_CLASS}>
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
            </>
          )}

          {/* Plan Recommendation Modal */}
          {showRecommendation && planRecommendation && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-zinc-900 border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${PAGE_HEADER_ICON_CLASS} ${ICON_BG_COLORS.emerald}`}>
                    <TrendingUp
                      className={`w-5 h-5 ${TEXT_COLORS.emerald}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Your Recommended Plan</h2>
                </div>

                <div className="bg-emerald-400/10 border border-emerald-400/30 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {planRecommendation.planName}
                      </h3>
                      <p className="text-2xl font-bold text-emerald-300">
                        {planRecommendation.price}
                      </p>
                    </div>
                    <div className="text-right">
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
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-zinc-400 mb-1">Build Phase</p>
                      <p className="text-white font-semibold">30-Day System Build</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <p className="text-zinc-400 mb-1">Commitment</p>
                      <p className="text-white font-semibold">12-Month Partnership</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-white mb-3">Build Complexity Assessment</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Authentication:</span>
                      <span
                        className={
                          planRecommendation.flags.requiresAuth
                            ? "text-emerald-300"
                            : "text-zinc-500"
                        }
                      >
                        {planRecommendation.flags.requiresAuth ? "Required" : "Not Required"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Payments:</span>
                      <span
                        className={
                          planRecommendation.flags.requiresPayments
                            ? "text-emerald-300"
                            : "text-zinc-500"
                        }
                      >
                        {planRecommendation.flags.requiresPayments ? "Required" : "Not Required"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Member Portal:</span>
                      <span
                        className={
                          planRecommendation.flags.requiresMemberPortal
                            ? "text-emerald-300"
                            : "text-zinc-500"
                        }
                      >
                        {planRecommendation.flags.requiresMemberPortal
                          ? "Required"
                          : "Not Required"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Automation:</span>
                      <span
                        className={
                          planRecommendation.flags.requiresAutomation
                            ? "text-emerald-300"
                            : "text-zinc-500"
                        }
                      >
                        {planRecommendation.flags.requiresAutomation
                          ? "Required"
                          : "Not Required"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={acceptRecommendedPlan}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400 text-black font-semibold px-6 py-3 hover:bg-emerald-300 transition"
                  >
                    Accept Recommended Plan
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={viewOtherPlans}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 text-white font-semibold px-6 py-3 hover:bg-zinc-800 transition"
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

          {/* Stage 2 */}
          {stage === 2 && (
            <>
              {/* Hidden inputs for Stage 1 values */}
              {stage1Payload &&
                Object.entries(stage1Payload).map(([key, value]) => {
                  if (key === "form-name") return null;
                  if (Array.isArray(value)) {
                    return value.map((val, index) => (
                      <input key={`${key}-${index}`} type="hidden" name={key} value={val} />
                    ));
                  }
                  return <input key={key} type="hidden" name={key} value={value} />;
                })}

              <section className={SECTION_CLASS}>
                <h2 className={SECTION_TITLE_CLASS}>Additional Details</h2>
                <div className={FORM_GRID_CLASS}>
                  <Field label="Phone (optional)" name="phone" />
                  <Field label="Current website or product URL" name="currentUrl" placeholder="https://" />
                  <Field label="Industry" name="industry" placeholder="e.g. Retail, coaching" />
                  <Field label="Primary growth goal" name="primaryGoal" placeholder="e.g. Increase leads, improve retention" />
                </div>

                <Textarea
                  label="Who are the primary users?"
                  name="primaryUsers"
                  required
                  rows={3}
                  placeholder="Describe your target audience"
                />

                <div className={FORM_GRID_CLASS}>
                  <Field label="Desired user action" name="desiredUserAction" placeholder="e.g. Sign up, purchase, book a call" />
                  <Field label="Primary success metric" name="successMetric" placeholder="e.g. leads, conversion lift" />
                </div>
              </section>

              {/* Technical details only if needed */}
              {planRecommendation?.flags?.requiresAuth ||
              planRecommendation?.flags?.requiresPayments ||
              planRecommendation?.flags?.requiresMemberPortal ? (
                <section className={SECTION_CLASS}>
                  <h2 className={SECTION_TITLE_CLASS}>Technical Requirements</h2>
                  <div className={FORM_GRID_CLASS}>
                    <Field label="Current stack / platform" name="currentStack" placeholder="e.g. WordPress, Webflow, custom, none" />
                    <Field label="Integrations needed" name="integrationsNeeded" placeholder="e.g. Stripe, Mailchimp, Zapier" />
                    <Field label="Authentication requirements" name="authRequirements" placeholder="e.g. Email/password, SSO, social login" />
                    <Field label="Security requirements" name="securityRequirements" placeholder="e.g. GDPR, HIPAA, SOC2" />
                  </div>
                  <Textarea
                    label="Additional technical requirements"
                    name="technicalRequirements"
                    rows={3}
                    placeholder="Any other technical specifications, APIs, or constraints"
                  />
                </section>
              ) : null}

              <section className={SECTION_CLASS}>
                <h2 className={SECTION_TITLE_CLASS}>Assets & Timeline</h2>
                <div className={FORM_GRID_CLASS}>
                  <Select
                    label="Content readiness"
                    name="contentReadiness"
                    options={[
                      { label: "Yes, ready to go", value: "yes" },
                      { label: "Some, need help", value: "some" },
                      { label: "No, starting from scratch", value: "no" },
                    ]}
                  />
                  <Select
                    label="Brand readiness"
                    name="brandReadiness"
                    options={[
                      { label: "Yes, brand guidelines ready", value: "yes" },
                      { label: "Partial, need refinement", value: "partial" },
                      { label: "No, need brand development", value: "no" },
                    ]}
                  />
                </div>

                <div className={FORM_GRID_CLASS}>
                  <Field label="Brand colors (hex codes)" name="brandColors" placeholder="e.g. #FF5733, #33FF57" />
                  <Field label="Timeline" name="timeline" placeholder="e.g. 4–6 weeks" />
                </div>

                <Textarea
                  label="Known constraints or risks"
                  name="constraintsAndRisks"
                  rows={3}
                  placeholder="Compliance, deadlines, technical limits, etc."
                />
              </section>
            </>
          )}

          {/* Pricing Acknowledgement */}
          <section className={SECTION_CLASS}>
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
                <span>I understand this is a 30-Day System Build Phase with 12-month partnership commitment.</span>
              </label>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="submit"
              disabled={status === "sending" || status === "processing"}
              className={
                "inline-flex items-center justify-center gap-2 rounded-md " +
                BG_COLORS.emerald +
                " text-black font-semibold px-6 py-3 hover:opacity-90 transition disabled:opacity-50 flex-1 sm:flex-none"
              }
            >
              {status === "sending"
                ? "Sending..."
                : status === "processing"
                ? "Calculating..."
                : stage === 1
                ? "Get Plan Recommendation"
                : "Submit Project Brief"}
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
            <p className="text-xs text-zinc-500 sm:ml-4">
              By submitting, you agree you're happy for SaaSy Cookies to contact you about your request.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}