import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Inbox, Send, Star, Trash, ChevronDown, ChevronUp, Paperclip, ArrowLeft } from 'lucide-react'
import Modal from '../../components/Modal'
import CustomButton from '../../components/Button'
import Select from '../../components/Select'
import { IconType } from 'react-icons'

interface Message {
  id: string
  from: string
  to: string
  subject: string
  body: string
  date: string
  read: boolean
  starred: boolean
  attachments: boolean
}

const initialMessages: Message[] = [
  { id: '1', from: 'John Doe', to: 'me@example.com', subject: 'Plant Exchange Proposal', body: 'I have some rare succulents that I\'d like to exchange. Are you interested in trading any of your plants?', date: '2023-05-20', read: false, starred: false, attachments: true },
  { id: '2', from: 'Jane Smith', to: 'me@example.com', subject: 'Upcoming Gardening Workshop', body: 'We\'re excited to announce our next workshop on organic gardening techniques. Would you like to attend?', date: '2023-05-19', read: true, starred: true, attachments: false },
  { id: '3', from: 'Plant Care Tips', to: 'me@example.com', subject: 'Your Weekly Plant Care Reminder', body: 'Don\'t forget to water your Monstera and check for pests on your fiddle leaf fig this week!', date: '2023-05-18', read: true, starred: false, attachments: false },
  { id: '4', from: 'Green Thumb Society', to: 'me@example.com', subject: 'Membership Renewal', body: 'Your Green Thumb Society membership is due for renewal. Don\'t miss out on exclusive plant swaps and discounts!', date: '2023-05-17', read: false, starred: false, attachments: true },
  { id: '5', from: 'Rare Plant Auction', to: 'me@example.com', subject: 'You\'ve been outbid!', body: 'Someone has placed a higher bid on the Variegated Monstera you\'re interested in. Would you like to increase your bid?', date: '2023-05-16', read: true, starred: true, attachments: false },
]

const MailboxPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [selectedMessages, setSelectedMessages] = useState<string[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentFolder, setCurrentFolder] = useState('inbox')
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [newMessage, setNewMessage] = useState({ to: '', subject: '', body: '' })

  const filteredMessages = messages
    .filter(message => {
      if (filter === 'unread') return !message.read
      if (filter === 'starred') return message.starred
      return true
    })
    .filter(message =>
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.body.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const toggleSelectMessage = (id: string) => {
    setSelectedMessages(prev =>
      prev.includes(id) ? prev.filter(msgId => msgId !== id) : [...prev, id]
    )
  }

  const toggleStarMessage = (id: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === id ? { ...msg, starred: !msg.starred } : msg
      )
    )
  }

  const markAsRead = (ids: string[]) => {
    setMessages(prev =>
      prev.map(msg =>
        ids.includes(msg.id) ? { ...msg, read: true } : msg
      )
    )
  }

  const deleteMessages = (ids: string[]) => {
    setMessages(prev => prev.filter(msg => !ids.includes(msg.id)))
    setSelectedMessages([])
  }

  const handleCompose = () => {
    setIsComposeOpen(true)
    setSelectedMessage(null)
  }

  const handleSendMessage = () => {
    const newMsg: Message = {
      id: (messages.length + 1).toString(),
      from: 'me@example.com',
      to: newMessage.to,
      subject: newMessage.subject,
      body: newMessage.body,
      date: new Date().toISOString().split('T')[0],
      read: true,
      starred: false,
      attachments: false,
    }
    setMessages(prev => [newMsg, ...prev])
    setIsComposeOpen(false)
    setNewMessage({ to: '', subject: '', body: '' })
  }

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message)
    if (!message.read) {
      markAsRead([message.id])
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded shadow border p-4">
            <CustomButton 
              onClick={handleCompose}
              leftIcon={Inbox as IconType}
              className='w-full mb-4'
            >
              Compose
            </CustomButton>
            <nav>
              <ul className="space-y-2">
                {[
                  { name: 'Inbox', icon: Inbox },
                  { name: 'Sent', icon: Send },
                  { name: 'Starred', icon: Star },
                  { name: 'Trash', icon: Trash },
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => setCurrentFolder(item.name.toLowerCase())}
                      className={`flex items-center w-full py-2 px-4 rounded transition-colors duration-300 ${
                        currentFolder === item.name.toLowerCase()
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded shadow border">
            {/* Toolbar */}
            <div className="border-b border-gray-200 p-4 flex justify-between items-center">
              <div className="flex space-x-2">
                <Select 
                onChange={(val) => setFilter(val as 'all' | 'unread' | 'starred')}
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'unread', label: 'Unread' },
                    { value: 'starred', label: 'Starred' },
                    { value: 'sent', label: 'Sent' },
                  ]}
                />
                <CustomButton
                  onClick={() => markAsRead(selectedMessages)}
                  size='sm'
                >
                  Mark as Read
                </CustomButton>
                <CustomButton
                  onClick={() => deleteMessages(selectedMessages)}
                  size='sm'
                  color='red'
                >
                  Delete
                </CustomButton>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded pl-8 pr-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            {/* Message list or Message detail */}
            {selectedMessage ? (
              <div className="p-4">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to messages
                </button>
                <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-semibold">{selectedMessage.from}</p>
                    <p className="text-sm text-gray-500">To: {selectedMessage.to}</p>
                  </div>
                  <p className="text-sm text-gray-500">{selectedMessage.date}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="whitespace-pre-wrap">{selectedMessage.body}</p>
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredMessages.map((message) => (
                    <motion.li
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className={`p-4 hover:bg-blue-50 transition-colors duration-300 ${
                        !message.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedMessages.includes(message.id)}
                          onChange={() => toggleSelectMessage(message.id)}
                          className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <button
                          onClick={() => toggleStarMessage(message.id)}
                          className={`mr-4 ${
                            message.starred ? 'text-yellow-400' : 'text-gray-400'
                          }`}
                        >
                          <Star className="h-5 w-5" />
                        </button>
                        <div className="flex-grow cursor-pointer" onClick={() => handleSelectMessage(message)}>
                          <p className={`font-semibold ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
                            {message.from}
                          </p>
                          <p className={`text-sm ${!message.read ? 'font-semibold' : ''}`}>{message.subject}</p>
                          <p className="text-sm text-gray-500 truncate">{message.body}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          {message.attachments && <Paperclip className="h-4 w-4" />}
                          <span>{message.date}</span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}

            {/* Pagination */}
            {!selectedMessage && (
              <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                      <span className="font-medium">97</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <ChevronUp className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        3
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <ChevronDown className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      
      <Modal title='Compose' isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)}>
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
              <div className="mb-4">
                <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To:</label>
                <input
                  type="email"
                  placeholder="Enter recipient email here..."
                  id="to"
                  value={newMessage.to}
                  onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject:</label>
                <input
                  type="text"
                  placeholder="Enter subject here..."
                  id="subject"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Message:</label>
                <textarea
                  id="body"
                  placeholder='Enter your message here...'
                  value={newMessage.body}
                  onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                  rows={6}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-300"
                >
                  Send
                </button>
              </div>
            </form>
      </Modal>
    </div>
  )
}

export default MailboxPage