export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <h1
        data-testid="privacy-page-title"
        className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-8"
      >
        Privacy Policy
      </h1>
      <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-400 text-sm leading-relaxed">
        <p className="text-lg text-zinc-300">
          Last updated: January 2026
        </p>

        <section>
          <h2 className="font-heading text-xl font-semibold text-white mb-3">
            1. Information We Collect
          </h2>
          <p>
            We collect minimal information necessary to provide our services. For
            our free tools (Invoice Generator, QR Code Generator), we do not
            collect or store any data you enter. All processing happens locally in
            your browser.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-white mb-3">
            2. How We Use Information
          </h2>
          <p>
            Any information collected through our products ({" "}
            <span className="text-senseai font-semibold">SenseAI</span>,{" "}
            <span className="text-pacific font-semibold">Pacific Market</span>
            ) is used solely to provide and improve the services you&apos;ve
            signed up for. We do not sell your data to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-white mb-3">
            3. Data Security
          </h2>
          <p>
            We implement industry-standard security measures to protect your
            information. All data transmission is encrypted using TLS/SSL.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-white mb-3">
            4. Cookies
          </h2>
          <p>
            We use essential cookies to ensure our website functions properly. We
            do not use tracking cookies or third-party analytics that compromise
            your privacy.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-white mb-3">
            5. Your Rights
          </h2>
          <p>
            You have the right to access, correct, or delete any personal
            information we hold about you. Contact us at support@saasycookies.com for
            any privacy-related requests.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-white mb-3">
            6. Contact
          </h2>
          <p>
            For privacy concerns or questions, reach out to us at
            support@saasycookies.com. We&apos;re based in New Zealand and comply with
            applicable data protection regulations.
          </p>
        </section>
      </div>
    </div>
  );
}
