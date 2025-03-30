import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00FFD1] to-[#FF3CAC] bg-clip-text text-transparent leading-relaxed pb-1">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 mb-6">Last Updated: 30 March 2025</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">1. Introduction</h2>
          <p className="mb-4">At SaaSy Cookies, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (collectively, the "Services").</p>
          <p>We adhere to the New Zealand Privacy Act 2020 and are committed to ensuring the privacy and security of your personal information.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">2. Information We Collect</h2>
          <p className="mb-4">We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Register for an account</li>
            <li className="mb-2">Use our Services</li>
            <li className="mb-2">Contact our customer support</li>
            <li className="mb-2">Subscribe to our newsletter</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p className="mb-4">The personal information we may collect includes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Name</li>
            <li className="mb-2">Email address</li>
            <li className="mb-2">Phone number</li>
            <li className="mb-2">Business name and address</li>
            <li className="mb-2">GST number</li>
            <li className="mb-2">Bank account details</li>
            <li>Client information (when you create invoices)</li>
          </ul>
          <p>We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">3. How We Use Your Information</h2>
          <p className="mb-4">We may use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Provide, maintain, and improve our Services</li>
            <li className="mb-2">Process transactions and send related information</li>
            <li className="mb-2">Send administrative information, such as updates, security alerts, and support messages</li>
            <li className="mb-2">Respond to your comments, questions, and requests</li>
            <li className="mb-2">Communicate with you about products, services, offers, and events</li>
            <li className="mb-2">Monitor and analyze trends, usage, and activities in connection with our Services</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">4. Disclosure of Your Information</h2>
          <p className="mb-4">We may share your personal information in the following situations:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2"><strong>Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf.</li>
            <li className="mb-2"><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li className="mb-2"><strong>Legal Obligations:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
            <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">5. Data Storage and Security</h2>
          <p className="mb-4">We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
          <p className="mb-4">Your data may be stored and processed in New Zealand or any other country in which SaaSy Cookies, its affiliates, or service providers maintain facilities. If we transfer your personal information to countries outside New Zealand, we will ensure that an adequate level of protection is in place.</p>
          <p className="mb-4">We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. For analytics data, we have configured a 14-month data retention period, after which the data is automatically deleted.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">6. Your Privacy Rights</h2>
          <p className="mb-4">Under the New Zealand Privacy Act 2020, you have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Access your personal information</li>
            <li className="mb-2">Correct inaccurate or incomplete personal information</li>
            <li className="mb-2">Request the deletion of your personal information</li>
            <li className="mb-2">Object to the processing of your personal information</li>
            <li>Withdraw your consent at any time</li>
          </ul>
          <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section below.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">7. Cookies and Tracking Technologies</h2>
          <p className="mb-4">We use cookies and similar tracking technologies to track activity on our Services and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.</p>
          <p className="mb-4">You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.</p>
          <p className="mb-4">When you first visit our website, you will be presented with a cookie consent banner that allows you to choose whether to accept or decline non-essential cookies. You can change your preferences at any time.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">8. Google Analytics</h2>
          <p className="mb-4">We use Google Analytics 4 (GA4), a web analytics service provided by Google, Inc. ("Google"), to help us understand how users engage with our website. Google Analytics uses cookies to collect information about your use of our website, including your IP address.</p>
          <p className="mb-4">We have implemented the following privacy measures for Google Analytics:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2"><strong>IP Anonymization:</strong> We have enabled IP anonymization, which means that your IP address will be truncated within member states of the European Union or other parties to the Agreement on the European Economic Area. Only in exceptional cases will the full IP address be sent to a Google server and truncated there.</li>
            <li className="mb-2"><strong>Data Retention:</strong> We have set a 14-month data retention period in Google Analytics, after which your data is automatically deleted.</li>
            <li className="mb-2"><strong>Consent-Based Tracking:</strong> We only activate Google Analytics tracking after obtaining your explicit consent through our cookie consent banner.</li>
            <li className="mb-2"><strong>Data Processing Agreement:</strong> We have entered into a data processing agreement with Google to ensure that they process your data in accordance with applicable privacy laws.</li>
            <li><strong>Transparency:</strong> We provide a public analytics dashboard that shows aggregated, anonymized statistics about our website visitors.</li>
          </ul>
          <p className="mb-4">Google will use this information on our behalf for the purpose of evaluating your use of the website, compiling reports on website activity, and providing other services relating to website activity and internet usage.</p>
          <p>You can prevent Google Analytics from recognizing you on return visits to this site by disabling cookies in your browser or by using the Google Analytics Opt-out Browser Add-on available at <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#00FFD1] hover:underline" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">9. Children's Privacy</h2>
          <p>Our Services are not intended for use by children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">10. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">11. Contact Us</h2>
          <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mb-2">SaaSy Cookies Ltd</p>
          <p className="mb-2">Email: privacy@saasycookies.co.nz</p>
          <p>Address: Auckland, New Zealand</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
