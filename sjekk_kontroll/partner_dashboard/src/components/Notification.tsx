// src/components/Notification.js
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { FaTimes, FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { hideNotification } from '../redux/features/notification_store';

const notificationIcons = {
  success: <FaCheckCircle />,
  info: <FaInfoCircle />,
  warning: <FaExclamationTriangle />,
  error: <FaExclamationCircle />,
};

const notificationStyles = {
  success: 'bg-gradient-to-r from-green-400 to-green-600',
  info: 'bg-gradient-to-r from-blue-400 to-blue-600',
  warning: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
  error: 'bg-gradient-to-r from-red-400 to-red-600',
};

const Notification = () => {
  const dispatch = useAppDispatch();
  const { message, description, visible, type } = useAppSelector(state => state.notification_store);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.4 }}
          className={`fixed w-96 top-8 right-4 text-white p-2 rounded-md shadow-md z-50 flex items-start  ${notificationStyles[type]}`}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 mr-2">
            <div className="text-xl">
              {notificationIcons[type]}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg">{message}</h4>
            {description && <p className="mt-1 text-sm text-white/90">{description}</p>}
          </div>
          <button
            onClick={() => dispatch(hideNotification())}
            className="text-white hover:text-gray-200 transition duration-300"
          >
            <FaTimes />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
