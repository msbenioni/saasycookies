const { Resend } = require('resend');

// Debug: Check if API key is available
const apiKey = process.env.RESEND_API_KEY;
console.log('API Key available:', !!apiKey);
console.log('API Key length:', apiKey ? apiKey.length : 0);

if (!apiKey) {
  console.error('RESEND_API_KEY not found in environment variables');
}

const resend = new Resend(apiKey);

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
      emailConfig = {
        from: 'noreply@saasycookies.com', // Use verified domain
        to: 'saasycookies@gmail.com', // Temporary - change to support@saasycookies.com after domain verification
        subject: `AI & SaaS Project Brief: ${formData.businessName || 'New request'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New AI & SaaS Project Brief</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <h3 style="color: #333;">Contact Information</h3>
              <p><strong>Name:</strong> ${formData.fullName}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
              <p><strong>Business:</strong> ${formData.businessName}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Business Overview</h3>
              <p><strong>Current URL:</strong> ${formData.currentUrl || 'Not provided'}</p>
              <p><strong>Industry:</strong> ${formData.industry || 'Not provided'}</p>
              <p><strong>Primary Goal:</strong> ${formData.primaryGoal || 'Not provided'}</p>
              <p><strong>Primary Goal (Other):</strong> ${formData.primaryGoalOther || 'Not provided'}</p>
              <p><strong>Business Description:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${formData.businessDescription}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Project Scope</h3>
              <p><strong>Vision:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${formData.projectVision || 'Not provided'}</p>
              <p><strong>Project Types:</strong> ${Array.isArray(formData.projectType) ? formData.projectType.join(', ') : (formData.projectType || 'Not specified')}</p>
              <p><strong>Project Type (Other):</strong> ${formData.projectTypeOther || 'Not provided'}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Users & Outcomes</h3>
              <p><strong>Primary Users:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${formData.primaryUsers || 'Not provided'}</p>
              <p><strong>Desired User Action:</strong> ${formData.desiredUserAction || 'Not provided'}</p>
              <p><strong>Primary Success Metric:</strong> ${formData.successMetric || 'Not provided'}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Capabilities Needed</h3>
              <p><strong>Required Capabilities:</strong> ${Array.isArray(formData.requiredCapabilities) ? formData.requiredCapabilities.join(', ') : (formData.requiredCapabilities || 'Not specified')}</p>
              <p><strong>Capabilities Other:</strong> ${formData.requiredCapabilitiesOther || 'Not provided'}</p>
              <p><strong>Ongoing Support:</strong> ${formData.needsOngoingSupport || 'Not specified'}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Product & Interface Direction</h3>
              <p><strong>Existing Product / Codebase:</strong> ${formData.hasExistingProduct || 'Not specified'}</p>
              <p><strong>Interface Direction:</strong> ${Array.isArray(formData.interfaceDirection) ? formData.interfaceDirection.join(', ') : (formData.interfaceDirection || 'Not specified')}</p>
              <p><strong>Interface Direction (Other):</strong> ${formData.interfaceDirectionOther || 'Not provided'}</p>
              <p><strong>Reference Products:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${formData.productReferences || 'Not provided'}</p>

              <h3 style="color: #333; margin-top: 20px;">Data & Readiness</h3>
              <p><strong>Data Sources Ready:</strong> ${formData.dataReadiness || 'Not specified'}</p>
              <p><strong>Internal Owner Assigned:</strong> ${formData.hasInternalOwner || 'Not specified'}</p>
              <p><strong>Constraints & Risks:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${formData.constraintsAndRisks || 'Not provided'}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Technical</h3>
              <p><strong>Current Stack / Platform:</strong> ${formData.currentStack || 'Not provided'}</p>
              <p><strong>Integrations:</strong> ${formData.integrationsNeeded || 'Not provided'}</p>
              <p><strong>Authentication Requirements:</strong> ${formData.authRequirements || 'Not provided'}</p>
              <p><strong>Security / Compliance Requirements:</strong> ${formData.securityRequirements || 'Not provided'}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Budget & Timeline</h3>
              <p><strong>Desired Launch Date:</strong> ${formData.desiredLaunchDate || 'Not provided'}</p>
              <p><strong>Timeline:</strong> ${formData.timeline || 'Not provided'}</p>
              <p><strong>Budget Range:</strong> ${formData.budgetRange || 'Not specified'}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Final Notes</h3>
              <p><strong>Anything Else:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${formData.anythingElse || 'Not provided'}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              This project brief was submitted via the SaaSy Cookies website.
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
      console.error('Full Resend error:', JSON.stringify(error, null, 2));
      console.error('API Key used:', apiKey.substring(0, 10) + '...');
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
