export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface CompanyDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
  bankAccount: string;
  logo?: string;
}

export interface InvoiceDetails {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  gstRate: number;
  withholdingTaxRate: number;
}

export interface StyleOptions {
  primaryColor: string;
  fontFamily: string;
}