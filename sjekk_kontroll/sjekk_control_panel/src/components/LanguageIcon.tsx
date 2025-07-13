import { AnimatePresence, motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'EN', name: 'English', flag: '/src/assets/us.png' },
  { code: 'AR', name: 'Arabic', flag: '/src/assets/eg.png' },
  { code: 'NO', name: 'Norwegian', flag: '/src/assets/no.png' },
  // Add more languages as needed
];

export default function LanguageIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleLanguageChange = (code: string) => {
    // Implement language change functionality here
    console.log(`Language changed to: ${code}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 rounded"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded shadow z-50 border border-gray-200"
          >
            <div className="px-4 py-2 border-b border-gray-200">
              <h3 className="text-md font-semibold text-gray-900">Select Language</h3>
            </div>
            <div className="p-1">
              {languages.map(language => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className="flex items-center px-2 py-2 w-full text-left hover:bg-blue-100 text-sm text-gray-900"
                >
                  <img src={language.flag} className="mr-2 w-5 h-5" />
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
