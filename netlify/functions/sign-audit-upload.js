const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { auditRequestId, filename, contentType } = body;

    if (!auditRequestId || !filename || !contentType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "auditRequestId, filename, contentType are required" }),
      };
    }

    const sanitizedName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `audits/${auditRequestId}/${Date.now()}-${sanitizedName}`;

    const { data, error } = await supabase.storage
      .from("audit-uploads")
      .createSignedUploadUrl(path);

    if (error) throw error;

    await supabase
      .from("audit_requests")
      .update({
        upload_path: path,
        status: "in_progress",
      })
      .eq("id", auditRequestId);

    return {
      statusCode: 200,
      body: JSON.stringify({ path, signedUrl: data.signedUrl, token: data.token }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server error", details: error.message }) };
  }
};
