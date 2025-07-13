import React, { useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChartIcon, LineChartIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Card } from '../../components/Card';
import ActionBar from '../../components/Actionbar';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getNotificationsAnalytics } from '../../redux/features/notification_management_store';


const NotificationsStatisticsAndAnalysis: React.FC = () => {
  const dispatch = useAppDispatch()
  const { total_delivered, total_sent, notification_activities } = useAppSelector(state => state.notification_management_store)

  useEffect(() => {
    dispatch(getNotificationsAnalytics())
  }, [dispatch]);

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Statistics and Analysis', href: '/stats' },
  ];

  const StatCard: React.FC<{ title: string; value: number; percentage: number; icon: React.ReactNode }> = ({ title, value, percentage, icon }) => (
    <div className="bg-white rounded-md shadow p-4 flex items-center">
      <div className="mr-4 bg-blue-100 rounded-full p-3">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
        <div className="flex items-center mt-2">
          {percentage >= 0 ? (
            <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm ${percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <ActionBar breadcrumbItems={breadcrumbItems}>

      </ActionBar>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <StatCard title="Total Sent" value={total_sent} percentage={5.2} icon={<LineChartIcon className="w-6 h-6 text-blue-500" />} />
        <StatCard title="Delivered" value={total_delivered} percentage={4.8} icon={<BarChartIcon className="w-6 h-6 text-green-500" />} />
      </div>

      <Card title="Daily Notification Activity">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={notification_activities}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="count" stackId="1" stroke="#8884d8" fill="#8884d8" name="Sent" />
              <Area type="monotone" dataKey="count" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Delivered" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default NotificationsStatisticsAndAnalysis;