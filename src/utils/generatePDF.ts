import jsPDF from 'jspdf';
import { InvoiceDetails, CompanyDetails, StyleOptions } from '../types';

// Helper function to format dates
const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  return dateString;
};

// Helper function to convert hex color to RGB
const hexToRgb = (hex: string): { r: number, g: number, b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const generatePDF = (
  invoice: InvoiceDetails,
  company: CompanyDetails,
  style: StyleOptions
): jsPDF => {
  // Initialize PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  // Set font
  doc.setFont(style.fontFamily);
  
  // Add a colored accent line on the left (like in the preview)
  const primaryColorRGB = hexToRgb(style.primaryColor);
  if (primaryColorRGB) {
    doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
    doc.rect(0, 0, 5, pageHeight, 'F');
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
  doc.text(company.address, margin + logoOffset, margin + 16);
  doc.text(company.email, margin + logoOffset, margin + 22);
  doc.text(company.phone, margin + logoOffset, margin + 28);
  
  if (company.gstNumber) {
    doc.text(`GST Number: ${company.gstNumber}`, margin + logoOffset, margin + 34);
  }
  
  // Invoice Title and Number - Match the styling from the preview
  doc.setFont(style.fontFamily, 'bold');
  doc.setFontSize(20);
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
  }
  doc.text("INVOICE", pageWidth - margin, margin + 15, { align: 'right' });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Invoice Number: ${invoice.invoiceNumber || 'N/A'}`, pageWidth - margin, margin + 25, { align: 'right' });
  doc.text(`Date: ${formatDate(invoice.date)}`, pageWidth - margin, margin + 32, { align: 'right' });
  doc.text(`Due Date: ${formatDate(invoice.dueDate)}`, pageWidth - margin, margin + 39, { align: 'right' });
  
  // Draw a line after the header section - matches the border-bottom in the preview
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(margin, margin + 45, pageWidth - margin, margin + 45);
  
  // Client Details - Match the styling from the preview
  doc.setFont(style.fontFamily, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text("Bill To:", margin, margin + 60);
  
  // Add a small colored line under "Bill To:" like in the preview
  if (primaryColorRGB) {
    doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
    doc.line(margin, margin + 63, margin + 25, margin + 63);
  }
  
  doc.setFont(style.fontFamily, 'normal');
  doc.setFontSize(10);
  doc.text(invoice.client.name, margin, margin + 70);
  doc.text(invoice.client.address, margin, margin + 77);
  doc.text(invoice.client.email, margin, margin + 84);
  doc.text(invoice.client.phone, margin, margin + 91);
  
  if (invoice.client.gstNumber) {
    doc.text(`GST Number: ${invoice.client.gstNumber}`, margin, margin + 98);
  }
  
  // Draw a line before the table
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(margin, margin + 110, pageWidth - margin, margin + 110);
  
  // Table setup - match the table in the preview
  const tableStartY = margin + 120;
  const colWidths = [
    pageWidth * 0.5 - margin, // Description
    pageWidth * 0.15, // Quantity
    pageWidth * 0.15, // Price
    pageWidth * 0.2 - margin // Amount
  ];
  
  // Table headers - with colored background like in the preview
  if (primaryColorRGB) {
    doc.setFillColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
    doc.rect(margin, tableStartY - 8, pageWidth - (margin * 2), 10, 'F');
  }
  
  doc.setFont(style.fontFamily, 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255); // White text for headers
  
  // Description - left aligned
  doc.text("Description", margin + 2, tableStartY - 2);
  
  // Quantity - center aligned
  const quantityX = margin + colWidths[0] + (colWidths[1] / 2);
  doc.text("Quantity", quantityX, tableStartY - 2, { align: 'center' });
  
  // Price - right aligned
  const priceX = margin + colWidths[0] + colWidths[1] + (colWidths[2] / 2);
  doc.text("Price", priceX, tableStartY - 2, { align: 'center' });
  
  // Amount - right aligned
  doc.text("Amount", pageWidth - margin - 2, tableStartY - 2, { align: 'right' });
  
  // Table rows
  doc.setFont(style.fontFamily, 'normal');
  doc.setTextColor(60, 60, 60); // Reset text color
  let currentY = tableStartY + 10;
  let subtotal = 0;
  
  invoice.items.forEach((item, index) => {
    const amount = item.quantity * item.price;
    subtotal += amount;
    
    // Description - left aligned
    doc.text(item.description, margin, currentY);
    
    // Quantity - center aligned
    doc.text(item.quantity.toString(), quantityX, currentY, { align: 'center' });
    
    // Price - center aligned
    doc.text(`$${item.price.toFixed(2)}`, priceX, currentY, { align: 'center' });
    
    // Amount - right aligned
    doc.text(`$${amount.toFixed(2)}`, pageWidth - margin, currentY, { align: 'right' });
    
    currentY += 12;
    
    // Add a light line between rows
    if (index < invoice.items.length - 1) {
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, currentY - 6, pageWidth - margin, currentY - 6);
    }
  });
  
  // Draw a line after the table
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 10;
  
  // Calculate totals
  const gstRate = invoice.isGstRegistered ? invoice.gstRate / 100 : 0;
  const gst = subtotal * gstRate;
  
  const withholdingTaxRate = invoice.isWithholdingTaxEnabled ? invoice.withholdingTaxRate / 100 : 0;
  const withholdingTax = subtotal * withholdingTaxRate;
  
  const total = subtotal + gst - withholdingTax;
  
  // Summary section - match the layout in the preview
  const summaryWidth = 64; // Width of the summary box
  const summaryX = pageWidth - margin - summaryWidth;
  const summaryLabelX = summaryX;
  const summaryValueX = pageWidth - margin;
  
  // Add a border-top like in the preview
  doc.setDrawColor(220, 220, 220);
  doc.line(summaryX, currentY, pageWidth - margin, currentY);
  
  // Subtotal
  doc.setFont(style.fontFamily, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text("Subtotal:", summaryLabelX, currentY + 8, { align: 'left' });
  doc.text(`$${subtotal.toFixed(2)}`, summaryValueX, currentY + 8, { align: 'right' });
  
  currentY += 8;
  
  // GST if applicable
  if (invoice.isGstRegistered) {
    doc.text(`GST (${invoice.gstRate}%):`, summaryLabelX, currentY + 8, { align: 'left' });
    doc.text(`$${gst.toFixed(2)}`, summaryValueX, currentY + 8, { align: 'right' });
    currentY += 8;
  }
  
  // Withholding Tax if applicable
  if (invoice.isWithholdingTaxEnabled) {
    const taxText = `Withholding Tax (${invoice.withholdingTaxRate}%):`;
    doc.text(taxText, summaryLabelX, currentY + 8, { align: 'left' });
    // Show withholding tax as negative
    doc.text(`-$${withholdingTax.toFixed(2)}`, summaryValueX, currentY + 8, { align: 'right' });
    currentY += 8;
  }
  
  // Add a line before the total
  doc.setDrawColor(220, 220, 220);
  doc.line(summaryX, currentY + 4, pageWidth - margin, currentY + 4);
  currentY += 8;
  
  // Total amount - match the colored text in the preview
  doc.setFont(style.fontFamily, 'bold');
  doc.setFontSize(11);
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
  }
  doc.text("Total:", summaryLabelX, currentY + 8, { align: 'left' });
  doc.text(`$${total.toFixed(2)}`, summaryValueX, currentY + 8, { align: 'right' });
  
  // Add payment details section - match the styling in the preview
  const paymentY = currentY + 25;
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, paymentY, pageWidth - margin, paymentY);
  
  doc.setFont(style.fontFamily, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text("Payment Details", margin, paymentY + 10);
  
  doc.setFont(style.fontFamily, 'normal');
  doc.setFontSize(10);
  doc.text(`Bank Name: ${company.bankName || 'N/A'}`, margin, paymentY + 20);
  doc.text(`Bank Account: ${company.bankAccount || 'N/A'}`, margin, paymentY + 28);
  doc.text(`Payment Reference: ${invoice.invoiceNumber || 'N/A'}`, margin, paymentY + 36);
  
  // Add a note with the primary color
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
  }
  doc.setFont(style.fontFamily, 'bold');
  doc.text("Please include the invoice number as reference when making payment", 
    pageWidth / 2, paymentY + 48, { align: 'center' });
  
  // Thank you note
  doc.setTextColor(150, 150, 150);
  doc.setFont(style.fontFamily, 'normal');
  doc.text("Thank you for your business", pageWidth / 2, paymentY + 58, { align: 'center' });
  
  return doc;
};