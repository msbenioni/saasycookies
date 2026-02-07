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
    <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d]">
      <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-[#30363d]">
        Company Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Company Name
          </label>
          <input
            {...register('company.name')}
            className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#9e83ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Address
          </label>
          <input
            {...register('company.address')}
            className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#9e83ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Email
          </label>
          <input
            {...register('company.email')}
            type="email"
            className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#9e83ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Phone
          </label>
          <input
            {...register('company.phone')}
            className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#9e83ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Bank Name
          </label>
          <input
            {...register('company.bankName')}
            className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#9e83ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Bank Account
          </label>
          <input
            {...register('company.bankAccount')}
            className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#9e83ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            GST Number (Optional)
          </label>
          <input
            {...register('company.gstNumber')}
            className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#9e83ff]"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Logo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-[#6e40c9] file:text-white hover:file:bg-[#7d4fd8]"
          />
          {watchCompany.logo && (
            <div className="mt-3 p-3 bg-[#21262d] rounded-lg">
              <img
                src={watchCompany.logo}
                alt="Company Logo"
                className="h-16 object-contain rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
