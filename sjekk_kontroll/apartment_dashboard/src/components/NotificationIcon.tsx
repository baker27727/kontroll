import { AnimatePresence, motion } from "framer-motion";
import { Bell, BellIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getApartmentNotification } from "../redux/featuers/notification_management_store";


export default function NotificationIcon() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useAppDispatch()
    const { notifications } = useAppSelector(state => state.notification_management_store)
    const { apartment } = useAppSelector(state => state.auth_store)

    useEffect(() => {
      dispatch(getApartmentNotification(apartment?.id))
    }, [dispatch, apartment?.id])
  
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
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
        </button>
  
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-md py-1 z-10 border border-slate-200"
            >
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto custom-scroll">
                {
                  notifications.length === 0 && (
                    <div className="px-4 py-3 text-center h-60 grid place-items-center">
                      <p className="text-lg text-gray-500">No notifications</p>
                    </div>
                  )
                }
                {notifications.map(notification => {                  return (
                    <div key={notification.id} className="px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 rounded-full p-2 mr-3`}>
                          <BellIcon className={`h-5 w-5 bg-purple-700`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.body}</p>
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
  