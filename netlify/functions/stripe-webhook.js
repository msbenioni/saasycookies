const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");
const { PRICE_IDS } = require("./_shared/stripePrices");

// Development-only logger
const isDevelopment = process.env.NODE_ENV === 'development';
const logger = {
  log: (...args) => {
    if (isDevelopment) console.log(...args);
  },
  error: (...args) => {
    if (isDevelopment) console.error(...args);
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const signature = event.headers["stripe-signature"] || event.headers["Stripe-Signature"];
  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event.body;

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    logger.error("Webhook signature verification failed", error.message);
    return { statusCode: 400, body: `Webhook Error: ${error.message}` };
  }

  try {
    switch (stripeEvent.type) {
      case "checkout.session.completed": {
        const session = stripeEvent.data.object;
        const intakeId = session.metadata?.intake_id;
        const plan = session.metadata?.plan;
        const action = session.metadata?.action;
        const createSubscriptionAfter = session.metadata?.create_subscription_after;

        // Handle build fee payment - create subscription with 30-day trial
        if (intakeId && action === 'build_fee_payment' && createSubscriptionAfter === 'true') {
          try {
            // Add idempotency protection - check if subscription already exists or session already processed
            const { data: existing } = await supabase
              .from('client_intakes')
              .select('stripe_subscription_id, build_fee_session_id')
              .eq('id', intakeId)
              .single();

            if (existing?.stripe_subscription_id) {
              logger.log(`Subscription already exists for intake ${intakeId}: ${existing.stripe_subscription_id}`);
              break;
            }

            if (existing?.build_fee_session_id === session.id) {
              logger.log(`Session already processed: ${session.id}`);
              break;
            }

            // Get plan price ID from session metadata
            const planPriceId = session.metadata?.plan_price_id;
            if (!planPriceId) {
              logger.error("Missing plan_price_id in session metadata for intake:", intakeId);
              break;
            }

            // Create subscription with 30-day trial
            const subscriptionData = {
              customer: session.customer,
              items: [{
                price: planPriceId,
              }],
              trial_period_days: 30, // 30-day build phase
              metadata: {
                intake_id: intakeId,
                plan: plan,
                currency: session.metadata?.currency || 'USD',
                build_fee_paid: 'true'
              }
            };

            // No discounts currently available

            // Create the subscription with idempotency key
            const subscription = await stripe.subscriptions.create(subscriptionData, {
              idempotencyKey: `intake_${intakeId}_subscription`,
            });

            // Update intake with subscription info
            await supabase
              .from('client_intakes')
              .update({
                status: 'confirmed',
                stripe_subscription_id: subscription.id,
                accepted_plan: true,
                trial_start_date: new Date().toISOString(),
                trial_end_date: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(),
                current_period_end: subscription.current_period_end
                  ? new Date(subscription.current_period_end * 1000).toISOString()
                  : null,
                build_fee_paid: true,
                build_fee_session_id: session.id,
                build_fee_paid_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              .eq('id', intakeId);

            logger.log(`Created subscription ${subscription.id} for intake ${intakeId}`);

          } catch (error) {
            logger.error('Error creating subscription after build fee:', error);
            // Don't fail the webhook, but log the error
          }
        }
        
        // Handle legacy digital cards
        const cardId = session.metadata?.cardId;
        if (cardId && !intakeId) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription);

          await supabase
            .from("digital_cards")
            .update({
              status: subscription.status === "trialing" ? "trialing" : "active",
              stripe_customer_id: session.customer,
              stripe_subscription_id: session.subscription,
              stripe_price_id: process.env.STRIPE_PRICE_ID,
              trial_ends_at: subscription.trial_end
                ? new Date(subscription.trial_end * 1000).toISOString()
                : null,
              current_period_end: subscription.current_period_end
                ? new Date(subscription.current_period_end * 1000).toISOString()
                : null,
            })
            .eq("id", cardId);
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = stripeEvent.data.object;
        const subscriptionId = invoice.subscription;
        const intakeId = invoice.metadata?.intake_id;
        const invoiceType = invoice.metadata?.type;

        // Handle build fee payment completion
        if (intakeId && invoiceType === 'build_fee') {
          logger.log('Build fee paid for intake:', intakeId);
          // Build fee payment is handled in checkout.session.completed webhook
          break;
        }
        
        // Handle subscription payments for client intakes
        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          
          // Update client intake
          await supabase
            .from('client_intakes')
            .update({
              status: subscription.status === 'active' ? 'active' : 'confirmed',
              current_period_end: subscription.current_period_end
                ? new Date(subscription.current_period_end * 1000).toISOString()
                : null,
              updated_at: new Date().toISOString()
            })
            .eq('stripe_subscription_id', subscriptionId);
          
          // Update legacy digital cards
          await supabase
            .from("digital_cards")
            .update({
              status: "active",
              current_period_end: subscription.current_period_end
                ? new Date(subscription.current_period_end * 1000).toISOString()
                : null,
            })
            .eq("stripe_subscription_id", subscriptionId);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = stripeEvent.data.object;
        const subscriptionId = invoice.subscription;

        if (!subscriptionId) break;

        // Update client intake
        await supabase
          .from('client_intakes')
          .update({ status: 'past_due' })
          .eq('stripe_subscription_id', subscriptionId);
          
        // Update legacy digital cards
        await supabase
          .from("digital_cards")
          .update({ status: "paused" })
          .eq("stripe_subscription_id", subscriptionId);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = stripeEvent.data.object;

        // Update client intake
        await supabase
          .from('client_intakes')
          .update({ status: 'cancelled' })
          .eq('stripe_subscription_id', subscription.id);
          
        // Update legacy digital cards
        await supabase
          .from("digital_cards")
          .update({ status: "paused" })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }

      default:
        break;
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  } catch (error) {
    logger.error("stripe-webhook handler error", error);
    return { statusCode: 500, body: "Webhook handler failed" };
  }
};
