import React from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';

interface InvoiceDetailsProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ register, watch, setValue }) => {
  const watchPrimaryColor = watch('style.primaryColor');
  const watchIsGstRegistered = watch('invoice.isGstRegistered');

  const convertDateFormat = (dateString: string) => {
    if (!dateString) return '';
    const dateParts = dateString.split('/');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  };

  const formatDateToDDMMYYYY = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
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
            placeholder="e.g. INV-2025-001"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ color: watchPrimaryColor }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ color: watchPrimaryColor }}
              value={convertDateFormat(watch('invoice.date'))}
              onChange={(e) => {
                if (e.target.value) {
                  const formattedDate = formatDateToDDMMYYYY(e.target.value);
                  setValue('invoice.date', formattedDate);
                }
              }}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ color: watchPrimaryColor }}
              value={convertDateFormat(watch('invoice.dueDate'))}
              onChange={(e) => {
                if (e.target.value) {
                  const formattedDate = formatDateToDDMMYYYY(e.target.value);
                  setValue('invoice.dueDate', formattedDate);
                }
              }}
            />
          </div>
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
        <div className="flex items-center mb-4">
          <input
            {...register('invoice.isWithholdingTaxEnabled')}
            type="checkbox"
            id="isWithholdingTaxEnabled"
            className="mr-2 h-4 w-4 text-blue-600"
          />
          <label htmlFor="isWithholdingTaxEnabled" className="text-sm font-medium text-gray-700">
            Enable Withholding Tax
          </label>
        </div>

        {watch('invoice.isWithholdingTaxEnabled') && (
          <div>
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
        )}
      </div>
    </div>
  );
};

export default InvoiceDetails;
