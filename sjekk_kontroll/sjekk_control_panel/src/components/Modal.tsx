import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, size = 'sm', showCloseButton = true }) => {
  const sizeClasses = {
    sm: 'sm:max-w-lg',
    md: 'sm:max-w-xl',
    lg: 'sm:max-w-2xl',
    xl: 'sm:max-w-3xl',
    '2xl': 'sm:max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[rgb(97,98,98)] bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={onClose}
            ></motion.div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
              }}
              exit={{ 
                scale: 0.95, 
                opacity: 0, 
                transition: {
                  duration: 0.1
                }
              }}
              className={`inline-block align-bottom bg-white rounded-lg text-left shadow-md transform transition-all sm:my-8 sm:align-middle sm:w-full relative ${sizeClasses[size]}`}
            >
              <div className="bg-white p-3 rounded-lg overflow-y-auto custom-scroll max-h-[calc(100vh-90px)]">
                <div className="sm:flex sm:items-start ">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    {
                      title && (
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                          {title}
                        </h3>
                      )
                    }
                    <div className={`${title ? 'mt-2' : ''}`}>
                      {children}
                    </div>
                  </div>
                </div>
              </div>
              {
                showCloseButton && (
                  <motion.button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={24} />
                  </motion.button>
                )
              }
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;