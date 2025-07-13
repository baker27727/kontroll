import  { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HoverCardProps {
  trigger: ReactNode;
  content: ReactNode;
}

export default function PopperCard({ trigger, content }: HoverCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div onClick={() => setIsVisible(!isVisible)} className="cursor-pointer">
        {trigger}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={cardRef}
            className="absolute z-10 mt-2 w-64 rounded-md shadow-md overflow-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-md ring-1 ring-black ring-opacity-5 bg-white p-4 shadow-sm">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}