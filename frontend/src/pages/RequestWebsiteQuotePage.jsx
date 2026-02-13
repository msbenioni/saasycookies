import { useState } from "react";
import { Layers, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { INPUT_CLASS, SELECT_CLASS, CHECKBOX_LABEL_CLASS, CHECKBOX_INPUT_CLASS, BADGE_CLASS, MESSAGE_BOX_CLASS, FOCUS_COLORS, TEXT_COLORS, BG_COLORS, PAGE_HEADER_CLASS, PAGE_HEADER_ICON_CLASS, PAGE_HEADER_TITLE_CLASS, PAGE_HEADER_DESC_CLASS, ICON_BG_COLORS } from "../constants/formStyles";

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

function Field({ label, name, type = "text", required, placeholder }) {
  return (
    <div>
      <label className="block text-sm text-zinc-300 mb-2">
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
      <label className="block text-sm text-zinc-300 mb-2">
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
      <label className="block text-sm text-zinc-300 mb-2">
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
      <div className="flex items-center justify-between mb-3">
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

export default function RequestWebsiteQuotePage() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = { "form-name": "website-discovery" };

    formData.forEach((value, key) => {
      payload[key] = String(value);
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });

      if (!response.ok) throw new Error("Submission failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-void text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(16,185,129,0.22) 0%, transparent 55%), radial-gradient(circle at 70% 40%, rgba(6,182,212,0.14) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.7%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.03%22/%3E%3C/svg%3E')]" />
      
      <div className={PAGE_HEADER_CLASS} style={{ position: 'relative', zIndex: 10 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className={`${PAGE_HEADER_ICON_CLASS} ${ICON_BG_COLORS.emerald}`}>
            <Layers className={`w-5 h-5 ${TEXT_COLORS.emerald}`} strokeWidth={1.5} />
          </div>
          <h1 className={PAGE_HEADER_TITLE_CLASS}>
            Request a website quote
          </h1>
        </div>
        <p className={PAGE_HEADER_DESC_CLASS}>
          Tell me about your business and goals. I'll reply with scope, timeline, and a clear quote.
        </p>

        {status === "sent" && (
          <div className={MESSAGE_BOX_CLASS}>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="font-semibold mb-1">Submitted ✅</div>
              <div className="text-zinc-400 text-sm">
                Thanks — I’ve received your request and will be in touch.
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="mb-8 rounded-md border border-red-500/30 bg-red-500/10 p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-300" />
            <div>
              <div className="font-semibold mb-1">Something went wrong</div>
              <div className="text-red-200/80 text-sm">
                Please try again, or message via the Contact page.
              </div>
            </div>
          </div>
        )}

        <form
          name="website-discovery"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-8"
          style={{ position: 'relative', zIndex: 10 }}
        >
          <input type="hidden" name="form-name" value="website-discovery" />

          <p className="hidden">
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>

          <section className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Basics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Full name" name="fullName" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone (optional)" name="phone" />
              <Field label="Business / organisation" name="businessName" required />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Business overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Current website URL" name="websiteUrl" placeholder="https://" />
              <Field label="Industry" name="industry" placeholder="e.g. Retail, coaching" />
              <Field label="Primary goal this year" name="primaryGoalThisYear" />
              <Field label="Primary goal (other)" name="primaryGoalOther" />
            </div>
            <Textarea
              label="Business description"
              name="businessDescription"
              required
              rows={4}
              placeholder="What do you do and who do you serve?"
            />
          </section>

          <section className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Website purpose & goals</h2>
            <Textarea
              label="Why do you need a new website?"
              name="whyNewWebsite"
              required
              rows={3}
            />
            <CheckboxGroup
              label="Top goals (pick all that apply)"
              name="websiteGoals"
              hint="Select up to 3"
              options={[
                "Get more leads",
                "Explain services clearly",
                "Sell products",
                "Build credibility",
                "Drive bookings",
                "Promote events",
              ]}
            />
            <Field label="Goals (other)" name="websiteGoalsOther" placeholder="Anything else?" />
            <Textarea
              label="Success metrics"
              name="successMetrics"
              rows={3}
              placeholder="How will we measure success?"
            />
          </section>

          <section className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Target audience</h2>
            <Textarea
              label="Ideal customer"
              name="idealCustomer"
              required
              rows={3}
            />
            <Field label="Desired user action" name="desiredUserAction" />
            <Field label="Desired action (other)" name="desiredUserActionOther" />
          </section>

          <section className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Features & functionality</h2>
            <CheckboxGroup
              label="Required features"
              name="requiredFeatures"
              options={[
                "Contact form",
                "Booking / scheduling",
                "Payments",
                "Blog / news",
                "Membership / login",
                "Online store",
                "Analytics",
              ]}
            />
            <Field label="Required features (other)" name="requiredFeaturesOther" />
            <Select
              label="Ongoing content updates needed"
              name="needsContentUpdates"
              options={[
                { label: "Select an option", value: "" },
                { label: "Yes, regularly", value: "yes" },
                { label: "Occasionally", value: "sometimes" },
                { label: "No", value: "no" },
              ]}
            />
          </section>

          <section className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Brand & design</h2>
            <Select
              label="Brand guidelines available?"
              name="hasBrandGuidelines"
              options={[
                { label: "Select an option", value: "" },
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
                { label: "In progress", value: "in-progress" },
              ]}
            />
            <CheckboxGroup
              label="Design style"
              name="designStyle"
              options={[
                "Minimal",
                "Bold / high contrast",
                "Editorial",
                "Elegant",
                "Playful",
                "Futuristic",
              ]}
            />
            <Field label="Design style (other)" name="designStyleOther" />
            <Textarea
              label="Inspiration sites + why"
              name="designInspo"
              rows={3}
              placeholder="Share a few examples and what you like about them"
            />
          </section>

          <section className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Content & SEO</h2>
            <Select
              label="Content ready?"
              name="contentReady"
              options={[
                { label: "Select an option", value: "" },
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
                { label: "Some", value: "some" },
              ]}
            />
            <Select
              label="Need copywriting help?"
              name="needsCopywriting"
              options={[
                { label: "Select an option", value: "" },
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
                { label: "Not sure yet", value: "unsure" },
              ]}
            />
            <Textarea
              label="Target keywords"
              name="seoKeywords"
              rows={3}
              placeholder="List keywords or phrases you care about"
            />
          </section>

          <section className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Technical</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Domain host" name="domainHost" />
              <Field label="Current platform" name="currentPlatform" />
              <Field label="Email provider" name="emailProvider" />
              <Field label="Integrations needed" name="integrationsNeeded" />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Budget & timeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Desired launch date" name="desiredLaunchDate" />
              <Field label="Timeline" name="timeline" placeholder="e.g. 4–6 weeks" />
            </div>
            <Select
              label="Budget range"
              name="budgetRange"
              options={[
                { label: "Select a range", value: "" },
                { label: "$1k–$3k", value: "1k-3k" },
                { label: "$3k–$6k", value: "3k-6k" },
                { label: "$6k–$10k", value: "6k-10k" },
                { label: "$10k+", value: "10k+" },
                { label: "Not sure", value: "not-sure" },
              ]}
            />
          </section>

          <section className="space-y-6">
            <h2 className="font-heading text-xl font-semibold">Final notes</h2>
            <Textarea label="Anything else?" name="anythingElse" rows={4} />
            <Textarea
              label="If your website was perfect, what would change?"
              name="whatChanges"
              rows={3}
            />
          </section>

          <div className="flex flex-col gap-3">
            <button
              disabled={status === "sending"}
              className={"inline-flex items-center justify-center gap-2 rounded-md " + BG_COLORS.emerald + " text-black font-semibold px-6 py-3 hover:opacity-90 transition disabled:opacity-50"}
            >
              {status === "sending" ? "Sending..." : "Submit request"}
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
            <p className="text-xs text-zinc-500">
              By submitting, you agree you’re happy for SaaSy Cookies to contact you
              about your request.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
