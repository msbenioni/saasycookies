const { Resend } = require('resend');

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error('RESEND_API_KEY not found in environment variables');
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
        from: 'noreply@saasycookies.com', // Use verified domain
        to: 'saasycookies@gmail.com', // Temporary - change to support@saasycookies.com after domain verification
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
      const planRecommendation = formData.planRecommendation ? JSON.parse(formData.planRecommendation) : null;
      const buildPrompt = formData.buildPrompt || '';
      
      emailConfig = {
        from: 'noreply@saasycookies.com',
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
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email type' }),
      };
    }

    const { data, error } = await resend.emails.send(emailConfig);

    if (error) {
      console.error('Resend API error:', error.message);
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
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
