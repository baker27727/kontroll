import { motion } from 'framer-motion';
import { SearchX, FileX, Inbox, CloudOff, ShoppingCart, Users } from 'lucide-react';

// Base Empty component
const Empty = ({ icon: Icon, title, description, action }) => (
  <motion.div 
    className="flex flex-col items-center justify-center p-8 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="text-gray-400 mb-4"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
    >
      <Icon size={64} />
    </motion.div>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
    <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
    {action && (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {action}
      </motion.div>
    )}
  </motion.div>
);

// Specific Empty state components
const EmptySearch = ({ query }) => (
  <Empty 
    icon={SearchX}
    title="No results found"
    description={`We couldn't find any results for "${query}". Try adjusting your search terms.`}
    action={
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        Clear search
      </button>
    }
  />
);

const EmptyInbox = () => (
  <Empty 
    icon={Inbox}
    title="Your inbox is empty"
    description="You've processed all your messages. Great job!"
    action={
      <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
        Check archived messages
      </button>
    }
  />
);

const EmptyFiles = () => (
  <Empty 
    icon={FileX}
    title="No files uploaded yet"
    description="Start by uploading a file or creating a new document."
    action={
      <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
        Upload a file
      </button>
    }
  />
);

const EmptyCart = () => (
  <Empty 
    icon={ShoppingCart}
    title="Your cart is empty"
    description="Looks like you haven't added any items to your cart yet."
    action={
      <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
        Start shopping
      </button>
    }
  />
);

const EmptyContacts = () => (
  <Empty 
    icon={Users}
    title="No contacts yet"
    description="Your contact list is empty. Start by adding your first contact!"
    action={
      <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
        Add a contact
      </button>
    }
  />
);

const EmptyCloud = () => (
  <Empty 
    icon={CloudOff}
    title="Offline mode"
    description="You're currently offline. Some features may be unavailable."
    action={
      <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
        Try reconnecting
      </button>
    }
  />
);

// Demo component to showcase all empty states
const EmptyStatesDemo = () => {
  const emptyStates = [
    { component: <EmptySearch query="unicorn" />, title: "Empty Search" },
    { component: <EmptyInbox />, title: "Empty Inbox" },
    { component: <EmptyFiles />, title: "Empty Files" },
    { component: <EmptyCart />, title: "Empty Cart" },
    { component: <EmptyContacts />, title: "Empty Contacts" },
    { component: <EmptyCloud />, title: "Offline State" },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Impressive Empty States</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {emptyStates.map((state, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 className="text-lg font-semibold bg-gray-800 text-white p-4">{state.title}</h2>
            {state.component}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmptyStatesDemo;