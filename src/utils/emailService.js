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

export const sendProjectBriefEmail = async (formData) => {
  try {
    // In development, simulate success without actually sending email
    if (isDevelopment) {
      console.log('Development mode: Simulating project brief email send', formData);
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
        type: 'project_brief',
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

export const sendUserConfirmationEmail = async (formData) => {
  try {
    // In development, simulate success without actually sending email
    // TEMPORARILY DISABLED FOR TESTING - Change back to: if (isDevelopment) {
    if (false) {
      console.log('Development mode: Simulating user confirmation email send', formData);
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
        type: 'user_confirmation',
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

export const sendWelcomeEmail = async (formData) => {
  try {
    // In development, simulate success without actually sending email
    // TEMPORARILY DISABLED FOR TESTING - Change back to: if (isDevelopment) {
    if (false) {
      console.log('Development mode: Simulating welcome email send', formData);
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
        type: 'welcome_after_payment',
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
