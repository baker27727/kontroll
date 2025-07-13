import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBolt, FaTimes } from 'react-icons/fa'
import { Calendar, Car, Clock, File, Search, UserPlus, Users } from 'lucide-react'
import { BiError } from 'react-icons/bi'

interface QuickAction {
  id: string
  icon: React.ElementType
  label: string
  onClick: () => void
}

const quickActions: QuickAction[] = [
  { id: 'add-vehicle', icon: Car, label: 'Add Vehicle', onClick: () => console.log('Add Vehicle clicked') },
  { id: 'book-parking', icon: Calendar, label: 'Book Parking', onClick: () => console.log('Book Parking clicked') },
  { id: 'generate-report', icon: File, label: 'Generate Report', onClick: () => console.log('Generate Report clicked') },
  { id: 'report-violation', icon: BiError, label: 'Report Violation', onClick: () => console.log('Report Violation clicked') },
  { id: 'extend-parking', icon: Clock, label: 'Extend Parking', onClick: () => console.log('Extend Parking clicked') },
  { id: 'add-user', icon: UserPlus, label: 'Add User', onClick: () => console.log('Add User clicked') },
  { id: 'add-manager', icon: Users, label: 'Add Manager', onClick: () => console.log('Add User clicked') },
  { id: 'find-parking', icon: Search, label: 'Find Parking', onClick: () => console.log('Add User clicked') },
]

export const QuickActions: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
  const toggleQuickActions = () => setIsOpen(!isOpen)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded shadow border border-gray-300 overflow-hidden"
          >
            <div className="bg-blue-600 text-white p-2 flex justify-between items-center">
              <h3 className="text-md font-semibold">Quick Actions</h3>
              <button onClick={toggleQuickActions} className="text-white hover:text-gray-200 transition-colors">
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 grid grid-cols-4 gap-2">
              <AnimatePresence>
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={action.onClick}
                    className="flex flex-col items-center justify-center p-2 bg-slate-200 rounded hover:bg-slate-300 transition-colors"
                  >
                    <action.icon className="w-8 h-8 text-blue-600 mb-1" />
                    <span className="text-sm font-medium text-gray-800">{action.label}</span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
          onClick={toggleQuickActions}
          className="bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 transition-all duration-300 ease-in-out"
        >
          <FaBolt className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  )
}