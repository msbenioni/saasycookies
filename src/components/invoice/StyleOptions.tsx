import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { invoiceStyles } from '../../design-tokens';

interface StyleOptionsProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
}

const StyleOptions: React.FC<StyleOptionsProps> = ({ register, watch }) => {
  const watchPrimaryColor = watch('style.primaryColor');

  return (
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
            {invoiceStyles.fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default StyleOptions;
