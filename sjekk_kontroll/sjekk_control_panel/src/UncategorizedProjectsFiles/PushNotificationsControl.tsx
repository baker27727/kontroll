// import React, { useState } from 'react';
// import { DataTable } from '../components/DataTable';
// import Modal from '../components/Modal';
// import { Bell, Plus, Edit, Trash2 } from 'lucide-react';
// import Button from '../components/Button';

// const PushNotificationControl: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

//   const channels = [
//     { id: 1, name: 'All Users', status: 'Active' },
//     { id: 2, name: 'New Users', status: 'Inactive' },
//     { id: 3, name: 'Premium Users', status: 'Active' },
//   ];

//   const columns = [
//     { key: 'name', title: 'Channel Name', sortable: true },
//     { key: 'status', title: 'Status', sortable: true },
//   ];

//   const actions = (row: any) => (
//     <div className="flex space-x-2">
//       <Button variant="outline" size="sm" leftIcon={<Edit size={16} />} onClick={() => handleEdit(row.id)}>
//         Edit
//       </Button>
//       <Button variant="outline" size="sm" leftIcon={<Trash2 size={16} />} onClick={() => handleDelete(row.id)}>
//         Delete
//       </Button>
//     </div>
//   );

//   const handleEdit = (id: number) => {
//     setSelectedChannel(channels.find(channel => channel.id === id)?.name || null);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id: number) => {
//     // Implement delete functionality
//     console.log('Delete channel', id);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1>Push Notification Control</h1>
//         <Button leftIcon={<Plus size={20} />} onClick={() => setIsModalOpen(true)}>
//           Add New Channel
//         </Button>
//       </div>

//       <div className="bg-white shadow rounded-lg p-6 mb-8">
//         <h2 className="mb-4">Notification Channels</h2>
//         <DataTable
//           columns={columns}
//           data={channels}
//           itemsPerPage={10}
//           actions={actions}
//         />
//       </div>

//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="mb-4">Send Push Notification</h2>
//         <form className="space-y-4">
//           <div>
//             <p htmlFor="title">Notification Title</p>
//             <input
//               type="text"
//               id="title"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               placeholder="Enter notification title"
//             />
//           </div>
//           <div>
//             <p htmlFor="message">Notification Message</p>
//             <textarea
//               id="message"
//               rows={4}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               placeholder="Enter notification message"
//             ></textarea>
//           </div>
//           <div>
//             <p htmlFor="channel">Select Channel</p>
//             <select
//               id="channel"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             >
//               <option value="">Select a channel</option>
//               {channels.map(channel => (
//                 <option key={channel.id} value={channel.id}>{channel.name}</option>
//               ))}
//             </select>
//           </div>
//           <Button leftIcon={<Bell size={20} />}>Send Notification</Button>
//         </form>
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={selectedChannel ? `Edit Channel: ${selectedChannel}` : "Add New Channel"}
//         size="md"
//       >
//         <form className="space-y-4">
//           <div>
//             <p htmlFor="channelName">Channel Name</p>
//             <input
//               type="text"
//               id="channelName"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               placeholder="Enter channel name"
//               defaultValue={selectedChannel || ''}
//             />
//           </div>
//           <div>
//             <p htmlFor="channelStatus">Status</p>
//             <select
//               id="channelStatus"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>
//           <div className="flex justify-end space-x-2">
//             <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
//             <Button>{selectedChannel ? 'Update' : 'Add'} Channel</Button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default PushNotificationControl;


const PushNotificationsControl = () => {
  return (
    <div>PushNotificationsControl</div>
  )
}

export default PushNotificationsControl