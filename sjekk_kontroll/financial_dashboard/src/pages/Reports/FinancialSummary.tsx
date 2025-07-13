import React from 'react';
import { FaDollarSign, FaPercentage, FaChartLine } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface FinancialSummaryProps {
  totalRevenue: number;
}

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({ totalRevenue }) => {
  const [t] = useTranslation();
  const taxRate = 0.18;
  const taxDeducted = totalRevenue * taxRate;
  const netRevenue = totalRevenue - taxDeducted;

  const SummaryCard: React.FC<{ icon: React.ReactNode; title: string; amount: number; bgColor: string; iconColor: string }> = ({
    icon,
    title,
    amount,
    bgColor,
    iconColor,
  }) => (
    <div className={`${bgColor} p-4 rounded-md shadow-sm flex items-center`}>
      <div className={`${iconColor} text-3xl mr-3`}>{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-xl font-bold text-gray-800">${amount?.toFixed(2)}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SummaryCard
        icon={<FaDollarSign />}
        title={t('reports_block.total_revenue')}
        amount={totalRevenue}
        bgColor="bg-blue-100"
        iconColor="text-blue-600"
      />
      <SummaryCard
        icon={<FaPercentage />}
        title={`${t('reports_block.tax_deducted')} (${taxRate * 100}%)`}
        amount={taxDeducted}
        bgColor="bg-green-100"
        iconColor="text-green-600"
      />
      <SummaryCard
        icon={<FaChartLine />}
        title={t('reports_block.net_revenue')}
        amount={netRevenue}
        bgColor="bg-yellow-100"
        iconColor="text-yellow-600"
      />
    </div>
  );
};

