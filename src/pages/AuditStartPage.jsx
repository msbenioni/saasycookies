import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CheckCircle, ChevronRight, ShieldCheck } from "lucide-react";
import {
  BG_COLORS,
  CARD_STYLES,
  FORM_GRID_CLASS,
  PAGE_BACKGROUND_STYLES,
  PAGE_HEADER_DESC_CLASS,
  PAGE_HEADER_ICON_CLASS,
  PAGE_HEADER_TITLE_CLASS,
  SECTION_TITLE_CLASS,
  TEXT_COLORS,
} from "../constants/formStyles";
import {
  createAuditSession,
  fetchAuditSession,
  fetchAuditRequestBySession,
  updateAuditSession,
} from "../utils/auditService";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function AuditStartPage() {
  const query = useQuery();
  const navigate = useNavigate();
  const { sessionId: routeSessionId } = useParams();
  const checkoutSessionId = query.get("checkout_session_id") || "";
  const resumeTokenFromUrl = query.get("token") || "";
  const [auditRequest, setAuditRequest] = useState(null);
  const [auditSessionId, setAuditSessionId] = useState(routeSessionId || "");
  const [resumeToken, setResumeToken] = useState(resumeTokenFromUrl);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedState, setSavedState] = useState("idle");
  const [resumeEmailSent, setResumeEmailSent] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    contact: {
      fullName: "",
      businessName: "",
      email: "",
      phone: "",
      country: "NZ",
      primaryWebsite: "",
      industry: "",
    },
    tools: {
      websitePlatform: "",
      websiteLoginUrl: "",
      hostingProvider: "",
      domainProvider: "",
    },
    communication: {
      emailProvider: "",
      adminEmail: "",
      emailCount: "",
      monthlyEmailCost: "",
    },
    marketing: {
      newsletterPlatform: "",
      crmPlatform: "",
      leadCaptureMethod: "",
      marketingSpend: "",
    },
    documents: {
      storagePlatform: "",
      storageUsed: "",
      teamMembers: "",
      contractorsAccess: "",
    },
    painPoints: {
      frustrations: "",
      timeSinks: "",
      automationWish: "",
      biggestChallenge: "",
      accessConfirmation: false,
    },
  });

  const steps = [
    { id: "business", title: "Business Info" },
    { id: "tools", title: "Current Tools" },
    { id: "communication", title: "Communication" },
    { id: "marketing", title: "Marketing" },
    { id: "documents", title: "Documents" },
    { id: "pain", title: "Pain Points" },
  ];

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!checkoutSessionId && !routeSessionId) {
        setError("Missing session information. Please check your payment confirmation link.");
        setLoading(false);
        return;
      }

      try {
        if (checkoutSessionId) {
          const result = await fetchAuditRequestBySession(checkoutSessionId);
          if (mounted) {
            const request = result.auditRequest || null;
            setAuditRequest(request);
            setFormData((prev) => ({
              ...prev,
              contact: {
                ...prev.contact,
                email: prev.contact.email || request?.email || "",
                businessName: prev.contact.businessName || request?.company_name || "",
                fullName: prev.contact.fullName || request?.full_name || "",
              },
            }));
          }
        }

        if (routeSessionId) {
          const sessionResult = await fetchAuditSession(routeSessionId, resumeTokenFromUrl);
          if (mounted) {
            const session = sessionResult.auditSession;
            setAuditSessionId(session?.id || "");
            setResumeToken(session?.resume_token || resumeTokenFromUrl);
            setFormData(session?.data || formData);
            const normalized = Math.max(0, Math.min(100, session?.progress || 0));
            const idx = normalized === 100 ? steps.length - 1 : Math.floor((normalized / 100) * steps.length);
            setStepIndex(Math.min(steps.length - 1, Math.max(0, idx)));
          }
        }
      } catch (loadError) {
        if (mounted) {
          setError(loadError.message || "Unable to load audit session.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [checkoutSessionId, routeSessionId]);

  const progressPercent = Math.round(((stepIndex + 1) / steps.length) * 100);

  const updateField = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const autosave = async (nextStepIndex = stepIndex) => {
    if (!auditSessionId && !auditRequest?.email && !formData.contact.email) return;

    setSavedState("saving");
    try {
      if (!auditSessionId) {
        const response = await createAuditSession({
          email: formData.contact.email || auditRequest?.email,
          auditRequestId: auditRequest?.id,
          data: formData,
          progress: Math.round(((nextStepIndex + 1) / steps.length) * 100),
        });
        setAuditSessionId(response.sessionId);
        setResumeToken(response.resumeToken || "");
        setResumeEmailSent(true);
        navigate(`/services/audit/${response.sessionId}?token=${response.resumeToken}`, { replace: true });
      } else {
        await updateAuditSession({
          sessionId: auditSessionId,
          resumeToken,
          data: formData,
          progress: Math.round(((nextStepIndex + 1) / steps.length) * 100),
        });
      }
      setSavedState("saved");
      window.setTimeout(() => setSavedState("idle"), 1500);
    } catch (saveError) {
      setSavedState("error");
      setError(saveError.message || "Unable to save your progress.");
    }
  };

  const nextStep = async () => {
    if (auditRequest?.status !== "paid") return;
    const nextIndex = Math.min(stepIndex + 1, steps.length - 1);
    await autosave(nextIndex);
    setStepIndex(nextIndex);
  };

  const finishAudit = async () => {
    if (auditRequest?.status !== "paid") return;
    await autosave(stepIndex);
    if (auditSessionId) {
      await updateAuditSession({
        sessionId: auditSessionId,
        resumeToken,
        data: formData,
        progress: 100,
        status: "completed",
      });
    }
    if (checkoutSessionId) {
      navigate(`/services/audit/summary?checkout_session_id=${checkoutSessionId}`);
    }
  };

  const previousStep = () => {
    setStepIndex(Math.max(stepIndex - 1, 0));
  };

  if (loading) {
    return <div className="py-16 text-center text-zinc-300">Loading audit details...</div>;
  }

  return (
    <div className={PAGE_BACKGROUND_STYLES.quote.container}>
      <div
        className={PAGE_BACKGROUND_STYLES.quote.gradientOverlay}
        style={{ background: PAGE_BACKGROUND_STYLES.quote.gradientStyle }}
      />
      <div className={PAGE_BACKGROUND_STYLES.quote.noiseOverlay} />

      <div className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-12 md:py-16">
          <header className="mb-10 md:mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className={`${PAGE_HEADER_ICON_CLASS} bg-emerald-500/15`}>
                <CheckCircle className={`w-5 h-5 ${TEXT_COLORS.emerald}`} strokeWidth={1.5} />
              </div>
              <h1 className={PAGE_HEADER_TITLE_CLASS}>Audit Started</h1>
            </div>
            <p className={`${PAGE_HEADER_DESC_CLASS} max-w-3xl`}>
              Your audit payment is confirmed. Complete the steps below so we can score and summarize your
              infrastructure.
            </p>
          </header>

          {error ? (
            <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-200 text-sm">
              {error}
            </div>
          ) : null}

          {auditRequest?.status !== "paid" && (
            <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-200 text-sm">
              Payment is pending. You’ll be able to continue once payment is confirmed.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-4">
              <div className={`${CARD_STYLES.base} p-6 space-y-4`}>
                <div>
                  <div className="text-xs uppercase tracking-widest text-zinc-400">Audit session</div>
                  <div className="text-white font-semibold mt-2">{auditRequest?.company_name || "SaaS Client"}</div>
                  <div className="text-zinc-400 text-sm">{auditRequest?.email}</div>
                </div>

                <div>
                  <div className="text-xs text-zinc-400 mb-2">Progress</div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <div className="mt-2 text-xs text-zinc-400">
                    Step {stepIndex + 1} of {steps.length} - {progressPercent}% complete
                  </div>
                </div>

                <div className="text-xs text-zinc-400">
                  {savedState === "saving" && "Saving..."}
                  {savedState === "saved" && "Saved"}
                  {savedState === "error" && "Save failed"}
                  {resumeEmailSent ? (
                    <div className="mt-2">Resume link sent to your email.</div>
                  ) : null}
                </div>
              </div>
            </aside>

            <main className="lg:col-span-8">
              <div className={`${CARD_STYLES.base} p-8 md:p-10 space-y-6`}>
                <div>
                  <h2 className={SECTION_TITLE_CLASS}>{steps[stepIndex].title}</h2>
                  <p className="text-sm text-zinc-400">Complete this step to continue your audit.</p>
                </div>

                {stepIndex === 0 && (
                  <div className={FORM_GRID_CLASS}>
                    <div>
                      <label className="text-sm text-zinc-300">Full name</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.contact.fullName}
                        onChange={(event) => updateField("contact", "fullName", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Business name</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.contact.businessName}
                        onChange={(event) => updateField("contact", "businessName", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Email</label>
                      <input
                        type="email"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.contact.email}
                        onChange={(event) => updateField("contact", "email", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Phone</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.contact.phone}
                        onChange={(event) => updateField("contact", "phone", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Country</label>
                      <select
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.contact.country}
                        onChange={(event) => updateField("contact", "country", event.target.value)}
                      >
                        <option value="NZ">New Zealand</option>
                        <option value="AU">Australia</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Primary website</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.contact.primaryWebsite}
                        onChange={(event) => updateField("contact", "primaryWebsite", event.target.value)}
                      />
                    </div>
                  </div>
                )}

                {stepIndex === 1 && (
                  <div className={FORM_GRID_CLASS}>
                    <div>
                      <label className="text-sm text-zinc-300">Website platform</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.tools.websitePlatform}
                        onChange={(event) => updateField("tools", "websitePlatform", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Website login URL</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.tools.websiteLoginUrl}
                        onChange={(event) => updateField("tools", "websiteLoginUrl", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Hosting provider</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.tools.hostingProvider}
                        onChange={(event) => updateField("tools", "hostingProvider", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Domain provider</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.tools.domainProvider}
                        onChange={(event) => updateField("tools", "domainProvider", event.target.value)}
                      />
                    </div>
                    <div className="col-span-full text-xs text-zinc-400">
                      For security, do not paste passwords here. We will request access via a secure method if needed.
                    </div>
                  </div>
                )}

                {stepIndex === 2 && (
                  <div className={FORM_GRID_CLASS}>
                    <div>
                      <label className="text-sm text-zinc-300">Email provider</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.communication.emailProvider}
                        onChange={(event) => updateField("communication", "emailProvider", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Admin email</label>
                      <input
                        type="email"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.communication.adminEmail}
                        onChange={(event) => updateField("communication", "adminEmail", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Email accounts</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.communication.emailCount}
                        onChange={(event) => updateField("communication", "emailCount", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Monthly email cost</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.communication.monthlyEmailCost}
                        onChange={(event) => updateField("communication", "monthlyEmailCost", event.target.value)}
                      />
                    </div>
                    <div className="col-span-full text-xs text-zinc-400">
                      Avoid sharing passwords in this form. We will request credentials via a secure vault if needed.
                    </div>
                  </div>
                )}

                {stepIndex === 3 && (
                  <div className={FORM_GRID_CLASS}>
                    <div>
                      <label className="text-sm text-zinc-300">Newsletter platform</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.marketing.newsletterPlatform}
                        onChange={(event) => updateField("marketing", "newsletterPlatform", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">CRM platform</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.marketing.crmPlatform}
                        onChange={(event) => updateField("marketing", "crmPlatform", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Lead capture method</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.marketing.leadCaptureMethod}
                        onChange={(event) => updateField("marketing", "leadCaptureMethod", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Monthly marketing spend</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.marketing.marketingSpend}
                        onChange={(event) => updateField("marketing", "marketingSpend", event.target.value)}
                      />
                    </div>
                  </div>
                )}

                {stepIndex === 4 && (
                  <div className={FORM_GRID_CLASS}>
                    <div>
                      <label className="text-sm text-zinc-300">Storage platform</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.documents.storagePlatform}
                        onChange={(event) => updateField("documents", "storagePlatform", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Storage used</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.documents.storageUsed}
                        onChange={(event) => updateField("documents", "storageUsed", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Team members accessing files</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.documents.teamMembers}
                        onChange={(event) => updateField("documents", "teamMembers", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Contractor access?</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                        value={formData.documents.contractorsAccess}
                        onChange={(event) => updateField("documents", "contractorsAccess", event.target.value)}
                      />
                    </div>
                    <div className="col-span-full text-xs text-zinc-400">
                      For security, share access credentials separately (1Password, Bitwarden, or secure transfer).
                    </div>
                  </div>
                )}

                {stepIndex === 5 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-zinc-300">What systems frustrate you most?</label>
                      <textarea
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white min-h-[110px]"
                        value={formData.painPoints.frustrations}
                        onChange={(event) => updateField("painPoints", "frustrations", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">What tasks take the most time?</label>
                      <textarea
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white min-h-[110px]"
                        value={formData.painPoints.timeSinks}
                        onChange={(event) => updateField("painPoints", "timeSinks", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">What would you like automated?</label>
                      <textarea
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white min-h-[110px]"
                        value={formData.painPoints.automationWish}
                        onChange={(event) => updateField("painPoints", "automationWish", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-300">Biggest technology challenge</label>
                      <textarea
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white min-h-[110px]"
                        value={formData.painPoints.biggestChallenge}
                        onChange={(event) => updateField("painPoints", "biggestChallenge", event.target.value)}
                      />
                    </div>
                    <label className="flex items-start gap-2 text-sm text-zinc-300">
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={formData.painPoints.accessConfirmation}
                        onChange={(event) => updateField("painPoints", "accessConfirmation", event.target.checked)}
                      />
                      I confirm I have permission to provide these system access details for the purpose of this audit.
                    </label>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={previousStep}
                    disabled={stepIndex === 0}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-white hover:bg-white/10 disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={stepIndex === steps.length - 1 ? finishAudit : nextStep}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 text-black px-6 py-3 text-sm font-semibold hover:bg-emerald-300"
                  >
                    {stepIndex === steps.length - 1 ? "Finish audit" : "Next step"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
