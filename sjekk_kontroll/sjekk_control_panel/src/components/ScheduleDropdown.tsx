import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Plus, ChevronRight } from 'lucide-react';

const ScheduleDropdown: React.FC = () => {
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

  const upcomingEvents = [
    { id: 1, title: 'Client Meeting: Johnson vs. Smith', time: '10:00 AM', type: 'meeting' },
    { id: 2, title: 'Court Hearing: Estate of Brown', time: '2:00 PM', type: 'court' },
    { id: 3, title: 'Document Review: TechCorp Merger', time: '4:30 PM', type: 'task' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>

      <button className="flex items-center space-x-2" onClick={() => setIsOpen(!isOpen)}>
            <Calendar className="h-6 w-6" />
            <span className="text-sm">Schedule</span>
          </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded shadow z-10 border border-gray-200"
          >
            <div className="">
              <h3 className="text-lg font-semibold text-gray-900 px-4 py-2">Today's Schedule</h3>
              <hr className="border-gray-300" />
              <ul className="space-y-3 p-4">
                {upcomingEvents.map((event) => (
                  <li key={event.id} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                      event.type === 'meeting' ? 'bg-blue-500' :
                      event.type === 'court' ? 'bg-red-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.time}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-200 p-2">
              <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="h-4 w-4" />
                <span>Add New Event</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScheduleDropdown;