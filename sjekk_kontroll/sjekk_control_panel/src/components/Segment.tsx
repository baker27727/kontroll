import { useState } from 'react';
import { motion } from 'framer-motion';

const SegmentedControl = ({ options, defaultSelected, onChange }) => {
  const [selected, setSelected] = useState(defaultSelected || options[0].value);

  const handleSelect = (value) => {
    setSelected(value);
    onChange && onChange(value);
  };

  return (
    <div className="relative p-1 bg-white rounded shadow border">
      <div className="relative flex">
        {options.map((option) => (
          <button
            key={option.value}
            className={`flex-1 py-2 px-4 text-sm font-medium text-center transition-colors duration-200 relative z-10 ${
              selected === option.value ? 'text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 bg-slate-800 rounded-md shadow-sm"
          initial={false}
          animate={{
            x: options.findIndex((option) => option.value === selected) * 100 + '%',
            width: 100 / options.length + '%',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
};

// Demo usage
const SegmentedControlDemo = () => {
  const [selectedView, setSelectedView] = useState('day');

  const options = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Segmented Control Demo</h2>
      <div className="max-w-md mx-auto">
        <SegmentedControl
          options={options}
          defaultSelected="week"
          onChange={(value) => setSelectedView(value)}
        />
      </div>
      <p className="text-center mt-4">
        Selected view: <strong>{selectedView}</strong>
      </p>
    </div>
  );
};

export default SegmentedControlDemo;