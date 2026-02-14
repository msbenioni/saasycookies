const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");

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
    console.error("Webhook signature verification failed", error.message);
    return { statusCode: 400, body: `Webhook Error: ${error.message}` };
  }

  try {
    switch (stripeEvent.type) {
      case "checkout.session.completed": {
        const session = stripeEvent.data.object;
        const cardId = session.metadata?.cardId;
        const subscriptionId = session.subscription;

        if (!cardId || !subscriptionId) break;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        await supabase
          .from("digital_cards")
          .update({
            status: subscription.status === "trialing" ? "trialing" : "active",
            stripe_customer_id: session.customer,
            stripe_subscription_id: subscriptionId,
            stripe_price_id: process.env.STRIPE_PRICE_ID,
            trial_ends_at: subscription.trial_end
              ? new Date(subscription.trial_end * 1000).toISOString()
              : null,
            current_period_end: subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000).toISOString()
              : null,
          })
          .eq("id", cardId);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = stripeEvent.data.object;
        const subscriptionId = invoice.subscription;

        if (!subscriptionId) break;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        await supabase
          .from("digital_cards")
          .update({
            status: "active",
            current_period_end: subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000).toISOString()
              : null,
          })
          .eq("stripe_subscription_id", subscriptionId);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = stripeEvent.data.object;
        const subscriptionId = invoice.subscription;

        if (!subscriptionId) break;

        await supabase
          .from("digital_cards")
          .update({ status: "paused" })
          .eq("stripe_subscription_id", subscriptionId);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = stripeEvent.data.object;

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
    console.error("stripe-webhook handler error", error);
    return { statusCode: 500, body: "Webhook handler failed" };
  }
};
