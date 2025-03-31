import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { generatePDF } from '../utils/generatePDF';
import { Eye, EyeOff, Download } from 'lucide-react';
import CompanyDetails from './invoice/CompanyDetails';
import ClientDetails from './invoice/ClientDetails';
import InvoiceDetails from './invoice/InvoiceDetails';
import InvoiceItems from './invoice/InvoiceItems';
import InvoicePreview from './invoice/InvoicePreview';
import { createSparkles } from '../utils/animationUtils';
import { 
  calculateSubtotal as calculateSubtotalUtil, 
  calculateGST as calculateGSTUtil, 
  calculateWithholdingTax as calculateWithholdingTaxUtil, 
  calculateTotal as calculateTotalUtil 
} from './invoice/InvoiceCalculations';

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
    fontFamily: 'calibri',
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
    getValues,
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
    // This function is now only used for the form submission
    // The PDF generation is handled directly by the Download PDF button
    if (onGenerate) {
      onGenerate(data);
    }
  };

  const handleDownloadPDF = () => {
    try {
      const data = getValues();
      console.log('Generating PDF with data:', data);
      
      // Add a delay before generating the PDF to ensure the UI updates
      setTimeout(() => {
        try {
          // Generate PDF with the updated function signature (invoice, company, style)
          const doc = generatePDF(data.invoice, data.company, data.style);
          
          // Save the PDF
          doc.save(`invoice-${data.invoice.invoiceNumber || 'new'}.pdf`);
          console.log('PDF generated and saved successfully');
          
          // Track the download
          // incrementDownloadCount()
          //   .then(() => console.log('Download tracked successfully'))
          //   .catch(error => console.error('Error tracking download:', error));
            
          // Show a success message to the user
          alert('Invoice PDF downloaded successfully!');
        } catch (pdfError) {
          console.error('Error generating PDF:', pdfError);
          alert('Error generating PDF. Please check the console for details.');
        }
      }, 100);
    } catch (error) {
      console.error('Error in handleDownloadPDF:', error);
      alert('Error preparing PDF data. Please check the console for details.');
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
    <div className="w-full mx-auto py-4 sm:py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center fade-in-up">Invoice Generator</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 flex flex-wrap justify-end gap-2 sm:gap-4">
          <button
            type="button"
            onClick={togglePreview}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white shadow-sm btn-bounce"
            style={{ backgroundColor: watchPrimaryColor }}
          >
            {showPreview ? (
              <>
                <EyeOff className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Hide Preview
              </>
            ) : (
              <>
                <Eye className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Show Preview
              </>
            )}
          </button>
        </div>

        {/* Style Options moved to the top */}
        <div className="bg-white shadow-md rounded-md p-6 mb-6 soft-gradient-2 fade-in-up">
          <h2 className="text-xl font-semibold mb-4" style={{ borderBottom: `2px solid ${watchPrimaryColor}`, paddingBottom: '0.5rem' }}>
            Style Options
          </h2>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="cookie-gradient-bg rounded-lg p-5 shadow-md fade-in-left">
            <CompanyDetails 
              register={register} 
              handleLogoUpload={handleLogoUpload} 
              watchPrimaryColor={watchPrimaryColor} 
            />
          </div>
          
          <div className="cookie-gradient-bg rounded-lg p-5 shadow-md fade-in-right">
            <ClientDetails 
              register={register} 
              watchPrimaryColor={watchPrimaryColor} 
            />
          </div>
        </div>

        <div className="mt-6 cookie-gradient-bg rounded-lg p-5 shadow-md fade-in-up">
          <InvoiceDetails 
            register={register} 
            control={control} 
            watchPrimaryColor={watchPrimaryColor}
            watchIsGstRegistered={watchIsGstRegistered}
          />
        </div>

        <div className="mt-6 cookie-gradient-bg rounded-lg p-5 shadow-md fade-in-up">
          <InvoiceItems 
            fields={fields} 
            register={register} 
            remove={remove} 
            append={append} 
            control={control}
            watchPrimaryColor={watchPrimaryColor}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            type="submit" 
            className="sparkle-btn inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#00FFD1] to-[#FF3CAC] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 btn-bounce"
            onClick={createSparkles}
          >
            <Download className="mr-2 h-5 w-5" /> Generate Invoice
          </button>
        </div>
      </form>

      {showPreview && (
        <div className="mt-8 fade-in-up">
          <h2 className="text-xl font-semibold mb-4 text-center">Invoice Preview</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <InvoicePreview 
              formData={getValues()} 
              subtotal={calculateSubtotal()}
              gst={calculateGST()}
              withholdingTax={calculateWithholdingTax()}
              total={calculateTotal()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;
