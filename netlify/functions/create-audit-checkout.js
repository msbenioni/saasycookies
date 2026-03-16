const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const currencyMap = {
  NZ: "NZD",
  AU: "AUD",
  US: "USD",
  CA: "USD",
  GB: "USD",
};

const auditPriceMap = {
  NZD: process.env.STRIPE_PRICE_AUDIT_FEE_NZD,
  AUD: process.env.STRIPE_PRICE_AUDIT_FEE_AUD,
  USD: process.env.STRIPE_PRICE_AUDIT_FEE_USD,
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const { fullName, email, companyName, templatePath, source, country = "NZ" } = payload;

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: "Email is required" }) };
    }

    const currency = currencyMap[country] || "NZD";
    const priceId = auditPriceMap[currency];

    if (!priceId) {
      return { statusCode: 500, body: JSON.stringify({ error: "Missing audit price for currency" }) };
    }

    const { data: auditRequest, error } = await supabase
      .from("audit_requests")
      .insert({
        email,
        company_name: companyName || "",
        full_name: fullName || "",
        template_path: templatePath || "",
        status: "created",
        source: source || "",
      })
      .select("id")
      .single();

    if (error) throw error;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      success_url: `${process.env.PUBLIC_SITE_URL}/services/audit/start?checkout_session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.PUBLIC_SITE_URL}/services/audit`,
      metadata: {
        audit_request_id: auditRequest.id,
        action: "audit_fee",
        currency,
      },
    });

    await supabase
      .from("audit_requests")
      .update({
        stripe_checkout_session_id: session.id,
        status: "checkout_started",
        updated_at: new Date().toISOString(),
      })
      .eq("id", auditRequest.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ checkoutUrl: session.url, sessionId: session.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create audit checkout", details: error.message }),
    };
  }
};
