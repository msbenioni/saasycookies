import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Trash2, Plus } from 'lucide-react';

interface InvoiceItemsProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  fields: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
  calculateSubtotal: () => number;
  calculateGST: () => number;
  calculateWithholdingTax: () => number;
  calculateTotal: () => number;
}

const InvoiceItems: React.FC<InvoiceItemsProps> = ({ 
  register, 
  watch, 
  fields, 
  append, 
  remove,
  calculateSubtotal,
  calculateGST,
  calculateWithholdingTax,
  calculateTotal
}) => {
  const watchPrimaryColor = watch('style.primaryColor');
  const watchItems = watch('invoice.items');
  const watchIsGstRegistered = watch('invoice.isGstRegistered');

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Invoice Items</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td className="px-4 py-2">
                  <input
                    {...register(`invoice.items.${index}.description`)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ color: watchPrimaryColor }}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    {...register(`invoice.items.${index}.quantity`, { valueAsNumber: true })}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ color: watchPrimaryColor }}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    {...register(`invoice.items.${index}.price`, { valueAsNumber: true })}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ color: watchPrimaryColor }}
                  />
                </td>
                <td className="px-4 py-2 text-right font-medium" style={{ color: watchPrimaryColor }}>
                  ${(Number(watchItems[index]?.quantity || 0) * Number(watchItems[index]?.price || 0)).toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button
        type="button"
        onClick={() => append({ description: '', quantity: 1, price: 0 })}
        className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white shadow-sm"
        style={{ backgroundColor: watchPrimaryColor }}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Item
      </button>
      
      {/* Real-time Calculations */}
      <div className="mt-6 bg-white p-5 rounded-md border border-gray-300 shadow-md">
        <h4 className="text-lg font-semibold mb-4 pb-2" style={{ color: watchPrimaryColor, borderBottom: `2px solid ${watchPrimaryColor}` }}>Invoice Summary</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Subtotal:</span>
            <span className="font-medium" style={{ color: watchPrimaryColor }}>${calculateSubtotal().toFixed(2)}</span>
          </div>
          {watchIsGstRegistered && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">GST ({watch('invoice.gstRate')}%):</span>
              <span className="font-medium" style={{ color: watchPrimaryColor }}>${calculateGST().toFixed(2)}</span>
            </div>
          )}
          {watch('invoice.isWithholdingTaxEnabled') && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Withholding Tax ({watch('invoice.withholdingTaxRate')}%):</span>
              <span className="font-medium" style={{ color: watchPrimaryColor }}>${calculateWithholdingTax().toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between border-t pt-3 mt-2">
            <span className="font-bold text-lg text-gray-700">Total:</span>
            <span className="font-bold text-lg" style={{ color: watchPrimaryColor }}>
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceItems;
