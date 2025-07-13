import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Modal from '../../../components/Modal';

const sampleAuditLogs = [
  { id: 1, action: 'User Login', user: 'admin@example.com', date: '2023-06-15 10:30:00', details: 'Successful login from IP 192.168.1.1' },
  { id: 2, action: 'Config Change', user: 'john@example.com', date: '2023-06-15 11:45:00', details: 'Updated email notification settings' },
  { id: 3, action: 'Error Resolved', user: 'jane@example.com', date: '2023-06-15 14:20:00', details: 'Resolved Database connection issue' },
  // Add more sample data or fetch from an API
];

const AuditLogsPage = () => {
  const [logs, setLogs] = useState(sampleAuditLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  const handleDelete = (log) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setLogs(logs.filter((log) => log.id !== selectedLog.id));
    setShowModal(false);
  };

  const filteredLogs = logs.filter(
    (log) =>
      (log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterAction ? log.action === filterAction : true)
  );

  const uniqueActions = [...new Set(logs.map((log) => log.action))];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Audit Logs</h2>
      <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search audit logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FiFilter className="text-gray-500" />
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All Actions</option>
            {uniqueActions.map((action, index) => (
              <option key={index} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{log.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{log.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{log.date}</td>
                  <td className="px-6 py-4 text-gray-600">{log.details}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(log)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center" colSpan={5}>
                  No audit logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Deletion"
      >
        {selectedLog && (
          <p>
            Are you sure you want to delete the audit log for <strong>{selectedLog.action}</strong> by{' '}
            <strong>{selectedLog.user}</strong> on <strong>{selectedLog.date}</strong>?
          </p>
        )}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AuditLogsPage;
