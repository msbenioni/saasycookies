const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { cardId } = JSON.parse(event.body);

    if (!cardId) {
      return { statusCode: 400, body: JSON.stringify({ error: "Card ID required" }) };
    }

    // Fetch card details
    const { data: card, error } = await supabase
      .from("digital_cards")
      .select("slug, edit_token, card_json")
      .eq("id", cardId)
      .single();

    if (error || !card) {
      return { statusCode: 404, body: JSON.stringify({ error: "Card not found" }) };
    }

    const cardJson = card.card_json || {};
    const email = cardJson.email;

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: "No email address on card" }) };
    }

    const publicUrl = `${process.env.PUBLIC_SITE_URL}/card/${card.slug}`;
    const editUrl = `${process.env.PUBLIC_SITE_URL}/edit/${card.edit_token}`;

    // Send email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "SaaSy Cards <support@saasycookies.com>",
      to: [email],
      subject: "Your Digital Card Edit Link",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #7c3aed; margin-bottom: 10px;">Your Digital Card is Ready!</h1>
            <p style="color: #6b7280;">Here are the important links for your digital business card:</p>
          </div>
          
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 15px;">📇 Your Public Card</h3>
            <p style="color: #6b7280; margin-bottom: 10px;">Share this link with anyone to view your digital card:</p>
            <a href="${publicUrl}" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">View Public Card</a>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 10px; word-break: break-all;">${publicUrl}</p>
          </div>
          
          <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 15px;">✏️ Edit Your Card</h3>
            <p style="color: #6b7280; margin-bottom: 10px;">Use this private link to update your card information:</p>
            <a href="${editUrl}" style="display: inline-block; background: #6b7280; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Edit Your Card</a>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 10px; word-break: break-all;">${editUrl}</p>
          </div>
          
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px;">
            <p style="color: #92400e; margin: 0;"><strong>💡 Save this email!</strong> The edit link is private and should be kept safe. You can always come back to this email to edit your card.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 14px;">Questions? Reply to this email or visit <a href="https://saasycookies.com" style="color: #7c3aed;">saasycookies.com</a></p>
          </div>
        </div>
      `,
    });

    if (emailError) {
      console.error("Email error:", emailError);
      return { statusCode: 500, body: JSON.stringify({ error: "Failed to send email" }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: "Edit link sent successfully",
        email: email
      }),
    };
  } catch (error) {
    console.error("Function error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
