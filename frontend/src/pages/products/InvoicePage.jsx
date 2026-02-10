import { useState, useRef } from "react";
import { FileText, Plus, Trash2, Download, Printer } from "lucide-react";
import jsPDF from "jspdf";

const emptyItem = { description: "", quantity: 1, rate: 0 };

export default function InvoicePage() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "INV-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    from: { name: "", email: "", address: "" },
    to: { name: "", email: "", address: "" },
    items: [{ ...emptyItem }],
    taxRate: 0,
    notes: "",
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
  const total = subtotal + tax;

  const fmt = (n) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const downloadPDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    let y = margin;

    doc.setFontSize(24);
    doc.setTextColor(40, 40, 40);
    doc.text("INVOICE", margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Invoice #: ${invoice.invoiceNumber}`, margin, y);
    doc.text(`Date: ${invoice.date}`, 130, y);
    y += 5;
    if (invoice.dueDate) {
      doc.text(`Due: ${invoice.dueDate}`, 130, y);
    }
    y += 12;

    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text("From:", margin, y);
    doc.text("To:", 110, y);
    y += 5;
    doc.setTextColor(80, 80, 80);
    doc.text(invoice.from.name || "—", margin, y);
    doc.text(invoice.to.name || "—", 110, y);
    y += 5;
    doc.text(invoice.from.email || "", margin, y);
    doc.text(invoice.to.email || "", 110, y);
    y += 5;
    const fromAddr = doc.splitTextToSize(invoice.from.address || "", 80);
    const toAddr = doc.splitTextToSize(invoice.to.address || "", 80);
    doc.text(fromAddr, margin, y);
    doc.text(toAddr, 110, y);
    y += Math.max(fromAddr.length, toAddr.length) * 5 + 10;

    doc.setFillColor(245, 245, 245);
    doc.rect(margin, y, 170, 8, "F");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text("Description", margin + 2, y + 5.5);
    doc.text("Qty", 115, y + 5.5);
    doc.text("Rate", 135, y + 5.5);
    doc.text("Amount", 160, y + 5.5);
    y += 12;

    doc.setTextColor(40, 40, 40);
    invoice.items.forEach((item) => {
      doc.text(item.description || "—", margin + 2, y);
      doc.text(String(item.quantity), 115, y);
      doc.text(fmt(item.rate), 135, y);
      doc.text(fmt(item.quantity * item.rate), 160, y);
      y += 7;
    });

    y += 5;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, 190, y);
    y += 8;

    doc.setFontSize(10);
    doc.text("Subtotal:", 135, y);
    doc.text(fmt(subtotal), 165, y);
    y += 6;
    if (invoice.taxRate > 0) {
      doc.text(`Tax (${invoice.taxRate}%):`, 135, y);
      doc.text(fmt(tax), 165, y);
      y += 6;
    }
    doc.setFontSize(12);
    doc.setTextColor(20, 20, 20);
    doc.text("Total:", 135, y);
    doc.text(fmt(total), 165, y);

    if (invoice.notes) {
      y += 15;
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text("Notes:", margin, y);
      y += 5;
      const noteLines = doc.splitTextToSize(invoice.notes, 170);
      doc.text(noteLines, margin, y);
    }

    doc.save(`${invoice.invoiceNumber}.pdf`);
  };

  const inputClass =
    "w-full bg-zinc-950/50 border border-zinc-800 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 rounded-md py-2 px-3 text-white text-sm placeholder:text-zinc-600 transition-all outline-none";

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-brand-primary" strokeWidth={1.5} />
        </div>
        <h1
          data-testid="invoice-page-title"
          className="font-heading text-3xl md:text-4xl font-bold tracking-tight"
        >
          Invoice Generator
        </h1>
      </div>
      <p className="text-zinc-500 mb-12 ml-[52px]">
        Create professional invoices and download as PDF. Free, no sign-up required.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Invoice Details */}
          <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-6 space-y-4">
            <h3 className="font-heading text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              Invoice Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Invoice #</label>
                <input
                  data-testid="invoice-number-input"
                  className={inputClass}
                  value={invoice.invoiceNumber}
                  onChange={(e) => updateField("invoiceNumber", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Date</label>
                <input
                  data-testid="invoice-date-input"
                  type="date"
                  className={inputClass}
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
                className={inputClass}
                value={invoice.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
              />
            </div>
          </div>

          {/* From / To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-6 space-y-3">
              <h3 className="font-heading text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                From
              </h3>
              <input data-testid="from-name-input" className={inputClass} placeholder="Your name" value={invoice.from.name} onChange={(e) => updateField("from.name", e.target.value)} />
              <input data-testid="from-email-input" className={inputClass} placeholder="Email" value={invoice.from.email} onChange={(e) => updateField("from.email", e.target.value)} />
              <textarea data-testid="from-address-input" className={inputClass + " resize-none h-16"} placeholder="Address" value={invoice.from.address} onChange={(e) => updateField("from.address", e.target.value)} />
            </div>
            <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-6 space-y-3">
              <h3 className="font-heading text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                To
              </h3>
              <input data-testid="to-name-input" className={inputClass} placeholder="Client name" value={invoice.to.name} onChange={(e) => updateField("to.name", e.target.value)} />
              <input data-testid="to-email-input" className={inputClass} placeholder="Email" value={invoice.to.email} onChange={(e) => updateField("to.email", e.target.value)} />
              <textarea data-testid="to-address-input" className={inputClass + " resize-none h-16"} placeholder="Address" value={invoice.to.address} onChange={(e) => updateField("to.address", e.target.value)} />
            </div>
          </div>

          {/* Line Items */}
          <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-6 space-y-4">
            <h3 className="font-heading text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              Line Items
            </h3>
            {invoice.items.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <input
                  data-testid={`item-desc-${idx}`}
                  className={inputClass + " flex-1"}
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(idx, "description", e.target.value)}
                />
                <input
                  data-testid={`item-qty-${idx}`}
                  type="number"
                  min="1"
                  className={inputClass + " w-16 text-center"}
                  value={item.quantity}
                  onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))}
                />
                <input
                  data-testid={`item-rate-${idx}`}
                  type="number"
                  min="0"
                  step="0.01"
                  className={inputClass + " w-24 text-right"}
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
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Tax Rate (%)</label>
              <input
                data-testid="tax-rate-input"
                type="number"
                min="0"
                max="100"
                step="0.1"
                className={inputClass + " w-32"}
                value={invoice.taxRate || ""}
                onChange={(e) => updateField("taxRate", Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Notes</label>
              <textarea
                data-testid="invoice-notes-input"
                className={inputClass + " resize-none h-20"}
                placeholder="Payment terms, thank you note..."
                value={invoice.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              data-testid="download-pdf-button"
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2.5 rounded-md transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] text-sm"
            >
              <Download className="w-4 h-4" strokeWidth={1.5} />
              Download PDF
            </button>
            <button
              data-testid="print-invoice-button"
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 font-medium px-6 py-2.5 rounded-md transition-all text-sm"
            >
              <Printer className="w-4 h-4" strokeWidth={1.5} />
              Print
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-7">
          <div
            ref={previewRef}
            data-testid="invoice-preview"
            className="rounded-xl bg-white text-gray-900 p-8 md:p-10 shadow-2xl sticky top-24"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 font-heading">
                  INVOICE
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  #{invoice.invoiceNumber}
                </p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>Date: {invoice.date}</p>
                {invoice.dueDate && <p>Due: {invoice.dueDate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  From
                </p>
                <p className="font-semibold text-gray-900">{invoice.from.name || "—"}</p>
                <p className="text-sm text-gray-500">{invoice.from.email}</p>
                <p className="text-sm text-gray-500 whitespace-pre-line">{invoice.from.address}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  To
                </p>
                <p className="font-semibold text-gray-900">{invoice.to.name || "—"}</p>
                <p className="text-sm text-gray-500">{invoice.to.email}</p>
                <p className="text-sm text-gray-500 whitespace-pre-line">{invoice.to.address}</p>
              </div>
            </div>

            <table className="w-full mb-8">
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
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-3 text-sm text-gray-700">
                      {item.description || "—"}
                    </td>
                    <td className="py-3 text-sm text-gray-700 text-center">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-sm text-gray-700 text-right">
                      {fmt(item.rate)}
                    </td>
                    <td className="py-3 text-sm text-gray-900 font-medium text-right">
                      {fmt(item.quantity * item.rate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mb-8">
              <div className="w-64 space-y-2">
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
                <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{fmt(total)}</span>
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
  );
}
