import React from 'react';
import { UseFormWatch } from 'react-hook-form';

interface InvoicePreviewProps {
  watch: UseFormWatch<any>;
  calculateSubtotal: () => number;
  calculateGST: () => number;
  calculateWithholdingTax: () => number;
  calculateTotal: () => number;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ 
  watch,
  calculateSubtotal,
  calculateGST,
  calculateWithholdingTax,
  calculateTotal
}) => {
  const watchItems = watch('invoice.items');
  const watchIsGstRegistered = watch('invoice.isGstRegistered');
  const watchPrimaryColor = watch('style.primaryColor');
  const watchCompany = watch('company');
  const watchInvoice = watch('invoice');

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8 text-black">
      <h2 className="text-xl font-bold mb-4 text-center">Invoice Preview</h2>
      <div className="border border-gray-200 p-6 rounded-md relative">
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-2" style={{ backgroundColor: watchPrimaryColor }}></div>
        
        {/* Company Header */}
        <div className="flex justify-between mb-8 pb-4 border-b border-gray-200">
          <div className="flex">
            {watchCompany.logo && (
              <img 
                src={watchCompany.logo} 
                alt="Company Logo" 
                className="max-w-[100px] max-h-[100px] mr-4" 
              />
            )}
            <div>
              <h3 className="text-lg font-bold">{watchCompany.name || 'Your Company'}</h3>
              <p className="text-sm">{watchCompany.address || 'Company Address'}</p>
              <p className="text-sm">{watchCompany.email || 'company@example.com'}</p>
              <p className="text-sm">{watchCompany.phone || '123-456-7890'}</p>
              {watchCompany.gstNumber && (
                <p className="text-sm">GST Number: {watchCompany.gstNumber}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold" style={{ color: watchPrimaryColor }}>INVOICE</h2>
            <p className="text-sm">Invoice #: {watchInvoice.invoiceNumber || 'INV-001'}</p>
            <p className="text-sm">Date: {watchInvoice.date || 'Current Date'}</p>
            <p className="text-sm">Due Date: {watchInvoice.dueDate || 'Due Date'}</p>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-8">
          <h4 className="font-bold mb-2 pb-1" style={{ borderBottom: `1px solid ${watchPrimaryColor}` }}>Bill To:</h4>
          <p className="text-sm">{watchInvoice.client.name}</p>
          <p className="text-sm">{watchInvoice.client.address}</p>
          <p className="text-sm">{watchInvoice.client.email}</p>
          <p className="text-sm">{watchInvoice.client.phone}</p>
          {watchInvoice.client.gstNumber && (
            <p className="text-sm">GST Number: {watchInvoice.client.gstNumber}</p>
          )}
        </div>

        {/* Invoice Items */}
        <table className="w-full mb-6">
          <thead>
            <tr style={{ backgroundColor: watchPrimaryColor }}>
              <th className="text-left p-2 text-white">Description</th>
              <th className="text-center p-2 text-white">Quantity</th>
              <th className="text-right p-2 text-white">Price</th>
              <th className="text-right p-2 text-white">Amount</th>
            </tr>
          </thead>
          <tbody>
            {watchItems.map((item: any, index: number) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.description || 'Item description'}</td>
                <td className="p-2 text-center">{item.quantity}</td>
                <td className="p-2 text-right">${Number(item.price).toFixed(2)}</td>
                <td className="p-2 text-right">
                  ${(Number(item.quantity) * Number(item.price)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-1 border-t">
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            
            {watchIsGstRegistered && (
              <div className="flex justify-between py-1">
                <span>GST ({watch('invoice.gstRate')}%):</span>
                <span>${calculateGST().toFixed(2)}</span>
              </div>
            )}
            
            {watch('invoice.isWithholdingTaxEnabled') && (
              <div className="flex justify-between py-1">
                <span>Withholding Tax ({watch('invoice.withholdingTaxRate')}%):</span>
                <span>${calculateWithholdingTax().toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between py-1 border-t mt-1 font-bold" style={{ color: watchPrimaryColor }}>
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mt-8 pt-4 border-t">
          <h4 className="font-bold mb-2">Payment Details</h4>
          <p className="text-sm">Bank Name: {watchCompany.bankName || 'Bank Name'}</p>
          <p className="text-sm">Bank Account: {watchCompany.bankAccount || 'Account Number'}</p>
          <p className="text-sm">Payment Reference: {watchInvoice.invoiceNumber || 'INV-001'}</p>
          <p className="text-sm mt-4 font-medium" style={{ color: watchPrimaryColor }}>
            Please include the invoice number as reference when making payment
          </p>
          <p className="text-center text-gray-500 text-xs mt-6">Thank you for your business</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
