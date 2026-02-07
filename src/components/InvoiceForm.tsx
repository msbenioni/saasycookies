import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { generatePDF } from '../utils/generatePDF';
import { Eye, EyeOff, Download, Palette } from 'lucide-react';
import CompanyDetails from './invoice/CompanyDetails';
import ClientDetails from './invoice/ClientDetails';
import InvoiceDetails from './invoice/InvoiceDetails';
import InvoiceItems from './invoice/InvoiceItems';
import InvoicePreview from './invoice/InvoicePreview';
import { 
  calculateSubtotal as calculateSubtotalUtil, 
  calculateGST as calculateGSTUtil, 
  calculateWithholdingTax as calculateWithholdingTaxUtil, 
  calculateTotal as calculateTotalUtil 
} from './invoice/InvoiceCalculations';
import { invoiceStyles } from '../design-tokens';

// Default form values using design tokens
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
    primaryColor: invoiceStyles.defaults.primaryColor,
    fontFamily: invoiceStyles.defaults.fontFamily,
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
          alert('PDF is out of the cookie jar and into your downloads! 🎉🍪');
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
    <div className="w-full">
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#b388ff]" />
          <span className="text-[#8b949e] text-sm">Customize your invoice style</span>
        </div>
        <button
          type="button"
          onClick={togglePreview}
          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#6e40c9] hover:bg-[#7d4fd8] transition-colors"
        >
          {showPreview ? (
            <><EyeOff className="mr-2 h-4 w-4" /> Hide Preview</>
          ) : (
            <><Eye className="mr-2 h-4 w-4" /> Show Preview</>
          )}
        </button>
      </div>

      {/* Style Options - Compact */}
      <div className="bg-[#161b22] rounded-xl p-4 mb-6 border border-[#30363d]">
        <label className="block text-sm font-medium text-[#8b949e] mb-2">
          Primary Color
        </label>
        <div className="flex items-center gap-3">
          <input
            {...register('style.primaryColor')}
            type="color"
            className="w-12 h-10 rounded-lg border border-[#30363d] cursor-pointer"
          />
          <span className="text-[#c9d1d9] text-sm font-mono">{watchPrimaryColor}</span>
        </div>
      </div>

      {showPreview && (
        <div className="mb-6">
          <InvoicePreview
            watch={watch}
            calculateSubtotal={calculateSubtotal}
            calculateGST={calculateGST}
            calculateWithholdingTax={calculateWithholdingTax}
            calculateTotal={calculateTotal}
          />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
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

          <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d]">
            <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-[#30363d]">
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
          
          {/* Download PDF button */}
          <div className="flex justify-center pt-4">
            <button
              type="button"
              className="inline-flex items-center px-8 py-3 rounded-xl text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
              style={{ 
                background: `linear-gradient(135deg, ${watchPrimaryColor}, #6e40c9)`
              }}
              onClick={handleDownloadPDF}
            >
              <Download className="mr-2 h-5 w-5" /> Download PDF
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
