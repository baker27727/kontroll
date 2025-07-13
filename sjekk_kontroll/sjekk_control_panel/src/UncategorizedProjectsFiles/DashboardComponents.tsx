import { DollarSign, Users, XCircle, TrendingUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-${color}-500 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300`}>
    <div className="flex justify-between items-center mb-4">
      <Icon className="w-8 h-8 opacity-80" />
      <div className={`bg-${color}-400 rounded-full p-2`}>
        <TrendingUp className="w-4 h-4" />
      </div>
    </div>
    <h3 className="text-2xl font-bold mb-1">{value}</h3>
    <p className="text-sm opacity-80">{title}</p>
  </div>
);

const FoodCard = ({ title, description, image }) => (
  <div className="relative overflow-hidden rounded-lg shadow-lg group">
    <img src={image} alt={title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
    <div className="absolute bottom-0 left-0 p-4 text-white">
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  </div>
);

const BookCard = ({ title, description, image }) => (
  <div className="bg-gray-800 rounded overflow-hidden shadow">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  </div>
);

const UserProfileCard = ({ name, role, tasksCompleted, totalTasks, revenue }) => (
  <div className="bg-gray-800 rounded-lg p-6 text-white shadow-lg">
    <div className="flex items-center mb-4">
      <img src="/placeholder.svg?height=50&width=50" alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>Tasks Completed</span>
        <span>{tasksCompleted} from {totalTasks}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-purple-500 rounded-full h-2"
          style={{ width: `${(tasksCompleted / totalTasks) * 100}%` }}
        ></div>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-2xl font-bold">${revenue}</span>
      <span className="text-sm text-red-500">
        <TrendingUp className="w-4 h-4 inline mr-1" />
        Last 6 month
      </span>
    </div>
  </div>
);

const WorkSummaryChart = ({ data }) => {
  const options: unknown = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: 'Revenue',
        data: data.map(d => d.revenue),
        fill: true,
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        borderColor: 'rgba(147, 51, 234, 1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Your Work Summary</h3>
      <Line options={options} data={chartData} />
    </div>
  );
};

const DashboardComponents = () => {
  const workSummaryData = [
    { month: 'Nov', revenue: 1700 },
    { month: 'Dec', revenue: 1100 },
    { month: 'Jan', revenue: 2000 },
    { month: 'Feb', revenue: 1800 },
    { month: 'Mar', revenue: 1650 },
    { month: 'Apr', revenue: 2300 },
    { month: 'May', revenue: 1500 },
    { month: 'June', revenue: 2200 },
    { month: 'July', revenue: 1800 },
  ];

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Next month's income" value="$5000.00" icon={DollarSign} color="emerald" />
          <StatCard title="Members" value="110" icon={Users} color="blue" />
          <StatCard title="Upcoming cancellations" value="3" icon={XCircle} color="red" />
          <StatCard title="Retention rate" value="97.00%" icon={TrendingUp} color="yellow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FoodCard
            title="Burgers"
            description="The best burgers in town"
            image="/src/assets/block.jpg"
          />
          <FoodCard
            title="Ice Cream"
            description="The worst ice-cream around"
            image="/src/assets/block.jpg"
          />
          <FoodCard
            title="Pizza"
            description="This 'za be gettin down"
            image="/src/assets/block.jpg"
          />
          <FoodCard
            title="BBQ"
            description="BBQ ain't need no rhyme"
            image="/src/assets/block.jpg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BookCard
            title="Pot of Hair"
            description="A boy with a dent in his head tries to stop a bad guy. And by bad I mean bad at winning."
            image="/src/assets/block.jpg"
          />
          <UserProfileCard
            name="Eleanor Pena"
            role="Sale's manager Europe"
            tasksCompleted={5}
            totalTasks={5}
            revenue={590.00}
          />
          <div className="md:col-span-2">
            <WorkSummaryChart data={workSummaryData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponents;