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
    <div className="bg-white p-3 sm:p-6 rounded-md shadow-md mb-6 sm:mb-8 text-black overflow-x-auto">
      <h2 className="text-xl font-bold mb-3 sm:mb-4 text-center">Invoice Preview</h2>
      <div className="border border-gray-200 p-3 sm:p-6 rounded-md relative min-w-[280px]">
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-2" style={{ backgroundColor: watchPrimaryColor }}></div>
        
        {/* Company Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between mb-4 sm:mb-8 pb-3 sm:pb-4 border-b border-gray-200">
          <div className="flex mb-3 sm:mb-0">
            {watchCompany.logo && (
              <img 
                src={watchCompany.logo} 
                alt="Company Logo" 
                className="max-w-[60px] max-h-[60px] sm:max-w-[100px] sm:max-h-[100px] mr-3 sm:mr-4" 
              />
            )}
            <div>
              <h3 className="text-base sm:text-lg font-bold">{watchCompany.name || 'Your Company'}</h3>
              <p className="text-xs sm:text-sm">{watchCompany.address || 'Company Address'}</p>
              <p className="text-xs sm:text-sm">{watchCompany.email || 'company@example.com'}</p>
              <p className="text-xs sm:text-sm">{watchCompany.phone || '123-456-7890'}</p>
              {watchCompany.gstNumber && (
                <p className="text-xs sm:text-sm">GST Number: {watchCompany.gstNumber}</p>
              )}
            </div>
          </div>
          <div className="text-left sm:text-right">
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: watchPrimaryColor }}>INVOICE</h2>
            <p className="text-xs sm:text-sm">Invoice #: {watchInvoice.invoiceNumber || 'INV-001'}</p>
            <p className="text-xs sm:text-sm">Date: {watchInvoice.date || 'Current Date'}</p>
            <p className="text-xs sm:text-sm">Due Date: {watchInvoice.dueDate || 'Due Date'}</p>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-4 sm:mb-8">
          <h4 className="font-bold mb-1 sm:mb-2 pb-1" style={{ borderBottom: `1px solid ${watchPrimaryColor}` }}>Bill To:</h4>
          <p className="text-xs sm:text-sm">{watchInvoice.client.name}</p>
          <p className="text-xs sm:text-sm">{watchInvoice.client.address}</p>
          <p className="text-xs sm:text-sm">{watchInvoice.client.email}</p>
          <p className="text-xs sm:text-sm">{watchInvoice.client.phone}</p>
          {watchInvoice.client.gstNumber && (
            <p className="text-xs sm:text-sm">GST Number: {watchInvoice.client.gstNumber}</p>
          )}
        </div>

        {/* Invoice Items */}
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <table className="w-full mb-4 sm:mb-6 min-w-[400px]">
            <thead>
              <tr style={{ backgroundColor: watchPrimaryColor }}>
                <th className="text-left p-1 sm:p-2 text-white text-xs sm:text-sm">Description</th>
                <th className="text-center p-1 sm:p-2 text-white text-xs sm:text-sm">Quantity</th>
                <th className="text-right p-1 sm:p-2 text-white text-xs sm:text-sm">Price</th>
                <th className="text-right p-1 sm:p-2 text-white text-xs sm:text-sm">Amount</th>
              </tr>
            </thead>
            <tbody>
              {watchItems.map((item: any, index: number) => (
                <tr key={index} className="border-b">
                  <td className="p-1 sm:p-2 text-xs sm:text-sm">{item.description || 'Item description'}</td>
                  <td className="p-1 sm:p-2 text-center text-xs sm:text-sm">{item.quantity}</td>
                  <td className="p-1 sm:p-2 text-right text-xs sm:text-sm">${Number(item.price).toFixed(2)}</td>
                  <td className="p-1 sm:p-2 text-right text-xs sm:text-sm">
                    ${(Number(item.quantity) * Number(item.price)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-4 sm:mb-8">
          <div className="w-full sm:w-64">
            <div className="flex justify-between py-1 border-t">
              <span className="text-xs sm:text-sm">Subtotal:</span>
              <span className="text-xs sm:text-sm">${calculateSubtotal().toFixed(2)}</span>
            </div>
            
            {watchIsGstRegistered && (
              <div className="flex justify-between py-1">
                <span className="text-xs sm:text-sm">GST ({watch('invoice.gstRate')}%):</span>
                <span className="text-xs sm:text-sm">${calculateGST().toFixed(2)}</span>
              </div>
            )}
            
            {watch('invoice.isWithholdingTaxEnabled') && (
              <div className="flex justify-between py-1">
                <span className="text-xs sm:text-sm">Withholding Tax ({watch('invoice.withholdingTaxRate')}%):</span>
                <span className="text-xs sm:text-sm">${calculateWithholdingTax().toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between py-1 border-t mt-1 font-bold" style={{ color: watchPrimaryColor }}>
              <span className="text-xs sm:text-sm">Total:</span>
              <span className="text-xs sm:text-sm">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mt-4 sm:mt-8 pt-3 sm:pt-4 border-t">
          <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Payment Details</h4>
          <p className="text-xs sm:text-sm">Bank Name: {watchCompany.bankName || 'Bank Name'}</p>
          <p className="text-xs sm:text-sm">Bank Account: {watchCompany.bankAccount || 'Account Number'}</p>
          <p className="text-xs sm:text-sm">Payment Reference: {watchInvoice.invoiceNumber || 'INV-001'}</p>
          <p className="text-xs sm:text-sm mt-3 sm:mt-4 font-medium" style={{ color: watchPrimaryColor }}>
            Please include the invoice number as reference when making payment
          </p>
          <p className="text-center text-gray-500 text-xs mt-4 sm:mt-6">Thank you for your business</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
