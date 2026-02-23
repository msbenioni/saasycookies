const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { cardId, filename, contentType } = body;

    if (!cardId || !filename || !contentType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "cardId, filename, contentType are required" }),
      };
    }

    const sanitizedName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `cards/${cardId}/${Date.now()}-${sanitizedName}`;

    const { data, error } = await supabase.storage
      .from("digital-card-assets")
      .createSignedUploadUrl(path);

    if (error) throw error;

    await supabase
      .from("digital_cards")
      .update({ asset_path: path })
      .eq("id", cardId);

    return {
      statusCode: 200,
      body: JSON.stringify({ path, signedUrl: data.signedUrl, token: data.token }),
    };
  } catch (error) {
    console.error("sign-upload error", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
};
