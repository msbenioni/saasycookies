const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");
const { randomUUID } = require("crypto");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const { email, auditRequestId, data = {}, progress = 0 } = payload;

    if (!email || !auditRequestId) {
      return { statusCode: 400, body: JSON.stringify({ error: "Email and auditRequestId are required" }) };
    }

    // Enforce paid state
    const { data: auditRequest, error: requestError } = await supabase
      .from("audit_requests")
      .select("id, status")
      .eq("id", auditRequestId)
      .maybeSingle();

    if (requestError) throw requestError;
    if (!auditRequest) {
      return { statusCode: 404, body: JSON.stringify({ error: "Audit request not found" }) };
    }
    if (auditRequest.status !== "paid") {
      return { statusCode: 403, body: JSON.stringify({ error: "Audit payment not confirmed" }) };
    }

    // One session per request: reuse if exists
    const { data: existingSession, error: fetchError } = await supabase
      .from("audit_sessions")
      .select("id, email, resume_token, data, progress")
      .eq("audit_request_id", auditRequestId)
      .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    if (existingSession) {
      return {
        statusCode: 200,
        body: JSON.stringify({ sessionId: existingSession.id, resumeToken: existingSession.resume_token }),
      };
    }

    const resumeToken = randomUUID();
    const { data: auditSession, error } = await supabase
      .from("audit_sessions")
      .insert({
        email,
        status: "in_progress",
        progress,
        data,
        resume_token: resumeToken,
        audit_request_id: auditRequestId || null,
      })
      .select("id, email, resume_token")
      .single();

    if (error) throw error;

    if (process.env.RESEND_API_KEY && process.env.PUBLIC_SITE_URL) {
      const resumeUrl = `${process.env.PUBLIC_SITE_URL}/services/audit/${auditSession.id}?token=${auditSession.resume_token}`;
      const companyName = data?.contact?.businessName || "";
      await resend.emails.send({
        from: "audit@saasycookies.com",
        to: auditSession.email,
        subject: `Resume your SaaSy Cookies Audit${companyName ? ` - ${companyName}` : ""}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Your SaaSy Cookies Audit</h2>
            <p>Continue your audit anytime using this private link:</p>
            <p><a href="${resumeUrl}">${resumeUrl}</a></p>
            <p>If you have questions, reply to this email.</p>
          </div>
        `,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: auditSession.id, resumeToken: auditSession.resume_token }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to create audit session", details: error.message }) };
  }
};
