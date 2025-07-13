import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiCpu, FiHardDrive, FiWifi } from 'react-icons/fi';
import MetricCard from '../components/MetricCard';

const sampleAnalyticsData = [
  { name: 'Jan', errors: 4, warnings: 2 },
  { name: 'Feb', errors: 3, warnings: 5 },
  { name: 'Mar', errors: 2, warnings: 3 },
  { name: 'Apr', errors: 5, warnings: 4 },
  { name: 'May', errors: 1, warnings: 2 },
  { name: 'Jun', errors: 3, warnings: 1 },
  // Add more data as needed
];

const AnalyticsMonitoringPage = () => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [networkTraffic, setNetworkTraffic] = useState(0);
  const [networkHistory, setNetworkHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCpu = Math.floor(Math.random() * 100);
      const newMemory = Math.floor(Math.random() * 16 * 100) / 100; // in GB
      const newNetwork = Math.floor(Math.random() * 1000 * 100) / 100; // in Mbps

      setCpuUsage(newCpu);
      setMemoryUsage(newMemory);
      setNetworkTraffic(newNetwork);

      setNetworkHistory((prev) => [
        ...prev.slice(-19), // Keep last 20 entries
        { time: new Date().toLocaleTimeString(), traffic: newNetwork },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Analytics & Real-Time Monitoring</h2>
      
      {/* Analytics Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Error & Warning Trends</h3>
        <div className="bg-white p-4 rounded-lg shadow">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={sampleAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="errors" stroke="#EF4444" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="warnings" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Real-Time Monitoring Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Real-Time Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <MetricCard icon={FiCpu} title="CPU Usage" value={cpuUsage} unit="%" />
          <MetricCard icon={FiHardDrive} title="Memory Usage" value={memoryUsage} unit="GB" />
          <MetricCard icon={FiWifi} title="Network Traffic" value={networkTraffic} unit="Mbps" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4">Network Traffic Over Time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={networkHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="traffic" stroke="#3B82F6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsMonitoringPage;
