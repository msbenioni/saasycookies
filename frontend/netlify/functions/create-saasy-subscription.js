const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");
const { PRICE_IDS, BUILD_FEE_PRICE_IDS } = require("./_shared/stripePrices");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Discount configuration - currently no discounts available
function getDiscountId(discountType) {
  // No discounts currently available
  return null;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  // Validate required environment variables
  const requiredEnvVars = [
    'STRIPE_SECRET_KEY',
    'SUPABASE_URL', 
    'SUPABASE_SERVICE_ROLE_KEY',
    'PUBLIC_SITE_URL'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    console.error('Missing environment variables:', missingVars);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        error: "Server configuration error", 
        details: `Missing: ${missingVars.join(', ')}` 
      }) 
    };
  }

  try {
    const { intakeId, planId, discounts = [], currency = "USD" } = JSON.parse(event.body);
    
    // Normalize currency to uppercase
    const normalizedCurrency = String(currency).toUpperCase();
    
    // Get price IDs for the specified currency
    const planPriceId = PRICE_IDS?.[planId]?.[normalizedCurrency];
    const buildFeePriceId = BUILD_FEE_PRICE_IDS?.[normalizedCurrency];
    
    if (!planPriceId) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ 
          error: "Invalid plan or currency", 
          details: { planId, currency: normalizedCurrency } 
        }) 
      };
    }
    
    if (!buildFeePriceId || buildFeePriceId.startsWith("price_BUILD_FEE")) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ 
          error: "Build fee not configured yet", 
          details: { currency: normalizedCurrency } 
        }) 
      };
    }

    // Validate required fields
    if (!intakeId || !planId) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ 
          error: "Missing required fields", 
          details: "intakeId and planId are required" 
        }) 
      };
    }

    // Validate planId exists in your PRICE_IDS mapping
    if (!PRICE_IDS?.[planId]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid plan",
          details: `Plan must be one of: ${Object.keys(PRICE_IDS).join(", ")}`
        }),
      };
    }

    // Get client intake from database
    const { data: intake, error: intakeError } = await supabase
      .from('client_intakes')
      .select('*')
      .eq('id', intakeId)
      .single();

    if (intakeError || !intake) {
      return { statusCode: 404, body: JSON.stringify({ error: "Client intake not found" }) };
    }

    // Check if intake already has a subscription
    if (intake.stripe_subscription_id) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ 
          error: "Subscription already exists", 
          details: "This intake already has an active subscription" 
        }) 
      };
    }

    const planConfig = PLAN_CONFIG[planId];
    const trialStartDate = new Date();
    const trialEndDate = new Date(trialStartDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from now

    // Create or get Stripe customer
    let customerId;
    if (intake.stripe_customer_id) {
      customerId = intake.stripe_customer_id;
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: intake.email,
        name: intake.full_name,
        metadata: {
          intake_id: intakeId,
          business_name: intake.business_name,
          plan: planId
        }
      });
      customerId = customer.id;
    }

    // Create checkout session for $10 build fee (one-time payment)
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      mode: 'payment', // One-time payment for build fee
      line_items: [{
        price: buildFeePriceId,
        quantity: 1,
      }],
      metadata: {
        intake_id: intakeId,
        plan: planId,
        currency: normalizedCurrency,
        plan_price_id: planPriceId,
        action: 'build_fee_payment',
        create_subscription_after: 'true' // Signal to webhook
      },
      success_url: `${process.env.PUBLIC_SITE_URL}/subscription-success?intake=${intakeId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.PUBLIC_SITE_URL}/subscription-cancelled?intake=${intakeId}`,
    });

    // Update intake with customer ID (subscription will be created via webhook)
    const { error: updateError } = await supabase
      .from('client_intakes')
      .update({
        stripe_customer_id: customerId,
        updated_at: new Date().toISOString()
      })
      .eq('id', intakeId);

    if (updateError) {
      console.error('Error updating intake:', updateError);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        checkoutUrl: checkoutSession.url,
        customerId: customerId
      }),
    };

  } catch (error) {
    console.error("create-saasy-subscription error:", error.message);
    
    // Return more specific error messages
    let errorMessage = "Server error";
    if (error.message.includes("JSON")) {
      errorMessage = "Invalid request format";
    } else if (error.message.includes("database") || error.message.includes("supabase")) {
      errorMessage = "Database error";
    } else if (error.message.includes("stripe")) {
      errorMessage = "Payment processing error";
    }
    
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        error: errorMessage,
        details: error.message 
      }) 
    };
  }
};
