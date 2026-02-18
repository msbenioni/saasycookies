const Stripe = require("stripe");
const { PRICE_IDS } = require("../src/constants/priceIds");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Detect currency from country code
function currencyFromCountry(country) {
  if (country === "NZ") return "NZD";
  if (country === "AU") return "AUD";
  return "USD";
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const requestBody = JSON.parse(event.body);
    const { plan } = requestBody;

    // Validate plan
    if (!plan || !PRICE_IDS[plan]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid plan",
          details: `Plan must be one of: ${Object.keys(PRICE_IDS).join(", ")}`
        })
      };
    }

    // Get country from headers (Vercel/Netlify often provide this)
    const country = event.headers["x-vercel-ip-country"] || 
                   event.headers["x-country"] || 
                   event.headers["cf-ipcountry"] || 
                   undefined;

    const currency = currencyFromCountry(country);
    const priceId = PRICE_IDS[plan][currency];

    if (!priceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Price not found",
          details: `No price ID found for plan ${plan} in currency ${currency}`
        })
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      
      // ✅ Enable customer-facing promo code entry
      allow_promotion_codes: true,
      
      // Optional but recommended
      billing_address_collection: "auto",
      customer_creation: "always",
      
      success_url: `${process.env.PUBLIC_SITE_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.PUBLIC_SITE_URL}/pricing`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        url: session.url,
        currency,
        plan,
        priceId
      }),
    };
  } catch (error) {
    console.error("create-subscription-checkout error:", error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server error",
        details: error.message
      })
    };
  }
};
