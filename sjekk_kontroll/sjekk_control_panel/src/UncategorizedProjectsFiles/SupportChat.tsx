import React, { useState, useRef, useEffect } from 'react'
import { FaComments, FaPaperPlane, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: number
  text: string
  sender: 'user' | 'support'
  timestamp: Date
}

export const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I assist you today?",
      sender: 'support',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => setIsOpen(!isOpen)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      }
      setMessages([...messages, newMessage])
      setInputMessage('')
      
      // Simulate support response
      setTimeout(() => {
        const supportResponse: Message = {
          id: messages.length + 2,
          text: "Thank you for your message. Our team will get back to you shortly.",
          sender: 'support',
          timestamp: new Date()
        }
        setMessages(prevMessages => [...prevMessages, supportResponse])
      }, 1000)
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-md shadow w-80 sm:w-96 overflow-hidden"
          >
            <div className="bg-blue-600 text-white p-2 flex justify-between items-center">
              <h3 className="text-md font-semibold">Support Chat</h3>
              <button onClick={toggleChat} className="text-white hover:text-gray-200 transition-colors">
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
            <div className="h-96 overflow-y-auto custom-scroll p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-3/4 p-3 rounded-md ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className="text-xs mt-1 opacity-75">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow px-3 py-2 border-2 rounded-l h-10 focus:outline-none "
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 h-10 rounded-r hover:bg-blue-700 transition-colors"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleChat}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
          >
            <FaComments className="w-6 h-6" />
          </motion.button>
        )}
    </div>
  )
}