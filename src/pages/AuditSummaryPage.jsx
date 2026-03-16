import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { FileText, Printer } from "lucide-react";
import {
  CARD_STYLES,
  PAGE_BACKGROUND_STYLES,
  PAGE_HEADER_DESC_CLASS,
  PAGE_HEADER_ICON_CLASS,
  PAGE_HEADER_TITLE_CLASS,
  TEXT_COLORS,
} from "../constants/formStyles";
import { fetchAuditRequestBySession } from "../utils/auditService";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function AuditSummaryPage() {
  const query = useQuery();
  const checkoutSessionId = query.get("checkout_session_id") || "";
  const [summary, setSummary] = useState("");
  const [auditRequest, setAuditRequest] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!checkoutSessionId) {
        setError("Missing session details. Please check the link we sent you.");
        return;
      }

      try {
        const result = await fetchAuditRequestBySession(checkoutSessionId);
        if (!mounted) return;
        setAuditRequest(result.auditRequest || null);
        setSummary(result.auditRequest?.summary_outline || "");
      } catch (loadError) {
        if (mounted) {
          setError(loadError.message || "Unable to load audit summary.");
        }
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [checkoutSessionId]);

  return (
    <div className={PAGE_BACKGROUND_STYLES.quote.container}>
      <div
        className={PAGE_BACKGROUND_STYLES.quote.gradientOverlay}
        style={{ background: PAGE_BACKGROUND_STYLES.quote.gradientStyle }}
      />
      <div className={PAGE_BACKGROUND_STYLES.quote.noiseOverlay} />

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-12 md:py-16">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className={`${PAGE_HEADER_ICON_CLASS} bg-emerald-500/15`}>
                <FileText className={`w-5 h-5 ${TEXT_COLORS.emerald}`} strokeWidth={1.5} />
              </div>
              <h1 className={PAGE_HEADER_TITLE_CLASS}>Audit Summary</h1>
            </div>
            <p className={`${PAGE_HEADER_DESC_CLASS} max-w-3xl`}>
              This is your one-page infrastructure audit summary. Use Print to export it as a PDF.
            </p>
          </header>

          {error ? (
            <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-200 text-sm">
              {error}
            </div>
          ) : null}

          <div className={`${CARD_STYLES.base} p-8 space-y-6`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-sm text-zinc-400">Client</div>
                <div className="text-white text-xl font-semibold">
                  {auditRequest?.company_name || "Client"}
                </div>
                <div className="text-zinc-400 text-sm">{auditRequest?.email || ""}</div>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </button>
            </div>

            <div className="whitespace-pre-wrap text-sm text-zinc-200">
              {summary || "Audit summary is being prepared. We will update this page once scoring is complete."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
