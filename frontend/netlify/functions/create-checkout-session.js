const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");
const crypto = require("crypto");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function slugify(input = "") {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function randomToken() {
  return crypto.randomBytes(24).toString("hex");
}

function getCouponId(discountCode) {
  const codes = {
    'FRIENDS50': process.env.STRIPE_COUPON_API_FRIENDS50,
    'FAM100': process.env.STRIPE_COUPON_API_FAM100,
  };
  
  return codes[discountCode?.toUpperCase()] || null;
}

async function ensureUniqueSlug(baseSlug) {
  let slug = baseSlug || `card-${Date.now()}`;

  for (let i = 0; i < 8; i += 1) {
    const { data: existing } = await supabase
      .from("digital_cards")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (!existing) return slug;
    slug = `${baseSlug || "card"}-${Math.floor(Math.random() * 9999)}`;
  }

  return `${baseSlug || "card"}-${Date.now()}`;
}

function parseBody(event) {
  try {
    return JSON.parse(event.body || "{}");
  } catch {
    return {};
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { cardData, discountCode, cardId: existingCardId } = JSON.parse(event.body);
    const {
      cardId,
      fullName,
      businessName,
      email,
      phone,
      website,
      linkedin,
      instagram,
      bio,
      themeColor,
    } = body;

    const isResume = Boolean(cardId);
    let card;

    if (isResume) {
      const { data, error } = await supabase
        .from("digital_cards")
        .select("id, slug, status, trial_ends_at, card_json")
        .eq("id", cardId)
        .single();

      if (error || !data) {
        return { statusCode: 404, body: JSON.stringify({ error: "Card not found" }) };
      }

      card = data;
    } else {
      if (!fullName || !email) {
        return { statusCode: 400, body: JSON.stringify({ error: "fullName and email are required" }) };
      }

      const baseSlug = slugify(fullName);
      const slug = await ensureUniqueSlug(baseSlug);

      const cardJson = {
        fullName,
        businessName: businessName || "",
        email,
        phone: phone || "",
        website: website || "",
        linkedin: linkedin || "",
        instagram: instagram || "",
        bio: bio || "",
        themeColor: themeColor || "#7c3aed",
      };

      const { data, error } = await supabase
        .from("digital_cards")
        .insert({
          slug,
          edit_token: randomToken(),
          status: "draft",
          card_json: cardJson,
        })
        .select("id, slug, status, trial_ends_at")
        .single();

      if (error) throw error;
      card = data;
    }

    const cardEmail = isResume ? card.card_json?.email : email;

    const subscriptionData = {
      metadata: { cardId: card.id, slug: card.slug },
    };

    // No second free trial when resuming a paused card.
    if (!isResume && !card.trial_ends_at) {
      subscriptionData.trial_period_days = 30;
    }

    const checkoutPayload = {
      mode: "subscription",
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      subscription_data: subscriptionData,
      metadata: { cardId: card.id, slug: card.slug },
      success_url: `${process.env.PUBLIC_SITE_URL}/tools/digital-card/success?card=${card.id}`,
      cancel_url: `${process.env.PUBLIC_SITE_URL}/tools/digital-card/cancel?card=${card.id}`,
    };

    if (cardEmail) {
      checkoutPayload.customer_email = cardEmail;
    }

    // Apply discount code if provided
    if (discountCode) {
      const couponId = getCouponId(discountCode);
      if (couponId) {
        checkoutPayload.discounts = [{ coupon: couponId }];
      }
    }

    const session = await stripe.checkout.sessions.create(checkoutPayload);

    return {
      statusCode: 200,
      body: JSON.stringify({ checkoutUrl: session.url, cardId: card.id, slug: card.slug }),
    };
  } catch (error) {
    console.error("create-checkout-session error", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
};
