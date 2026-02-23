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
    const getCurrencyFromCountry = (country) => {
      const currencyMap = {
        'NZ': 'NZD',
        'AU': 'AUD', 
        'US': 'USD',
        'CA': 'USD',
        'GB': 'USD',
        'DEFAULT': 'USD'
      };
      return currencyMap[country] || currencyMap['DEFAULT'];
    };
    
    const currency = getCurrencyFromCountry(country) || 'USD';
    
    // Get price ID based on plan and currency
    const getPriceId = (planId, currency) => {
      const priceMap = {
        starter: {
          'NZD': 'price_1T24X1LWHkuDViMmCeG8Kyw6',
          'AUD': 'price_1T24YZLWHkuDViMm04DcARPi',
          'USD': 'price_1T24YNLWHkuDViMmYSLza6B6'
        },
        growth: {
          'NZD': 'price_1T24aYLWHkuDViMmUybhM4hx',
          'AUD': 'price_1T24aoLWHkuDViMm0wMiHmF0',
          'USD': 'price_1T24axLWHkuDViMmB2oFjJ6W'
        },
        authority: {
          'NZD': 'price_1T24cFLWHkuDViMmO1qyBuTd',
          'AUD': 'price_1T24caLWHkuDViMmERxwkpy6',
          'USD': 'price_1T24cRLWHkuDViMm3rtOZ17f'
        }
      };
      return priceMap[planId]?.[currency] || priceMap[planId]?.['USD'];
    };

    // Get the actual price ID for the plan
    const actualPriceId = getPriceId(planId, currency);
    const getCouponForPlan = (planId) => {
      switch(planId) {
        case 'starter': return 'QvxfgbUc';  // $79 - $69 = $10
        case 'growth': return 'jZciXJxz';    // $149 - $139 = $10
        case 'authority': return 'otQ1W22C'; // $249 - $239 = $10
        default: return 'QvxfgbUc';
      }
    };

    // Create checkout session with standard pricing (temporarily without coupons for debugging)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: actualPriceId, // Use the actual price ID from our mapping
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer_email: intake.email,
      success_url: successUrl || `${process.env.PUBLIC_SITE_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.PUBLIC_SITE_URL}/pricing`,
      // Temporarily remove coupons for debugging
      // discounts: [{
      //   coupon: getCouponForPlan(planId) // Plan-specific coupon for $10 first month
      // }],
      subscription_data: {
        trial_period_days: 0, // No trial - using coupon instead
      },
      metadata: {
        client_intake_id: clientIntakeId,
        full_name: intake.full_name,
        business_name: intake.business_name,
        country: intake.country,
        plan_id: actualPriceId,
        currency: currency,
        first_month_price: '10',
        debug_mode: 'true', // Add debug flag
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
