import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Trash2, Plus, FileText, Eye } from 'lucide-react';
import { generatePDF } from '../utils/generatePDF';

const InvoiceForm: React.FC = () => {
  const [previewMode, setPreviewMode] = useState<boolean>(false);

  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      company: { 
        name: '', 
        address: '', 
        email: '', 
        phone: '', 
        bankAccount: '', 
        logo: '',
        gstNumber: '' 
      },
      invoice: { 
        invoiceNumber: '', 
        date: new Date().toISOString().split('T')[0], 
        dueDate: '', 
        client: { 
          name: '', 
          address: '', 
          email: '', 
          phone: '',
          gstNumber: '' 
        }, 
        items: [{ description: '', quantity: 1, price: 0 }], 
        gstRate: 15, 
        withholdingTaxRate: 20, 
        isGstRegistered: true 
      },
      style: { primaryColor: '#6366f1', fontFamily: 'Calibri' },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'invoice.items',
  });

  const watchItems = watch('invoice.items');
  const watchIsGstRegistered = watch('invoice.isGstRegistered');
  const watchPrimaryColor = watch('style.primaryColor');
  const watchFontFamily = watch('style.fontFamily');
  const watchCompany = watch('company');
  const watchInvoice = watch('invoice');

  const calculateSubtotal = () => {
    return watchItems.reduce((sum, item) => {
      return sum + (Number(item.quantity) * Number(item.price));
    }, 0);
  };

  const calculateGST = () => {
    if (!watchIsGstRegistered) return 0;
    const subtotal = calculateSubtotal();
    const gstRate = watch('invoice.gstRate');
    return (subtotal * gstRate) / 100;
  };

  const calculateWithholdingTax = () => {
    const subtotal = calculateSubtotal();
    const withholdingTaxRate = watch('invoice.withholdingTaxRate');
    return (subtotal * withholdingTaxRate) / 100;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const gst = calculateGST();
    const withholdingTax = calculateWithholdingTax();
    return subtotal + gst - withholdingTax;
  };

  const onSubmit = (data: any) => {
    generatePDF(data.company, data.invoice, data.style);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('company.logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreviewToggle = () => {
    setPreviewMode(!previewMode);
  };

  const renderPreview = () => {
    const primaryColor = watchPrimaryColor;
    const fontFamily = watchFontFamily;
    
    return (
      <div 
        className="preview-container" 
        style={{ 
          fontFamily: fontFamily, 
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          padding: '2rem',
          marginBottom: '2rem',
          backgroundColor: 'white',
          position: 'relative'
        }}
      >
        {/* Accent line on the left */}
        <div 
          style={{ 
            position: 'absolute', 
            left: 0, 
            top: 0, 
            bottom: 0, 
            width: '8px', 
            backgroundColor: primaryColor 
          }} 
        />
        
        {/* Header with light background */}
        <div style={{ 
          backgroundColor: '#fafafa', 
          marginLeft: '-2rem', 
          marginRight: '-2rem', 
          marginTop: '-2rem', 
          padding: '2rem', 
          paddingBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex' }}>
            {/* Logo */}
            {watchCompany.logo && (
              <div style={{ marginRight: '1rem' }}>
                <img 
                  src={watchCompany.logo} 
                  alt="Company Logo" 
                  style={{ maxWidth: '100px', maxHeight: '100px' }} 
                />
              </div>
            )}
            
            {/* Company Details */}
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{watchCompany.name}</h3>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>{watchCompany.address}</p>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>{watchCompany.email}</p>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>{watchCompany.phone}</p>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>Bank Account: {watchCompany.bankAccount}</p>
              {watchCompany.gstNumber && (
                <p style={{ margin: '0', fontSize: '0.875rem' }}>GST Number: {watchCompany.gstNumber}</p>
              )}
            </div>
          </div>
          
          {/* Invoice Details - Right Aligned */}
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ 
              color: primaryColor, 
              margin: '0 0 1rem 0', 
              fontSize: '2rem', 
              fontWeight: 'bold' 
            }}>
              INVOICE
            </h2>
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>
              Invoice Number: {watchInvoice.invoiceNumber || 'N/A'}
            </p>
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>
              Date: {watchInvoice.date || 'N/A'}
            </p>
            <p style={{ margin: '0', fontSize: '0.875rem' }}>
              Due Date: {watchInvoice.dueDate || 'N/A'}
            </p>
          </div>
        </div>
        
        {/* Client Details */}
        <div style={{ marginTop: '2rem' }}>
          <h4 style={{ 
            borderBottom: `1px solid ${primaryColor}`, 
            paddingBottom: '0.25rem', 
            marginBottom: '0.5rem',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            Bill To:
          </h4>
          <p style={{ margin: '0 0 0.25rem 0' }}>{watchInvoice.client.name}</p>
          <p style={{ margin: '0 0 0.25rem 0' }}>{watchInvoice.client.address}</p>
          <p style={{ margin: '0 0 0.25rem 0' }}>{watchInvoice.client.email}</p>
          <p style={{ margin: '0 0 0.25rem 0' }}>{watchInvoice.client.phone}</p>
          {watchInvoice.client.gstNumber && (
            <p style={{ margin: '0' }}>GST Number: {watchInvoice.client.gstNumber}</p>
          )}
        </div>
        
        {/* Items Table */}
        <div style={{ marginTop: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: primaryColor, color: 'white' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '0.5rem', textAlign: 'center', width: '100px' }}>Quantity</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', width: '120px' }}>Price</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', width: '120px' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {watchItems.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.5rem' }}>{item.description || 'N/A'}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right' }}>${Number(item.price).toFixed(2)}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                    ${(Number(item.quantity) * Number(item.price)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Totals - Right Aligned */}
        <div style={{ 
          marginTop: '1.5rem', 
          display: 'flex', 
          justifyContent: 'flex-end' 
        }}>
          <div style={{ width: '250px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            
            {watchIsGstRegistered && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span>GST ({watchInvoice.gstRate}%):</span>
                <span>${calculateGST().toFixed(2)}</span>
              </div>
            )}
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span>Withholding Tax ({watchInvoice.withholdingTaxRate}%):</span>
              <span>${calculateWithholdingTax().toFixed(2)}</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              borderTop: '2px solid #e5e7eb',
              paddingTop: '0.5rem',
              fontWeight: 'bold',
              color: primaryColor
            }}>
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div style={{ 
          marginTop: '3rem', 
          textAlign: 'center',
          color: '#9ca3af',
          fontSize: '0.75rem'
        }}>
          Thank you for your business
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Invoice Generator</h1>
      
      <div className="mb-6 flex justify-end space-x-2">
        <button
          type="button"
          onClick={handlePreviewToggle}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white"
          style={{ backgroundColor: watchPrimaryColor }}
        >
          <Eye className="mr-2 h-4 w-4" />
          {previewMode ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      {previewMode && renderPreview()}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ borderBottom: `2px solid ${watchPrimaryColor}`, paddingBottom: '0.5rem' }}>
            Company Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                {...register('company.name')}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                {...register('company.address')}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register('company.email')}
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                {...register('company.phone')}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Account
              </label>
              <input
                {...register('company.bankAccount')}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Number (Optional)
              </label>
              <input
                {...register('company.gstNumber')}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
              {watchCompany.logo && (
                <div className="mt-2">
                  <img
                    src={watchCompany.logo}
                    alt="Company Logo"
                    className="h-20 object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ borderBottom: `2px solid ${watchPrimaryColor}`, paddingBottom: '0.5rem' }}>
            Client Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Name
              </label>
              <input
                {...register('invoice.client.name')}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                {...register('invoice.client.address')}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register('invoice.client.email')}
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                {...register('invoice.client.phone')}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Number (Optional)
              </label>
              <input
                {...register('invoice.client.gstNumber')}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ borderBottom: `2px solid ${watchPrimaryColor}`, paddingBottom: '0.5rem' }}>
            Invoice Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Number
              </label>
              <input
                {...register('invoice.invoiceNumber')}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                {...register('invoice.date')}
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                {...register('invoice.dueDate')}
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <input
                {...register('invoice.isGstRegistered')}
                type="checkbox"
                id="isGstRegistered"
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <label htmlFor="isGstRegistered" className="text-sm font-medium text-gray-700">
                GST Registered
              </label>
            </div>

            {watchIsGstRegistered && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST Rate (%)
                  </label>
                  <input
                    {...register('invoice.gstRate', { valueAsNumber: true })}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ color: watchPrimaryColor }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Withholding Tax Rate (%)
            </label>
            <input
              {...register('invoice.withholdingTaxRate', { valueAsNumber: true })}
              type="number"
              className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ color: watchPrimaryColor }}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Invoice Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fields.map((field, index) => (
                    <tr key={field.id}>
                      <td className="px-4 py-2">
                        <input
                          {...register(`invoice.items.${index}.description` as const)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                          style={{ color: watchPrimaryColor }}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          {...register(`invoice.items.${index}.quantity` as const, { valueAsNumber: true })}
                          type="number"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                          style={{ color: watchPrimaryColor }}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          {...register(`invoice.items.${index}.price` as const, { valueAsNumber: true })}
                          type="number"
                          step="0.01"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                          style={{ color: watchPrimaryColor }}
                        />
                      </td>
                      <td className="px-4 py-2">
                        ${(watchItems[index]?.quantity * watchItems[index]?.price || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
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
              className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white"
              style={{ backgroundColor: watchPrimaryColor }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </button>
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                {watchIsGstRegistered && (
                  <div className="flex justify-between">
                    <span className="font-medium">GST ({watch('invoice.gstRate')}%):</span>
                    <span>${calculateGST().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium">Withholding Tax ({watch('invoice.withholdingTaxRate')}%):</span>
                  <span>${calculateWithholdingTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold" style={{ color: watchPrimaryColor }}>
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ borderBottom: `2px solid ${watchPrimaryColor}`, paddingBottom: '0.5rem' }}>
            Style Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Color
              </label>
              <input
                {...register('style.primaryColor')}
                type="color"
                className="w-full p-1 h-10 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Family
              </label>
              <select
                {...register('style.fontFamily')}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: watchPrimaryColor }}
              >
                <option value="Calibri">Calibri</option>
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
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white"
            style={{ backgroundColor: watchPrimaryColor }}
          >
            <FileText className="mr-2 h-5 w-5" />
            Generate PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;