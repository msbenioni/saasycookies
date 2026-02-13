const isDevelopment = process.env.NODE_ENV === 'development';

export const sendContactEmail = async (formData) => {
  try {
    // In development, simulate success without actually sending email
    if (isDevelopment) {
      console.log('Development mode: Simulating contact email send', formData);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, data: { id: 'dev-simulated' } };
    }

    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        formData
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};

export const sendQuoteRequestEmail = async (formData) => {
  try {
    // In development, simulate success without actually sending email
    if (isDevelopment) {
      console.log('Development mode: Simulating quote email send', formData);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, data: { id: 'dev-simulated' } };
    }

    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'quote',
        formData
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};
