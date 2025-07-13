import { useState } from 'react'
import { Bell, Car, DollarSign, Home, User } from 'lucide-react'

const notificationTypes = {
  payment: { icon: DollarSign, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
  parking: { icon: Car, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
  apartment: { icon: Home, bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  user: { icon: User, bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
  system: { icon: Bell, bgColor: 'bg-gray-100', iconColor: 'text-gray-600' },
}

const notifications = [
  { id: 1, type: 'payment', message: 'Payment of 500 NOK received for parking', time: '2 hours ago', read: false },
  { id: 2, type: 'parking', message: 'Your parking session will expire in 30 minutes', time: '30 minutes ago', read: false },
  { id: 3, type: 'apartment', message: 'New apartment registration request received', time: '1 day ago', read: true },
  { id: 4, type: 'user', message: 'Profile information updated successfully', time: '2 days ago', read: true },
  { id: 5, type: 'system', message: 'System maintenance scheduled for tonight', time: '3 days ago', read: true },
]

export default function NotificationsScreen() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeFilter)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {['all', ...Object.keys(notificationTypes)].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeFilter === filter
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredNotifications.map(notification => {
          const { icon: Icon, bgColor, iconColor } = notificationTypes[notification.type]
          return (
            <div key={notification.id} className={`flex items-start p-4 rounded-lg ${notification.read ? 'bg-white' : 'bg-indigo-50'}`}>
              <div className={`flex-shrink-0 ${bgColor} rounded-full p-2 mr-4`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <div className="flex-grow">
                <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
              {!notification.read && (
                <div className="flex-shrink-0 ml-4">
                  <div className="h-2 w-2 bg-indigo-600 rounded-full"></div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}