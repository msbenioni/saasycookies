export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <h1
        data-testid="terms-page-title"
        className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-8"
      >
        Terms of Service
      </h1>
      <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-400 text-sm leading-relaxed">
        <p className="text-lg text-zinc-300">
          Last updated: January 2026
        </p>

        <section>
          <h2 className="font-heading text-xl font-semibold text-white mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using SaaSy Cookies products and services, you agree
            to be bound by these Terms of Service. If you do not agree, please do
            not use our services.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-white mb-3">
            2. Our Products
          </h2>
          <p>
            SaaSy Cookies offers a range of products including SenseAI (AI
            journaling), Pacific Market (community marketplace), and free business
            tools. Each product may have additional terms specific to its use.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-white mb-3">
            3. Free Tools
          </h2>
          <p>
            Our free tools (Invoice Generator, QR Code Generator) are provided
            as-is for personal and commercial use. Data entered into these tools is
            processed locally in your browser and is not stored by us.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-white mb-3">
            4. Intellectual Property
          </h2>
          <p>
            All content, designs, and code on this website are the intellectual
            property of SaaSy Cookies unless otherwise stated. You may not
            reproduce, distribute, or create derivative works without our permission.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-white mb-3">
            5. Limitation of Liability
          </h2>
          <p>
            SaaSy Cookies shall not be liable for any indirect, incidental, or
            consequential damages arising from your use of our products or
            services. Our tools are provided without warranties of any kind.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-white mb-3">
            6. Governing Law
          </h2>
          <p>
            These terms are governed by the laws of New Zealand. Any disputes
            arising from these terms shall be resolved in the courts of New
            Zealand.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-white mb-3">
            7. Contact
          </h2>
          <p>
            For questions about these terms, contact us at hello@saasycookies.com.
          </p>
        </section>
      </div>
    </div>
  );
}
