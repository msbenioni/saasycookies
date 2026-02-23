// Automated Plan Recommendation Logic for SaaSy Cookies
// Based on complexity scoring system

export const calculateComplexityScore = (formData) => {
  let score = 0;
  const flags = {
    requiresAuth: false,
    requiresPayments: false,
    requiresMemberPortal: false,
    requiresAutomation: false,
    leadVolume: 'low',
    funnelComplexity: 'simple',
    revenueStage: 'early',
    offerComplexity: 'simple'
  };

  // Revenue Stage Scoring (0-2 points)
  const revenueStage = formData.annualRevenueRange || 'pre-revenue';
  flags.revenueStage = revenueStage;
  switch (revenueStage) {
    case 'pre-revenue':
      score += 0;
      break;
    case 'under-50k':
      score += 0;
      break;
    case '50k-150k':
      score += 1;
      break;
    case '150k-500k':
      score += 2;
      break;
    case '500k-plus':
      score += 2;
      break;
  }

  // Offer Complexity Scoring (0-2 points)
  const offerStructure = formData.offerStructure || 'single-service';
  flags.offerComplexity = offerStructure;
  switch (offerStructure) {
    case 'single-service':
      score += 0;
      break;
    case 'multiple-services':
      score += 1;
      break;
    case 'course-digital-product':
      score += 1;
      break;
    case 'membership-community':
      score += 2;
      flags.requiresMemberPortal = true;
      break;
    case 'high-ticket-funnel':
      score += 2;
      flags.requiresAutomation = true;
      break;
    case 'unsure':
      score += 1;
      break;
  }

  // Lead Volume Scoring (0-2 points)
  const monthlyLeads = formData.monthlyLeadsExpected || 'under-20';
  flags.leadVolume = monthlyLeads;
  switch (monthlyLeads) {
    case 'under-20':
      score += 0;
      break;
    case '20-100':
      score += 1;
      break;
    case '100-500':
      score += 2;
      flags.requiresAutomation = true;
      break;
    case '500-plus':
      score += 2;
      flags.requiresAutomation = true;
      break;
  }

  // Content Frequency Scoring (0-1 point)
  const contentFrequency = formData.contentFrequency || 'rare';
  switch (contentFrequency) {
    case 'rare-updates':
      score += 0;
      break;
    case 'monthly-updates':
      score += 0;
      break;
    case 'weekly-updates':
      score += 1;
      break;
    case 'ongoing-marketing':
      score += 1;
      flags.requiresAutomation = true;
      break;
  }

  // Design Complexity Scoring (0-1 point)
  const designVibe = formData.designVibe || '';
  const brandColors = formData.brandColors || '';
  const inspirationWebsites = formData.inspirationWebsites || '';
  
  // Add complexity if they have specific design requirements
  if (designVibe.length > 100 || brandColors || inspirationWebsites) {
    score += 1;
  }

  // Required Capabilities Scoring (0-3 points)
  const capabilities = Array.isArray(formData.requiredCapabilities) 
    ? formData.requiredCapabilities 
    : [formData.requiredCapabilities].filter(Boolean);

  if (capabilities.includes('Authentication / user roles')) {
    score += 1;
    flags.requiresAuth = true;
  }
  if (capabilities.includes('Payments / subscriptions')) {
    score += 2;
    flags.requiresPayments = true;
  }
  if (capabilities.includes('Customer portal / dashboard')) {
    score += 1;
    flags.requiresMemberPortal = true;
  }
  if (capabilities.includes('Workflow automation')) {
    score += 1;
    flags.requiresAutomation = true;
  }
  if (capabilities.includes('AI assistant or recommendations')) {
    score += 1;
  }
  if (capabilities.includes('3rd-party integrations / APIs')) {
    score += 1;
  }

  // Project Type Scoring (0-2 points)
  const projectTypes = Array.isArray(formData.projectType) 
    ? formData.projectType 
    : [formData.projectType].filter(Boolean);

  if (projectTypes.includes('AI automation workflow')) {
    score += 2;
    flags.requiresAutomation = true;
  }
  if (projectTypes.includes('New SaaS product (MVP)')) {
    score += 2;
  }
  if (projectTypes.includes('Internal operations tool')) {
    score += 1;
  }

  // Funnel Complexity Assessment
  if (flags.requiresPayments || flags.requiresMemberPortal || flags.requiresAutomation) {
    flags.funnelComplexity = 'complex';
  } else if (capabilities.includes('Email capture + basic automation')) {
    flags.funnelComplexity = 'moderate';
  } else {
    flags.funnelComplexity = 'simple';
  }

  return { score, flags };
};

export const recommendPlan = (formData) => {
  const { score, flags } = calculateComplexityScore(formData);
  
  // Plan Recommendation Logic
  if (score <= 3) {
    return {
      recommendedPlan: 'starter',
      planId: 'starter', // Add planId for Stripe service
      planName: 'Starter Presence',
      price: '$79/month',
      score,
      flags,
      reasoning: [
        'Simple system requirements',
        'Lower complexity score',
        'Basic presence needs',
        'No advanced features required'
      ]
    };
  } else if (score <= 7) {
    return {
      recommendedPlan: 'growth',
      planId: 'growth', // Add planId for Stripe service
      planName: 'Growth Engine',
      price: '$149/month',
      score,
      flags,
      reasoning: [
        'Multiple features required',
        'Moderate complexity',
        'Growth-focused features needed',
        'Some automation or advanced capabilities'
      ]
    };
  } else {
    return {
      recommendedPlan: 'authority',
      planId: 'authority', // Add planId for Stripe service
      planName: 'Authority System',
      price: '$249/month',
      score,
      flags,
      reasoning: [
        'High complexity requirements',
        'Advanced features needed',
        'Enterprise-level system',
        'Multiple integrations and automation'
      ]
    };
  }
};

export const generateBuildPrompt = (formData, planRecommendation) => {
  const { flags } = planRecommendation;
  
  return `
# SaaSy Cookies Build Prompt

## Project Summary
- **Client**: ${formData.fullName}
- **Business**: ${formData.businessName}
- **Plan**: ${planRecommendation.planName} (${planRecommendation.price})
- **Revenue Stage**: ${flags.revenueStage}
- **Launch Target**: ${formData.desiredLaunchDate || 'ASAP'}

## Build Complexity Flags
- **Requires Authentication**: ${flags.requiresAuth ? 'Yes' : 'No'}
- **Requires Payments**: ${flags.requiresPayments ? 'Yes' : 'No'}
- **Requires Member Portal**: ${flags.requiresMemberPortal ? 'Yes' : 'No'}
- **Requires Automation**: ${flags.requiresAutomation ? 'Yes' : 'No'}
- **Lead Volume**: ${flags.leadVolume}
- **Funnel Complexity**: ${flags.funnelComplexity}
- **Offer Complexity**: ${flags.offerComplexity}

## Design & Brand Requirements

### Brand Identity
- **Brand Colors**: ${formData.brandColors || 'Not specified'}
- **Preferred Fonts**: ${formData.preferredFonts || 'Not specified'}
- **Design Vibe**: ${formData.designVibe || 'Not specified'}
- **Current Website**: ${formData.currentUrl || 'No current website'}

### Design Inspiration
${formData.inspirationWebsites ? formData.inspirationWebsites.split('\n').map((site, index) => `${index + 1}. ${site}`).join('\n') : 'No inspiration websites provided'}

### Design Implementation Notes
- Implement the specified color palette as CSS variables
- Use the preferred fonts for typography hierarchy
- Follow the design vibe for overall aesthetic direction
- Study inspiration websites for UX patterns and interactions

## Technical Stack Recommendation
${flags.requiresPayments || flags.requiresMemberPortal ? 'Next.js' : 'Vite'} - ${flags.requiresPayments ? 'for payment processing and auth' : 'for faster development'}

## Core Requirements

### Essential Features (Must Implement)
1. **Scroll Restoration**: Maintain scroll position on route changes
2. **CTA Alignment Rule**: All primary CTAs must be right-aligned on desktop
3. **Toast System**: Success/error notifications for all user actions
4. **SEO Baseline**: Meta tags, structured data, sitemap generation
5. **Analytics**: Google Analytics 4 + custom event tracking
6. **ErrorBoundary**: Catch and display errors gracefully
7. **Accessibility**: WCAG 2.1 AA compliance baseline

### Folder Structure
\`\`\`
src/
├── components/
│   ├── common/
│   ├── forms/
│   └── layout/
├── pages/
├── utils/
├── hooks/
├── styles/
└── assets/
\`\`\`

### Design System Requirements
- **Card Alignment**: All cards must use consistent spacing and alignment
- **Color Scheme**: ${formData.brandColors || 'Default emerald/cyan palette'}
- **Typography**: Clean, readable fonts with proper hierarchy
- **Responsive**: Mobile-first approach with desktop enhancements

## Feature Implementation

${flags.requiresAuth ? `
### Authentication System
- Email/password authentication
- User role management
- Session management
- Protected routes
` : ''}

${flags.requiresPayments ? `
### Payment System
- Stripe integration
- Subscription management
- Payment lifecycle handling
- Webhook processing
- Checkout optimization
` : ''}

${flags.requiresMemberPortal ? `
### Member Portal
- User dashboard
- Content access control
- Profile management
- Membership status display
` : ''}

${flags.requiresAutomation ? `
### Automation Features
- Email marketing automation
- Lead capture workflows
- Customer journey mapping
- Behavioral triggers
` : ''}

## Content Management
- **Update Frequency**: ${formData.contentFrequency || 'Monthly'}
- **Content Types**: Blog, resources, case studies
- **Media Management**: Image optimization, CDN setup

## Integration Requirements
${Array.isArray(formData.requiredCapabilities) && formData.requiredCapabilities.includes('3rd-party integrations / APIs') ? `
- API integration setup
- Webhook configuration
- Third-party service connections
- Data synchronization
` : ''}

## Performance Requirements
- **Load Speed**: < 2 seconds initial load
- **Core Web Vitals**: All green metrics
- **Mobile Performance**: Optimized for mobile devices
- **SEO Performance**: 90+ PageSpeed Insights

## Security Requirements
- **HTTPS**: SSL certificate setup
- **Data Protection**: GDPR compliance if applicable
- **Input Validation**: All form inputs sanitized
- **Authentication**: Secure session management

## Launch Checklist
- [ ] Domain configuration
- [ ] SSL certificate setup
- [ ] Analytics installation
- [ ] Email service configuration
- [ ] Payment gateway setup (if applicable)
- [ ] SEO optimization
- [ ] Performance testing
- [ ] Security audit
- [ ] User acceptance testing

## Ongoing Support Requirements
- **Support Level**: ${planRecommendation.planName}
- **Response Time**: ${planRecommendation.recommendedPlan === 'authority' ? '24 hours' : planRecommendation.recommendedPlan === 'growth' ? '48 hours' : '72 hours'}
- **Content Updates**: ${planRecommendation.recommendedPlan === 'starter' ? '2/month' : planRecommendation.recommendedPlan === 'growth' ? '4/month' : '8/month'}
- **System Reviews**: ${planRecommendation.recommendedPlan === 'authority' ? 'Monthly' : 'Quarterly'}

## Success Metrics
- **Primary Metric**: ${formData.successMetric || 'Lead generation'}
- **Secondary Metrics**: Conversion rate, user engagement, retention
- **Analytics Tracking**: Custom events for key user actions

---
*Generated automatically by SaaSy Cookies Plan Recommendation System*
*Complexity Score: ${planRecommendation.score}*
*Recommended Plan: ${planRecommendation.planName}*
`;
};
