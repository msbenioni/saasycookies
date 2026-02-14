const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { token, cardJson } = body;

    if (!token || !cardJson) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "token and cardJson are required" }),
      };
    }

    const { data: card, error: fetchError } = await supabase
      .from("digital_cards")
      .select("id")
      .eq("edit_token", token)
      .single();

    if (fetchError || !card) {
      return { statusCode: 404, body: JSON.stringify({ error: "Invalid token" }) };
    }

    const { error: updateError } = await supabase
      .from("digital_cards")
      .update({ card_json: cardJson })
      .eq("id", card.id);

    if (updateError) throw updateError;

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error("update-card-by-token error", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
};
