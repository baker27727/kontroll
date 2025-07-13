import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`px-2 py-1 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};

