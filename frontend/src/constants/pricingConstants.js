// Shared pricing data for consistency across the application
export const PRICING_TIERS = [
  {
    name: "Starter Presence",
    price: "$79/month",
    subtitle: "12-month minimum | 30-Day Build Phase",
    description: "For service providers who need a clean, professional online presence.",
    cta: "Start Starter Plan",
    planId: "starter",
    highlight: false,
    scopeLimits: {
      maxPages: 5,
      maxFunnels: 0,
      contentUpdates: "2 minor edits/month",
      supportResponse: "48h"
    },
    includes: [
      "Up to 5-page website",
      "2 minor content edits/month",
      "Basic SEO setup",
      "Email capture + basic automation",
      "Monthly performance report",
      "Support response within 48h",
      "30-Day Build Phase",
    ],
    excludes: [],
  },
  {
    name: "Growth Engine",
    price: "$149/month",
    subtitle: "12-month minimum | 30-Day Build Phase",
    description: "For coaches, consultants, and personal brands selling offers.",
    cta: "Launch Growth Plan",
    planId: "growth",
    highlight: true,
    scopeLimits: {
      maxPages: 10,
      maxFunnels: 1,
      contentUpdates: "4 edits/month",
      supportResponse: "48h"
    },
    includes: [
      "Everything in Starter",
      "Up to 10-page website",
      "Lead magnet delivery system",
      "Email marketing automation",
      "Basic funnel optimization (1 funnel)",
      "4 content edits/month",
      "Podcast/blog posting support (1/month)",
      "Funnel tweaks + automation support",
      "Basic analytics setup",
      "30-Day Build Phase",
    ],
    excludes: [],
  },
  {
    name: "Authority System",
    price: "$249/month",
    subtitle: "12-month minimum | 30-Day Build Phase",
    description: "For founders building a full ecosystem.",
    cta: "Build Authority System",
    planId: "authority",
    highlight: false,
    scopeLimits: {
      maxPages: 15,
      maxFunnels: 3,
      contentUpdates: "8 edits/month",
      supportResponse: "24h"
    },
    includes: [
      "Everything in Growth",
      "Up to 15-page website",
      "Multi-funnel architecture (up to 3 funnels)",
      "Member portal management",
      "Payment lifecycle management (Stripe setup)",
      "Advanced automation flows",
      "8 content edits/month",
      "Podcast upload support (up to 4/month)",
      "Testimonial uploads",
      "Priority support (24h response)",
      "Monthly system review",
      "30-Day Build Phase",
    ],
    excludes: [],
  },
];

// Helper functions for pricing data
export const getPlanByName = (name) => {
  return PRICING_TIERS.find(tier => tier.name === name);
};

export const getPlanById = (planId) => {
  return PRICING_TIERS.find(tier => tier.planId === planId);
};

export const getRecommendedPlan = () => {
  return PRICING_TIERS.find(tier => tier.highlight);
};
