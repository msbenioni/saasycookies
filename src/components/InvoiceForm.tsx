import React, { useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, FileDown, Receipt, Upload, X } from 'lucide-react';
import { CompanyDetails, InvoiceDetails, StyleOptions } from '../types';

interface InvoiceFormProps {
  onGenerate: (data: {
    company: CompanyDetails;
    invoice: InvoiceDetails;
    style: StyleOptions;
  }) => void;
}

export default function InvoiceForm({ onGenerate }: InvoiceFormProps) {
  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      company: {
        name: '',
        address: '',
        email: '',
        phone: '',
        bankAccount: '',
        logo: '',
      },
      invoice: {
        invoiceNumber: '',
        date: new Date().toISOString().split('T')[0],
        dueDate: '',
        items: [{ description: '', quantity: 1, price: 0 }],
        gstRate: 15,
        withholdingTaxRate: 20,
      },
      style: {
        primaryColor: '#2563eb',
        fontFamily: 'Arial',
      },
    },
  });

  const handleLogoUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setValue('company.logo', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [setValue]);

  const handleRemoveLogo = useCallback(() => {
    setValue('company.logo', '');
  }, [setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'invoice.items',
  });

  const items = watch('invoice.items');
  const subtotal = items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0);
  const gstRate = watch('invoice.gstRate');
  const withholdingTaxRate = watch('invoice.withholdingTaxRate');
  const gst = (subtotal * gstRate) / 100;
  const withholdingTax = (subtotal * withholdingTaxRate) / 100;
  const total = subtotal + gst - withholdingTax;
  const logo = watch('company.logo');

  return (
    <form onSubmit={handleSubmit(onGenerate)} className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          Company Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              {...register('company.name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('company.email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              {...register('company.phone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank Account</label>
            <input
              {...register('company.bankAccount')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              {...register('company.address')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2 space-y-4">
            <label className="block text-sm font-medium text-gray-700">Company Logo</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50">
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">Upload Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
              {logo && (
                <>
                  <div className="w-20 h-20 border rounded-lg overflow-hidden">
                    <img src={logo} alt="Company logo" className="w-full h-full object-contain" />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                    title="Remove logo"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
            <input
              {...register('invoice.invoiceNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              {...register('invoice.date')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              {...register('invoice.dueDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Items</h3>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-start">
                <div className="flex-grow">
                  <input
                    {...register(`invoice.items.${index}.description`)}
                    placeholder="Description"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    {...register(`invoice.items.${index}.quantity`)}
                    placeholder="Qty"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    step="0.01"
                    {...register(`invoice.items.${index}.price`)}
                    placeholder="Price"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => append({ description: '', quantity: 1, price: 0 })}
            className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">GST Rate (%)</label>
            <input
              type="number"
              {...register('invoice.gstRate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Withholding Tax Rate (%)</label>
            <input
              type="number"
              {...register('invoice.withholdingTaxRate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 space-y-2 text-right">
          <p className="text-sm text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
          <p className="text-sm text-gray-600">GST (${gstRate}%): ${gst.toFixed(2)}</p>
          <p className="text-sm text-gray-600">Withholding Tax (${withholdingTaxRate}%): ${withholdingTax.toFixed(2)}</p>
          <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Style Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Color</label>
            <input
              type="color"
              {...register('style.primaryColor')}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Font Family</label>
            <select
              {...register('style.fontFamily')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier">Courier</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <FileDown className="w-5 h-5" />
          Generate Invoice
        </button>
      </div>
    </form>
  );
}