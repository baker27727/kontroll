import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

interface SanctionsOverTimeChartProps {
  paidData: any[];
  notPaidData: any[];
}

const SanctionsOverTimeChart: React.FC<SanctionsOverTimeChartProps> = ({ paidData, notPaidData }) => {
  const [t] = useTranslation();

  const parseChartData = (paidData: any[], notPaidData: any[]) => {
    const allDates = new Set<string>();
    [...paidData, ...notPaidData].forEach((entry) => allDates.add(entry.date));

    const sortedDates = Array.from(allDates).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    return sortedDates.map(date => ({
      date,
      paid: paidData.find(d => d.date === date)?._count.status || 0,
      notPaid: notPaidData.find(d => d.date === date)?._count.status || 0,
    }));
  };

  const data = parseChartData(paidData, notPaidData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="paid" stroke="#4CAF50" name={t('statistics_block.paid_sanctions')} />
        <Line type="monotone" dataKey="notPaid" stroke="#F44336" name={t('statistics_block.unpaid_sanctions')} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SanctionsOverTimeChart;

