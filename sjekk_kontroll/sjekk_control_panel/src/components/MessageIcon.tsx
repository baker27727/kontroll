import { AnimatePresence, motion } from "framer-motion";
import { Mail, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const messageTypes = {
  personal: { icon: User, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
  system: { icon: Mail, bgColor: 'bg-gray-100', iconColor: 'text-gray-600' },
};

const messages = [
  { id: 1, type: 'personal', message: 'New message from John Doe', time: '1 hour ago' },
  { id: 2, type: 'system', message: 'System update available', time: '3 hours ago' },
  { id: 3, type: 'personal', message: 'Meeting scheduled for tomorrow', time: '1 day ago' },
  { id: 1, type: 'personal', message: 'New message from John Doe', time: '1 hour ago' },
  { id: 2, type: 'system', message: 'System update available', time: '3 hours ago' },
  { id: 3, type: 'personal', message: 'Meeting scheduled for tomorrow', time: '1 day ago' },
  { id: 1, type: 'personal', message: 'New message from John Doe', time: '1 hour ago' },
  { id: 2, type: 'system', message: 'System update available', time: '3 hours ago' },
  { id: 3, type: 'personal', message: 'Meeting scheduled for tomorrow', time: '1 day ago' },
];

export default function MessagesIcon() {
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
        className="relative p-2 text-gray-400 hover:text-gray-500"
      >
        <Mail className="h-5 w-5" />
        <span className="absolute animate-bounce top-1 right-1 block h-[6px] w-[6px] rounded-full bg-red-400 ring-2 ring-white"></span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded z-50 shadow py-1 border border-slate-200"
          >
            <div className="px-4 py-2 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
            </div>
            <div className="max-h-96 overflow-y-auto custom-scroll">
              {messages.map(message => {
                const { icon: Icon, bgColor, iconColor } = messageTypes[message.type];
                return (
                  <div key={message.id} className="px-4 py-3 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 ${bgColor} rounded-full p-2 mr-3`}>
                        <Icon className={`h-5 w-5 ${iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{message.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-4 py-2 border-t border-gray-200">
              <button
                onClick={() => {/* Navigate to messages page */}}
                className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                View all messages
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
