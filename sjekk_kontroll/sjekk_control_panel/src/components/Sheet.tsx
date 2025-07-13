import  { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export default function Sheet({ isOpen, onClose, children, position = 'right' }: SheetProps) {
  const positionClasses = {
    left: 'inset-y-0 left-0 max-w-xl w-full',
    right: 'inset-y-0 right-0 max-w-xl w-full',
    top: 'inset-x-0 top-0 max-h-xl h-full',
    bottom: 'inset-x-0 bottom-0 max-h-xl h-full',
  };

  const motionVariants = {
    left: { x: '-100%' },
    right: { x: '100%' },
    top: { y: '-100%' },
    bottom: { y: '100%' },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={`fixed ${positionClasses[position]} bg-white shadow-md z-50 overflow-y-auto`}
            initial={motionVariants[position]}
            animate={{ x: 0, y: 0 }}
            exit={motionVariants[position]}
            transition={{ type: 'keyframes', damping: 25, stiffness: 300 }}
          >
            <div className="p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close sheet"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}