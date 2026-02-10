// Email service using Netlify function + Resend
export const sendContactEmail = async (formData) => {
  try {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Fallback: Open email client
export const openEmailClient = (formData) => {
  const subject = encodeURIComponent(formData.subject || 'Contact from SaaSy Cookies website');
  const body = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  );
  
  window.open(`mailto:saasycookies@gmail.com?subject=${subject}&body=${body}`);
};
