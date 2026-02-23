// Shared Stripe price constants for Netlify functions
// These match the frontend constants but are accessible to server-side code

exports.PRICE_IDS = {
  starter: {
    NZD: process.env.STRIPE_PRICE_STARTER_NZD || "price_1T24X1LWHkuDViMmCeG8Kyw6",
    AUD: process.env.STRIPE_PRICE_STARTER_AUD || "price_1T24YZLWHkuDViMm04DcARPi", 
    USD: process.env.STRIPE_PRICE_STARTER_USD || "price_1T24YNLWHkuDViMmYSLza6B6",
  },
  growth: {
    NZD: process.env.STRIPE_PRICE_GROWTH_NZD || "price_1T24aYLWHkuDViMmUybhM4hx",
    AUD: process.env.STRIPE_PRICE_GROWTH_AUD || "price_1T24aoLWHkuDViMm0wMiHmF0",
    USD: process.env.STRIPE_PRICE_GROWTH_USD || "price_1T24axLWHkuDViMmB2oFjJ6W",
  },
  authority: {
    NZD: process.env.STRIPE_PRICE_AUTHORITY_NZD || "price_1T24cFLWHkuDViMmO1qyBuTd",
    AUD: process.env.STRIPE_PRICE_AUTHORITY_AUD || "price_1T24caLWHkuDViMmERxwkpy6",
    USD: process.env.STRIPE_PRICE_AUTHORITY_USD || "price_1T24cRLWHkuDViMm3rtOZ17f",
  },
  digitalCard: {
    AUD: process.env.STRIPE_PRICE_DIGITAL_CARD_AUD || "price_1T24TyLWHkuDViMm10Evd7Wk",
    USD: process.env.STRIPE_PRICE_DIGITAL_CARD_USD || "price_1T24ToLWHkuDViMmVSJMRGeQ",
  },
};

exports.BUILD_FEE_PRICE_IDS = {
  NZD: process.env.STRIPE_PRICE_BUILD_FEE_NZD || "price_BUILD_FEE_NZD",
  AUD: process.env.STRIPE_PRICE_BUILD_FEE_AUD || "price_BUILD_FEE_AUD", 
  USD: process.env.STRIPE_PRICE_BUILD_FEE_USD || "price_BUILD_FEE_USD",
};
