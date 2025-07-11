import React from 'react';

export const InputBox = ({ 
  label, 
  placeholder, 
  onChange,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};
