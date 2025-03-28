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
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;

  // Set font
  doc.setFont(style.fontFamily);
  
  // Add a subtle header background
  doc.setFillColor(250, 250, 250);
  doc.rect(0, 0, pageWidth, 45);
  
  // Add a colored accent line
  const primaryColorRGB = hexToRgb(style.primaryColor);
  if (primaryColorRGB) {
    doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
    doc.rect(0, 0, 8, pageHeight, 'F');
  }
  
  // Company Logo
  let logoOffset = 0;
  if (company.logo) {
    try {
      doc.addImage(company.logo, 'PNG', margin, margin, 30, 30);
      logoOffset = 35;
    } catch (error) {
      console.error('Error loading logo:', error);
    }
  }

  // Company Details
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  doc.text(company.name, margin + logoOffset, margin + 8);
  
  doc.setFontSize(9);
  const companyDetails = [
    company.address,
    company.email,
    company.phone,
  ];
  
  // Add GST number if provided
  if (company.gstNumber) {
    companyDetails.push(`GST Number: ${company.gstNumber}`);
  }
  
  companyDetails.forEach((detail, index) => {
    doc.text(detail, margin + logoOffset, margin + 16 + (index * 4));
  });

  // Invoice Title and Details - Right Aligned
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
  }
  doc.setFontSize(24);
  doc.setFont(style.fontFamily, 'bold');
  doc.text('INVOICE', pageWidth - margin, margin + 5, { align: 'right' });
  
  // Invoice Details - Right Aligned
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont(style.fontFamily, 'normal');
  const invoiceDetails = [
    `Invoice Number: ${invoice.invoiceNumber}`,
    `Date: ${formatDate(invoice.date)}`,
    `Due Date: ${formatDate(invoice.dueDate)}`,
  ];
  
  invoiceDetails.forEach((detail, index) => {
    doc.text(detail, pageWidth - margin, margin + 15 + (index * 5), { align: 'right' });
  });

  // Client Details
  doc.setFontSize(11);
  doc.setFont(style.fontFamily, 'bold');
  doc.text("Bill To:", margin, margin + 50);
  
  // Add a subtle underline for "Bill To:" with primary color
  if (primaryColorRGB) {
    doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
    doc.setLineWidth(0.5);
    doc.line(margin, margin + 54, margin + 40, margin + 54);
  }
  
  doc.setFontSize(10);
  doc.setFont(style.fontFamily, 'normal');
  const clientDetails = [
    invoice.client.name,
    invoice.client.address,
    invoice.client.email,
    invoice.client.phone,
  ];
  
  // Add client GST number if provided
  if (invoice.client.gstNumber) {
    clientDetails.push(`GST Number: ${invoice.client.gstNumber}`);
  }
  
  clientDetails.forEach((detail, index) => {
    if (detail) { 
      doc.text(detail, margin, margin + 60 + (index * 5));
    }
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

  // Add table
  doc.autoTable({
    head: tableHeaders,
    body: tableData,
    startY: margin + 90,
    theme: 'grid',
    headStyles: {
      fillColor: style.primaryColor,
      textColor: '#FFFFFF',
      fontStyle: 'bold',
      halign: 'left',
      fontSize: 10,
    },
    styles: {
      font: style.fontFamily,
      fontSize: 9,
      cellPadding: 6,
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 40, halign: 'right' },
      3: { cellWidth: 40, halign: 'right' },
    },
  });

  // Calculations
  const subtotal = invoice.items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price)), 0);
  const gst = invoice.isGstRegistered ? (subtotal * invoice.gstRate) / 100 : 0;
  const withholdingTax = invoice.isWithholdingTaxEnabled ? (subtotal * invoice.withholdingTaxRate) / 100 : 0;
  const total = subtotal + gst - withholdingTax;

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  // Summary
  const summaryX = pageWidth - margin - 80;
  const summaryLabelX = summaryX;
  const summaryValueX = pageWidth - margin;
  
  // Summary section with lines
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(summaryX - 10, finalY, pageWidth - margin, finalY);
  
  // Subtotal
  doc.setFont(style.fontFamily, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text("Subtotal:", summaryLabelX, finalY + 8, { align: 'left' });
  doc.text(`$${subtotal.toFixed(2)}`, summaryValueX, finalY + 8, { align: 'right' });
  
  let currentY = finalY + 8;
  
  // GST if registered
  if (invoice.isGstRegistered) {
    currentY += 6;
    doc.text(`GST (${invoice.gstRate}%):`, summaryLabelX, currentY, { align: 'left' });
    doc.text(`$${gst.toFixed(2)}`, summaryValueX, currentY, { align: 'right' });
  }
  
  // Withholding Tax
  if (invoice.isWithholdingTaxEnabled) {
    currentY += 6;
    doc.text(`Withholding Tax (${invoice.withholdingTaxRate}%):`, summaryLabelX, currentY, { align: 'left' });
    doc.text(`$${withholdingTax.toFixed(2)}`, summaryValueX, currentY, { align: 'right' });
  }
  
  // Total with thicker line
  doc.setLineWidth(1);
  currentY += 4;
  doc.line(summaryX - 10, currentY, pageWidth - margin, currentY);
  currentY += 8;
  
  // Total amount
  doc.setFont(style.fontFamily, 'bold');
  doc.setFontSize(12);
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
  }
  doc.text("Total:", summaryLabelX, currentY, { align: 'left' });
  doc.text(`$${total.toFixed(2)}`, summaryValueX, currentY, { align: 'right' });
  
  // Add payment details section
  const paymentY = currentY + 20;
  doc.setFont(style.fontFamily, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text("Payment Details", margin, paymentY);
  
  doc.setFont(style.fontFamily, 'normal');
  doc.setFontSize(10);
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(margin, paymentY + 5, margin + 150, paymentY + 5);
  
  doc.text(`Bank Name: ${company.bankName || 'N/A'}`, margin, paymentY + 12);
  doc.text(`Bank Account: ${company.bankAccount || 'N/A'}`, margin, paymentY + 20);
  
  // Add payment reference if invoice number exists
  if (invoice.invoiceNumber) {
    doc.text(`Payment Reference: ${invoice.invoiceNumber}`, margin, paymentY + 28);
  }
  
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
  }
  doc.setFont(style.fontFamily, 'bold');
  doc.text("Please include the invoice number as reference when making payment", margin, paymentY + 35);

  // Add thank you message
  doc.setFont(style.fontFamily, 'normal');
  doc.setTextColor(150, 150, 150);
  doc.text("Thank you for your business", pageWidth / 2, paymentY + 45, { align: 'center' });

  // Save the PDF
  doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
};

// Helper function to convert hex color to RGB
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Helper function to format dates
function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  // If the date is already in DD/MM/YYYY format, just return it
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return dateString;
  }
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original string if date is invalid
    }
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (e) {
    return dateString;
  }
}