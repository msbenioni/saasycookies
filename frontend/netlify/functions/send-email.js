const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

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
        to: 'support@saasycookies.com',
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
    } else if (type === 'quote') {
      emailConfig = {
        from: 'onboarding@resend.dev',
        to: 'support@saasycookies.com',
        subject: `Website Quote Request: ${formData.businessName || 'New request'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Website Quote Request</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <h3 style="color: #333;">Contact Information</h3>
              <p><strong>Name:</strong> ${formData.fullName}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
              <p><strong>Business:</strong> ${formData.businessName}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Business Overview</h3>
              <p><strong>Current Website:</strong> ${formData.websiteUrl || 'Not provided'}</p>
              <p><strong>Industry:</strong> ${formData.industry || 'Not provided'}</p>
              <p><strong>Primary Goal:</strong> ${formData.primaryGoalThisYear || 'Not provided'}</p>
              <p><strong>Business Description:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${formData.businessDescription}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Website Purpose</h3>
              <p><strong>Why New Website:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${formData.whyNewWebsite}</p>
              <p><strong>Website Goals:</strong> ${formData.websiteGoals ? formData.websiteGoals.join(', ') : 'Not specified'}</p>
              <p><strong>Goals Other:</strong> ${formData.websiteGoalsOther || 'Not provided'}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Target Audience</h3>
              <p><strong>Ideal Customer:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${formData.idealCustomer}</p>
              <p><strong>Desired User Action:</strong> ${formData.desiredUserAction || 'Not provided'}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Features & Functionality</h3>
              <p><strong>Required Features:</strong> ${formData.requiredFeatures ? formData.requiredFeatures.join(', ') : 'Not specified'}</p>
              <p><strong>Features Other:</strong> ${formData.requiredFeaturesOther || 'Not provided'}</p>
              <p><strong>Content Updates:</strong> ${formData.needsContentUpdates || 'Not specified'}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Design & Content</h3>
              <p><strong>Brand Guidelines:</strong> ${formData.hasBrandGuidelines || 'Not specified'}</p>
              <p><strong>Design Style:</strong> ${formData.designStyle ? formData.designStyle.join(', ') : 'Not specified'}</p>
              <p><strong>Design Style Other:</strong> ${formData.designStyleOther || 'Not provided'}</p>
              <p><strong>Design Inspiration:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${formData.designInspo || 'Not provided'}</p>
              <p><strong>Content Ready:</strong> ${formData.contentReady || 'Not specified'}</p>
              <p><strong>Copywriting Help:</strong> ${formData.needsCopywriting || 'Not specified'}</p>
              <p><strong>SEO Keywords:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${formData.seoKeywords || 'Not provided'}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Technical</h3>
              <p><strong>Domain Host:</strong> ${formData.domainHost || 'Not provided'}</p>
              <p><strong>Current Platform:</strong> ${formData.currentPlatform || 'Not provided'}</p>
              <p><strong>Email Provider:</strong> ${formData.emailProvider || 'Not provided'}</p>
              <p><strong>Integrations:</strong> ${formData.integrationsNeeded || 'Not provided'}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Budget & Timeline</h3>
              <p><strong>Desired Launch Date:</strong> ${formData.desiredLaunchDate || 'Not provided'}</p>
              <p><strong>Timeline:</strong> ${formData.timeline || 'Not provided'}</p>
              <p><strong>Budget Range:</strong> ${formData.budgetRange || 'Not specified'}</p>
              
              <h3 style="color: #333; margin-top: 20px;">Final Notes</h3>
              <p><strong>Anything Else:</strong></p>
              <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${formData.anythingElse || 'Not provided'}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              This quote request was submitted via the SaaSy Cookies website.
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
      console.error('Resend error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
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
