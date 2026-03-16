const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const DEFAULT_SUMMARY_OUTLINE = `AUDIT SUMMARY\n\n1) Current Stack Snapshot\n- Core platforms and key dependencies\n- Primary risks and ownership gaps\n\n2) Cost Baseline\n- Total monthly spend (NZD)\n- Total annual spend (NZD)\n- Redundant or overlapping subscriptions\n\n3) Risk Assessment\n- Email + DNS migration risk\n- Platform lock-in exposure\n- Data portability issues\n\n4) Opportunity Map\n- Consolidation opportunities\n- Quick-win savings\n- Automation + AI wins\n\n5) Recommended Roadmap\n- Phase 1: Stabilize + secure\n- Phase 2: Consolidate + migrate\n- Phase 3: Optimize + scale\n`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { auditRequestId, filePath, fileName } = body;

    if (!auditRequestId || !filePath) {
      return { statusCode: 400, body: JSON.stringify({ error: "auditRequestId and filePath are required" }) };
    }

    const { data: auditRequest, error } = await supabase
      .from("audit_requests")
      .update({
        status: "submitted",
        upload_path: filePath,
        uploaded_filename: fileName || "",
        uploaded_at: new Date().toISOString(),
        summary_outline: DEFAULT_SUMMARY_OUTLINE,
      })
      .eq("id", auditRequestId)
      .select("email, company_name")
      .single();

    if (error) throw error;

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "saasycookies@gmail.com",
        subject: `Audit Upload Received: ${auditRequest.company_name || "New audit"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Audit upload received</h2>
            <p><strong>Company:</strong> ${auditRequest.company_name || "Unknown"}</p>
            <p><strong>Email:</strong> ${auditRequest.email || "Unknown"}</p>
            <p><strong>Upload:</strong> ${fileName || filePath}</p>
            <p>Log in to review and score the audit.</p>
          </div>
        `,
      });
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to mark upload", details: error.message }) };
  }
};
