import { Check } from 'lucide-react';

const Checkbox = ({ label, color = 'primary', checked, onChange, className = null }) => {
  const colorClasses = {
    primary: 'text-blue-600 border-blue-600',
    success: 'text-green-600 border-green-600',
    secondary: 'text-purple-600 border-purple-600',
    danger: 'text-red-600 border-red-600',
    warning: 'text-orange-600 border-orange-600',
    info: 'text-sky-600 border-sky-600',
    dark: 'text-gray-800 border-gray-800',
  };

  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`w-5 h-5 border-2 rounded transition-all duration-200 ${
            checked ? colorClasses[color] : 'border-gray-300'
          }`}
        >
          {checked && (
            <Check
              className={`w-4 h-4 text-gray-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${colorClasses[color]}`}
            />
          )}
        </div>
      </div>
      <span className={`ml-1 ${checked ? colorClasses[color] : 'text-gray-700'}`}>
        {label}
      </span>
    </label>
  );
};

export default Checkbox;