import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import {
  INPUT_CLASS,
  FOCUS_COLORS,
  PAGE_BACKGROUND_STYLES,
  PAGE_CONTAINER_STYLES,
  PAGE_HEADER_CLASS,
  PAGE_HEADER_TITLE_CLASS,
  PAGE_HEADER_DESC_CLASS,
  PAGE_HEADER_ICON_CLASS,
  SECTION_TITLE_CLASS,
  SECTION_CLASS,
  FORM_GRID_CLASS,
  FORM_LABEL_SPACING,
  FORM_SECTION_LABEL_SPACING,
  FORM_HELP_TEXT_SPACING,
} from "../../constants/formStyles";
import { createDigitalCardCheckout } from "../../utils/digitalCardService";

const inputClass = `${INPUT_CLASS} ${FOCUS_COLORS.cyan}`;

const initialForm = {
  fullName: "",
  title: "",
  businessName: "",
  email: "",
  phone: "",
  website: "",
  linkedin: "",
  instagram: "",
  bio: "",
  themeColor: "#7c3aed",
  discountCode: "",
};

export default function DigitalCardPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const result = await createDigitalCardCheckout(form);
      window.location.href = result.checkoutUrl;
    } catch (submitError) {
      setError(submitError.message || "Unable to start checkout.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={PAGE_BACKGROUND_STYLES.digitalCard.container}>
      <div
        className={PAGE_BACKGROUND_STYLES.digitalCard.gradientOverlay}
        style={{ background: PAGE_BACKGROUND_STYLES.digitalCard.gradientStyle }}
      />
      <div className={PAGE_BACKGROUND_STYLES.digitalCard.noiseOverlay} />

      <div className={PAGE_CONTAINER_STYLES} style={{ zIndex: 10 }}>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className={`${PAGE_HEADER_ICON_CLASS} bg-cyan-500/10 border border-cyan-500/20`}>
              <CreditCard className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
            </div>
            <h1 className={PAGE_HEADER_TITLE_CLASS}>Digital Business Card</h1>
          </div>

          <p className={PAGE_HEADER_DESC_CLASS}>
            Build your card now. Stripe collects payment details upfront, then your 30-day trial starts.
          </p>

          <form onSubmit={onSubmit} className="space-y-6 rounded-2xl bg-zinc-900/40 border border-white/10 p-6 md:p-8">
            <section className={SECTION_CLASS}>
              <h2 className={SECTION_TITLE_CLASS}>Basic Information</h2>
              <div className={FORM_GRID_CLASS}>
                <div>
                  <label className={`text-xs text-zinc-400 ${FORM_LABEL_SPACING} block`}>Full name *</label>
                  <input
                    required
                    className={inputClass}
                    value={form.fullName}
                    onChange={(event) => update("fullName", event.target.value)}
                  />
                </div>
                <div>
                  <label className={`text-xs text-zinc-400 ${FORM_LABEL_SPACING} block`}>Title</label>
                  <input
                    className={inputClass}
                    value={form.title}
                    onChange={(event) => update("title", event.target.value)}
                    placeholder="e.g. Founder, CEO, Developer"
                  />
                </div>
                <div>
                  <label className={`text-xs text-zinc-400 ${FORM_LABEL_SPACING} block`}>Business</label>
                  <input
                    className={inputClass}
                    value={form.businessName}
                    onChange={(event) => update("businessName", event.target.value)}
                  />
                </div>
                <div>
                  <label className={`text-xs text-zinc-400 ${FORM_LABEL_SPACING} block`}>Email *</label>
                  <input
                    required
                    type="email"
                    className={inputClass}
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                  />
                </div>
                <div>
                  <label className={`text-xs text-zinc-400 ${FORM_LABEL_SPACING} block`}>Phone</label>
                  <input
                    className={inputClass}
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={SECTION_TITLE_CLASS}>Online Presence</h2>
              <div className={FORM_GRID_CLASS}>
                <div>
                  <label className={`text-xs text-zinc-400 ${FORM_LABEL_SPACING} block`}>Website</label>
                  <input
                    className={inputClass}
                    value={form.website}
                    onChange={(event) => update("website", event.target.value)}
                    placeholder="https://"
                  />
                </div>
                <div>
                  <label className={`text-xs text-zinc-400 ${FORM_LABEL_SPACING} block`}>Theme color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-10 h-10 rounded border border-white/10 bg-transparent"
                      value={form.themeColor}
                      onChange={(event) => update("themeColor", event.target.value)}
                    />
                    <input
                      className={inputClass}
                      value={form.themeColor}
                      onChange={(event) => update("themeColor", event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={SECTION_TITLE_CLASS}>Social Media</h2>
              <div className={FORM_GRID_CLASS}>
                <div>
                  <label className={`text-xs text-zinc-400 ${FORM_LABEL_SPACING} block`}>LinkedIn</label>
                  <input
                    className={inputClass}
                    value={form.linkedin}
                    onChange={(event) => update("linkedin", event.target.value)}
                  />
                </div>
                <div>
                  <label className={`text-xs text-zinc-400 ${FORM_LABEL_SPACING} block`}>Instagram</label>
                  <input
                    className={inputClass}
                    value={form.instagram}
                    onChange={(event) => update("instagram", event.target.value)}
                  />
                </div>
              </div>
            </section>

            <div>
              <label className={`text-xs text-zinc-400 ${FORM_LABEL_SPACING} block`}>Short bio</label>
              <textarea
                className={`${inputClass} resize-none h-24`}
                value={form.bio}
                onChange={(event) => update("bio", event.target.value)}
              />
            </div>

            <div>
              <label className={`text-xs text-zinc-400 ${FORM_LABEL_SPACING} block`}>Discount code (optional)</label>
              <input
                className={inputClass}
                value={form.discountCode}
                onChange={(event) => update("discountCode", event.target.value)}
                style={{ textTransform: "uppercase" }}
              />
            </div>

            {error ? (
              <p className="text-red-300 text-sm border border-red-500/40 bg-red-500/10 rounded-md px-3 py-2">
                {error}
              </p>
            ) : null}

            <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-4">
              <h3 className={`${SECTION_TITLE_CLASS} text-cyan-200 ${FORM_SECTION_LABEL_SPACING} flex items-center gap-2`}>
                <CheckCircle2 className="w-4 h-4" strokeWidth={1.8} />
                Trial terms
              </h3>
              <p className="text-sm text-zinc-300">
                Card required upfront. No charge today. Trial lasts 30 days, then $3.99/month. If canceled or unpaid,
                your card becomes paused.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-cyan-500 text-black font-semibold px-7 py-3 rounded-md hover:bg-cyan-400 transition-all disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.8} />
                  Starting checkout...
                </>
              ) : (
                <>
                  Start 30-day free trial <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
                </>
              )}
            </button>
          </form>

          <p className={`text-sm text-zinc-400 ${FORM_HELP_TEXT_SPACING}`}>
            Already created one? Use your edit link or open your public card URL to resume billing if paused.
            <Link to="/contact" className="text-cyan-300 hover:text-cyan-200 ml-1">Need help?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
