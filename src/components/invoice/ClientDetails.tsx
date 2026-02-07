import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface ClientDetailsProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ register, watch }) => {
  const watchPrimaryColor = watch('style.primaryColor');

  return (
    <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d]">
      <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-[#30363d]">
        Client Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Client Name
          </label>
          <input
            {...register('invoice.client.name')}
            className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#9e83ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Address
          </label>
          <input
            {...register('invoice.client.address')}
            className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#9e83ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Email
          </label>
          <input
            {...register('invoice.client.email')}
            type="email"
            className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#9e83ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Phone
          </label>
          <input
            {...register('invoice.client.phone')}
            className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#9e83ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            GST Number (Optional)
          </label>
          <input
            {...register('invoice.client.gstNumber')}
            className="w-full p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#9e83ff]"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
