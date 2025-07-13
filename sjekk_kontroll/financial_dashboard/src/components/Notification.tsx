// src/components/Notification.js
import { useEffect } from 'react';
import { hideNotification } from '../redux/stores/notification_store';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { FaTimes, FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';

const notificationIcons = {
  success: <FaCheckCircle />,
  info: <FaInfoCircle />,
  warning: <FaExclamationTriangle />,
  error: <FaExclamationCircle />,
};

const notificationStyles = {
  success: 'bg-green-600',
  info: 'bg-blue-600',
  warning: 'bg-[#e09f3e]',
  error: 'bg-red-600',
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
    <div
      className={`fixed w-80 top-8 right-4 text-white p-4 rounded shadow-md z-50 transition-all duration-500 flex items-start space-x-3 ${
        visible ? 'translate-x-0' : 'translate-x-96'
      } ${notificationStyles[type]}`}
    >
      <div className="text-2xl">
        {notificationIcons[type]}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold">{message}</h4>
        {description && <p className="mt-1 text-sm">{description}</p>}
      </div>
      <button onClick={() => dispatch(hideNotification())} className="ml-4 text-white hover:text-gray-200">
        <FaTimes />
      </button>
    </div>
  );
};

export default Notification;
