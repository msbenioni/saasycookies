const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const { sessionId, resumeToken, data = {}, progress = 0, status = "in_progress" } = payload;

    if (!sessionId || !resumeToken) {
      return { statusCode: 400, body: JSON.stringify({ error: "sessionId and resumeToken are required" }) };
    }

    // Clamp progress to 0–100 and validate status
    const clampedProgress = Math.max(0, Math.min(100, Number(progress) || 0));
    const validStatuses = ["in_progress", "completed"];
    const finalStatus = validStatuses.includes(status) ? status : "in_progress";

    const { data: auditSession, error } = await supabase
      .from("audit_sessions")
      .update({
        data,
        progress: clampedProgress,
        status: finalStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionId)
      .eq("resume_token", resumeToken)
      .select("id, progress, status")
      .single();

    if (error) throw error;

    return { statusCode: 200, body: JSON.stringify({ auditSession }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to update audit session", details: error.message }) };
  }
};
