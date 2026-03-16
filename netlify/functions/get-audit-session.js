const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const sessionId = event.queryStringParameters?.session_id;
    const resumeToken = event.queryStringParameters?.token;

    if (!sessionId || !resumeToken) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing session_id or token" }) };
    }

    const { data, error } = await supabase
      .from("audit_sessions")
      .select("*")
      .eq("id", sessionId)
      .eq("resume_token", resumeToken)
      .maybeSingle();

    if (error) throw error;

    return { statusCode: 200, body: JSON.stringify({ auditSession: data }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch audit session", details: error.message }) };
  }
};
