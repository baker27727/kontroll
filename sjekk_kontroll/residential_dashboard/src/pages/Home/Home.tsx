import React, { useEffect, useState } from 'react'
import { FaCar, FaParking, FaUsers } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getStatistics } from '../../redux/stores/statistics_store'
import { useTranslation } from 'react-i18next'

interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  color: string;
  className?: string
}

export const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, icon, trend, className = '' }) => {
  return (
    <div className={`bg-white shadow rounded-md overflow-hidden ${className}`}>
      <div className="px-4 py-4 sm:px-6 sm:py-6 flex flex-col sm:flex-row items-center sm:items-start justify-between">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl sm:text-3xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <p className="mt-1 text-sm">
              <span
                className={`font-semibold ${
                  trend.value >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-gray-500 ml-1">{trend.label}</span>
            </p>
          )}
        </div>
        <div className="p-3 bg-indigo-100 rounded-full">{icon}</div>
      </div>
    </div>
  );
};

export default function Home() {
  const { dashboard } = useAppSelector(state => state.auth_store)
  const { total_cars_count, guest_cars_count, reserved_cars_count } = useAppSelector(state => state.statistics_store)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    if (!dashboard?.residential_quarter.id) return
    dispatch(getStatistics(dashboard.residential_quarter.id))

    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)

    // Clear interval on component unmount
    return () => clearInterval(timer)
  }, [dispatch, dashboard?.residential_quarter.id])

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg mb-8 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {t('home_block.welcome', { name: dashboard?.residential_quarter.quarter_name || 'Resident' })}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            {currentTime.toLocaleTimeString()}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatisticCard
            title={t('home_block.registered_cars')}
            value={total_cars_count}
            icon={<FaCar className="h-6 w-6 text-green-500" />}
            trend={{ value: 3, label: 'Increase' }}
            color="border-green-500"
          />
          <StatisticCard
            title={t('home_block.guests')}
            value={guest_cars_count}
            icon={<FaUsers className="h-6 w-6 text-yellow-500" />}
            trend={{ value: -2, label: 'Decrease' }}
            color="border-yellow-500"
          />
          <StatisticCard
            title={t('home_block.reserved_parkings')}
            value={reserved_cars_count}
            icon={<FaParking className="h-6 w-6 text-purple-500" />}
            trend={{ value: 7, label: 'Increase' }}
            color="border-purple-500"
          />
        </div>
      </div>
    </div>
  )
}