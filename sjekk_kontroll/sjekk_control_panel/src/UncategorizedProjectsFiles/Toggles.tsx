import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ToggleSwitchProps {
  onToggle: (isChecked: boolean) => void;
  initialState?: boolean;
}

export const LightDarkToggle: React.FC<ToggleSwitchProps> = ({ onToggle, initialState = false }) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onToggle(newState);
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-200 rounded-full p-1">
      <Sun className="w-5 h-5 text-yellow-500" />
      <button
        className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isChecked ? 'bg-gray-600' : 'bg-white'
        }`}
        onClick={handleToggle}
      >
        <span className="sr-only">{isChecked ? 'Dark Mode' : 'Light Mode'}</span>
        <span
          className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
            isChecked ? 'translate-x-7 bg-gray-800' : ''
          }`}
        />
      </button>
      <Moon className="w-5 h-5 text-gray-600" />
    </div>
  );
};

export const SimpleToggle: React.FC<ToggleSwitchProps> = ({ onToggle, initialState = false }) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onToggle(newState);
  };

  return (
    <button
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isChecked ? 'bg-blue-600' : 'bg-gray-200'
      }`}
      onClick={handleToggle}
    >
      <span className="sr-only">{isChecked ? 'On' : 'Off'}</span>
      <span
        className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
          isChecked ? 'translate-x-7' : ''
        }`}
      />
    </button>
  );
};

export const ColoredToggle: React.FC<ToggleSwitchProps & { color: string }> = ({ onToggle, initialState = false, color }) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onToggle(newState);
  };

  return (
    <button
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isChecked ? color : 'bg-gray-200'
      }`}
      onClick={handleToggle}
    >
      <span className="sr-only">{isChecked ? 'On' : 'Off'}</span>
      <span
        className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
          isChecked ? 'translate-x-7' : ''
        }`}
      />
    </button>
  );
};

interface SegmentedControlProps {
  options: string[];
  onSelect: (selected: string) => void;
  initialSelected?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, onSelect, initialSelected = options[0] }) => {
  const [selected, setSelected] = useState(initialSelected);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <div className="flex bg-blue-600 rounded-full p-1">
      {options.map((option) => (
        <button
          key={option}
          className={`px-4 py-2 rounded-full transition-colors duration-300 ${
            selected === option ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-700'
          }`}
          onClick={() => handleSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default function ToggleSwitchesDemo() {
  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <div>
        <h2 className="text-lg font-semibold mb-2">Light/Dark Toggle</h2>
        <LightDarkToggle onToggle={(isChecked) => console.log('Light/Dark:', isChecked)} />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Segmented Control</h2>
        <SegmentedControl
          options={['Latest', 'Popular']}
          onSelect={(selected) => console.log('Selected:', selected)}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Simple Toggle</h2>
        <SimpleToggle onToggle={(isChecked) => console.log('Simple Toggle:', isChecked)} />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Yellow Toggle</h2>
        <ColoredToggle
          color="bg-yellow-400"
          onToggle={(isChecked) => console.log('Yellow Toggle:', isChecked)}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Green Toggle</h2>
        <ColoredToggle
          color="bg-green-500"
          onToggle={(isChecked) => console.log('Green Toggle:', isChecked)}
        />
      </div>
    </div>
  );
}