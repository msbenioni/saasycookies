import { Mail, MapPin, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <div className="max-w-2xl">
        <h1
          data-testid="contact-page-title"
          className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6"
        >
          Get in touch
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-12">
          Have a question, partnership idea, or just want to say hello? We&apos;d
          love to hear from you.
        </p>

        <div className="space-y-8 mb-16">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-brand-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-1">Email</h3>
              <p className="text-zinc-400 text-sm">hello@saasycookies.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-senseai/10 border border-senseai/20 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-senseai" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-1">Location</h3>
              <p className="text-zinc-400 text-sm">New Zealand</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-pacific/10 border border-pacific/20 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-pacific" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-1">Social</h3>
              <p className="text-zinc-400 text-sm">Follow us for product updates and behind-the-scenes content.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-8">
          <h2 className="font-heading text-xl font-semibold mb-6">Send a message</h2>
          <form
            data-testid="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! (Demo)");
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                data-testid="contact-name-input"
                className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 rounded-md py-2.5 px-4 text-white text-sm placeholder:text-zinc-600 transition-all outline-none"
                placeholder="Name"
                required
              />
              <input
                data-testid="contact-email-input"
                type="email"
                className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 rounded-md py-2.5 px-4 text-white text-sm placeholder:text-zinc-600 transition-all outline-none"
                placeholder="Email"
                required
              />
            </div>
            <textarea
              data-testid="contact-message-input"
              className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 rounded-md py-2.5 px-4 text-white text-sm placeholder:text-zinc-600 transition-all outline-none resize-none h-32"
              placeholder="Your message..."
              required
            />
            <button
              data-testid="contact-submit-button"
              type="submit"
              className="bg-white text-black font-semibold px-8 py-2.5 rounded-md transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] text-sm"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
