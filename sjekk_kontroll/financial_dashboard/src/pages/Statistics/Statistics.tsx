import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getStatistics, getSanctionChartData } from '../../redux/stores/statistics_store';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiRefreshLine, RiCalendarLine } from 'react-icons/ri';
import RevenueByLocationChart from './RevenueByLocationChart';
import SanctionsOverTimeChart from './SanctionOverTimeChart';
import StatCard from './StatCard';

const Statistics: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [t] = useTranslation();
  const dispatch = useAppDispatch();

  const {
    total_sanctions,
    total_unpaid_sanctions,
    total_paid_sanctions,
    total_deleted_sanctions,
    paid_sanctions_chart_data,
    not_paid_sanctions_chart_data,
  } = useAppSelector((state) => state.statistics_store);

  useEffect(() => {
    dispatch(getStatistics());
    dispatch(getSanctionChartData());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getStatistics());
    dispatch(getSanctionChartData());
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {t('statistics_block.statistics')}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {t('statistics_block.analyze_finances')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  dateFormat="yyyy/MM/dd"
                  placeholderText={t('statistics_block.start_date')}
                />
                <RiCalendarLine className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative w-full sm:w-auto">
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  dateFormat="yyyy/MM/dd"
                  placeholderText={t('statistics_block.end_date')}
                />
                <RiCalendarLine className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={handleRefresh}
                className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <RiRefreshLine className="inline-block mr-2" />
                {t('statistics_block.refresh')}
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            title={t('statistics_block.total_sanctions')}
            value={total_sanctions}
            color="blue"
          />
          <StatCard
            title={t('statistics_block.total_paid_sanctions')}
            value={total_paid_sanctions}
            color="green"
          />
          <StatCard
            title={t('statistics_block.total_unpaid_sanctions')}
            value={total_unpaid_sanctions}
            color="yellow"
          />
          <StatCard
            title={t('statistics_block.total_deleted_sanctions')}
            value={total_deleted_sanctions}
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4">{t('statistics_block.sanctions_over_time')}</h2>
            <SanctionsOverTimeChart
              paidData={paid_sanctions_chart_data}
              notPaidData={not_paid_sanctions_chart_data}
            />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4">{t('statistics_block.revenue_by_location')}</h2>
            <RevenueByLocationChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

