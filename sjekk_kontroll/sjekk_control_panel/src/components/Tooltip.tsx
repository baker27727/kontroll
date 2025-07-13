import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export default function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };

  // const arrowStyles = {
  //   top: 'left-1/2 transform -translate-x-1/2 top-full',
  //   right: 'top-1/2 transform -translate-y-1/2 left-full',
  //   bottom: 'left-1/2 transform -translate-x-1/2 bottom-full',
  //   left: 'top-1/2 transform -translate-y-1/2 right-full',
  // };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-pointer"
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute z-20 ${positionStyles[position]} w-max max-w-xs`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="relative bg-gray-900 text-white text-sm rounded py-2 px-3 shadow">
              <span className="block">{content}</span>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
