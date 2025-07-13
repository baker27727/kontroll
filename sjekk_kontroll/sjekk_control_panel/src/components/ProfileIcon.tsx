import { AnimatePresence, motion } from "framer-motion";
import { Settings, LogOut, UserCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 rounded-full transition-colors duration-200"
      >
        <UserCircle className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 w-60 bg-white rounded shadow z-20 border border-slate-200 overflow-hidden"
          >
            <div className="px-2 py-2 border-b border-gray-200 bg-gradient-to-r from-indigo-200 via-blue-200 to-green-200">
              <div className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/50" // Replace with actual profile picture URL
                  alt="Profile"
                  className="w-14 h-14 rounded border-2 border-white shadow-sm"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-700">john.doe@example.com</p>
                </div>
              </div>
            </div>
            <div className="p-1">
              <button
                onClick={() => {/* Navigate to profile page */}}
                className="flex items-center px-2 py-2 w-full text-left hover:bg-blue-100 text-sm text-gray-900 transition-colors duration-200"
              >
                <UserCircle className="h-5 w-5  mr-1" />
                <span className="ml-1">View Profile</span>
              </button>
              <button
                onClick={() => {/* Navigate to settings page */}}
                className="flex items-center px-2 py-2 w-full text-left hover:bg-blue-100 text-sm text-gray-900 transition-colors duration-200"
              >
                <Settings className="h-5 w-5  mr-1" />
                <span className="ml-1">Settings</span>
              </button>
              <button
                onClick={() => {/* Logout function */}}
                className="flex items-center px-2 py-2 w-full text-left hover:bg-blue-100 text-sm text-gray-900 transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 text-red-600 mr-1" />
                <span className="ml-1">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
