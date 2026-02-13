import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuoteThankYouPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-void text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(16,185,129,0.22) 0%, transparent 55%), radial-gradient(circle at 70% 40%, rgba(6,182,212,0.14) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.7%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.03%22/%3E%3C/svg%3E')]" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24" style={{ position: 'relative', zIndex: 10 }}>
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-400" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Quote Request Received! 🎉
          </h1>
          
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Thank you for your detailed website quote request. We've received all your information and will review it carefully.
          </p>
          
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-emerald-400 mb-3">What happens next?</h2>
            <ul className="text-zinc-300 space-y-2 text-left">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>We'll review your requirements and business goals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Prepare a detailed scope and timeline estimate</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Send you a comprehensive quote within 2-3 business days</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Schedule a call to discuss any questions</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <p className="text-zinc-400">
              Have questions in the meantime? Feel free to reach out to{' '}
              <a href="mailto:support@saasycookies.com" className="text-emerald-400 hover:text-emerald-300 transition">
                support@saasycookies.com
              </a>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 text-black font-semibold px-6 py-3 hover:bg-emerald-600 transition"
              >
                Back to Home
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 text-white font-semibold px-6 py-3 hover:bg-zinc-800 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
