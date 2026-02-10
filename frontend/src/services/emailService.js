// Email service - uses email client fallback
export const sendContactEmail = async (formData) => {
  // Always use email client fallback for simplicity and reliability
  openEmailClient(formData);
  return { message: 'Email client opened' };
};

// Open email client
export const openEmailClient = (formData) => {
  const subject = encodeURIComponent(formData.subject || 'Contact from SaaSy Cookies website');
  const body = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  );
  
  window.open(`mailto:saasycookies@gmail.com?subject=${subject}&body=${body}`);
};
