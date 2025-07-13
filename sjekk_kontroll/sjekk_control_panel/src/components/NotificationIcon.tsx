import { AnimatePresence, motion } from "framer-motion";
import { Bell, Car, DollarSign, Home, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const notificationTypes = {
  payment: { icon: DollarSign, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
  parking: { icon: Car, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
  apartment: { icon: Home, bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  user: { icon: User, bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
  system: { icon: Bell, bgColor: 'bg-gray-100', iconColor: 'text-gray-600' },
};

const notifications = [
  { id: 1, type: 'payment', message: 'Payment of 500 NOK received for parking', time: '2 hours ago' },
  { id: 2, type: 'parking', message: 'Your parking session will expire in 30 minutes', time: '30 minutes ago' },
  { id: 3, type: 'apartment', message: 'New apartment registration request received', time: '1 day ago' },
  { id: 4, type: 'user', message: 'Profile information updated successfully', time: '2 days ago' },
  { id: 5, type: 'system', message: 'System maintenance scheduled for tonight', time: '3 days ago' },
];

export default function NotificationIcon() {
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
    <div className="relative" ref={dropdownRef} style={{ zIndex: 9999 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-500"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute animate-bounce top-1 right-1 block h-[6px] w-[6px] rounded-full bg-red-400 ring-2 ring-white"></span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded shadow py-1 z-[9999] border border-slate-200"
          >
            <div className="px-4 py-2 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto custom-scroll">
              {notifications.map(notification => {
                const { icon: Icon, bgColor, iconColor } = notificationTypes[notification.type];
                return (
                  <div key={notification.id} className="px-4 py-3 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 ${bgColor} rounded-full p-2 mr-3`}>
                        <Icon className={`h-5 w-5 ${iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-4 py-2 border-t border-gray-200">
              <button
                onClick={() => {/* Navigate to notifications page */}}
                className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
