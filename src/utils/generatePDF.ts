import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CompanyDetails, InvoiceDetails, StyleOptions } from '../types';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generatePDF = (
  company: CompanyDetails,
  invoice: InvoiceDetails,
  style: StyleOptions
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;

  // Set font
  doc.setFont(style.fontFamily);
  
  // Company Logo
  if (company.logo) {
    try {
      doc.addImage(company.logo, 'PNG', margin, margin, 40, 40);
    } catch (error) {
      console.error('Error loading logo:', error);
    }
  }

  // Company Details
  doc.setFontSize(20);
  doc.text(company.name, margin, margin + 15);
  
  doc.setFontSize(10);
  const companyDetails = [
    company.address,
    company.email,
    company.phone,
    `Bank Account: ${company.bankAccount}`,
  ];
  
  companyDetails.forEach((detail, index) => {
    doc.text(detail, margin, margin + 25 + (index * 5));
  });

  // Invoice Details
  doc.setFontSize(12);
  doc.setTextColor(style.primaryColor);
  doc.text('INVOICE', pageWidth - margin - 40, margin);
  
  doc.setTextColor(0);
  doc.setFontSize(10);
  const invoiceDetails = [
    `Invoice Number: ${invoice.invoiceNumber}`,
    `Date: ${invoice.date}`,
    `Due Date: ${invoice.dueDate}`,
  ];
  
  invoiceDetails.forEach((detail, index) => {
    doc.text(detail, pageWidth - margin - 60, margin + 10 + (index * 5));
  });

  // Items Table
  const tableHeaders = [['Description', 'Quantity', 'Price', 'Amount']];
  const tableData = invoice.items.map(item => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);
    const amount = price * quantity;
    return [
      item.description,
      quantity.toString(),
      `$${price.toFixed(2)}`,
      `$${amount.toFixed(2)}`,
    ];
  });

  doc.autoTable({
    head: tableHeaders,
    body: tableData,
    startY: margin + 50,
    theme: 'grid',
    headStyles: {
      fillColor: style.primaryColor,
      textColor: '#FFFFFF',
    },
    styles: {
      font: style.fontFamily,
    },
  });

  // Calculations
  const subtotal = invoice.items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price)), 0);
  const gst = (subtotal * invoice.gstRate) / 100;
  const withholdingTax = (subtotal * invoice.withholdingTaxRate) / 100;
  const total = subtotal + gst - withholdingTax;

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  // Summary
  const summary = [
    `Subtotal: $${subtotal.toFixed(2)}`,
    `GST (${invoice.gstRate}%): $${gst.toFixed(2)}`,
    `Withholding Tax (${invoice.withholdingTaxRate}%): $${withholdingTax.toFixed(2)}`,
    `Total: $${total.toFixed(2)}`,
  ];

  summary.forEach((line, index) => {
    doc.text(line, pageWidth - margin - 60, finalY + (index * 5));
  });

  // Save the PDF
  doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
};