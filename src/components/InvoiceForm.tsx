import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { generatePDF } from '../utils/generatePDF';
import { Eye, EyeOff, Download } from 'lucide-react';

// Import the separated components
import {
  CompanyDetails,
  ClientDetails,
  InvoiceDetails,
  InvoiceItems,
  StyleOptions,
  InvoicePreview,
  calculateSubtotal as calculateSubtotalUtil,
  calculateGST as calculateGSTUtil,
  calculateWithholdingTax as calculateWithholdingTaxUtil,
  calculateTotal as calculateTotalUtil
} from './invoice';

// Default form values
const defaultValues = {
  company: {
    name: '',
    address: '',
    email: '',
    phone: '',
    bankName: '',
    bankAccount: '',
    gstNumber: '',
    logo: '',
  },
  invoice: {
    invoiceNumber: '',
    date: new Date().toLocaleDateString('en-GB'),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30))
      .toLocaleDateString('en-GB'),
    isGstRegistered: false,
    gstRate: 15,
    isWithholdingTaxEnabled: false,
    withholdingTaxRate: 20,
    client: {
      name: '',
      address: '',
      email: '',
      phone: '',
      gstNumber: '',
    },
    items: [
      {
        description: '',
        quantity: 1,
        price: 0,
      },
    ],
  },
  style: {
    primaryColor: '#6366f1',
    fontFamily: 'helvetica',
  },
};

interface InvoiceFormProps {
  onGenerate?: (data: any) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onGenerate }) => {
  const [showPreview, setShowPreview] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { /* errors */ },
  } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'invoice.items',
  });

  const watchItems = watch('invoice.items');
  const watchIsGstRegistered = watch('invoice.isGstRegistered');
  const watchPrimaryColor = watch('style.primaryColor');

  // Calculation functions that use the utility functions
  const calculateSubtotal = () => {
    return calculateSubtotalUtil(watchItems);
  };

  const calculateGST = () => {
    return calculateGSTUtil(
      watchItems,
      watchIsGstRegistered,
      watch('invoice.gstRate')
    );
  };

  const calculateWithholdingTax = () => {
    return calculateWithholdingTaxUtil(
      watchItems,
      watch('invoice.isWithholdingTaxEnabled'),
      watch('invoice.withholdingTaxRate')
    );
  };

  const calculateTotal = () => {
    return calculateTotalUtil(
      watchItems,
      watchIsGstRegistered,
      watch('invoice.gstRate'),
      watch('invoice.isWithholdingTaxEnabled'),
      watch('invoice.withholdingTaxRate')
    );
  };

  const onSubmit = (data: any) => {
    if (onGenerate) {
      onGenerate(data);
    } else {
      generatePDF(data.company, data.invoice, data.style);
    }
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

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Invoice Generator</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={togglePreview}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white shadow-sm"
            style={{ backgroundColor: watchPrimaryColor }}
          >
            {showPreview ? (
              <>
                <EyeOff className="mr-2 h-5 w-5" /> Hide Preview
              </>
            ) : (
              <>
                <Eye className="mr-2 h-5 w-5" /> Show Preview
              </>
            )}
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white shadow-sm"
            style={{ backgroundColor: watchPrimaryColor }}
          >
            <Download className="mr-2 h-5 w-5" /> Download PDF
          </button>
        </div>

        {showPreview && (
          <InvoicePreview
            watch={watch}
            calculateSubtotal={calculateSubtotal}
            calculateGST={calculateGST}
            calculateWithholdingTax={calculateWithholdingTax}
            calculateTotal={calculateTotal}
          />
        )}

        <div className="space-y-6">
          <CompanyDetails
            register={register}
            watch={watch}
            setValue={setValue}
            handleLogoUpload={handleLogoUpload}
          />

          <ClientDetails
            register={register}
            watch={watch}
          />

          <InvoiceDetails
            register={register}
            watch={watch}
            setValue={setValue}
          />

          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ borderBottom: `2px solid ${watchPrimaryColor}`, paddingBottom: '0.5rem' }}>
              Invoice Items
            </h2>
            <InvoiceItems
              register={register}
              watch={watch}
              fields={fields}
              append={append}
              remove={remove}
              calculateSubtotal={calculateSubtotal}
              calculateGST={calculateGST}
              calculateWithholdingTax={calculateWithholdingTax}
              calculateTotal={calculateTotal}
            />
          </div>

          <StyleOptions
            register={register}
            watch={watch}
          />
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
