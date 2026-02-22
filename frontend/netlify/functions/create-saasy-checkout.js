const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

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
    const requestBody = JSON.parse(event.body);
    const { priceId, clientIntakeId, successUrl, cancelUrl, country } = requestBody;

    if (!priceId || !clientIntakeId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields: priceId, clientIntakeId" })
      };
    }

    // Get client intake data
    const { data: intake, error: intakeError } = await supabase
      .from('client_intakes')
      .select('full_name, email, business_name, country')
      .eq('id', clientIntakeId)
      .single();

    if (intakeError || !intake) {
      console.error('Error fetching client intake:', intakeError);
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Client intake not found" })
      };
    }

    // Get currency based on country
    const { currencyFromCountry } = require('../src/utils/currencyMapping');
    const { BUILD_FEE_PRICE_IDS } = require('../src/constants/priceIds');
    
    const currency = currencyFromCountry(country) || 'USD';
    
    // Get coupon code based on plan (for $10 first month)
    const getCouponForPlan = (planId) => {
      switch(planId) {
        case 'starter': return 'QvxfgbUc';  // $79 - $69 = $10
        case 'growth': return 'jZciXJxz';    // $149 - $139 = $10
        case 'authority': return 'otQ1W22C'; // $249 - $239 = $10
        default: return 'QvxfgbUc';
      }
    };

    // Create checkout session with standard pricing + coupon
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // Standard plan price
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer_email: intake.email,
      success_url: successUrl || `${process.env.PUBLIC_SITE_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.PUBLIC_SITE_URL}/pricing`,
      discounts: [{
        coupon: getCouponForPlan(planId) // Plan-specific coupon for $10 first month
      }],
      subscription_data: {
        trial_period_days: 0, // No trial - using coupon instead
      },
      metadata: {
        client_intake_id: clientIntakeId,
        full_name: intake.full_name,
        business_name: intake.business_name,
        country: intake.country,
        plan_id: priceId,
        currency: currency,
        first_month_price: '10',
      },
      billing_address_collection: 'required',
      allow_promotion_codes: false, // Disable other codes
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to create checkout session",
        details: error.message
      }),
    };
  }
};
