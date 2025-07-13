import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ArrowUpRight, Users, Calendar } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: number;
  percentageIncrease: number;
  data: number[];
}

const EnhancedAnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  percentageIncrease,
  data,
}) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      sparkline: { enabled: true },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      enabled: true,
      custom: function({ series, seriesIndex, dataPointIndex }) {
        return (
          '<div class="bg-white p-2 rounded shadow">' +
          '<span class="font-bold">' + series[seriesIndex][dataPointIndex] + '</span>' +
          '</div>'
        );
      },
    },
    colors: ['#4F46E5'],
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false }, min: Math.min(...data) * 0.9, max: Math.max(...data) * 1.1 },
  };

  const chartSeries = [{ name: title, data: data }];

  return (
    <div className="bg-white rounded shadow max-w-sm transition-all duration-300">
      <div className='p-3'>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Users className="w-6 h-6 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-500">Last 30 days</span>
        </div>
      </div>
      <div className="flex items-baseline space-x-2 mb-2">
        <span className="text-3xl font-bold text-gray-900">
          {hoveredValue !== null ? hoveredValue.toLocaleString() : value.toLocaleString()}
        </span>
        <span className="text-sm font-medium text-green-500 flex items-center">
          <ArrowUpRight className="w-4 h-4 mr-1" />
          {percentageIncrease}%
        </span>
      </div>
      </div>
      <div className="h-24">
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height="100%"
          onMouseMove={(_, __, config) => {
            if (config.dataPointIndex !== -1) {
              setHoveredValue(data[config.dataPointIndex]);
            }
          }}
          onMouseLeave={() => setHoveredValue(null)}
        />
      </div>
    </div>
  );
};

export default function AnalyticsCardDemo() {
  const sampleData = {
    title: 'Users',
    value: 3682,
    percentageIncrease: 57.1,
    data: [3100, 3200, 3300, 3200, 3400, 3500, 3450, 3600, 3682],
  };

  return <EnhancedAnalyticsCard {...sampleData} />;
}