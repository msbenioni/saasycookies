import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-emerald-500 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-white mb-4">
            Page not found
          </h2>
          <p className="text-zinc-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-3 rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600 font-medium px-4 py-3 rounded-lg transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Go Back
          </button>
        </div>
        
        <div className="mt-8">
          <p className="text-zinc-500 text-sm mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/pricing" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              → Pricing Plans
            </Link>
            <Link to="/services/ai-saas" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              → AI & SaaS Services
            </Link>
            <Link to="/contact" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              → Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
