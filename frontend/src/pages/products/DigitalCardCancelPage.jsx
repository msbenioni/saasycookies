import { Link } from "react-router-dom";
import { Ban } from "lucide-react";

export default function DigitalCardCancelPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="max-w-lg w-full rounded-2xl border border-white/10 bg-zinc-900/60 p-8 text-center">
        <Ban className="w-8 h-8 mx-auto text-zinc-300 mb-4" strokeWidth={1.7} />
        <h1 className="font-heading text-3xl text-white mb-3">Checkout canceled</h1>
        <p className="text-zinc-300 mb-6">
          Your card is saved as a draft. Start checkout again whenever you're ready.
        </p>
        <Link to="/tools/digital-card" className="inline-flex px-5 py-2.5 rounded-md bg-violet-500 text-black font-semibold hover:bg-violet-400">
          Return to digital card setup
        </Link>
      </div>
    </div>
  );
}
