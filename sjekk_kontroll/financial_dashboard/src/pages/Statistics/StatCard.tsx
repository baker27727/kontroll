import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`p-4 rounded-lg ${colorClasses[color]} transition-all duration-300 hover:shadow-md`}>
      <h3 className="text-sm font-medium mb-1 truncate">{title}</h3>
      <p className="text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
};

export default StatCard;

