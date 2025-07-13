import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Paperclip, Smile, Image, File, MoreVertical, Search, Phone, VideoIcon, ChevronLeft, ChevronRight, Users, Settings, LogOut, HelpCircleIcon, Info, MoreHorizontal, Trash, Archive, Flag, UserX } from 'lucide-react'
import Avatar from '../../components/Avatar'
import DropdownMenu from '../../components/DropdownMenu'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'file' | 'audio'
  fileUrl?: string
  status: 'sent' | 'delivered' | 'read'
}

interface Contact {
  id: string
  name: string
  avatar: string
  status: 'online' | 'offline' | 'away'
  lastMessage: string
  unreadCount: number
  bio: string
  email: string
  phone: string
}

const initialContacts: Contact[] = [
  { id: '1', name: 'Alice Green', avatar: '/placeholder.svg?height=40&width=40', status: 'online', lastMessage: 'Hey, how are your plants doing?', unreadCount: 2, bio: 'Plant enthusiast and urban gardener', email: 'alice@example.com', phone: '+1234567890' },
  { id: '2', name: 'Bob Brown', avatar: '/placeholder.svg?height=40&width=40', status: 'offline', lastMessage: 'I found a great deal on fertilizer!', unreadCount: 0, bio: 'Succulent collector', email: 'bob@example.com', phone: '+1987654321' },
  { id: '3', name: 'Charlie White', avatar: '/placeholder.svg?height=40&width=40', status: 'away', lastMessage: 'Check out my new greenhouse setup', unreadCount: 1, bio: 'Organic farming advocate', email: 'charlie@example.com', phone: '+1122334455' },
  { id: '4', name: 'Diana Red', avatar: '/placeholder.svg?height=40&width=40', status: 'online', lastMessage: 'Are you coming to the plant swap?', unreadCount: 0, bio: 'Rare plant hunter', email: 'diana@example.com', phone: '+1555666777' },
  { id: '5', name: 'Evan Blue', avatar: '/placeholder.svg?height=40&width=40', status: 'offline', lastMessage: 'Thanks for the gardening tips!', unreadCount: 0, bio: 'Vertical gardening expert', email: 'evan@example.com', phone: '+1999888777' },
  { id: '6', name: 'Evan Blue', avatar: '/placeholder.svg?height=40&width=40', status: 'offline', lastMessage: 'Thanks for the gardening tips!', unreadCount: 0, bio: 'Vertical gardening expert', email: 'evan@example.com', phone: '+1999888777' },
  { id: '7', name: 'Evan Blue', avatar: '/placeholder.svg?height=40&width=40', status: 'offline', lastMessage: 'Thanks for the gardening tips!', unreadCount: 0, bio: 'Vertical gardening expert', email: 'evan@example.com', phone: '+1999888777' },
  { id: '8', name: 'Evan Blue', avatar: '/placeholder.svg?height=40&width=40', status: 'offline', lastMessage: 'Thanks for the gardening tips!', unreadCount: 0, bio: 'Vertical gardening expert', email: 'evan@example.com', phone: '+1999888777' },
  { id: '9', name: 'Evan Blue', avatar: '/placeholder.svg?height=40&width=40', status: 'offline', lastMessage: 'Thanks for the gardening tips!', unreadCount: 0, bio: 'Vertical gardening expert', email: 'evan@example.com', phone: '+1999888777' },
  { id: '10', name: 'Evan Blue', avatar: '/placeholder.svg?height=40&width=40', status: 'offline', lastMessage: 'Thanks for the gardening tips!', unreadCount: 0, bio: 'Vertical gardening expert', email: 'evan@example.com', phone: '+1999888777' },
]

const initialMessages: Message[] = [
  { id: '1', sender: 'Alice Green', content: 'Hey, how are your plants doing?', timestamp: new Date(Date.now() - 3600000), type: 'text', status: 'read' },
  { id: '2', sender: 'me', content: 'They\'re doing great! I just repotted my monstera.', timestamp: new Date(Date.now() - 3500000), type: 'text', status: 'read' },
  { id: '3', sender: 'Alice Green', content: 'That\'s awesome! Can you show me a picture?', timestamp: new Date(Date.now() - 3400000), type: 'text', status: 'read' },
  { id: '4', sender: 'me', content: '/plant-image.jpg', timestamp: new Date(Date.now() - 3300000), type: 'image', fileUrl: '/placeholder.svg?height=300&width=400', status: 'delivered' },
  { id: '5', sender: 'Alice Green', content: 'Wow, it looks so healthy!', timestamp: new Date(Date.now() - 3200000), type: 'text', status: 'delivered' },
]

const ChatPage: React.FC = () => {
  const [contacts] = useState<Contact[]>(initialContacts)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isProfileView, setIsProfileView] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return

    const newMsg: Message = {
      id: (messages.length + 1).toString(),
      sender: 'me',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      status: 'sent'
    }

    setMessages([...messages, newMsg])
    setNewMessage('')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newMsg: Message = {
          id: (messages.length + 1).toString(),
          sender: 'me',
          content: file.name,
          timestamp: new Date(),
          type: file.type.startsWith('image/') ? 'image' : 'file',
          fileUrl: e.target?.result as string,
          status: 'sent'
        }
        setMessages([...messages, newMsg])
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case 'text':
        return <p>{message.content}</p>
      case 'image':
        return <img src={message.fileUrl} alt="Shared image" className="max-w-xs rounded-lg" />
      case 'file':
        return (
          <div className="flex items-center bg-gray-100 p-2 rounded">
            <File className="h-5 w-5 mr-2 text-blue-500" />
            <span className="text-sm">{message.content}</span>
          </div>
        )
      case 'audio':
        return (
          <audio controls className="max-w-xs">
            <source src={message.fileUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )
      default:
        return null
    }
  }

  return (
    <div className="h-[610px] bg-gray-100 flex">
      {/* Chats section */}
      <motion.div
        initial={{ width: isSidebarOpen ? 300 : 0 }}
        animate={{ width: isSidebarOpen ? 300 : 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-gray-200 rounded shadow overflow-hidden mr-4 flex flex-col"
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Chats</h2>
          <div className="flex space-x-2">
            <button className="text-gray-500 hover:text-gray-700">
              <Users className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <DropdownMenu
              direction='down' 
              align='right'
              offset={{
                x: 0,
                y: 8
              }}
                trigger={<Settings className="h-5 w-5" />}
                items={[
                    {
                        label: 'Settings',
                        icon: <Settings className="h-4 w-4" />,
                        onClick: () => console.log('Settings clicked')
                    },
                    {
                        label: 'Help',
                        icon: <HelpCircleIcon className="h-4 w-4" />,
                        onClick: () => console.log('Help clicked')
                    },
                    {
                        label: 'About',
                        icon: <Info className="h-4 w-4" />,
                        onClick: () => console.log('About clicked')
                    },
                    {
                        label: 'Log out',
                        icon: <LogOut className="h-4 w-4" />,
                        onClick: () => console.log('Log out clicked')
                    }
                ]}
              />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded pl-10 pr-5 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          </div>
        </div>
        <ul className="overflow-y-auto custom-scroll flex-grow">
          <AnimatePresence>
            {filteredContacts.map((contact) => (
              <motion.li
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={`p-4 hover:bg-gray-100 cursor-pointer ${
                  selectedContact?.id === contact.id ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  setSelectedContact(contact)
                  setIsProfileView(false)
                }}
              >
                <div className="flex items-center">
                  {/* <div className="relative">
                    <img src={'/src/assets/react.svg'} alt={contact.name} className="w-12 h-12 rounded-full mr-2" />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      contact.status === 'online' ? 'bg-green-500' :
                      contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}></div>
                  </div> */}
                  <Avatar alt={contact.name} src={'/src/assets/react.svg'} status='online' size='md' className="w-12 h-12 rounded-full mr-2" />
                  <div className="">
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-sm text-gray-500 truncate w-44 overflow-hidden">{contact.lastMessage}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    {contact.unreadCount > 0 && (
                      <div className="bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mb-1">
                        {contact.unreadCount}
                      </div>
                    )}
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical className="h-5 w-5 hover:text-gray-700 hover:bg-red-100 rounded-full" />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>

      {/* Main content area */}
      <div className="flex-grow bg-white border border-gray-200 rounded shadow overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {selectedContact && !isProfileView ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              {/* Chat header */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  <button onClick={toggleSidebar} className="mr-4 text-gray-500 hover:text-gray-700 lg:hidden">
                    {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
                  </button>
                  <img
                    src={'/src/assets/react.svg'}
                    alt={selectedContact.name}
                    className="w-10 h-10 rounded-full mr-3 cursor-pointer"
                    onClick={() => setIsProfileView(true)}
                  />
                  <div>
                    <h2 className="font-semibold">{selectedContact.name}</h2>
                    <p className="text-sm text-gray-500">{selectedContact.status}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <VideoIcon className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <DropdownMenu
                                  direction='down' 
                                  align='right'
                                  offset={{
                                    x: 0,
                                    y: 8
                                  }}
                        trigger={<MoreHorizontal className="h-5 w-5" />}
                        items={[
                          {
                            label: 'Delete',
                            icon: <Trash className="h-5 w-5" />,
                            onClick: () => {
                              setSelectedContact(null)
                            }
                          },
                          {
                            label: 'Archive',
                            icon: <Archive className="h-5 w-5" />,
                            onClick: () => {
                              setSelectedContact(null)
                            }
                          },
                          {
                            label: 'Report',
                            icon: <Flag className="h-5 w-5" />,
                            onClick: () => {
                              setSelectedContact(null)
                            }
                          },
                          {
                            label: 'Block',
                            icon: <UserX className="h-5 w-5" />,
                            onClick: () => {
                              setSelectedContact(null)
                            }
                          },
                        ]}
                    />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className={`mb-4 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                          message.sender === 'me' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
                        } rounded-lg p-3 shadow`}
                      >
                        {renderMessageContent(message)}
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs opacity-75">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {message.sender === 'me' && (
                            <span className="text-xs opacity-75">
                              {message.status === 'sent' && '✓'}
                              {message.status === 'delivered' && '✓✓'}
                              {message.status === 'read' && '✓✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage()
                      }
                    }}
                  />
                  <div className="flex">
                    <label htmlFor="file-upload" className="cursor-pointer bg-gray-100 px-3 py-2 hover:bg-gray-200 transition-colors duration-300">
                      <Paperclip className="h-6 w-6 text-gray-500" />
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <button className="bg-gray-100 px-3 py-2 hover:bg-gray-200 transition-colors duration-300">
                      <Image className="h-6 w-6 text-gray-500" />
                    </button>
                    <button
                      onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                      className="bg-gray-100 px-3 py-2 hover:bg-gray-200 transition-colors duration-300"
                    >
                      <Smile className="h-6 w-6 text-gray-500" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      className="bg-green-500 text-white px-4 py-2 rounded-r-full hover:bg-green-600 transition-colors duration-300"
                    >
                      <Send className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                {isEmojiPickerOpen && (
                  <div className="mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {/* Emoji picker content */}
                    <p>Emoji picker placeholder</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : selectedContact && isProfileView ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4"
            >
              <button
                onClick={() => setIsProfileView(false)}
                className="mb-4 text-gray-500 hover:text-gray-700 flex items-center"
              >
                <ChevronLeft className="h-6 w-6 mr-2" />
                Back to Chat
              </button>
              <div className="text-center mb-6">
                <img src={selectedContact.avatar} alt={selectedContact.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h2 className="text-2xl font-bold">{selectedContact.name}</h2>
                <p className="text-gray-500">{selectedContact.status}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Bio</h3>
                  <p className="text-gray-700">{selectedContact.bio}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                  <p className="text-gray-700">Email: {selectedContact.email}</p>
                  <p className="text-gray-700">Phone: {selectedContact.phone}</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300">
                    View Shared Plants
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
                    Schedule Plant Care
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-grow flex items-center justify-center"
            >
              <div className="text-center">
                <img src="/placeholder.svg?height=100&width=100" alt="Select a chat" className="w-24 h-24 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Select a contact to start chatting</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ChatPage