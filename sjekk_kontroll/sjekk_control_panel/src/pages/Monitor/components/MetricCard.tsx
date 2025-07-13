
const MetricCard = ({ icon: Icon, title, value, unit }) => (
  <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Icon className="w-6 h-6 text-teal-500" />
    </div>
    <div className="text-3xl font-bold text-gray-800">
      {value} <span className="text-xl font-normal text-gray-600">{unit}</span>
    </div>
  </div>
);

export default MetricCard;
