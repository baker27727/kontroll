import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

const RevenueByLocationChart: React.FC = () => {
  const [t] = useTranslation();

  const data = [
    { name: t('locations.downtown'), revenue: 4000 },
    { name: t('locations.uptown'), revenue: 3000 },
    { name: t('locations.midtown'), revenue: 2000 },
    { name: t('locations.suburb'), revenue: 2780 },
    { name: t('locations.airport'), revenue: 1890 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueByLocationChart;

