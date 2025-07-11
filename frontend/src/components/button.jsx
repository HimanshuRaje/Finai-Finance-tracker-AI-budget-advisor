import React from 'react';

export const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-600 text-white py-2 font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
    >
      {label}
    </button>
  );
};
