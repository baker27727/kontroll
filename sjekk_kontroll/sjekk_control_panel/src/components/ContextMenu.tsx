import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContextMenuItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
}

interface ContextMenuProps {
  children: ReactNode;
  menuItems: ContextMenuItem[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({ children, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(true);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div onContextMenu={handleContextMenu}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
          onContextMenu={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
            ref={contextMenuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: position.y,
              left: position.x,
              zIndex: 1000,
            }}
            className="bg-white rounded shadow-sm border border-slate-300 w-40 p-1"
          >
            <div className="max-h-96 overflow-y-auto custom-scroll">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className=" hover:bg-blue-100 cursor-pointer rounded-sm"
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 p-1.5`}>
                      <span className={`h-4 w-4 ${item.color ? `text-${item.color}-600` : 'text-gray-600'}`}>
                        {item.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{item.label}</p>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContextMenu;