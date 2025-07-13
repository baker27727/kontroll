import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { generateReport, getReports, getTotalRevenue } from '../../redux/stores/report_store';
import { showNotification } from '../../redux/stores/notification_store';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ReportGenerator } from './ReportGenerator';
import { FinancialSummary } from './FinancialSummary';
import { PdfViewer } from './PdfViewer';
import { ReportList } from './ReportList';

const ReportsAndFinances: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { reports, total_revenue } = useAppSelector((state) => state.report_store);
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(getReports());
    dispatch(getTotalRevenue());
  }, [dispatch]);

  const handleCreateReport = async (startDate: string, endDate: string, reportTitle: string) => {
    try {
      await dispatch(generateReport({ start_date: startDate, end_date: endDate, report_title: reportTitle })).unwrap();
      dispatch(showNotification({
        message: t('reports_block.report_created_title'),
        description: t('reports_block.report_created_message'),
        type: 'success',
      }));
    } catch (error) {
      dispatch(showNotification({
        message: t('reports_block.report_creation_failed_title'),
        description: t('reports_block.report_creation_failed_message'),
        type: 'error',
      }));
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 min-h-screen p-4"
    >
      <div className="max-w-7xl mx-auto space-y-4">
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white p-4 rounded-md shadow-sm"
        >
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{t('reports_block.reports_and_finances')}</h1>
            <p className="text-lg text-gray-600 mt-2">{t('reports_block.view_finances_and_reports')}</p>
          </header>
          <ReportGenerator onCreateReport={handleCreateReport} />
        </motion.section>

        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white p-4 rounded-md shadow-sm"
        >
          <FinancialSummary totalRevenue={total_revenue} />
        </motion.section>

        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white p-4 rounded-md shadow-sm"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('reports_block.detailed_report')}</h2>
          <ReportList reports={reports} onViewPdf={setSelectedPdf} />
        </motion.section>

        {selectedPdf && (
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white p-4 rounded-md shadow-sm"
          >
            <PdfViewer pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />
          </motion.section>
        )}
      </div>
    </motion.main>
  );
};

export default ReportsAndFinances;

