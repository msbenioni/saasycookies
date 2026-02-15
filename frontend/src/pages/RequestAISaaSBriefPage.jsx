import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, AlertTriangle, CheckCircle, CheckCircle2, Layers } from "lucide-react";
import { sendProjectBriefEmail } from "../utils/emailService";
import { INPUT_CLASS, SELECT_CLASS, CHECKBOX_LABEL_CLASS, CHECKBOX_INPUT_CLASS, BADGE_CLASS, MESSAGE_BOX_CLASS, FOCUS_COLORS, TEXT_COLORS, BG_COLORS, PAGE_HEADER_CLASS, PAGE_HEADER_ICON_CLASS, PAGE_HEADER_TITLE_CLASS, PAGE_HEADER_DESC_CLASS, ICON_BG_COLORS, SECTION_CLASS, SECTION_TITLE_CLASS, FORM_GRID_CLASS, PAGE_BACKGROUND_STYLES, PAGE_CONTAINER_STYLES, PAGE_HEADER_TO_FORM_SPACING, FORM_LABEL_SPACING, FORM_SECTION_LABEL_SPACING, FORM_CHECKBOX_LABEL_SPACING } from "../constants/formStyles";

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
          <label
            key={option}
            className={CHECKBOX_LABEL_CLASS}
          >
            <input
              type="checkbox"
              name={name}
              value={option}
              className={CHECKBOX_INPUT_CLASS + " " + TEXT_COLORS.emerald + " focus:ring-emerald-400/40"}
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
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

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

    try {
      await sendProjectBriefEmail(payload);
      navigate("/project-brief-thank-you");
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  }

  return (
    <div className={PAGE_BACKGROUND_STYLES.quote.container}>
      <div
        className={PAGE_BACKGROUND_STYLES.quote.gradientOverlay}
        style={{ background: PAGE_BACKGROUND_STYLES.quote.gradientStyle }}
      />
      <div className={PAGE_BACKGROUND_STYLES.quote.noiseOverlay} />
      
      <div className={PAGE_CONTAINER_STYLES} style={{ position: 'relative', zIndex: 10 }}>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className={`${PAGE_HEADER_ICON_CLASS} ${ICON_BG_COLORS.emerald}`}>
              <Layers className={`w-5 h-5 ${TEXT_COLORS.emerald}`} strokeWidth={1.5} />
            </div>
            <h1 className={PAGE_HEADER_TITLE_CLASS}>
              AI & SaaS Project Brief
            </h1>
          </div>

          <p className={PAGE_HEADER_DESC_CLASS}>
            Tell us what you are building and where AI or SaaS can unlock growth. We review every brief and reply with scope direction.
          </p>
        </div>

        {status === "error" && (
          <div className={`${PAGE_HEADER_TO_FORM_SPACING} rounded-md border border-red-500/30 bg-red-500/10 p-5 flex items-start gap-3`}>
            <AlertTriangle className="w-5 h-5 text-red-300" />
            <div>
              <div className="font-semibold mb-1">Something went wrong</div>
              <div className="text-red-200/80 text-sm">
                Please try again, or email support@saasycookies.com
              </div>
            </div>
          </div>
        )}

        <form
          name="ai-saas-project-brief"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl bg-zinc-900/40 border border-white/10 p-6 md:p-8"
        >
          <input type="hidden" name="form-name" value="ai-saas-project-brief" />

          <p className="hidden">
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>

          <section className={SECTION_CLASS}>
            <h2 className={SECTION_TITLE_CLASS}>Basic Information</h2>
            <div className={FORM_GRID_CLASS}>
              <Field label="Full name" name="fullName" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone (optional)" name="phone" />
              <Field label="Business / organisation" name="businessName" required />
            </div>
          </section>

          <section className={SECTION_CLASS}>
            <h2 className={SECTION_TITLE_CLASS}>Business overview</h2>
            <div className={FORM_GRID_CLASS}>
              <Field label="Current website or product URL" name="currentUrl" placeholder="https://" />
              <Field label="Industry" name="industry" placeholder="e.g. Retail, coaching" />
              <Field label="Primary growth goal this year" name="primaryGoal" />
              <Field label="Primary growth goal (other)" name="primaryGoalOther" />
            </div>
            <Textarea
              label="Business description"
              name="businessDescription"
              required
              rows={4}
              placeholder="What do you do and who do you serve?"
            />
          </section>

          <section className={SECTION_CLASS}>
            <h2 className={SECTION_TITLE_CLASS}>Project scope</h2>
            <Textarea
              label="What are you building or improving?"
              name="projectVision"
              required
              rows={3}
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
            <Field label="Project type (other)" name="projectTypeOther" placeholder="Anything else?" />
          </section>

          <section className={SECTION_CLASS}>
            <h2 className={SECTION_TITLE_CLASS}>Users & outcomes</h2>
            <Textarea
              label="Who are the primary users?"
              name="primaryUsers"
              required
              rows={3}
            />
            <div className={FORM_GRID_CLASS}>
              <Field label="Desired user action" name="desiredUserAction" />
              <Field label="Primary success metric" name="successMetric" placeholder="e.g. time saved, leads, conversion lift" />
            </div>
          </section>

          <section className={SECTION_CLASS}>
            <h2 className={SECTION_TITLE_CLASS}>Capabilities needed</h2>
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
            <Field label="Required capabilities (other)" name="requiredCapabilitiesOther" />
            <Select
              label="Ongoing support needed after launch"
              name="needsOngoingSupport"
              options={[
                { label: "Yes, regularly", value: "yes" },
                { label: "Occasionally", value: "sometimes" },
                { label: "No", value: "no" },
              ]}
            />
          </section>

          <section className={SECTION_CLASS}>
            <h2 className={SECTION_TITLE_CLASS}>Product & interface direction</h2>
            <Select
              label="Existing product or codebase available?"
              name="hasExistingProduct"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
                { label: "In progress", value: "in-progress" },
              ]}
            />
            <CheckboxGroup
              label="Interface direction"
              name="interfaceDirection"
              options={[
                "Minimal",
                "Data-heavy",
                "Clean enterprise",
                "Bold / high contrast",
                "Mobile-first",
                "Futuristic",
              ]}
            />
            <Field label="Interface direction (other)" name="interfaceDirectionOther" />
            <Textarea
              label="Reference products or tools + why"
              name="productReferences"
              rows={3}
              placeholder="Share examples and what you want to replicate or avoid"
            />
          </section>

          <section className={SECTION_CLASS}>
            <h2 className={SECTION_TITLE_CLASS}>Data & readiness</h2>
            <div className={FORM_GRID_CLASS}>
              <Select
                label="Data sources ready?"
                name="dataReadiness"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                  { label: "Some", value: "some" },
                ]}
              />
              <Select
                label="Internal owner assigned for this project?"
                name="hasInternalOwner"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                  { label: "Not sure yet", value: "unsure" },
                ]}
              />
            </div>
            <Textarea
              label="Known constraints or risks"
              name="constraintsAndRisks"
              rows={3}
              placeholder="Compliance, deadlines, technical limits, team bandwidth, etc."
            />
          </section>

          <section className={SECTION_CLASS}>
            <h2 className={SECTION_TITLE_CLASS}>Technical</h2>
            <div className={FORM_GRID_CLASS}>
              <Field label="Current stack / platform" name="currentStack" />
              <Field label="Integrations needed" name="integrationsNeeded" />
              <Field label="Authentication requirements" name="authRequirements" />
              <Field label="Security / compliance requirements" name="securityRequirements" />
            </div>
          </section>

          <section className={SECTION_CLASS}>
            <h2 className={SECTION_TITLE_CLASS}>Budget & timeline</h2>
            <div className={FORM_GRID_CLASS}>
              <Field label="Desired launch date" name="desiredLaunchDate" />
              <Field label="Timeline" name="timeline" placeholder="e.g. 4–6 weeks" />
            </div>
            <Select
              label="Budget range"
              name="budgetRange"
              options={[
                { label: "$2k–$7k (implementation sprint)", value: "2k-7k" },
                { label: "$7k+ (AI or SaaS build)", value: "7k-plus" },
                { label: "$39.99/month (standard managed plan)", value: "39.99-monthly" },
                { label: "$99/month (advanced managed plan)", value: "99-monthly" },
                { label: "Not sure — need guidance", value: "not-sure" },
              ]}
            />
          </section>

          <section className={SECTION_CLASS}>
            <h2 className={SECTION_TITLE_CLASS}>Final notes</h2>
            <Textarea label="Anything else?" name="anythingElse" rows={4} />
          </section>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              disabled={status === "sending"}
              className={"inline-flex items-center justify-center gap-2 rounded-md " + BG_COLORS.emerald + " text-black font-semibold px-6 py-3 hover:opacity-90 transition disabled:opacity-50 flex-1 sm:flex-none"}
            >
              {status === "sending" ? "Sending..." : "Submit project brief"}
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
