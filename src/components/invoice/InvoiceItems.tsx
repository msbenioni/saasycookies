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
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-[#30363d]">
              <th className="px-3 py-2 text-left text-xs font-medium text-[#8b949e] uppercase">Description</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-[#8b949e] uppercase w-24">Qty</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-[#8b949e] uppercase w-28">Price</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-[#8b949e] uppercase w-24">Amount</th>
              <th className="px-3 py-2 text-center text-xs font-medium text-[#8b949e] uppercase w-12"></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className="border-b border-[#30363d]/50">
                <td className="px-3 py-2">
                  <input
                    {...register(`invoice.items.${index}.description`)}
                    className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white text-sm focus:outline-none focus:border-[#9e83ff]"
                    placeholder="Item description"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    {...register(`invoice.items.${index}.quantity`, { valueAsNumber: true })}
                    type="number"
                    min="1"
                    className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white text-sm focus:outline-none focus:border-[#9e83ff]"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    {...register(`invoice.items.${index}.price`, { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white text-sm focus:outline-none focus:border-[#9e83ff]"
                  />
                </td>
                <td className="px-3 py-2 text-right font-medium text-[#6affd8]">
                  ${(Number(watchItems[index]?.quantity || 0) * Number(watchItems[index]?.price || 0)).toFixed(2)}
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-[#f85149] hover:text-[#ff6b6b] transition-colors p-1"
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
        className="mt-4 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:scale-105"
        style={{ backgroundColor: watchPrimaryColor }}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Item
      </button>
      
      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-[#30363d]">
        <h4 className="text-base font-semibold text-white mb-4">Invoice Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-[#8b949e]">
            <span>Subtotal:</span>
            <span className="text-white font-medium">${calculateSubtotal().toFixed(2)}</span>
          </div>
          {watchIsGstRegistered && (
            <div className="flex justify-between text-[#8b949e]">
              <span>GST ({watch('invoice.gstRate')}%):</span>
              <span className="text-white font-medium">${calculateGST().toFixed(2)}</span>
            </div>
          )}
          {watch('invoice.isWithholdingTaxEnabled') && (
            <div className="flex justify-between text-[#8b949e]">
              <span>Withholding Tax ({watch('invoice.withholdingTaxRate')}%):</span>
              <span className="text-[#f85149] font-medium">-${calculateWithholdingTax().toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-[#30363d] pt-2 mt-2">
            <span className="font-bold text-white">Total:</span>
            <span className="font-bold text-[#6affd8] text-lg">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceItems;
