import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2, Save, Upload, Eye } from "lucide-react";
import { INPUT_CLASS, FOCUS_COLORS, FORM_GRID_CLASS, SECTION_TITLE_CLASS } from "../../constants/formStyles";
import {
  fetchDigitalCardByToken,
  updateDigitalCardByToken,
  requestSignedUpload,
  uploadFileToSignedUrl,
  buildPublicAssetUrl,
} from "../../utils/digitalCardService";

const inputClass = `${INPUT_CLASS} ${FOCUS_COLORS.purple}`;

export default function DigitalCardEditPage() {
  const { token } = useParams();
  const [card, setCard] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const result = await fetchDigitalCardByToken(token);
        if (!mounted) return;

        setCard(result.card);
        setForm({
          fullName: result.card.card_json?.fullName || "",
          businessName: result.card.card_json?.businessName || "",
          email: result.card.card_json?.email || "",
          phone: result.card.card_json?.phone || "",
          website: result.card.card_json?.website || "",
          linkedin: result.card.card_json?.linkedin || "",
          instagram: result.card.card_json?.instagram || "",
          bio: result.card.card_json?.bio || "",
          themeColor: result.card.card_json?.themeColor || "#7c3aed",
          avatarUrl: result.card.card_json?.avatarUrl || "",
        });
      } catch (loadError) {
        if (mounted) setError(loadError.message || "Unable to load editor.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [token]);

  const publicPath = useMemo(() => (card?.slug ? `/card/${card.slug}` : ""), [card?.slug]);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const save = async (event) => {
    event.preventDefault();
    if (!form) return;

    setSaving(true);
    setError("");
    setMessage("");

    try {
      await updateDigitalCardByToken(token, form);
      setMessage("Saved successfully.");
    } catch (saveError) {
      setError(saveError.message || "Failed to save updates.");
    } finally {
      setSaving(false);
    }
  };

  const onUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !card) return;

    setUploading(true);
    setError("");

    try {
      const signed = await requestSignedUpload(card.id, file.name, file.type || "image/png");
      await uploadFileToSignedUrl(signed.signedUrl, file);
      const publicUrl = buildPublicAssetUrl(signed.path);
      update("avatarUrl", publicUrl);
      setMessage("Image uploaded. Save changes to publish it.");
    } catch (uploadError) {
      setError(uploadError.message || "Upload failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  if (loading) return <div className="py-16 flex items-center justify-center text-zinc-300">Loading editor...</div>;
  if (error && !form) return <div className="py-16 flex items-center justify-center text-red-300">{error}</div>;

  return (
    <div className="py-16 px-6 bg-void text-white">
      <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-zinc-900/60 p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="font-heading text-3xl font-bold">Edit your digital card</h1>
          {publicPath ? (
            <Link to={publicPath} target="_blank" className="inline-flex items-center gap-2 text-violet-300 hover:text-violet-200">
              <Eye className="w-4 h-4" strokeWidth={1.8} /> View public page
            </Link>
          ) : null}
        </div>

        <form onSubmit={save} className="space-y-6">
          <div className={FORM_GRID_CLASS}>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Full name</label>
              <input className={inputClass} value={form.fullName} onChange={(event) => update("fullName", event.target.value)} />
            </div>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Business</label>
              <input className={inputClass} value={form.businessName} onChange={(event) => update("businessName", event.target.value)} />
            </div>
          </div>

          <div className={FORM_GRID_CLASS}>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Email</label>
              <input type="email" className={inputClass} value={form.email} onChange={(event) => update("email", event.target.value)} />
            </div>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Phone</label>
              <input className={inputClass} value={form.phone} onChange={(event) => update("phone", event.target.value)} />
            </div>
          </div>

          <div className={FORM_GRID_CLASS}>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Website</label>
              <input className={inputClass} value={form.website} onChange={(event) => update("website", event.target.value)} />
            </div>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Theme color</label>
              <div className="flex items-center gap-2">
                <input type="color" className="w-10 h-10 rounded border border-white/10 bg-transparent" value={form.themeColor} onChange={(event) => update("themeColor", event.target.value)} />
                <input className={inputClass} value={form.themeColor} onChange={(event) => update("themeColor", event.target.value)} />
              </div>
            </div>
          </div>

          <div className={FORM_GRID_CLASS}>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">LinkedIn</label>
              <input className={inputClass} value={form.linkedin} onChange={(event) => update("linkedin", event.target.value)} />
            </div>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Instagram</label>
              <input className={inputClass} value={form.instagram} onChange={(event) => update("instagram", event.target.value)} />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Bio</label>
            <textarea className={`${inputClass} resize-none h-24`} value={form.bio} onChange={(event) => update("bio", event.target.value)} />
          </div>

          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <h3 className={`${SECTION_TITLE_CLASS} text-white mb-3`}>Profile image</h3>
            <div className="flex flex-wrap items-center gap-4">
              {form.avatarUrl ? <img src={form.avatarUrl} alt="Card avatar" className="w-14 h-14 rounded-full object-cover border border-white/15" /> : null}
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-zinc-700 text-sm cursor-pointer hover:border-violet-400/60">
                <Upload className="w-4 h-4" strokeWidth={1.8} />
                {uploading ? "Uploading..." : "Upload image"}
                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onUpload} disabled={uploading} />
              </label>
            </div>
          </div>

          {error ? <p className="text-red-300 text-sm">{error}</p> : null}
          {message ? <p className="text-emerald-300 text-sm">{message}</p> : null}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-violet-500 text-black font-semibold px-6 py-2.5 rounded-md hover:bg-violet-400 disabled:opacity-70"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.8} /> : <Save className="w-4 h-4" strokeWidth={1.8} />}
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
