import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaChartLine } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

interface ReportGeneratorProps {
  onCreateReport: (startDate: string, endDate: string, reportTitle: string) => void;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ onCreateReport }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reportTitle, setReportTitle] = useState<string>('');
  const [t] = useTranslation();

  const handleCreateReport = () => {
    if (startDate && endDate && reportTitle) {
      const startDateFormatted = moment(startDate).format('DD-MM-YYYY');
      const endDateFormatted = moment(endDate).format('DD-MM-YYYY');
      onCreateReport(startDateFormatted, endDateFormatted, reportTitle);
    }
  };

  return (
    <div className="flex  items-center justify-between space-x-4">
      <div className='flex space-x-4'>
      <div className="col-span-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('reports_block.start_date')}</label>
        <div className="relative">
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="col-span-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('reports_block.end_date')}</label>
        <div className="relative">
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="col-span-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('reports_block.report_title')}</label>
        <input
          type="text"
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
          className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      </div>
      <div className="col-span-1 md:col-span-1">
        <button
          onClick={handleCreateReport}
          className="w-full md:w-auto flex items-center justify-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
        >
          <FaChartLine className="mr-2" />
          {t('reports_block.create_report_button')}
        </button>
      </div>
    </div>
  );
};

