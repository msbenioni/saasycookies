import jsPDF from 'jspdf';
import { CompanyDetails, InvoiceDetails, StyleOptions } from '../types';

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
  doc.text(company.address, margin + logoOffset, margin + 16);
  doc.text(company.email, margin + logoOffset, margin + 22);
  doc.text(company.phone, margin + logoOffset, margin + 28);
  
  if (company.gstNumber) {
    doc.text(`GST Number: ${company.gstNumber}`, margin + logoOffset, margin + 34);
  }
  
  // Invoice Title and Number
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
  
  // Client Details
  doc.setFont(style.fontFamily, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text("Bill To:", margin, margin + 55);
  
  doc.setFont(style.fontFamily, 'normal');
  doc.setFontSize(10);
  doc.text(invoice.client.name, margin, margin + 63);
  doc.text(invoice.client.address, margin, margin + 70);
  doc.text(invoice.client.email, margin, margin + 77);
  doc.text(invoice.client.phone, margin, margin + 84);
  
  if (invoice.client.gstNumber) {
    doc.text(`GST Number: ${invoice.client.gstNumber}`, margin, margin + 91);
  }
  
  // Draw a line before the table
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(margin, margin + 100, pageWidth - margin, margin + 100);
  
  // Manual table implementation (instead of using autoTable)
  const tableStartY = margin + 110;
  const colWidths = [
    pageWidth * 0.5 - margin, // Description
    pageWidth * 0.15, // Quantity
    pageWidth * 0.15, // Rate
    pageWidth * 0.2 - margin // Amount
  ];
  
  // Table headers
  doc.setFont(style.fontFamily, 'bold');
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  let currentX = margin;
  doc.text("Description", currentX, tableStartY);
  
  currentX += colWidths[0];
  doc.text("Quantity", currentX, tableStartY, { align: 'center' });
  
  currentX += colWidths[1];
  doc.text("Rate", currentX, tableStartY, { align: 'center' });
  
  currentX += colWidths[2];
  doc.text("Amount", currentX, tableStartY, { align: 'right' });
  
  // Draw header line
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, tableStartY + 5, pageWidth - margin, tableStartY + 5);
  
  // Table rows
  doc.setFont(style.fontFamily, 'normal');
  let currentY = tableStartY + 15;
  let subtotal = 0;
  
  invoice.items.forEach((item, index) => {
    const amount = item.quantity * item.price;
    subtotal += amount;
    
    currentX = margin;
    doc.text(item.description, currentX, currentY);
    
    currentX += colWidths[0];
    doc.text(item.quantity.toString(), currentX, currentY, { align: 'center' });
    
    currentX += colWidths[1];
    doc.text(`$${item.price.toFixed(2)}`, currentX, currentY, { align: 'center' });
    
    currentX += colWidths[2];
    doc.text(`$${amount.toFixed(2)}`, currentX, currentY, { align: 'right' });
    
    currentY += 12;
    
    // Add a light line between rows
    if (index < invoice.items.length - 1) {
      doc.setDrawColor(240, 240, 240);
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
  
  // Summary section
  const summaryX = pageWidth - margin - 80;
  const summaryLabelX = summaryX;
  const summaryValueX = pageWidth - margin;
  
  doc.setFont(style.fontFamily, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  doc.text("Subtotal:", summaryLabelX, currentY, { align: 'left' });
  doc.text(`$${subtotal.toFixed(2)}`, summaryValueX, currentY, { align: 'right' });
  currentY += 8;
  
  if (invoice.isGstRegistered) {
    doc.text(`GST (${invoice.gstRate}%):`, summaryLabelX, currentY, { align: 'left' });
    doc.text(`$${gst.toFixed(2)}`, summaryValueX, currentY, { align: 'right' });
    currentY += 8;
  }
  
  if (invoice.isWithholdingTaxEnabled) {
    doc.text(`Withholding Tax (${invoice.withholdingTaxRate}%):`, summaryLabelX, currentY, { align: 'left' });
    doc.text(`-$${withholdingTax.toFixed(2)}`, summaryValueX, currentY, { align: 'right' });
    currentY += 8;
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
  try {
    console.log('Saving PDF...');
    doc.save(`invoice-${invoice.invoiceNumber || 'new'}.pdf`);
    console.log('PDF saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving PDF:', error);
    return false;
  }
};

// Helper function to convert hex color to RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Helper function to format dates
const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  
  try {
    // Check if the date is in DD/MM/YYYY format (common in NZ)
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/').map(Number);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      }
    }
    
    // Try to parse as a Date object
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
    
    // If all else fails, return the original string
    return dateString;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};