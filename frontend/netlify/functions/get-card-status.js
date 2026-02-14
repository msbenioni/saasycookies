const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const cardId = event.queryStringParameters?.cardId;

    if (!cardId) {
      return { statusCode: 400, body: JSON.stringify({ error: "cardId is required" }) };
    }

    const { data, error } = await supabase
      .from("digital_cards")
      .select("id, slug, edit_token, status")
      .eq("id", cardId)
      .single();

    if (error || !data) {
      return { statusCode: 404, body: JSON.stringify({ error: "Card not found" }) };
    }

    return { statusCode: 200, body: JSON.stringify({ card: data }) };
  } catch (error) {
    console.error("get-card-status error", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
};
