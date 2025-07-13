import  { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
}

export default function Select({ options, placeholder = 'Select an option', onChange, className }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className={`relative inline-block text-left min-w-40 ${className}`} ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronDown
            className={`ml-2 -mr-1 h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="origin-top-right absolute z-50 right-0 mt-2 w-full rounded border shadow bg-white ring-1 px-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1" role="listbox">
              {
                options.length === 0 ? <p className="text-center text-gray-500 text-sm">No options</p> : null
              }
              {options.map((option, index) => (
                <motion.button
                  key={option.value}
                  className={`block w-full text-left px-4 py-2 text-sm ${index === options.length - 1 ? '' : 'mb-2' } bg-white hover:bg-blue-100 rounded  transition-all duration-300`}
                  role="option"
                  onClick={() => handleSelect(option)}
                  aria-selected={selectedOption?.value === option.value}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}