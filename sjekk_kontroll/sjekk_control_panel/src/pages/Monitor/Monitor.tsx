import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiAlertCircle, FiAlertTriangle, FiBarChart2, FiClock, FiCpu, FiHardDrive, FiList, FiShield, FiWifi } from 'react-icons/fi';

const tabs = [
  { id: 'errors', icon: FiAlertCircle, label: 'Errors & Warnings' },
  { id: 'analytics', icon: FiBarChart2, label: 'Analytics' },
  { id: 'realtime', icon: FiClock, label: 'Real-Time Monitoring' },
  { id: 'audit', icon: FiList, label: 'Audit Log' },
  { id: 'aiassist', icon: FiShield, label: 'AI Assistant' },
];

const sampleErrors = [
  { id: 1, type: 'error', message: 'Database connection failed', timestamp: '2023-06-15 10:30:00' },
  { id: 2, type: 'warning', message: 'High CPU usage detected', timestamp: '2023-06-15 11:45:00' },
  { id: 3, type: 'error', message: 'API endpoint timeout', timestamp: '2023-06-15 14:20:00' },
];

const sampleAnalyticsData = [
  { name: 'Jan', errors: 4, warnings: 2 },
  { name: 'Feb', errors: 3, warnings: 5 },
  { name: 'Mar', errors: 2, warnings: 3 },
  { name: 'Apr', errors: 5, warnings: 4 },
  { name: 'May', errors: 1, warnings: 2 },
  { name: 'Jun', errors: 3, warnings: 1 },
];


const sampleAuditLogs = [
  { id: 1, action: 'User Login', user: 'admin@example.com', date: '2023-06-15 10:30:00', details: 'Successful login from IP 192.168.1.1' },
  { id: 2, action: 'Config Change', user: 'john@example.com', date: '2023-06-15 11:45:00', details: 'Updated email notification settings' },
  { id: 3, action: 'Error Resolved', user: 'jane@example.com', date: '2023-06-15 14:20:00', details: 'Resolved Database connection issue' },
];

export default function MonitorDashboard() {
  const [activeTab, setActiveTab] = useState('errors');
  const [errors, setErrors] = useState(sampleErrors);
  const [showModal, setShowModal] = useState(false);
  const [selectedError, setSelectedError] = useState(null);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [networkTraffic, setNetworkTraffic] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 100));
      setMemoryUsage(Math.floor(Math.random() * 16 * 100) / 100);
      setNetworkTraffic(Math.floor(Math.random() * 1000 * 100) / 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleAction = (error, action) => {
    setSelectedError({ ...error, action });
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (selectedError.action === 'delete') {
      setErrors(errors.filter(error => error.id !== selectedError.id));
    } else {
      // Handle resolve action (e.g., update status, send to server, etc.)
      console.log(`Resolved error: ${selectedError.id}`);
    }
    setShowModal(false);
  };

  const TabContent = () => {
    switch (activeTab) {
      case 'errors':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {errors.map((error) => (
                  <tr key={error.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {error.type === 'error' ? (
                        <FiAlertCircle className="text-red-500 inline mr-2" />
                      ) : (
                        <FiAlertTriangle className="text-yellow-500 inline mr-2" />
                      )}
                      {error.type}
                    </td>
                    <td className="px-6 py-4">{error.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{error.timestamp}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 mr-2"
                        onClick={() => handleAction(error, 'resolve')}
                      >
                        Resolve
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleAction(error, 'delete')}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white p-4 rounded-lg shadow">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={sampleAnalyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="errors" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="warnings" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      case 'realtime':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard icon={FiCpu} title="CPU Usage" value={cpuUsage} unit="%" />
            <MetricCard icon={FiHardDrive} title="Memory Usage" value={memoryUsage} unit="GB" />
            <MetricCard icon={FiWifi} title="Network Traffic" value={networkTraffic} unit="Mbps" />
          </div>
        );
      case 'audit':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleAuditLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{log.action}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{log.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{log.date}</td>
                    <td className="px-6 py-4">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'aiassist':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">AI Assistant</h3>
            <p className="text-gray-600 mb-4">
              Our AI assistant can help you analyze errors, suggest optimizations, and provide insights based on your monitoring data.
            </p>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Ask the AI assistant..."
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors">
                Ask
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const MetricCard = ({ icon: Icon, title, value, unit }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Icon className="w-6 h-6 text-teal-500" />
      </div>
      <div className="text-3xl font-bold text-gray-800">
        {value} <span className="text-xl font-normal text-gray-600">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <nav className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-500 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="mr-2 h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <TabContent />
      </main>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
              <p>Are you sure you want to {selectedError.action} this {selectedError.type}?</p>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}