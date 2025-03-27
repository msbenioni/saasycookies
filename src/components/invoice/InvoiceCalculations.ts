// Utility functions for invoice calculations

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface InvoiceCalculationProps {
  items: InvoiceItem[];
  isGstRegistered: boolean;
  gstRate: number;
  isWithholdingTaxEnabled: boolean;
  withholdingTaxRate: number;
}

export const calculateSubtotal = (items: InvoiceItem[]): number => {
  return items.reduce((sum, item) => {
    return sum + (Number(item.quantity) * Number(item.price));
  }, 0);
};

export const calculateGST = (
  items: InvoiceItem[],
  isGstRegistered: boolean,
  gstRate: number
): number => {
  if (!isGstRegistered) return 0;
  const subtotal = calculateSubtotal(items);
  return (subtotal * gstRate) / 100;
};

export const calculateWithholdingTax = (
  items: InvoiceItem[],
  isWithholdingTaxEnabled: boolean,
  withholdingTaxRate: number
): number => {
  if (!isWithholdingTaxEnabled) return 0;
  const subtotal = calculateSubtotal(items);
  return (subtotal * withholdingTaxRate) / 100;
};

export const calculateTotal = (
  items: InvoiceItem[],
  isGstRegistered: boolean,
  gstRate: number,
  isWithholdingTaxEnabled: boolean,
  withholdingTaxRate: number
): number => {
  const subtotal = calculateSubtotal(items);
  const gst = calculateGST(items, isGstRegistered, gstRate);
  const withholdingTax = calculateWithholdingTax(items, isWithholdingTaxEnabled, withholdingTaxRate);
  return subtotal + gst - withholdingTax;
};
