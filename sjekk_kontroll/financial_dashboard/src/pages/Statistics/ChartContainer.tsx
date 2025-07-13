import React from 'react';

interface ChartContainerProps {
  title: string;
  chart: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, chart }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-80">{chart}</div>
    </div>
  );
};

export default ChartContainer;

