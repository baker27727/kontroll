import { useState } from 'react';

interface SwitchProps {
  label: string;
  initialState?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function SwitchComponent({ label, initialState = false, onChange }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div className={`block w-10 h-6 rounded-full transition-colors duration-300 ease-in-out ${isChecked ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${isChecked ? 'transform translate-x-4' : ''}`}></div>
      </div>
      <div className="ml-3 text-gray-700 font-medium">
        {label}
      </div>
    </label>
  );
}