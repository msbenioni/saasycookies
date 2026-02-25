export const site = {
  brand: {
    name: "SaaSy Cookies",
    tagline: "Revenue-Ready Digital Infrastructure for Founders",
    colors: {
      primary: "hsl(263, 70%, 58%)",
      secondary: "hsl(0, 0%, 20%)",
      accent: "hsl(187, 72%, 45%)",
      destructive: "hsl(0, 84%, 60%)",
    },
  },
  nav: {
    primary: [
      { name: "Home", href: "/" },
      { name: "Pricing", href: "/pricing" },
      { name: "AI & SaaS", href: "/services/ai-saas" },
      { name: "Contact", href: "/contact" },
    ],
    tools: [
      { name: "Invoice Generator", href: "/tools/invoice-generator" },
      { name: "QR Generator", href: "/tools/qr-generator" },
      { name: "Digital Cards", href: "/tools/digital-card" },
    ],
  },
  footer: {
    socials: [
      { name: "Twitter", href: "#", icon: "twitter" },
      { name: "LinkedIn", href: "#", icon: "linkedin" },
      { name: "GitHub", href: "#", icon: "github" },
    ],
  },
  seo: {
    defaultTitle: "SaaSy Cookies - Revenue-Ready Digital Infrastructure",
    defaultDescription: "We build websites, funnels, automation, and AI systems for founders. No DIY tools, just clean systems that grow with you.",
    ogImage: "/og-image.webp",
    url: "https://saasycookies.com",
  },
  analytics: {
    provider: "plausible", // or "ga4", "posthog"
    ids: {
      plausible: "saasycookies.com",
      ga4: "G-XXXXXXXXXX",
      posthog: "phc_XXXXXXXXXX",
    },
  },
  ctas: {
    primary: "Get Started",
    secondary: "Learn More",
    pricing: "View Plans",
    contact: "Contact Us",
  },
  contact: {
    email: "support@saasycookies.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 100, San Francisco, CA 94105",
  },
};

export const schema = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand.name,
    url: site.seo.url,
    logo: `${site.seo.url}/logo.webp`,
    description: site.brand.tagline,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phone,
      contactType: "customer service",
      availableLanguage: "en",
    },
    sameAs: site.footer.socials.map(social => social.href),
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.brand.name,
    url: site.seo.url,
    description: site.seo.defaultDescription,
  },
};
