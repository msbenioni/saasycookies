
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
  bankName: string;
  bankAccount: string;
  logo?: string;
  gstNumber?: string;  // Optional GST number for the company
}

export interface ClientDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
  gstNumber?: string;  // Optional GST number for the client
}

export interface InvoiceDetails {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  client: ClientDetails;
  items: InvoiceItem[];
  gstRate: number;
  withholdingTaxRate: number;
  isGstRegistered: boolean;
  isWithholdingTaxEnabled: boolean;
}

export interface StyleOptions {
  primaryColor: string;
  fontFamily?: 'calibri' | 'arial' | 'helvetica' | 'times' | 'courier';
}