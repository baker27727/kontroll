import { LayoutDashboard } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className={`bg-white p-2 rounded-lg shadow flex items-center space-x-4`}>
    <div className={`flex-shrink-0 p-3 ${color} rounded-md text-white`}>
      <Icon className="w-8 h-8" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);



const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={LayoutDashboard} title="Coming Soon" value="-" color="bg-blue-600" />
          <StatCard icon={LayoutDashboard} title="Coming Soon" value="-" color="bg-green-600" />
          <StatCard icon={LayoutDashboard} title="Coming Soon" value="-" color="bg-yellow-600" />
          <StatCard icon={LayoutDashboard} title="Coming Soon" value="-" color="bg-red-600" />
        </div>
      </main>
    </div>
  );
};

export default Home;