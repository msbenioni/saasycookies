import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle, MessageSquare } from "lucide-react";
import { sendContactEmail } from "../utils/emailService";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await sendContactEmail(formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setError("Failed to send message. Please try again or email support@saasycookies.com directly.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <p className="text-zinc-400 text-sm">support@saasycookies.com</p>
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
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Message sent!</h3>
              <p className="text-zinc-400">We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form
              data-testid="contact-form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  data-testid="contact-name-input"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 rounded-md py-2.5 px-4 text-white text-sm placeholder:text-zinc-600 transition-all outline-none"
                  placeholder="Name"
                  required
                  disabled={isSubmitting}
                />
                <input
                  data-testid="contact-email-input"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 rounded-md py-2.5 px-4 text-white text-sm placeholder:text-zinc-600 transition-all outline-none"
                  placeholder="Email"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 rounded-md py-2.5 px-4 text-white text-sm placeholder:text-zinc-600 transition-all outline-none"
                placeholder="Subject (optional)"
                disabled={isSubmitting}
              />
              
              <textarea
                data-testid="contact-message-input"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 rounded-md py-2.5 px-4 text-white text-sm placeholder:text-zinc-600 transition-all outline-none resize-none h-32"
                placeholder="Your message..."
                required
                disabled={isSubmitting}
              />
              
              <button
                data-testid="contact-submit-button"
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black font-semibold px-8 py-2.5 rounded-md transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
