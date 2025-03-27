import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface ClientDetailsProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ register, watch }) => {
  const watchPrimaryColor = watch('style.primaryColor');

  return (
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
  );
};

export default ClientDetails;
