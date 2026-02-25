const { Resend } = require("resend");
const apiKey = process.env.RESEND_API_KEY;

// Development-only logger
const isDevelopment = process.env.NODE_ENV === 'development';
const logger = {
  log: (...args) => {
    if (isDevelopment) console.log(...args);
  },
  error: (...args) => {
    if (isDevelopment) console.error(...args);
  },
  warn: (...args) => {
    if (isDevelopment) console.warn(...args);
  }
};

if (!apiKey) {
  logger.error('RESEND_API_KEY not found in environment variables');
}

const resend = new Resend(apiKey);

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Bolt-ready build prompt generator
const EMPTY_SENTINELS = new Set(["n/a", "na", "not specified", "none", "null", ""]);

function normalizeValue(v) {
  if (typeof v === "string") {
    const trimmed = v.trim();
    if (!trimmed) return "";
    if (EMPTY_SENTINELS.has(trimmed.toLowerCase())) return "";
    return trimmed;
  }
  if (Array.isArray(v)) {
    const arr = v
      .map(normalizeValue)
      .filter((x) => (typeof x === "string" ? x.length > 0 : x != null));
    return arr;
  }
  if (v && typeof v === "object") {
    return v;
  }
  return v ?? "";
}

function isFilled(v) {
  if (v == null) return false;
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "object") return Object.keys(v).length > 0;
  return true;
}

function line(label, value) {
  const v = normalizeValue(value);
  if (!isFilled(v)) return "";
  if (Array.isArray(v)) return `- ${label}: ${v.join(", ")}`;
  return `- ${label}: ${v}`;
}

function bullets(label, value) {
  const v = normalizeValue(value);
  if (!isFilled(v)) return "";
  if (!Array.isArray(v)) return line(label, v);
  if (v.length <= 3) return `- ${label}: ${v.join(", ")}`;
  return [`- ${label}:`, ...v.map((x) => `  - ${x}`)].join("\n");
}

function mergeOther(main, other) {
  const m = normalizeValue(main);
  const o = normalizeValue(other);
  if (!isFilled(m) && !isFilled(o)) return "";
  if (isFilled(m) && isFilled(o)) return `${m} (Other: ${o})`;
  return (isFilled(m) ? m : o);
}

function chooseStack(data) {
  const servicePath = (normalizeValue(data.servicePath) || "").toLowerCase();
  const projectType = Array.isArray(data.projectType)
    ? (data.projectType || []).join(" ").toLowerCase()
    : (normalizeValue(data.projectType) || "").toLowerCase();

  const portalSignals = ["portal", "dashboard", "tool", "app", "saas", "members", "auth"];
  const isPortalHeavy =
    portalSignals.some((s) => servicePath.includes(s)) ||
    portalSignals.some((s) => projectType.includes(s)) ||
    normalizeValue(data.authRequirements) === "Yes" ||
    normalizeValue(data.requiresAuthentication) === true;

  if (isPortalHeavy) {
    return `Build using React (Vite), TypeScript, Tailwind, React Router.`;
  }
  return `Build using Next.js 14+ App Router, TypeScript, Tailwind.`;
}

function renderSection(title, lines) {
  const body = lines.filter(Boolean).join("\n");
  if (!body.trim()) return "";
  return `## ${title}\n\n${body}\n`;
}

function generateBoltBuildPrompt(raw) {
  // Normalize top-level values
  const data = {};
  for (const k of Object.keys(raw || {})) data[k] = normalizeValue(raw[k]);

  const primaryGoal = mergeOther(data.primaryGoal, data.primaryGoalOther);
  const projectTypes = mergeOther(data.projectType, data.projectTypeOther);
  const interfaceDirection = mergeOther(data.interfaceDirection, data.interfaceDirectionOther);
  const requiredCapabilities = mergeOther(data.requiredCapabilities, data.requiredCapabilitiesOther);

  const stackLine = chooseStack(data);

  const header = [
    `You are an expert product designer + senior frontend engineer. Build a production-ready web app based on the discovery data below.`,
    ``,
  ].join("\n");

  const projectSummary = renderSection("Project Summary", [
    line("Client", `${data.fullName || ""} | ${data.businessName || ""}`.trim().replace(/^\|\s*/, "")),
    line("Contact", `${data.email || ""} | ${data.phone || ""}`.trim().replace(/^\|\s*/, "")),
    line("Industry", data.industry),
    line("Current URL", data.currentUrl),
    line("Business description", data.businessDescription),
    line("Primary goal", primaryGoal),
    line("Vision", data.projectVision),
    line("Service path", data.servicePath),
    line("Project types (max 3)", projectTypes),
  ]);

  const usersOutcomes = renderSection("Users & Outcomes", [
    bullets("Primary users", data.primaryUsers),
    line("Desired user action", data.desiredUserAction),
    line("Success metric", data.successMetric),
  ]);

  const capabilities = renderSection("Capabilities Required", [
    bullets("Required capabilities", requiredCapabilities),
    line("Ongoing support after launch", data.needsOngoingSupport),
  ]);

  const productInterface = renderSection("Product & Interface Direction", [
    line("Existing product/codebase", data.hasExistingProduct),
    line("Interface direction", interfaceDirection),
    bullets("Reference products & why", data.productReferences),
  ]);

  const assetsReadiness = renderSection("Assets & Readiness", [
    line("Content readiness", data.contentReadiness),
    line("Brand readiness", data.brandReadiness),
    bullets("Constraints/risks", data.constraintsAndRisks),
  ]);

  const technical = renderSection("Technical", [
    line("Current stack/platform", data.currentStack),
    bullets("Integrations needed", data.integrationsNeeded),
    line("Auth requirements", data.authRequirements),
    bullets("Security/compliance", data.securityRequirements),
  ]);

  // Add professional email setup section if requested
  const emailSetup = data.wantProfessionalEmails === "Yes" ? renderSection("Professional Email Setup", [
    line("Email routing required", "Yes - Professional domain email setup"),
    line("Primary email destination", data.primaryGmailAddress),
    line("Custom email addresses", data.customEmailNames),
    line("Setup requirements", "Domain email forwarding + configuration"),
    line("Maximum addresses", "4 professional emails included"),
    bullets("Setup checklist", [
      "Configure domain email routing",
      "Set up email forwarding rules", 
      "Create custom email addresses",
      "Test email delivery and forwarding",
      "Provide setup instructions to client",
      "Verify all addresses are working correctly"
    ]),
  ]) : "";

  const budgetTimeline = renderSection("Budget & Timeline", [
    line("Desired launch date", data.desiredLaunchDate),
    line("Timeline", data.timeline),
    line("Subscription plan preference", data.planPreference),
    line("Custom budget range", data.customBudgetRange),
  ]);

  const notes = renderSection("Notes", [
    line("Pricing acknowledgement", data.pricingAcknowledgement),
    line("Payment process acknowledgement", data.paymentProcessAcknowledgement),
    line("Term acknowledgement (12 months)", data.termAcknowledgement),
    line("Launch offer request", data.launchOfferRequest),
    line("Pacific Market discount", data.pacificMarketDiscount),
    line("Anything else", data.anythingElse),
  ]);

  const deliverable = [
    `# Deliverable`,
    ``,
    `- ${stackLine}`,
    ``,
    `Build the app with:`,
    `- A clean, conversion-focused marketing homepage + essential pages based on goals.`,
    `- If the project includes dashboard/portal/auth, include appropriate routes and protected layouts.`,
    `- Use a consistent design system and reusable components.`,
    `- Provide final code only (no explanations), and include clear instructions to run locally.`,
    ``,
  ].join("\n");

  const nonNegotiables = [
    `# NON-NEGOTIABLE BUILD REQUIREMENTS (must be implemented)`,
    ``,
    `1) Routing UX`,
    `- Scroll restoration on route change.`,
    `- Scroll-to-top floating button with smooth scroll and hide/show behavior.`,
    ``,
    `2) Loading & Feedback`,
    `- Global loading components: page loader + skeletons for content lists.`,
    `- Replace ALL alert()/prompt()/confirm() with:`,
    `  - Toast notifications for quick feedback`,
    `  - Modal confirmation for destructive actions`,
    ``,
    `3) Brand System`,
    `- Centralize design tokens in TWO places:`,
    `  A) CSS variables for colors, radius, shadows, spacing`,
    `  B) A single JS/TS config file exporting brand + navigation + SEO defaults`,
    `- No hard-coded hex colors scattered in components.`,
    ``,
    `4) Cards: CTA Alignment Rule (critical)`,
    `- Any grid of cards with CTAs must have perfectly aligned CTA buttons regardless of content height.`,
    `- Implement cards as flex-column with h-full and push CTA to bottom via mt-auto.`,
    `- Standardize CTA footer area with min-height so button baselines match across cards.`,
    `- All card components must be display:flex; flex-direction:column; height:100%.`,
    `- The CTA container inside the card must use margin-top:auto (Tailwind mt-auto) so it sits at the bottom.`,
    `- The CTA container must have a consistent minimum height (e.g., min-h-[72px]) and align items to the bottom (items-end) to guarantee baseline alignment across cards.`,
    `- In any card grid, the grid row must stretch items (default) and cards must use h-full.`,
    ``,
    `5) Accessibility Baseline`,
    `- Visible focus states for keyboard users.`,
    `- Respect prefers-reduced-motion.`,
    `- Semantic headings (one H1 per page).`,
    `- Proper labels + error messages for forms.`,
    ``,
    `6) SEO + Social`,
    `- Per-page meta title/description.`,
    `- OpenGraph + Twitter card tags.`,
    `- Sitemap + robots.`,
    `- Canonical URL.`,
    `- Basic schema: Organization (and FAQ schema if FAQ exists).`,
    ``,
    `7) Performance`,
    `- Lazy-load below-the-fold images.`,
    `- Optimize image sizing and avoid layout shift.`,
    `- Font loading strategy to prevent blocking.`,
    ``,
    `8) Analytics Hook`,
    `- Include a single analytics abstraction so GA4/Plausible/PostHog can be plugged in later.`,
    `- Track CTA clicks + form submissions + outbound links.`,
    ``,
    `9) Error Handling`,
    `- Global ErrorBoundary and a friendly 404 page.`,
    ``,
    `10) Project Hygiene`,
    `- Clear folder structure: components/, sections/, pages or routes/, lib/, hooks/, styles/, config/`,
    `- ESLint/Prettier configured (or equivalent).`,
    `- Include README with setup + deployment notes.`,
    ``,
  ].join("\n");

  const configReq = [
    `# Also include`,
    ``,
    `src/config/site.ts`,
    ``,
    `- brand tokens (in addition to CSS variables)`,
    `- nav links`,
    `- footer socials`,
    `- SEO defaults`,
    `- analytics provider placeholders`,
    `- CTA labels`,
    `- Example schema (conceptual)`,
    ``,
    `site.brand.name`,
    `site.brand.tagline`,
    `site.brand.colors (references CSS vars)`,
    `site.nav.primary[]`,
    `site.seo.defaultTitle, defaultDescription, ogImage`,
    `site.analytics.provider + site.analytics.ids`,
    `site.ctas.primary, site.ctas.secondary`,
    `site.contact.email, phone, address`,
    ``,
  ].join("\n");

  const outputFormat = [
    `# Output format`,
    `- Provide the full project code structure and key files with complete code.`,
    `- Ensure code compiles and runs.`,
    ``,
  ].join("\n");

  // Assemble — note: empty sections already return ""
  return [
    header,
    projectSummary,
    usersOutcomes,
    capabilities,
    productInterface,
    assetsReadiness,
    technical,
    emailSetup,
    budgetTimeline,
    notes,
    deliverable,
    nonNegotiables,
    configReq,
    outputFormat,
  ]
    .filter(Boolean)
    .join("\n")
    .trim();
}

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { type, formData } = JSON.parse(event.body);

    let emailConfig;

    if (type === 'contact') {
      emailConfig = {
        from: 'onboarding@resend.dev',
        to: 'saasycookies@gmail.com',
        subject: `Contact Form: ${formData.subject || 'New message from website'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Subject:</strong> ${formData.subject || 'No subject'}</p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
              <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
              <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px;">${formData.message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              This email was sent from the SaaSy Cookies contact form.
            </p>
          </div>
        `,
      };
    } else if (type === 'project_brief') {
      let planRecommendation = null;
      try {
        planRecommendation = formData.planRecommendation ? JSON.parse(formData.planRecommendation) : null;
      } catch (error) {
        logger.warn('Failed to parse planRecommendation:', error);
        planRecommendation = null;
      }
      
      // Generate Bolt-ready build prompt from form data
      const buildPrompt = generateBoltBuildPrompt(formData);
      
      emailConfig = {
        from: 'onboarding@resend.dev',
        to: 'saasycookies@gmail.com',
        subject: `AI & SaaS Project Brief: ${formData.businessName || 'New request'} - ${planRecommendation?.planName || 'Custom Build'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🚀 New Project Brief</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">SaaSy Cookies Automated System</p>
            </div>
            
            ${planRecommendation ? `
            <div style="background: rgba(16,185,129,0.10); border: 2px solid rgba(16,185,129,0.30); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #10b981; margin: 0 0 15px 0; font-size: 20px;">📊 Plan Recommendation</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                  <p style="margin: 5px 0;"><strong>Recommended Plan:</strong> <span style="color: #10b981; font-size: 18px;">${escapeHtml(planRecommendation.planName)}</span></p>
                  <p style="margin: 5px 0;"><strong>Price:</strong> ${escapeHtml(planRecommendation.price)}</p>
                  <p style="margin: 5px 0;"><strong>Complexity Score:</strong> ${escapeHtml(planRecommendation.score)}/10</p>
                </div>
                <div>
                  <p style="margin: 5px 0;"><strong>Revenue Stage:</strong> ${escapeHtml(planRecommendation.flags.revenueStage)}</p>
                  <p style="margin: 5px 0;"><strong>Funnel Complexity:</strong> ${escapeHtml(planRecommendation.flags.funnelComplexity)}</p>
                  <p style="margin: 5px 0;"><strong>Offer Type:</strong> ${escapeHtml(planRecommendation.flags.offerComplexity)}</p>
                </div>
              </div>
              
              <div style="margin-top: 15px;">
                <h3 style="color: #333; margin-bottom: 8px;">Build Complexity Flags:</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 14px;">
                  <span style="color: ${planRecommendation.flags.requiresAuth ? '#10b981' : '#999'};">🔐 Authentication: ${planRecommendation.flags.requiresAuth ? 'Required' : 'Not Required'}</span>
                  <span style="color: ${planRecommendation.flags.requiresPayments ? '#10b981' : '#999'};">💳 Payments: ${planRecommendation.flags.requiresPayments ? 'Required' : 'Not Required'}</span>
                  <span style="color: ${planRecommendation.flags.requiresMemberPortal ? '#10b981' : '#999'};">👥 Member Portal: ${planRecommendation.flags.requiresMemberPortal ? 'Required' : 'Not Required'}</span>
                  <span style="color: ${planRecommendation.flags.requiresAutomation ? '#10b981' : '#999'};">⚡ Automation: ${planRecommendation.flags.requiresAutomation ? 'Required' : 'Not Required'}</span>
                </div>
              </div>
              
              <div style="margin-top: 15px;">
                <h3 style="color: #333; margin-bottom: 8px;">Why This Plan:</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  ${planRecommendation.reasoning.map(reason => `<li style="margin: 5px 0; color: #666;">${escapeHtml(reason)}</li>`).join('')}
                </ul>
              </div>
            </div>
            ` : ''}
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px 0;">👤 Client Information</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <p><strong>Name:</strong> ${escapeHtml(formData.fullName)}</p>
                <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(formData.phone || 'Not provided')}</p>
                <p><strong>Business:</strong> ${escapeHtml(formData.businessName)}</p>
                <p><strong>Current URL:</strong> ${escapeHtml(formData.currentUrl || 'Not provided')}</p>
                <p><strong>Industry:</strong> ${escapeHtml(formData.industry || 'Not provided')}</p>
              </div>
              
              <div style="margin-top: 15px;">
                <p><strong>Business Description:</strong></p>
                <div style="background: white; padding: 10px; border-radius: 4px; margin-top: 5px; white-space: pre-wrap; font-family: monospace; font-size: 12px;">${escapeHtml(formData.businessDescription)}</div>
              </div>
            </div>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px 0;">🎯 Project Details</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <p><strong>Service Path:</strong> ${formData.servicePath === 'managed' ? 'Managed Digital Infrastructure' : 'Custom AI & SaaS Systems'}</p>
                <p><strong>Offer Structure:</strong> ${escapeHtml(formData.offerStructure || 'Not specified')}</p>
                <p><strong>Monthly Leads Expected:</strong> ${escapeHtml(formData.monthlyLeadsExpected || 'Not specified')}</p>
                <p><strong>Content Frequency:</strong> ${escapeHtml(formData.contentFrequency || 'Not specified')}</p>
                <p><strong>Desired Launch Date:</strong> ${escapeHtml(formData.desiredLaunchDate || 'Not provided')}</p>
                <p><strong>Hosting Expectation:</strong> ${escapeHtml(formData.hostingExpectation || 'Not specified')}</p>
              </div>
              
              <div style="margin-top: 15px;">
                <p><strong>Project Vision:</strong></p>
                <div style="background: white; padding: 10px; border-radius: 4px; margin-top: 5px; white-space: pre-wrap; font-family: monospace; font-size: 12px;">${escapeHtml(formData.projectVision || 'Not provided')}</div>
              </div>
              
              <div style="margin-top: 15px;">
                <p><strong>Project Types:</strong> ${escapeHtml(Array.isArray(formData.projectType) ? formData.projectType.join(', ') : (formData.projectType || 'Not specified'))}</p>
              </div>
              
              <div style="margin-top: 15px;">
                <p><strong>Required Capabilities:</strong> ${escapeHtml(Array.isArray(formData.requiredCapabilities) ? formData.requiredCapabilities.join(', ') : (formData.requiredCapabilities || 'Not specified'))}</p>
              </div>
            </div>
            
            ${formData.primaryUsers || formData.desiredUserAction || formData.successMetric ? `
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px 0;">👥 Users & Outcomes</h2>
              ${formData.primaryUsers ? `
                <div style="margin-bottom: 15px;">
                  <p><strong>Primary Users:</strong></p>
                  <div style="background: white; padding: 10px; border-radius: 4px; margin-top: 5px; white-space: pre-wrap; font-family: monospace; font-size: 12px;">${escapeHtml(formData.primaryUsers)}</div>
                </div>
              ` : ''}
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <p><strong>Desired User Action:</strong> ${escapeHtml(formData.desiredUserAction || 'Not provided')}</p>
                <p><strong>Primary Success Metric:</strong> ${escapeHtml(formData.successMetric || 'Not provided')}</p>
              </div>
            </div>
            ` : ''}
            
            ${formData.currentStack || formData.integrationsNeeded || formData.authRequirements || formData.securityRequirements ? `
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px 0;">⚙️ Technical Requirements</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <p><strong>Current Stack:</strong> ${escapeHtml(formData.currentStack || 'Not provided')}</p>
                <p><strong>Integrations:</strong> ${escapeHtml(formData.integrationsNeeded || 'Not provided')}</p>
                <p><strong>Authentication:</strong> ${escapeHtml(formData.authRequirements || 'Not provided')}</p>
                <p><strong>Security:</strong> ${escapeHtml(formData.securityRequirements || 'Not provided')}</p>
              </div>
              ${formData.technicalRequirements ? `
                <div style="margin-top: 15px;">
                  <p><strong>Additional Technical Requirements:</strong></p>
                  <div style="background: white; padding: 10px; border-radius: 4px; margin-top: 5px; white-space: pre-wrap; font-family: monospace; font-size: 12px;">${escapeHtml(formData.technicalRequirements)}</div>
                </div>
              ` : ''}
            </div>
            ` : ''}
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px 0;">🎨 Assets & Timeline</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <p><strong>Content Readiness:</strong> ${escapeHtml(formData.contentReadiness || 'Not specified')}</p>
                <p><strong>Brand Readiness:</strong> ${escapeHtml(formData.brandReadiness || 'Not specified')}</p>
                <p><strong>Brand Colors:</strong> ${escapeHtml(formData.brandColors || 'Not provided')}</p>
                <p><strong>Timeline:</strong> ${escapeHtml(formData.timeline || 'Not provided')}</p>
              </div>
              
              ${formData.constraintsAndRisks ? `
                <div style="margin-top: 15px;">
                  <p><strong>Constraints & Risks:</strong></p>
                  <div style="background: white; padding: 10px; border-radius: 4px; margin-top: 5px; white-space: pre-wrap; font-family: monospace; font-size: 12px;">${escapeHtml(formData.constraintsAndRisks)}</div>
                </div>
              ` : ''}
            </div>
            
            ${buildPrompt ? `
            <div style="background: #1a1a1a; color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #10b981; margin: 0 0 15px 0; font-size: 18px;">🤖 AUTO-GENERATED BUILD PROMPT</h2>
              <div style="background: #2a2a2a; padding: 15px; border-radius: 4px; border-left: 4px solid #10b981; white-space: pre-wrap; font-family: monospace; font-size: 11px; line-height: 1.4; max-height: 400px; overflow-y: auto;">${escapeHtml(buildPrompt)}</div>
              <p style="margin: 15px 0 0 0; font-size: 12px; color: #999;">⚡ This prompt was automatically generated by the SaaSy Cookies Plan Recommendation System</p>
            </div>
            ` : ''}
            
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #92400e; margin: 0 0 10px 0;">🎯 Next Steps</h3>
              <ol style="margin: 0; padding-left: 20px; color: #92400e;">
                <li>Review the complexity assessment and plan recommendation</li>
                <li>Confirm scope limits align with client expectations</li>
                <li>Send plan confirmation + payment link</li>
                <li>Begin 30-Day Build Phase upon payment confirmation</li>
              </ol>
            </div>
            
            <div style="text-align: center; padding: 20px; border-top: 1px solid #eee;">
              <p style="margin: 0; font-size: 12px; color: #666;">
                This project brief was submitted via the SaaSy Cookies automated system.<br>
                ${planRecommendation ? `Complexity Score: ${planRecommendation.score}/10 | Recommended: ${planRecommendation.planName}` : 'Custom AI/SaaS Project'}
              </p>
            </div>
          </div>
        `,
      };
    } else if (type === 'user_confirmation') {
      // Send confirmation email to user
      let planRecommendation = null;
      try {
        planRecommendation = formData.planRecommendation ? JSON.parse(formData.planRecommendation) : null;
      } catch (error) {
        logger.warn('Failed to parse planRecommendation:', error);
        planRecommendation = null;
      }
      
      emailConfig = {
        from: 'onboarding@resend.dev',
        to: formData.email,
        subject: `Your SaaSy Cookies Project Brief - ${planRecommendation?.planName || 'Custom Build'} Plan`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">✅ Project Brief Received!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Thank you for choosing SaaSy Cookies</p>
            </div>
            
            <div style="background: rgba(16,185,129,0.10); border: 2px solid rgba(16,185,129,0.30); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #10b981; margin: 0 0 15px 0; font-size: 20px;">📊 Your Recommended Plan</h2>
              <div style="text-align: center; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #10b981;">${escapeHtml(planRecommendation?.planName || 'Custom Build')}</p>
                <p style="margin: 5px 0; font-size: 18px;">${escapeHtml(planRecommendation?.price || 'Custom pricing')}</p>
                <p style="margin: 5px 0; font-size: 16px; color: #666;">First month: <strong style="color: #10b981;">$10</strong> (special offer!)</p>
              </div>
            </div>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px 0;">🎯 What Happens Next?</h2>
              <ol style="margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 10px;"><strong>Complete Payment:</strong> Click the button below to secure your $10 first month</li>
                <li style="margin-bottom: 10px;"><strong>Project Kickoff:</strong> We'll review your brief and start development</li>
                <li style="margin-bottom: 10px;"><strong>30-Day Build Phase:</strong> Your custom SaaS solution will be built</li>
                <li style="margin-bottom: 10px;"><strong>Launch & Support:</strong> Go live with ongoing support</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="margin: 0; font-size: 14px; color: #666;">Complete your payment in the browser tab you just opened</p>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; color: #856404;"><strong>📞 Questions?</strong> Reply to this email or contact us at <a href="mailto:onboarding@resend.dev">onboarding@resend.dev</a></p>
            </div>
            
            <p style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
              This email was sent from SaaSy Cookies automated system.<br>
              <a href="#" style="color: #666;">Unsubscribe</a> | <a href="#" style="color: #666;">Privacy Policy</a>
            </p>
          </div>
        `,
      };
    } else if (type === 'welcome_after_payment') {
      // Send welcome email after successful payment
      let planRecommendation = null;
      try {
        planRecommendation = formData.planRecommendation ? JSON.parse(formData.planRecommendation) : null;
      } catch (error) {
        logger.warn('Failed to parse planRecommendation:', error);
        planRecommendation = null;
      }
      
      emailConfig = {
        from: 'onboarding@resend.dev',
        to: formData.email,
        subject: `🎉 Welcome to SaaSy Cookies - Your Project is Starting!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Welcome to SaaSy Cookies!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your project journey begins now</p>
            </div>
            
            <div style="background: rgba(16,185,129,0.10); border: 2px solid rgba(16,185,129,0.30); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #10b981; margin: 0 0 15px 0; font-size: 20px;">✅ Payment Confirmed</h2>
              <div style="text-align: center; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 18px;">Your <strong>${escapeHtml(planRecommendation?.planName || 'Custom')}</strong> plan is active</p>
                <p style="margin: 5px 0; font-size: 16px;">First month: <strong style="color: #10b981;">$10</strong> ✨</p>
              </div>
            </div>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px 0;">🚀 What's Next?</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="background: white; padding: 15px; border-radius: 8px;">
                  <h3 style="color: #06b6d4; margin: 0 0 10px 0;">📋 Project Review</h3>
                  <p style="margin: 0; font-size: 14px;">Our team is reviewing your project brief and will contact you within 24 hours.</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px;">
                  <h3 style="color: #06b6d4; margin: 0 0 10px 0;">🛠️ Development</h3>
                  <p style="margin: 0; font-size: 14px;">Your 30-day build phase will begin once we finalize the project scope.</p>
                </div>
              </div>
            </div>
            
            <div style="background: #e3f2fd; border: 1px solid #bbdefb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1976d2; margin: 0 0 10px 0;">📞 Need Help?</h3>
              <p style="margin: 0; color: #1976d2;">
                <strong>Primary Contact:</strong> <a href="mailto:onboarding@resend.dev">onboarding@resend.dev</a><br>
                <strong>Urgent Issues:</strong> Reply to this email for priority support
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; display: inline-block;">
                <h3 style="color: #333; margin: 0 0 10px 0;">Your Plan Details</h3>
                <p style="margin: 5px 0;"><strong>Plan:</strong> ${escapeHtml(planRecommendation?.planName || 'Custom')}</p>
                <p style="margin: 5px 0;"><strong>Business:</strong> ${escapeHtml(formData.businessName)}</p>
                <p style="margin: 5px 0;"><strong>Contact:</strong> ${escapeHtml(formData.email)}</p>
              </div>
            </div>
            
            <p style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
              Welcome to the SaaSy Cookies family!<br>
              <a href="#" style="color: #666;">Unsubscribe</a> | <a href="#" style="color: #666;">Privacy Policy</a>
            </p>
          </div>
        `,
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email type' }),
      };
    }

    const { data, error } = await resend.emails.send(emailConfig);

    if (error) {
      logger.error('Resend API error:', error.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: error.message,
          details: error.name,
          statusCode: error.statusCode
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };

  } catch (error) {
    logger.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
