import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownMenuItem {
  label: string;
  icon?: React.ReactNode;
  hoverColor?: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: 'left' | 'right';
  direction?: 'down' | 'up' | 'left' | 'right';
  offset?: { x: number; y: number };
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  trigger, 
  items, 
  align = 'left', 
  direction = 'down',
  offset = { x: 0, y: 0 }
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

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
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  const getDropdownPosition = () => {
    if (!triggerRef.current) return {};
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    switch (direction) {
      case 'up':
        top = -triggerRect.height - offset.y;
        left = align === 'right' ? -176 + triggerRect.width + offset.x : offset.x;
        break;
      case 'down':
        top = triggerRect.height + offset.y;
        left = align === 'right' ? -176 + triggerRect.width + offset.x : offset.x;
        break;
      case 'left':
        top = offset.y;
        left = -176 - offset.x;
        break;
      case 'right':
        top = offset.y;
        left = triggerRect.width + offset.x;
        break;
    }

    // Adjust position if it goes off-screen
    if (triggerRect.left + left < 0) {
      left = -triggerRect.left;
    } else if (triggerRect.left + left + 176 > viewportWidth) {
      left = viewportWidth - triggerRect.left - 176;
    }

    if (triggerRect.top + top < 0) {
      top = -triggerRect.top;
    } else if (triggerRect.top + top + 200 > viewportHeight) { // Assuming max height of 200px for dropdown
      top = viewportHeight - triggerRect.top - 200;
    }

    return { top, left };
  };

  return (
    <div className="relative text-left flex" ref={dropdownRef}>
      <div
        ref={triggerRef}
        onClick={toggleDropdown}
        className="flex items-center cursor-pointer transition-colors duration-200 ease-in-out"
      >
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            style={getDropdownPosition()}
            className="absolute z-50 w-40 rounded shadow border bg-white ring-1 ring-black ring-opacity-5"
          >
            <div className="py-1 px-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {items.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-${item.hoverColor ?? 'blue'}-100 hover:text-gray-900 flex items-center transition duration-200`}
                  role="menuitem"
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  <p>{item.label}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;