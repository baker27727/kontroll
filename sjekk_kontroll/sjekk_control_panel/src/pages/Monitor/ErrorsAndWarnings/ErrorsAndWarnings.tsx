import { useState } from 'react';
import { FiAlertCircle, FiAlertTriangle } from 'react-icons/fi';
import Modal from '../../../components/Modal';

const sampleErrors = [
  { id: 1, type: 'error', message: 'Database connection failed', timestamp: '2023-06-15 10:30:00' },
  { id: 2, type: 'warning', message: 'High CPU usage detected', timestamp: '2023-06-15 11:45:00' },
  { id: 3, type: 'error', message: 'API endpoint timeout', timestamp: '2023-06-15 14:20:00' },
  // Add more sample data or fetch from an API
];

const ErrorsAndWarningsPage = () => {
  const [errors, setErrors] = useState(sampleErrors);
  const [showModal, setShowModal] = useState(false);
  const [selectedError, setSelectedError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAction = (error, action) => {
    setSelectedError({ ...error, action });
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (selectedError.action === 'delete') {
      setErrors(errors.filter((error) => error.id !== selectedError.id));
    } else if (selectedError.action === 'resolve') {
      // Implement resolve logic, e.g., update status
      setErrors(
        errors.map((error) =>
          error.id === selectedError.id ? { ...error, resolved: true } : error
        )
      );
    }
    setShowModal(false);
  };

  const filteredErrors = errors.filter(
    (error) =>
      error.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      error.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Errors & Warnings</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search errors and warnings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          className="ml-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
          onClick={() => alert('Add new error functionality not implemented')}
        >
          Add New
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredErrors.length > 0 ? (
              filteredErrors.map((error) => (
                <tr key={error.id} className={error.type !== 'error' ? 'bg-green-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {error.type === 'error' ? (
                      <FiAlertCircle className="text-red-500 inline mr-2" />
                    ) : (
                      <FiAlertTriangle className="text-yellow-500 inline mr-2" />
                    )}
                    {error.type.charAt(0).toUpperCase() + error.type.slice(1)}
                  </td>
                  <td className="px-6 py-4">{error.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{error.timestamp}</td>
                  <td className="px-6 py-4">
                    {error.type !== 'error' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Resolved
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Unresolved
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!error && (
                      <button
                        className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 mr-2"
                        onClick={() => handleAction(error, 'resolve')}
                      >
                        Resolve
                      </button>
                    )}
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleAction(error, 'delete')}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center" colSpan={5}>
                  No errors or warnings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Action"
      >
        {selectedError && (
          <p>
            Are you sure you want to{' '}
            <strong>{selectedError.action === 'delete' ? 'delete' : 'resolve'}</strong>{' '}
            this <strong>{selectedError.type}</strong>?
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
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            onClick={handleConfirmAction}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ErrorsAndWarningsPage;
