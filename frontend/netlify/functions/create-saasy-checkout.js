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

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer_email: intake.email,
      success_url: successUrl || `${process.env.PUBLIC_SITE_URL}/checkout-success`,
      cancel_url: cancelUrl || `${process.env.PUBLIC_SITE_URL}/pricing`,
      metadata: {
        client_intake_id: clientIntakeId,
        full_name: intake.full_name,
        business_name: intake.business_name,
        country: intake.country,
      },
      billing_address_collection: 'required',
      allow_promotion_codes: true,
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
