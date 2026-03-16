const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const sessionId = event.queryStringParameters?.checkout_session_id;

    if (!sessionId) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing checkout_session_id" }) };
    }

    const { data, error } = await supabase
      .from("audit_requests")
      .select("*")
      .eq("stripe_checkout_session_id", sessionId)
      .maybeSingle();

    if (error) throw error;

    return { statusCode: 200, body: JSON.stringify({ auditRequest: data }) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch audit request", details: error.message }),
    };
  }
};
