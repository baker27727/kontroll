import React from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { 
  Building2, 
  Car, 
  Users, 
  ShieldAlert,
} from 'lucide-react';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, icon, trend, className = '' }) => {
  return (
    <motion.div 
      className={`bg-white shadow rounded overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <p className="mt-1 text-sm">
              <span
                className={`font-semibold ${
                  trend.value >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-gray-500 ml-1">{trend.label}</span>
            </p>
          )}
        </div>
        <div className="p-3 bg-indigo-100 rounded-full">{icon}</div>
      </div>
    </motion.div>
  );
};



const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatisticCard
          title="Total Partners"
          value="28"
          icon={<Building2 className="w-8 h-8 text-indigo-600" />}
          trend={{ value: 12, label: "from last month" }}
        />
        <StatisticCard
          title="Registered Cars"
          value="1,435"
          icon={<Car className="w-8 h-8 text-green-600" />}
          trend={{ value: 8, label: "from last week" }}
        />
        <StatisticCard
          title="Total Users"
          value="12,456"
          icon={<Users className="w-8 h-8 text-yellow-600" />}
          trend={{ value: 23, label: "from last quarter" }}
        />
        <StatisticCard
          title="Violations (This Month)"
          value="89"
          icon={<ShieldAlert className="w-8 h-8 text-red-600" />}
          trend={{ value: -5, label: "from last month" }}
        />
      </div>


      <motion.div 
        className="bg-white p-6 rounded border shadow mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
        <Line data={lineChartData} options={{ responsive: true }} />
      </motion.div>

      <motion.div 
        className="bg-white rounded border shadow overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-xl font-semibold p-3 bg-gray-50 border-b">Recent Violations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Violation Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { date: '2023-07-01', location: 'Oslo Central', vehicle: 'AB 12345', type: 'Expired Meter', status: 'Pending' },
                { date: '2023-06-30', location: 'Bergen Harbor', vehicle: 'CD 67890', type: 'No Permit', status: 'Resolved' },
                { date: '2023-06-29', location: 'Trondheim Square', vehicle: 'EF 11223', type: 'Wrong Zone', status: 'In Progress' },
              ].map((violation, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{violation.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{violation.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{violation.vehicle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{violation.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      violation.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      violation.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {violation.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;