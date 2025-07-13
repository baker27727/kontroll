import { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { 
  DollarSign, TrendingUp, TrendingDown, Users, 
  ShoppingCart, CreditCard,
  ArrowUp, ArrowDown,
} from 'lucide-react';

// Utility function for formatting numbers
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// StatCard Component
const StatCard = ({ title, value, icon, trend, trendValue, color }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
        <p className="text-3xl font-bold mt-2 text-gray-800">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')}`}>
        {icon}
      </div>
    </div>
    <div className={`text-sm mt-4 ${trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
      {trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
      <span className="font-medium">{trendValue}</span>
      <span className="text-gray-500 ml-2">vs last month</span>
    </div>
  </div>
);

// RecentActivity Component
const RecentActivity = () => {
  const activities = [
    { id: 1, type: 'sale', amount: 1500, customer: 'ABC Corp', time: '2 hours ago' },
    { id: 2, type: 'purchase', amount: 500, vendor: 'XYZ Supplies', time: '4 hours ago' },
    { id: 3, type: 'invoice', amount: 2000, customer: '123 Industries', time: 'Yesterday' },
    { id: 4, type: 'expense', amount: 150, description: 'Office supplies', time: '2 days ago' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h3>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center">
              {activity.type === 'sale' && <ShoppingCart className="text-green-500 mr-2" />}
              {activity.type === 'purchase' && <CreditCard className="text-red-500 mr-2" />}
              {activity.type === 'invoice' && <DollarSign className="text-blue-500 mr-2" />}
              {activity.type === 'expense' && <TrendingDown className="text-yellow-500 mr-2" />}
              <div>
                <p className="font-medium">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</p>
                <p className="text-sm text-gray-500">
                  {activity.customer || activity.vendor || activity.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-medium ${activity.type === 'sale' || activity.type === 'invoice' ? 'text-green-500' : 'text-red-500'}`}>
                ${formatNumber(activity.amount)}
              </p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// FinancialOverview Component
const FinancialOverview = () => {
  const chartOptions: unknown = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  };

  const series = [{
    name: 'Revenue',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'Expenses',
    data: [11, 32, 45, 32, 34, 52, 41]
  }];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Financial Overview</h3>
      <ApexCharts options={chartOptions} series={series} type="area" height={350} />
    </div>
  );
};

// ExpenseBreakdown Component
const ExpenseBreakdown = () => {
  const chartOptions: unknown = {
    chart: {
      type: 'donut',
    },
    labels: ['Salaries', 'Marketing', 'Operations', 'IT', 'Others'],
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#6B7280'],
    legend: {
      position: 'bottom'
    }
  };

  const series = [44, 55, 13, 33, 22];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Expense Breakdown</h3>
      <ApexCharts options={chartOptions} series={series} type="donut" />
    </div>
  );
};

// TopCustomers Component
const TopCustomers = () => {
  const customers = [
    { id: 1, name: 'Acme Corp', revenue: 50000, orders: 120 },
    { id: 2, name: 'GlobalTech', revenue: 45000, orders: 95 },
    { id: 3, name: 'Infinite Solutions', revenue: 40000, orders: 85 },
    { id: 4, name: 'MegaSoft', revenue: 35000, orders: 70 },
    { id: 5, name: 'TechGiants', revenue: 30000, orders: 60 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Top Customers</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${formatNumber(customer.revenue)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Home Component
const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Financial Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's an overview of your finances.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Revenue" 
          value="$254,763" 
          icon={<DollarSign className="w-6 h-6 text-blue-500" />} 
          trend="up" 
          trendValue="7.2%" 
          color="border-blue-500"
        />
        <StatCard 
          title="Total Expenses" 
          value="$122,154" 
          icon={<TrendingDown className="w-6 h-6 text-red-500" />} 
          trend="down" 
          trendValue="4.3%" 
          color="border-red-500"
        />
        <StatCard 
          title="Net Profit" 
          value="$132,609" 
          icon={<TrendingUp className="w-6 h-6 text-green-500" />} 
          trend="up" 
          trendValue="12.5%" 
          color="border-green-500"
        />
        <StatCard 
          title="Active Clients" 
          value="1,243" 
          icon={<Users className="w-6 h-6 text-yellow-500" />} 
          trend="up" 
          trendValue="3.2%" 
          color="border-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <FinancialOverview />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseBreakdown />
        <TopCustomers />
      </div>
    </div>
  );
};

export default Home;