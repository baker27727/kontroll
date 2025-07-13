import React from 'react';

interface StatisticsCardProps {
  value: string;
  label: string;
  percentage: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ value, label, percentage, icon, bgColor, iconColor }) => {
  return (
    <div className={`rounded shadow p-4 ${bgColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold">{value}</p>
          <p className="text-sm">{label}</p>
          <p className="text-xs text-green-600">{percentage}</p>
        </div>
        <div className={`${iconColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatisticsCard