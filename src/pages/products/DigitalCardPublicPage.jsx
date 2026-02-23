import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { Copy, Share2, Download, RefreshCcw, AlertTriangle } from "lucide-react";
import { buildVcf, createDigitalCardCheckout, fetchDigitalCardBySlug } from "../../utils/digitalCardService";

function normalizeUrl(value = "") {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
}

export default function DigitalCardPublicPage() {
  const { slug } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const qrContainerRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const result = await fetchDigitalCardBySlug(slug);
        if (mounted) setCard(result.card);
      } catch (loadError) {
        if (mounted) setError(loadError.message || "Unable to load card.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const cardJson = card?.card_json || {};
  const shareUrl = useMemo(() => window.location.href, []);
  const active = card?.status === "trialing" || card?.status === "active";

  const onSaveContact = () => {
    const vcf = buildVcf(cardJson);
    const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${(cardJson.fullName || "digital-card").replace(/\s+/g, "-").toLowerCase()}.vcf`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: cardJson.fullName || "Digital Card", url: shareUrl });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // User canceled native share sheet.
    }
  };

  const onDownloadQr = () => {
    const canvas = qrContainerRef.current?.querySelector("canvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${slug}-qr.png`;
    link.click();
  };

  const onResume = async () => {
    setBusy(true);
    setError("");

    try {
      const result = await createDigitalCardCheckout({ cardId: card.id });
      window.location.href = result.checkoutUrl;
    } catch (resumeError) {
      setError(resumeError.message || "Unable to resume card.");
      setBusy(false);
    }
  };

  if (loading) {
    return <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-zinc-300">Loading card...</div>;
  }

  if (error || !card) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4 text-center px-6">
        <AlertTriangle className="w-8 h-8 text-red-300" strokeWidth={1.8} />
        <p className="text-zinc-200">{error || "Card not found."}</p>
        <Link to="/" className="text-violet-300 hover:text-violet-200">Return home</Link>
      </div>
    );
  }

  if (!active) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
        <div className="max-w-lg w-full rounded-2xl border border-red-500/20 bg-zinc-900/60 p-8 text-center">
          <h1 className="font-heading text-3xl text-white mb-3">This card is inactive</h1>
          <p className="text-zinc-300 mb-6">
            Billing is paused for this digital card. Resume for $3.99/month to make the public page live again.
          </p>
          <button
            onClick={onResume}
            disabled={busy}
            className="inline-flex items-center gap-2 bg-violet-500 text-black font-semibold px-6 py-2.5 rounded-md hover:bg-violet-400 disabled:opacity-70"
          >
            <RefreshCcw className={`w-4 h-4 ${busy ? "animate-spin" : ""}`} strokeWidth={1.8} />
            Resume subscription
          </button>
          {error ? <p className="text-red-300 text-sm mt-4">{error}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-6 bg-void text-white">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-zinc-900/60 p-8">
          <div className="w-12 h-1 rounded-full mb-6" style={{ backgroundColor: cardJson.themeColor || "#7c3aed" }} />
          {cardJson.avatarUrl ? (
            <img
              src={cardJson.avatarUrl}
              alt={`${cardJson.fullName} avatar`}
              className="w-16 h-16 rounded-full object-cover border border-white/15 mb-4"
            />
          ) : null}
          <h1 className="font-heading text-4xl font-bold mb-1">{cardJson.fullName}</h1>
          <p className="text-zinc-300 mb-2">{cardJson.title}</p>
          <p className="text-zinc-300 mb-5">{cardJson.businessName}</p>
          {cardJson.bio ? <p className="text-zinc-200 leading-relaxed mb-6">{cardJson.bio}</p> : null}

          <div className="space-y-2 text-sm text-zinc-300">
            {cardJson.email ? <p>Email: {cardJson.email}</p> : null}
            {cardJson.phone ? <p>Phone: {cardJson.phone}</p> : null}
            {cardJson.website ? (
              <p>
                Website: <a href={normalizeUrl(cardJson.website)} className="text-violet-300 hover:text-violet-200">{cardJson.website}</a>
              </p>
            ) : null}
            {cardJson.linkedin ? (
              <p>
                LinkedIn: <a href={normalizeUrl(cardJson.linkedin)} className="text-violet-300 hover:text-violet-200">{cardJson.linkedin}</a>
              </p>
            ) : null}
            {cardJson.instagram ? (
              <p>
                Instagram: <a href={normalizeUrl(cardJson.instagram)} className="text-violet-300 hover:text-violet-200">{cardJson.instagram}</a>
              </p>
            ) : null}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={onSaveContact}
              className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm font-semibold"
            >
              <Download className="w-4 h-4" strokeWidth={1.8} /> Save contact
            </button>
            <button
              onClick={onShare}
              className="inline-flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-700"
            >
              <Share2 className="w-4 h-4" strokeWidth={1.8} /> Share
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="inline-flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-700"
            >
              <Copy className="w-4 h-4" strokeWidth={1.8} /> Copy link
            </button>
            <button
              onClick={onDownloadQr}
              className="inline-flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-700"
            >
              <Download className="w-4 h-4" strokeWidth={1.8} /> Download QR
            </button>
          </div>
        </div>

        <div ref={qrContainerRef} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 flex flex-col items-center justify-center">
          <QRCodeCanvas value={shareUrl} size={180} bgColor="#ffffff" fgColor="#000000" includeMargin />
          <p className="text-zinc-400 text-xs mt-4 text-center">Scan to open this card</p>
        </div>
      </div>
    </div>
  );
}
