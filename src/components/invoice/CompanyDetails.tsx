import React from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { CompanyDetails as CompanyDetailsType } from '../../types';

interface CompanyDetailsProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ 
  register, 
  watch, 
  handleLogoUpload 
}) => {
  const watchPrimaryColor = watch('style.primaryColor');
  const watchCompany = watch('company');

  return (
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
            Bank Name
          </label>
          <input
            {...register('company.bankName')}
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
  );
};

export default CompanyDetails;
