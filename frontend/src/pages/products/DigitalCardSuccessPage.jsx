import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import { fetchDigitalCardStatus } from "../../utils/digitalCardService";

export default function DigitalCardSuccessPage() {
  const [searchParams] = useSearchParams();
  const cardId = searchParams.get("card");
  const [status, setStatus] = useState("pending");
  const [cardMeta, setCardMeta] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cardId) {
      setError("Missing card reference.");
      setStatus("error");
      return;
    }

    let attempts = 0;
    let timer;

    async function poll() {
      attempts += 1;

      try {
        const result = await fetchDigitalCardStatus(cardId);
        const card = result.card;

        if (card.status === "trialing" || card.status === "active") {
          setCardMeta(card);
          setStatus("ready");
          return;
        }

        if (attempts < 15) {
          timer = setTimeout(poll, 2000);
        } else {
          setStatus("timeout");
        }
      } catch (pollError) {
        setError(pollError.message || "Unable to confirm activation.");
        setStatus("error");
      }
    }

    poll();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [cardId]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="max-w-lg w-full rounded-2xl border border-white/10 bg-zinc-900/60 p-8 text-center">
        {status === "ready" ? (
          <>
            <CheckCircle2 className="w-9 h-9 mx-auto text-emerald-300 mb-4" strokeWidth={1.7} />
            <h1 className="font-heading text-3xl text-white mb-3">Card is live</h1>
            <p className="text-zinc-300 mb-6">Your trial has started and your public card is now active.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to={`/card/${cardMeta.slug}`} className="px-5 py-2.5 rounded-md bg-violet-500 text-black font-semibold hover:bg-violet-400">
                View public card
              </Link>
              <Link to={`/edit/${cardMeta.edit_token}`} className="px-5 py-2.5 rounded-md bg-zinc-800 text-white font-medium hover:bg-zinc-700">
                Edit card
              </Link>
            </div>
          </>
        ) : (
          <>
            <Loader2 className="w-9 h-9 mx-auto text-violet-300 mb-4 animate-spin" strokeWidth={1.7} />
            <h1 className="font-heading text-3xl text-white mb-3">Activating your card...</h1>
            <p className="text-zinc-300">
              {status === "timeout"
                ? "Activation is taking longer than expected. Refresh in a moment."
                : error || "Waiting for Stripe webhook confirmation."}
            </p>
            <Link to="/tools/digital-card" className="inline-block mt-6 text-violet-300 hover:text-violet-200">
              Back to setup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
