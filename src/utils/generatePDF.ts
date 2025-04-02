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

// Helper function to check if a string is empty or undefined
const isNotEmpty = (str: string | undefined | null): boolean => {
  return str !== undefined && str !== null && str.trim() !== '';
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

  // Always use Calibri font regardless of style options
  doc.setFont('calibri');
  
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
  let companyY = margin + 8;
  const lineHeight = 6;
  
  doc.setFont('calibri', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  
  if (isNotEmpty(company.name)) {
    doc.text(company.name, margin + logoOffset, companyY);
    companyY += lineHeight;
  }
  
  doc.setFont('calibri', 'normal');
  doc.setFontSize(9);
  
  if (isNotEmpty(company.address)) {
    doc.text(company.address, margin + logoOffset, companyY);
    companyY += lineHeight;
  }
  
  if (isNotEmpty(company.email)) {
    doc.text(company.email, margin + logoOffset, companyY);
    companyY += lineHeight;
  }
  
  if (isNotEmpty(company.phone)) {
    doc.text(company.phone, margin + logoOffset, companyY);
    companyY += lineHeight;
  }
  
  if (isNotEmpty(company.gstNumber)) {
    doc.text(`GST Number: ${company.gstNumber}`, margin + logoOffset, companyY);
    companyY += lineHeight;
  }
  
  // Invoice Title and Number - Match the styling from the preview
  let invoiceY = margin + 8;
  
  doc.setFont('calibri', 'bold');
  doc.setFontSize(12);
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
  }
  doc.text("INVOICE", pageWidth - margin, invoiceY, { align: 'right' });
  invoiceY += lineHeight;
  
  doc.setFont('calibri', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  
  if (isNotEmpty(invoice.invoiceNumber)) {
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`, pageWidth - margin, invoiceY, { align: 'right' });
    invoiceY += lineHeight;
  }
  
  if (isNotEmpty(invoice.date)) {
    doc.text(`Date: ${formatDate(invoice.date)}`, pageWidth - margin, invoiceY, { align: 'right' });
    invoiceY += lineHeight;
  }
  
  if (isNotEmpty(invoice.dueDate)) {
    doc.text(`Due Date: ${formatDate(invoice.dueDate)}`, pageWidth - margin, invoiceY, { align: 'right' });
    invoiceY += lineHeight;
  }
  
  // Calculate the maximum Y position reached by either company or invoice details
  const headerEndY = Math.max(companyY, invoiceY) + 10;
  
  // Draw a line after the header section - matches the border-bottom in the preview
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(margin, headerEndY, pageWidth - margin, headerEndY);
  
  // Client Details - Match the styling from the preview
  let clientY = headerEndY + 15;
  
  doc.setFont('calibri', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  
  // Only show "Bill To:" if there's at least one client field filled in
  if (isNotEmpty(invoice.client.name) || isNotEmpty(invoice.client.address) || 
      isNotEmpty(invoice.client.email) || isNotEmpty(invoice.client.phone) || 
      isNotEmpty(invoice.client.gstNumber)) {
    
    doc.text("Bill To:", margin, clientY);
    
    // Add a small colored line under "Bill To:" like in the preview
    if (primaryColorRGB) {
      doc.setDrawColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
      doc.line(margin, clientY + 3, margin + 25, clientY + 3);
    }
    
    clientY += 10;
    doc.setFont('calibri', 'normal');
    doc.setFontSize(10);
    
    if (isNotEmpty(invoice.client.name)) {
      doc.text(invoice.client.name, margin, clientY);
      clientY += 7;
    }
    
    if (isNotEmpty(invoice.client.address)) {
      doc.text(invoice.client.address, margin, clientY);
      clientY += 7;
    }
    
    if (isNotEmpty(invoice.client.email)) {
      doc.text(invoice.client.email, margin, clientY);
      clientY += 7;
    }
    
    if (isNotEmpty(invoice.client.phone)) {
      doc.text(invoice.client.phone, margin, clientY);
      clientY += 7;
    }
    
    if (isNotEmpty(invoice.client.gstNumber)) {
      doc.text(`GST Number: ${invoice.client.gstNumber}`, margin, clientY);
      clientY += 7;
    }
    
    clientY += 5; // Add some space after client details
  }
  
  // Draw a line before the table
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(margin, clientY, pageWidth - margin, clientY);
  
  // Table setup - match the table in the preview
  const tableStartY = clientY + 10;
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
  
  doc.setFont('calibri', 'bold');
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
  doc.setFont('calibri', 'normal');
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
  doc.setFont('calibri', 'normal');
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
  doc.setFont('calibri', 'bold');
  doc.setFontSize(11);
  if (primaryColorRGB) {
    doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
  }
  doc.text("Total:", summaryLabelX, currentY + 8, { align: 'left' });
  doc.text(`$${total.toFixed(2)}`, summaryValueX, currentY + 8, { align: 'right' });
  
  // Add payment details section - match the styling in the preview
  // Only show payment details if at least one field is filled in
  if (isNotEmpty(company.bankName) || isNotEmpty(company.bankAccount) || isNotEmpty(invoice.invoiceNumber)) {
    const paymentY = currentY + 25;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, paymentY, pageWidth - margin, paymentY);
    
    doc.setFont('calibri', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text("Payment Details", margin, paymentY + 10);
    
    doc.setFont('calibri', 'normal');
    doc.setFontSize(10);
    
    let paymentDetailsY = paymentY + 20;
    
    if (isNotEmpty(company.bankName)) {
      doc.text(`Bank Name: ${company.bankName}`, margin, paymentDetailsY);
      paymentDetailsY += 8;
    }
    
    if (isNotEmpty(company.bankAccount)) {
      doc.text(`Bank Account: ${company.bankAccount}`, margin, paymentDetailsY);
      paymentDetailsY += 8;
    }
    
    if (isNotEmpty(invoice.invoiceNumber)) {
      doc.text(`Payment Reference: ${invoice.invoiceNumber}`, margin, paymentDetailsY);
      paymentDetailsY += 8;
    }
    
    // Add a note with the primary color
    if (primaryColorRGB) {
      doc.setTextColor(primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b);
    }
    doc.setFont('calibri', 'bold');
    doc.text("Please include the invoice number as reference when making payment", 
      pageWidth / 2, paymentDetailsY + 10, { align: 'center' });
    
    // Thank you note
    doc.setTextColor(150, 150, 150);
    doc.setFont('calibri', 'normal');
    doc.text("Thank you for your business", pageWidth / 2, paymentDetailsY + 20, { align: 'center' });
  } else {
    // If no payment details, just add the thank you note
    doc.setTextColor(150, 150, 150);
    doc.setFont('calibri', 'normal');
    doc.text("Thank you for your business", pageWidth / 2, currentY + 30, { align: 'center' });
  }
  
  return doc;
};