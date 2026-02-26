import { useMemo, useRef, useState } from "react";
import { FileText, Plus, Trash2, Download, Upload, X, Pencil, ChevronDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ---------------- PDF CONFIG ----------------
const PDF_CONFIG = {
  MARGIN: 16,
  LOGO_MAX_WIDTH: 22,
  TITLE_OFFSET: 28,
  COLUMN_GAP: 12,
  BOX_WIDTH: 78,
  BOX_HEIGHT: 22,
  PAYMENT_BOX_HEIGHT: 34,
};

const TABLE_STYLES = {
  font: "helvetica",
  fontSize: 10,
  textColor: 40,
  lineColor: 230,
  lineWidth: 0.2,
  cellPadding: 3,
};

const HEAD_STYLES = {
  fillColor: [245, 245, 245],
  textColor: 60,
  fontStyle: "bold",
};

const COLUMN_STYLES = {
  0: { cellWidth: 92 },
  1: { halign: "center", cellWidth: 18 },
  2: { halign: "right", cellWidth: 30 },
  3: { halign: "right", cellWidth: 34 },
};

const emptyItem = { description: "", quantity: 1, rate: 0 };

// ---------------- UI TOKENS ----------------
const PAGE_BG = "min-h-screen relative overflow-hidden bg-[#0B0B10] text-white";
const PAGE_CONTAINER = "relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12";

const GRADIENT_STYLE =
  "radial-gradient(900px 600px at 15% 12%, rgba(168, 85, 247, 0.20), transparent 55%), " +
  "radial-gradient(900px 600px at 85% 30%, rgba(59, 130, 246, 0.14), transparent 58%), " +
  "radial-gradient(900px 600px at 50% 95%, rgba(34, 197, 94, 0.08), transparent 60%)";

const PAPER_WRAP =
  "relative bg-white text-zinc-900 rounded-[28px] shadow-[0_28px_90px_rgba(0,0,0,0.35)] overflow-hidden border border-white/10 ring-1 ring-white/10";

const PAPER_INNER_STROKE =
  "absolute inset-4 rounded-[22px] border border-gray-200 pointer-events-none";

const TOP_BAR =
  "flex items-center justify-between gap-3 px-6 py-4 border-b border-gray-100 bg-white";

const CTA_BTN =
  "inline-flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold px-5 py-2.5 rounded-xl transition hover:bg-purple-700 shadow-[0_12px_30px_rgba(168,85,247,0.30)]";

const INSPECTOR_CARD =
  "rounded-2xl bg-white/95 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-md p-5 text-zinc-900";

const LABEL = "text-xs font-medium text-zinc-700 mb-1.5 block";
const INPUT =
  "w-full rounded-lg px-3 py-2.5 text-sm bg-white text-zinc-900 placeholder:text-zinc-400 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition";

const INLINE_INPUT =
  "w-full bg-transparent text-zinc-900 placeholder:text-zinc-300 focus:outline-none";

const INLINE_BOX =
  "rounded-lg border border-transparent hover:border-purple-200 hover:bg-purple-50/30 transition px-2 py-1 -mx-2";

function formatISOFromDate(d) {
  return new Date(d).toLocaleDateString("en-GB").split("/").reverse().join("-");
}
function formatDateDisplay(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
function cleanStr(s) {
  return String(s || "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ---------------- Inline editable field ----------------
function InlineEditable({
  value,
  placeholder,
  onChange,
  className = "",
  multiline = false,
  mono = false,
  inputType = "text",
}) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <button
        type="button"
        className={`${INLINE_BOX} text-left ${className}`}
        onClick={() => setEditing(true)}
        title="Click to edit"
      >
        <div className="flex items-start gap-2">
          <div className="min-w-0">
            <span
              className={`block min-w-0 break-words ${mono ? "font-mono" : ""} ${
                value ? "text-zinc-900" : "text-zinc-400"
              }`}
            >
              {value ? value : placeholder}
            </span>
          </div>
          <Pencil className="w-3.5 h-3.5 text-zinc-300 mt-0.5 shrink-0" />
        </div>
      </button>
    );
  }

  if (multiline) {
    return (
      <textarea
        className={`${INLINE_BOX} ${INLINE_INPUT} ${className} resize-none`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
        autoFocus
        rows={3}
      />
    );
  }

  return (
    <input
      className={`${INLINE_BOX} ${INLINE_INPUT} ${className}`}
      value={value}
      placeholder={placeholder}
      type={inputType}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => setEditing(false)}
      autoFocus
    />
  );
}

export default function InvoicePage() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "INV-001",
    date: formatISOFromDate(new Date()),
    dueDate: "",
    from: { name: "", email: "", address: "", gst: "" },
    to: { name: "", email: "", address: "" },
    items: [{ ...emptyItem }],
    taxRate: 0,
    withholdingTaxRate: 0,
    notes: "",
    logo: "",
    payment: { accountName: "", accountNumber: "" },
  });

  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const previewRef = useRef(null);

  const updateField = (path, value) => {
    setInvoice((prev) => {
      const keys = path.split(".");
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const addItem = () =>
    setInvoice((p) => ({ ...p, items: [...p.items, { ...emptyItem }] }));

  const removeItem = (idx) =>
    setInvoice((p) => ({ ...p, items: p.items.filter((_, i) => i !== idx) }));

  const updateItem = (idx, field, value) => {
    setInvoice((p) => {
      const items = [...p.items];
      items[idx] = { ...items[idx], [field]: value };
      return { ...p, items };
    });
  };

  const subtotal = useMemo(
    () =>
      invoice.items.reduce(
        (s, i) => s + (Number(i.quantity) || 0) * (Number(i.rate) || 0),
        0
      ),
    [invoice.items]
  );
  const tax = subtotal * ((Number(invoice.taxRate) || 0) / 100);
  const withholdingTax =
    subtotal * ((Number(invoice.withholdingTaxRate) || 0) / 100);
  const total = subtotal + tax - withholdingTax;

  const fmt = (n) =>
    (Number(n) || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (ev) => updateField("logo", ev.target.result);
    reader.readAsDataURL(file);
  };

  const removeLogo = () => updateField("logo", "");

  // ---------------- PDF DOWNLOAD ----------------
  const downloadPDF = async () => {
    setIsGeneratingPDF(true);

    // Show notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2";
    notification.innerHTML = `
      <div class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
      <span>Your PDF is baking...</span>
    `;
    document.body.appendChild(notification);

    try {
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();

      const M = PDF_CONFIG.MARGIN;
      const R = pageW - M;
      let y = M;

      const line = (yy) => {
        doc.setDrawColor(230);
        doc.line(M, yy, R, yy);
      };
      const textRight = (txt, xx, yy) => doc.text(String(txt), xx, yy, { align: "right" });
      const textCenter = (txt, xx, yy) => doc.text(String(txt), xx, yy, { align: "center" });

      const subtotal = invoice.items.reduce(
        (s, i) => s + (Number(i.quantity) || 0) * (Number(i.rate) || 0),
        0
      );
      const tax = subtotal * ((Number(invoice.taxRate) || 0) / 100);
      const withholdingTax =
        subtotal * ((Number(invoice.withholdingTaxRate) || 0) / 100);
      const total = subtotal + tax - withholdingTax;

      const formatDate = (dateString) => formatDateDisplay(dateString);

      // Logo
      if (invoice.logo) {
        try {
          const props = doc.getImageProperties(invoice.logo);
          const ratio = props.width / props.height;
          const w = PDF_CONFIG.LOGO_MAX_WIDTH;
          const h = w / ratio;
          doc.addImage(invoice.logo, props.fileType || "PNG", M, y, w, h);
        } catch (e) {}
      }

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.setTextColor(30);
      const titleX = invoice.logo ? M + PDF_CONFIG.TITLE_OFFSET : M;
      doc.text("INVOICE", titleX, y + 10);

      // Invoice #
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text(`#${invoice.invoiceNumber || "—"}`, titleX, y + 16);

      // Dates
      doc.setTextColor(90);
      doc.setFontSize(10);
      textRight(`Date: ${formatDate(invoice.date)}`, R, y + 6);
      if (invoice.dueDate) textRight(`Due: ${formatDate(invoice.dueDate)}`, R, y + 12);

      y += 26;
      line(y);
      y += 10;

      // From/To
      const colGap = PDF_CONFIG.COLUMN_GAP;
      const colW = (pageW - M * 2 - colGap) / 2;

      const wrap = (s, width) => doc.splitTextToSize(cleanStr(s), width);

      const block = (title, x, yy, data) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(title.toUpperCase(), x, yy);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(40);

        const lines = [];
        if (data.name) lines.push(cleanStr(data.name));
        if (data.email) lines.push(cleanStr(data.email));
        if (data.address) lines.push(...wrap(data.address, colW));
        if (data.gst) lines.push(`GST: ${cleanStr(data.gst)}`);

        doc.text(lines.length ? lines : ["—"], x, yy + 6);
        return yy + 6 + lines.length * 5;
      };

      const leftEnd = block("From", M, y, {
        name: invoice.from.name,
        email: invoice.from.email,
        address: invoice.from.address,
        gst: invoice.from.gst,
      });

      const rightEnd = block("To", M + colGap + colW, y, {
        name: invoice.to.name,
        email: invoice.to.email,
        address: invoice.to.address,
      });

      y = Math.max(leftEnd, rightEnd) + 8;
      line(y);
      y += 8;

      // Items table
      const rows = invoice.items.map((it) => {
        const qty = Number(it.quantity) || 0;
        const rate = Number(it.rate) || 0;
        return [it.description || "—", String(qty), fmt(rate), fmt(qty * rate)];
      });

      autoTable(doc, {
        startY: y,
        margin: { left: M, right: M },
        head: [["Description", "Qty", "Rate", "Amount"]],
        body: rows.length ? rows : [["—", "0", fmt(0), fmt(0)]],
        theme: "grid",
        styles: TABLE_STYLES,
        headStyles: HEAD_STYLES,
        columnStyles: COLUMN_STYLES,
      });

      y = doc.lastAutoTable.finalY + 10;

      // Totals box
      const boxW = PDF_CONFIG.BOX_WIDTH;
      const boxX = R - boxW;
      // Increase box height when withholding tax is present to accommodate proper spacing
      const hasWithholdingTax = (Number(invoice.withholdingTaxRate) || 0) > 0;
      const adjustedBoxHeight = hasWithholdingTax ? PDF_CONFIG.BOX_HEIGHT + 6 : PDF_CONFIG.BOX_HEIGHT;

      doc.setDrawColor(230);
      doc.rect(boxX, y, boxW, adjustedBoxHeight);

      const labelX = boxX + 6;
      const valueX = boxX + boxW - 6;
      let ty = y + 8;

      const row = (label, value, bold = false) => {
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setFontSize(bold ? 11 : 10);
        doc.setTextColor(60);
        doc.text(label, labelX, ty);
        doc.setTextColor(30);
        textRight(value, valueX, ty);
        ty += 7;
      };

      row("Subtotal", fmt(subtotal));
      if ((Number(invoice.taxRate) || 0) > 0) row(`Tax (${invoice.taxRate}%)`, fmt(tax));
      if ((Number(invoice.withholdingTaxRate) || 0) > 0) {
        row(`Withholding (${invoice.withholdingTaxRate}%)`, fmt(withholdingTax));
        ty += 3; // Extra padding after withholding tax
      }
      ty += 3; // Extra padding before total
      row("Total", fmt(total), true);

      y += hasWithholdingTax ? adjustedBoxHeight : 44;

      // Payment box
      const pay = invoice.payment || {};
      const payBoxW = PDF_CONFIG.BOX_WIDTH;
      const payBoxH = PDF_CONFIG.PAYMENT_BOX_HEIGHT;
      const payBoxX = M;

      doc.setDrawColor(230);
      doc.rect(payBoxX, y - (hasWithholdingTax ? adjustedBoxHeight : 44), payBoxW, payBoxH);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text("PAYMENT", payBoxX + 6, y - (hasWithholdingTax ? adjustedBoxHeight : 44) + 8);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(60);

      const payLines = [
        pay.accountName ? `Name: ${cleanStr(pay.accountName)}` : "",
        pay.accountNumber ? `Account: ${cleanStr(pay.accountNumber)}` : "",
      ].filter(Boolean);

      doc.text(payLines.length ? payLines : ["—"], payBoxX + 6, y - (hasWithholdingTax ? adjustedBoxHeight : 44) + 15);

      // Notes - positioned at bottom of page
      if (invoice.notes) {
        const notesY = pageH - 25; // Position near bottom, above thank you message
        const noteLines = doc.splitTextToSize(invoice.notes, pageW - M * 2);
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text("NOTES", M, notesY);
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(60);
        doc.text(noteLines, M, notesY + 6);
      }

      doc.setFontSize(9);
      doc.setTextColor(150);
      textCenter("Thank you for your business", pageW / 2, pageH - 10);

      const filename = `${invoice.invoiceNumber || "invoice"}.pdf`.replace(/[^a-zA-Z0-9.-]/g, "_");
      doc.save(filename);

      // Update notification to success
      notification.innerHTML = `
        <div class="w-4 h-4 flex items-center justify-center">
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <span>PDF ready!</span>
      `;
      notification.className =
        "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2";

      // Remove notification after 3 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);

      // Update notification to error
      notification.innerHTML = `
        <div class="w-4 h-4 flex items-center justify-center">
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <span>Error generating PDF</span>
      `;
      notification.className =
        "fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2";

      // Remove notification after 5 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 5000);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // ---------------- RENDER: Paper Editor ----------------
  return (
    <div className={PAGE_BG}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: GRADIENT_STYLE }} />
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      <div className={PAGE_CONTAINER}>
        {/* Page header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-purple-500/15 ring-1 ring-purple-400/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-300" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Invoice</h1>
            <p className="text-sm text-white/70">Edit directly on the invoice, then export as PDF.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* PAPER (always shown, editable) */}
          <div className="lg:col-span-8">
            <div className={PAPER_WRAP}>
              <div className={PAPER_INNER_STROKE} />

              {/* Top bar */}
              <div className={TOP_BAR}>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple-500" />
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Invoice (Editable)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile inspector toggle */}
                  <button
                    type="button"
                    onClick={() => setInspectorOpen((s) => !s)}
                    className="lg:hidden inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 border border-gray-200 rounded-xl px-3 py-2 hover:bg-gray-50 transition"
                  >
                    Inspector
                    <ChevronDown className={`w-4 h-4 transition ${inspectorOpen ? "rotate-180" : ""}`} />
                  </button>

                  <button type="button" onClick={downloadPDF} className={CTA_BTN}>
                    <Download className="w-4 h-4" strokeWidth={1.5} />
                    Export PDF
                  </button>
                </div>
              </div>

              {/* Paper content */}
              <div ref={previewRef} className="p-8">
                {/* Header row */}
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div className="flex items-start gap-4 min-w-0">
                    {/* Logo area */}
                    <div className="shrink-0">
                      {invoice.logo ? (
                        <div className="relative">
                          <img
                            src={invoice.logo}
                            alt="Company logo"
                            className="w-14 h-14 object-contain rounded-lg border border-gray-200 bg-white"
                          />
                          {/* Desktop-only remove button (keeps paper-only UX) */}
                          <button
                            type="button"
                            onClick={removeLogo}
                            className="hidden lg:flex absolute -top-2 -right-2 p-1.5 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition shadow"
                            title="Remove logo"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        // Desktop-only inline upload (paper-only)
                        <label className="hidden lg:flex w-14 h-14 rounded-lg border border-dashed border-gray-300 bg-gray-50 items-center justify-center cursor-pointer hover:border-purple-400 transition">
                          <Upload className="w-4 h-4 text-gray-500" />
                          <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                        </label>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        INVOICE
                      </h2>
                      <div className="mt-1">
                        <InlineEditable
                          value={invoice.invoiceNumber}
                          placeholder="INV-001"
                          onChange={(v) => updateField("invoiceNumber", v)}
                          className="text-sm text-gray-500"
                          mono
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dates (editable inline on desktop) */}
                  <div className="text-right text-sm text-gray-500 shrink-0 space-y-1">
                    <div className="flex items-center justify-end gap-2">
                      <span>Date:</span>
                      <div className="hidden lg:block">
                        <InlineEditable
                          value={invoice.date}
                          placeholder={formatISOFromDate(new Date())}
                          onChange={(v) => updateField("date", v)}
                          className="text-sm text-gray-500"
                          inputType="date"
                        />
                      </div>
                      <div className="lg:hidden text-sm text-gray-500">{formatDateDisplay(invoice.date)}</div>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <span>Due:</span>
                      <div className="hidden lg:block">
                        <InlineEditable
                          value={invoice.dueDate}
                          placeholder="Select due date"
                          onChange={(v) => updateField("dueDate", v)}
                          className="text-sm text-gray-500"
                          inputType="date"
                        />
                      </div>
                      <div className="lg:hidden text-sm text-gray-500">{invoice.dueDate ? formatDateDisplay(invoice.dueDate) : "—"}</div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-200 mb-8" />

                {/* From / To */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      From
                    </p>
                    <InlineEditable
                      value={invoice.from.name}
                      placeholder="Your name"
                      onChange={(v) => updateField("from.name", v)}
                      className="font-semibold block mb-2"
                    />
                    <InlineEditable
                      value={invoice.from.email}
                      placeholder="Email"
                      onChange={(v) => updateField("from.email", v)}
                      className="text-sm text-gray-600 block mb-2"
                    />
                    <InlineEditable
                      value={invoice.from.address}
                      placeholder="Address"
                      onChange={(v) => updateField("from.address", v)}
                      className="text-sm text-gray-600 block mb-2"
                      multiline
                    />
                    <InlineEditable
                      value={invoice.from.gst}
                      placeholder="GST (optional)"
                      onChange={(v) => updateField("from.gst", v)}
                      className="text-sm text-gray-600 block"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      To
                    </p>
                    <InlineEditable
                      value={invoice.to.name}
                      placeholder="Client name"
                      onChange={(v) => updateField("to.name", v)}
                      className="font-semibold block mb-4"
                    />
                    <InlineEditable
                      value={invoice.to.email}
                      placeholder="Email"
                      onChange={(v) => updateField("to.email", v)}
                      className="text-sm text-gray-600 block mb-4"
                    />
                    <InlineEditable
                      value={invoice.to.address}
                      placeholder="Address"
                      onChange={(v) => updateField("to.address", v)}
                      className="text-sm text-gray-600 block"
                      multiline
                    />
                  </div>
                </div>

                {/* Items table (editable rows) */}
                <div className="rounded-2xl border border-gray-200 overflow-hidden mb-8">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Line Items
                    </p>
                    <button
                      type="button"
                      onClick={addItem}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 hover:text-purple-900 transition"
                    >
                      <Plus className="w-4 h-4" strokeWidth={2} />
                      Add item
                    </button>
                  </div>

                  <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-6">Description</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-2 text-right">Rate</div>
                    <div className="col-span-2 text-right">Amount</div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {invoice.items.map((item, idx) => {
                      const amount = (Number(item.quantity) || 0) * (Number(item.rate) || 0);
                      return (
                        <div key={idx} className="grid grid-cols-12 gap-2 px-4 py-3 items-start">
                          <div className="col-span-6 min-w-0">
                            <InlineEditable
                              value={item.description}
                              placeholder="e.g., Design & build"
                              onChange={(v) => updateItem(idx, "description", v)}
                              className="text-sm"
                            />
                            {/* Mobile remove button sits under description */}
                            <button
                              type="button"
                              onClick={() => removeItem(idx)}
                              className="lg:hidden inline-flex items-center gap-2 mt-1 text-xs font-semibold text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove
                            </button>
                          </div>

                          <div className="col-span-2">
                            <InlineEditable
                              value={String(item.quantity ?? 1)}
                              placeholder="1"
                              onChange={(v) => updateItem(idx, "quantity", Number(v))}
                              className="text-sm text-center"
                            />
                          </div>

                          <div className="col-span-2">
                            <InlineEditable
                              value={String(item.rate ?? 0)}
                              placeholder="0.00"
                              onChange={(v) => updateItem(idx, "rate", Number(v))}
                              className="text-sm text-right"
                            />
                          </div>

                          <div className="col-span-2 flex items-start justify-end gap-2">
                            <div className="text-sm font-medium text-gray-900 pt-1">
                              {fmt(amount)}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(idx)}
                              className="hidden lg:flex p-2 rounded-lg border border-transparent hover:border-red-200 hover:bg-red-50 text-gray-500 hover:text-red-700 transition"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment + Totals */}
                <div className="flex flex-col md:flex-row gap-6 mb-8 items-stretch">
                  <div className="w-full md:w-1/2 border border-gray-200 rounded-2xl p-5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Payment Details
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Account Name</span>
                        <div className="text-right min-w-0">
                          <InlineEditable
                            value={invoice.payment.accountName}
                            placeholder="Account name"
                            onChange={(v) => updateField("payment.accountName", v)}
                            className="text-sm text-gray-900 font-medium"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Account Number</span>
                        <div className="text-right min-w-0">
                          <InlineEditable
                            value={invoice.payment.accountNumber}
                            placeholder="Account number"
                            onChange={(v) => updateField("payment.accountNumber", v)}
                            className="text-sm text-gray-900 font-medium"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Reference</span>
                        <span className="text-gray-900 font-medium">
                          {invoice.invoiceNumber || "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 border border-gray-200 rounded-2xl p-5">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="text-gray-900">{fmt(subtotal)}</span>
                      </div>

                      {/* Desktop: taxes editable inline on paper (Option 2 behaviour) */}
                      <div className="hidden lg:block">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Tax (%)</span>
                          <div className="text-right min-w-0">
                            <InlineEditable
                              value={String(invoice.taxRate ?? 0)}
                              placeholder="0"
                              onChange={(v) => updateField("taxRate", Number(v))}
                              className="text-sm text-gray-900"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Withholding (%)</span>
                          <div className="text-right min-w-0">
                            <InlineEditable
                              value={String(invoice.withholdingTaxRate ?? 0)}
                              placeholder="0"
                              onChange={(v) => updateField("withholdingTaxRate", Number(v))}
                              className="text-sm text-gray-900"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Always show computed lines */}
                      {Number(invoice.taxRate) > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Tax ({invoice.taxRate}%)</span>
                          <span className="text-gray-900">{fmt(tax)}</span>
                        </div>
                      )}

                      {Number(invoice.withholdingTaxRate) > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            Withholding ({invoice.withholdingTaxRate}%)
                          </span>
                          <span className="text-gray-900">{fmt(withholdingTax)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-3 mt-3">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">{fmt(total)}</span>
                      </div>

                      {/* Mobile hint */}
                      <p className="lg:hidden text-xs text-gray-500 mt-3">
                        Taxes are edited in Inspector.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes (editable inline always) */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Notes
                  </p>
                  <InlineEditable
                    value={invoice.notes}
                    placeholder="Add a thank-you note or payment terms…"
                    onChange={(v) => updateField("notes", v)}
                    className="text-sm text-gray-700"
                    multiline
                  />
                </div>
              </div>
            </div>

            {/* MOBILE Inspector (Option 1 behaviour) */}
            <div className={`lg:hidden mt-4 ${inspectorOpen ? "block" : "hidden"}`}>
              <div className={INSPECTOR_CARD}>
                <h3 className="text-sm font-bold text-zinc-900 mb-4">Inspector</h3>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className={LABEL}>Invoice Date</label>
                    <input
                      type="date"
                      className={INPUT}
                      value={invoice.date}
                      onChange={(e) => updateField("date", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={LABEL}>Due Date</label>
                    <input
                      type="date"
                      className={INPUT}
                      value={invoice.dueDate}
                      onChange={(e) => updateField("dueDate", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={LABEL}>Tax Rate (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        className={INPUT}
                        value={invoice.taxRate || ""}
                        onChange={(e) => updateField("taxRate", Number(e.target.value))}
                      />
                    </div>

                    <div>
                      <label className={LABEL}>Withholding (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        className={INPUT}
                        value={invoice.withholdingTaxRate || ""}
                        onChange={(e) => updateField("withholdingTaxRate", Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL}>Company Logo</label>
                    {invoice.logo ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={invoice.logo}
                          alt="Company logo"
                          className="w-12 h-12 object-contain rounded-lg border border-zinc-200 bg-white"
                        />
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-red-600"
                        >
                          <X className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center w-full h-12 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer hover:border-purple-400 transition bg-white">
                        <div className="flex items-center gap-2 text-sm text-zinc-700 font-semibold">
                          <Upload className="w-4 h-4" />
                          Upload logo
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </label>
                    )}
                  </div>

                  <div>
                    <label className={LABEL}>Line items</label>
                    <button
                      type="button"
                      onClick={addItem}
                      className="w-full inline-flex items-center justify-center gap-2 border border-zinc-200 rounded-xl py-2.5 font-semibold text-zinc-900 hover:bg-zinc-50 transition"
                    >
                      <Plus className="w-4 h-4" />
                      Add item
                    </button>
                    <p className="text-xs text-zinc-500 mt-2">
                      Edit descriptions, quantities, and rates directly on the invoice.
                    </p>
                  </div>

                  <button type="button" onClick={downloadPDF} disabled={isGeneratingPDF} className={CTA_BTN + (isGeneratingPDF ? " opacity-50 cursor-not-allowed" : "")}>
                    {isGeneratingPDF ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Baking...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" strokeWidth={1.5} />
                        Export PDF
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP ONLY: empty right column (Option 2 = paper-only) */}
          <div className="hidden lg:block lg:col-span-4">
            {/* Optional: you can put a tiny “Help / Tips” card here later. */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-white/80">
              <p className="text-sm font-semibold">Desktop mode</p>
              <p className="text-sm mt-2 text-white/70">
                Click any field on the invoice to edit. This is the exact layout exported to PDF.
              </p>
            </div>
          </div>

          {/* Bottom export (mobile friendly) */}
          <div className="lg:hidden mt-6">
            <button type="button" disabled={isGeneratingPDF} onClick={downloadPDF} className={CTA_BTN + " w-full" + (isGeneratingPDF ? " opacity-50 cursor-not-allowed" : "")}>
              {isGeneratingPDF ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Baking...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" strokeWidth={1.5} />
                  Export PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}