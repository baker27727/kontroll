// src/components/DropdownFilter.tsx

import { useState, useRef } from 'react';
import { usePopper } from 'react-popper';
import { BsFilter } from 'react-icons/bs';

const DropdownFilter = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const referenceElement = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement.current, popperElement);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block">
      <button
        ref={referenceElement}
        onClick={() => setShowDropdown((prev) => !prev)}
        className="w-full px-4 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 flex justify-between items-center"
      >
        <span>{selectedOption ? selectedOption : 'Filter by Status'}</span>
        <BsFilter className="ml-2" />
      </button>
      {showDropdown && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="bg-white border border-gray-300 rounded-sm shadow-lg mt-2 z-10 w-40"
        >
          <div>
            <button onClick={() => handleOptionClick('`Paid`')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
              Paid
            </button>
            <button onClick={() => handleOptionClick('Not Paid')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
              Not Paid
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
