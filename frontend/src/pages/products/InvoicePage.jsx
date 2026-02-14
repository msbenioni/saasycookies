import { useState, useRef } from "react";
import { FileText, Plus, Trash2, Download, Upload, X } from "lucide-react";
import jsPDF from "jspdf";
import { INPUT_CLASS, SELECT_CLASS, CHECKBOX_LABEL_CLASS, CHECKBOX_INPUT_CLASS, BADGE_CLASS, MESSAGE_BOX_CLASS, PREVIEW_CONTAINER_CLASS, FOCUS_COLORS, TEXT_COLORS, BG_COLORS, PAGE_HEADER_CLASS, PAGE_HEADER_ICON_CLASS, PAGE_HEADER_TITLE_CLASS, PAGE_HEADER_DESC_CLASS, ICON_BG_COLORS, SECTION_CLASS, SECTION_TITLE_CLASS, FORM_GRID_CLASS, PAGE_BACKGROUND_STYLES, PAGE_CONTAINER_STYLES } from "../../constants/formStyles";

// Constants
const emptyItem = { description: "", quantity: 1, rate:0 };

const INPUT_CLASS_FINAL = INPUT_CLASS + " py-2 text-sm " + FOCUS_COLORS.purple;

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
  0: { cellWidth: 92 },                 // description
  1: { halign: "center", cellWidth: 18 },
  2: { halign: "right", cellWidth: 30 },
  3: { halign: "right", cellWidth: 34 },
};

const PREVIEW_CLASSES = {
  CONTAINER: PREVIEW_CONTAINER_CLASS,
  LOGO: "w-[84px] h-[42px] object-contain object-left",
  DIVIDER: "h-px bg-gray-200 my-8",
  TABLE: "w-full mb-8",
  TABLE_ROW: "border-b border-gray-100 last:border-b-0",
};

export default function InvoicePage() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "INV-001",
    date: new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'), // dd/mm/yyyy format for input
    dueDate: "",
    from: { name: "", email: "", address: "", gst: "" },
    to: { name: "", email: "", address: "" },
    items: [{ ...emptyItem }],
    taxRate: 0,
    withholdingTaxRate: 0, // New withholding tax field
    notes: "",
    logo: "", // Logo field
    payment: { accountName: "", accountNumber: "" }, // Payment details
  });

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
    setInvoice((prev) => ({ ...prev, items: [...prev.items, { ...emptyItem }] }));

  const removeItem = (idx) =>
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx),
    }));

  const updateItem = (idx, field, value) => {
    setInvoice((prev) => {
      const items = [...prev.items];
      items[idx] = { ...items[idx], [field]: value };
      return { ...prev, items };
    });
  };

  const subtotal = invoice.items.reduce(
    (s, i) => s + i.quantity * i.rate,
    0
  );
  const tax = subtotal * (invoice.taxRate / 100);
  const withholdingTax = subtotal * (invoice.withholdingTaxRate / 100);
  const total = subtotal + tax - withholdingTax;

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateField("logo", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    updateField("logo", "");
  };

  const fmt = (n) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  // Format date for display as dd/mm/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const downloadPDF = () => {
    try {
      // A4 in mm for predictable spacing
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

      const fmt = (n) =>
        (Number(n) || 0).toLocaleString("en-US", { style: "currency", currency: "USD" });

      const formatDate = (dateString) => {
        if (!dateString) return "";
        const d = new Date(dateString);
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
      };

      // ---- CALCS ----
      const subtotal = invoice.items.reduce((s, i) => s + (Number(i.quantity) || 0) * (Number(i.rate) || 0), 0);
      const tax = subtotal * ((Number(invoice.taxRate) || 0) / 100);
      const withholdingTax = subtotal * ((Number(invoice.withholdingTaxRate) || 0) / 100);
      const total = subtotal + tax - withholdingTax;

      // ---- Header ----
      // Optional logo (keep aspect ratio)
      if (invoice.logo) {
        try {
          const props = doc.getImageProperties(invoice.logo);
          const ratio = props.width / props.height;

          const w = PDF_CONFIG.LOGO_MAX_WIDTH;
          const h = w / ratio; // keep aspect ratio

          doc.addImage(invoice.logo, props.fileType || "PNG", M, y, w, h);

          // if logo is tall, reserve a bit more vertical space
        } catch (e) {
          // ignore logo if addImage fails
        }
      }

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.setTextColor(30);
      const titleX = invoice.logo ? M + PDF_CONFIG.TITLE_OFFSET : M;
      doc.text("INVOICE", titleX, y + 10);

      // Invoice number under title
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text(`#${invoice.invoiceNumber || "—"}`, titleX, y + 16);

      // Dates top-right
      doc.setTextColor(90);
      doc.setFontSize(10);
      textRight(`Date: ${formatDate(invoice.date)}`, R, y + 6);
      if (invoice.dueDate) textRight(`Due: ${formatDate(invoice.dueDate)}`, R, y + 12);

      y += 26;
      line(y);
      y += 10;

      // ---- From / To blocks ----
      const colGap = PDF_CONFIG.COLUMN_GAP;
      const colW = (pageW - (M * 2) - colGap) / 2;

      const clean = (s) =>
        String(s || "")
          .replace(/\r\n/g, "\n")
          .replace(/[ \t]+/g, " ")     // collapse multiple spaces
          .replace(/\n{3,}/g, "\n\n")  // collapse too many newlines
          .trim();

      const wrap = (s, width) => doc.splitTextToSize(clean(s), width);

      const block = (title, x, yy, data) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(title.toUpperCase(), x, yy);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(40);

        const maxWidth = colW; // stay within the column

        // Build lines carefully (name/email as single lines, address wrapped)
        const lines = [];

        if (data.name) lines.push(clean(data.name));
        if (data.email) lines.push(clean(data.email));

        if (data.address) {
          lines.push(...wrap(data.address, maxWidth)); // ✅ wraps properly
        }

        if (data.gst) lines.push(`GST: ${clean(data.gst)}`);

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

      // ---- Items table (AutoTable) ----
      const rows = invoice.items.map((it) => {
        const qty = Number(it.quantity) || 0;
        const rate = Number(it.rate) || 0;
        return [
          it.description || "—",
          String(qty || 0),
          fmt(rate),
          fmt(qty * rate),
        ];
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

      // Update y after table
      y = doc.lastAutoTable.finalY + 10;

      // ---- Totals box (right aligned, no overlap) ----
      const boxW = PDF_CONFIG.BOX_WIDTH;
      const boxX = R - boxW;

      doc.setDrawColor(230);
      doc.rect(boxX, y, boxW, PDF_CONFIG.BOX_HEIGHT);

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
      if ((Number(invoice.withholdingTaxRate) || 0) > 0) row(`Withholding (${invoice.withholdingTaxRate}%)`, fmt(withholdingTax));
      row("Total", fmt(total), true);

      y += 44;

      // ---- Payment Details (boxed, left side) ----
      const pay = invoice.payment || {};
      const payBoxW = PDF_CONFIG.BOX_WIDTH;
      const payBoxH = PDF_CONFIG.PAYMENT_BOX_HEIGHT;
      const payBoxX = M;

      doc.setDrawColor(230);
      doc.rect(payBoxX, y - 44, payBoxW, payBoxH);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text("PAYMENT", payBoxX + 6, y - 44 + 8);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(60);

      const payLines = [
        pay.accountName ? `Name: ${clean(pay.accountName)}` : "",
        pay.accountNumber ? `Account: ${clean(pay.accountNumber)}` : "",
      ].filter(Boolean);

      doc.text(payLines.length ? payLines : ["—"], payBoxX + 6, y - 44 + 15);

      // ---- Notes ----
      if (invoice.notes) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text("NOTES", M, y);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60);

        const noteLines = doc.splitTextToSize(invoice.notes, pageW - M * 2);
        doc.text(noteLines, M, y + 6);
        y += 6 + noteLines.length * 5;
      }

      // ---- Footer (optional subtle) ----
      doc.setFontSize(9);
      doc.setTextColor(150);
      textCenter("Thank you for your business", pageW / 2, pageH - 10);

      // Generate filename without special characters
      const filename = `${invoice.invoiceNumber || "invoice"}.pdf`.replace(/[^a-zA-Z0-9.-]/g, '_');
      doc.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  return (
    <div className={PAGE_BACKGROUND_STYLES.invoice.container}>
      <div
        className={PAGE_BACKGROUND_STYLES.invoice.gradientOverlay}
        style={{ background: PAGE_BACKGROUND_STYLES.invoice.gradientStyle }}
      />
      <div className={PAGE_BACKGROUND_STYLES.invoice.noiseOverlay} />
      
      <div className={PAGE_CONTAINER_STYLES} style={{ position: 'relative', zIndex: 10 }}>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
        <div className={`${PAGE_HEADER_ICON_CLASS} ${ICON_BG_COLORS.purple}`}>
          <FileText className={`w-5 h-5 ${TEXT_COLORS.purple}`} strokeWidth={1.5} />
        </div>
        <h1
          data-testid="invoice-page-title"
          className={PAGE_HEADER_TITLE_CLASS}
        >
          Invoice
        </h1>
      </div>
      <p className={PAGE_HEADER_DESC_CLASS}>
        Create professional invoices and download as PDF. Free, no sign-up required.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Invoice Details */}
          <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-6 space-y-4">
            <h3 className={SECTION_TITLE_CLASS + " text-zinc-400 uppercase tracking-wider"}>
              Invoice Details
            </h3>
            <div className={FORM_GRID_CLASS}>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Invoice #</label>
                <input
                  data-testid="invoice-number-input"
                  className={INPUT_CLASS_FINAL}
                  value={invoice.invoiceNumber}
                  onChange={(e) => updateField("invoiceNumber", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Date</label>
                <input
                  data-testid="invoice-date-input"
                  type="date"
                  className={INPUT_CLASS_FINAL}
                  value={invoice.date}
                  onChange={(e) => updateField("date", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Due Date</label>
              <input
                data-testid="invoice-due-date-input"
                type="date"
                className={INPUT_CLASS_FINAL}
                value={invoice.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
              />
            </div>
          </div>

          {/* From / To */}
          <div className={FORM_GRID_CLASS}>
            <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-6 space-y-3">
              <h3 className={SECTION_TITLE_CLASS + " text-zinc-400 uppercase tracking-wider"}>
                From
              </h3>
              <input data-testid="from-name-input" className={INPUT_CLASS_FINAL} placeholder="Your name" value={invoice.from.name} onChange={(e) => updateField("from.name", e.target.value)} />
              <input data-testid="from-email-input" className={INPUT_CLASS_FINAL} placeholder="Email" value={invoice.from.email} onChange={(e) => updateField("from.email", e.target.value)} />
              <textarea data-testid="from-address-input" className={INPUT_CLASS_FINAL + " resize-none h-16"} placeholder="Address" value={invoice.from.address} onChange={(e) => updateField("from.address", e.target.value)} />
              <input data-testid="from-gst-input" className={INPUT_CLASS_FINAL} placeholder="GST Number" value={invoice.from.gst} onChange={(e) => updateField("from.gst", e.target.value)} />
            </div>
            <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-6 space-y-3">
              <h3 className={SECTION_TITLE_CLASS + " text-zinc-400 uppercase tracking-wider"}>
                To
              </h3>
              <input data-testid="to-name-input" className={INPUT_CLASS_FINAL} placeholder="Client name" value={invoice.to.name} onChange={(e) => updateField("to.name", e.target.value)} />
              <input data-testid="to-email-input" className={INPUT_CLASS_FINAL} placeholder="Email" value={invoice.to.email} onChange={(e) => updateField("to.email", e.target.value)} />
              <textarea data-testid="to-address-input" className={INPUT_CLASS_FINAL + " resize-none h-16"} placeholder="Address" value={invoice.to.address} onChange={(e) => updateField("to.address", e.target.value)} />
            </div>
          </div>

          {/* Logo Upload */}
          <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-6 space-y-4">
            <h3 className={SECTION_TITLE_CLASS + " text-zinc-400 uppercase tracking-wider"}>
              Company Logo
            </h3>
            {invoice.logo ? (
              <div className="space-y-3">
                <div className="relative inline-block">
                  <img 
                    src={invoice.logo} 
                    alt="Company logo" 
                    className="h-16 max-w-xs object-contain rounded-lg border border-zinc-700"
                  />
                  <button
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-zinc-500">PNG, JPG up to 2MB</p>
              </div>
            ) : (
              <div>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-brand-primary transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-zinc-500" />
                    <p className="mb-2 text-sm text-zinc-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-zinc-500">PNG, JPG up to 2MB</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Line Items */}
          <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-6 space-y-4">
            <h3 className={SECTION_TITLE_CLASS + " text-zinc-400 uppercase tracking-wider"}>
              Line Items
            </h3>
            {invoice.items.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <input
                  data-testid={`item-desc-${idx}`}
                  className={INPUT_CLASS_FINAL}
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(idx, "description", e.target.value)}
                />
                <div className="flex flex-wrap gap-2 items-center">
                  <input
                    data-testid={`item-qty-${idx}`}
                    type="number"
                    min="1"
                    className={INPUT_CLASS_FINAL + " w-20 text-center"}
                    value={item.quantity}
                    onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))}
                  />
                  <input
                    data-testid={`item-rate-${idx}`}
                    type="number"
                    min="0"
                    step="0.01"
                    className={INPUT_CLASS_FINAL + " w-28 text-right"}
                    placeholder="Rate"
                    value={item.rate || ""}
                    onChange={(e) => updateItem(idx, "rate", Number(e.target.value))}
                  />
                  <button
                    data-testid={`item-remove-${idx}`}
                    onClick={() => removeItem(idx)}
                    className="p-2 text-zinc-600 hover:text-red-400 transition-colors mt-0.5"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
            <button
              data-testid="add-item-button"
              onClick={addItem}
              className="flex items-center gap-1.5 text-sm text-brand-primary hover:text-brand-secondary transition-colors"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2} />
              Add item
            </button>
          </div>

          {/* Tax & Notes */}
          <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-6 space-y-4">
            <div className={FORM_GRID_CLASS}>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Tax Rate (%)</label>
                <input
                  data-testid="tax-rate-input"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  className={INPUT_CLASS_FINAL}
                  value={invoice.taxRate || ""}
                  onChange={(e) => updateField("taxRate", Number(e.target.value))}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Withholding Tax (%)</label>
                <input
                  data-testid="withholding-tax-rate-input"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  className={INPUT_CLASS_FINAL}
                  value={invoice.withholdingTaxRate || ""}
                  onChange={(e) => updateField("withholdingTaxRate", Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Notes</label>
              <textarea
                data-testid="invoice-notes-input"
                className={INPUT_CLASS_FINAL + " resize-none h-20"}
                placeholder="Payment terms, thank you note..."
                value={invoice.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </div>
          </div>

          {/* Payment Details */}
          <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-6 space-y-4">
            <h3 className={SECTION_TITLE_CLASS + " text-zinc-400 uppercase tracking-wider"}>
              Payment Details
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Account Name</label>
                <input
                  data-testid="payment-account-name-input"
                  className={INPUT_CLASS_FINAL}
                  placeholder="Bank account name"
                  value={invoice.payment.accountName}
                  onChange={(e) => updateField("payment.accountName", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Account Number</label>
                <input
                  data-testid="payment-account-number-input"
                  className={INPUT_CLASS_FINAL}
                  placeholder="Bank account number"
                  value={invoice.payment.accountNumber}
                  onChange={(e) => updateField("payment.accountNumber", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              data-testid="download-pdf-button"
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2.5 rounded-md transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] text-sm"
            >
              <Download className="w-4 h-4" strokeWidth={1.5} />
              Download Invoice (PDF)
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-7">
          <div
            ref={previewRef}
            data-testid="invoice-preview"
            className={PREVIEW_CLASSES.CONTAINER}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
              <div className="flex items-start gap-4">
                {invoice.logo && (
                  <img
                    src={invoice.logo}
                    alt="Company logo"
                    className={PREVIEW_CLASSES.LOGO}
                  />
                )}
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 font-heading">
                    INVOICE
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    #{invoice.invoiceNumber}
                  </p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>Date: {formatDate(invoice.date)}</p>
                {invoice.dueDate && <p>Due: {formatDate(invoice.dueDate)}</p>}
              </div>
            </div>

            <div className={PREVIEW_CLASSES.DIVIDER} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  From
                </p>
                <p className="font-semibold text-gray-900">{invoice.from.name || "—"}</p>
                <p className="text-sm text-gray-500">{invoice.from.email}</p>
                <p className="text-sm text-gray-500 whitespace-pre-line break-words max-w-[280px] leading-relaxed">
                  {invoice.from.address}
                </p>
                {invoice.from.gst && <p className="text-sm text-gray-500">GST: {invoice.from.gst}</p>}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  To
                </p>
                <p className="font-semibold text-gray-900">{invoice.to.name || "—"}</p>
                <p className="text-sm text-gray-500">{invoice.to.email}</p>
                <p className="text-sm text-gray-500 whitespace-pre-line break-words max-w-[280px] leading-relaxed">
                  {invoice.to.address}
                </p>
              </div>
            </div>

            <table className={PREVIEW_CLASSES.TABLE}>
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">
                    Description
                  </th>
                  <th className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 w-16">
                    Qty
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 w-24">
                    Rate
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 w-28">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className={PREVIEW_CLASSES.TABLE_ROW}>
                    <td className="py-3 text-sm text-gray-900">{item.description || "—"}</td>
                    <td className="py-3 text-sm text-gray-900 text-center">{item.quantity || 0}</td>
                    <td className="py-3 text-sm text-gray-900 text-right">{fmt(item.rate)}</td>
                    <td className="py-3 text-sm text-gray-900 text-right font-medium">{fmt((item.quantity || 0) * (item.rate || 0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 items-start">
              {/* Payment box (left) */}
              <div className="border border-gray-200 rounded-lg p-5 min-w-[280px]">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Payment Details
                </p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Account Name</span>
                    <span className="text-gray-900 font-medium text-right break-words flex-1">
                      {invoice.payment.accountName || "—"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Account Number</span>
                    <span className="text-gray-900 font-medium text-right break-words flex-1">
                      {invoice.payment.accountNumber || "—"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Reference</span>
                    <span className="text-gray-900 font-medium text-right">
                      {invoice.invoiceNumber || "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Totals box (right) */}
              <div className="border border-gray-200 rounded-lg p-5 sm:ml-auto w-full min-w-[280px]">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900">{fmt(subtotal)}</span>
                  </div>

                  {invoice.taxRate > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax ({invoice.taxRate}%)</span>
                      <span className="text-gray-900">{fmt(tax)}</span>
                    </div>
                  )}

                  {invoice.withholdingTaxRate > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Withholding ({invoice.withholdingTaxRate}%)</span>
                      <span className="text-gray-900">{fmt(withholdingTax)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-3 mt-3">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">{fmt(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {invoice.notes && (
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Notes
                </p>
                <p className="text-sm text-gray-500 whitespace-pre-line">
                  {invoice.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
