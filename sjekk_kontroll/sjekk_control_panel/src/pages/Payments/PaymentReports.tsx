import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PlusCircle, X, Calendar, FileText, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../../components/InputField';
import { IconType } from 'react-icons';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { generatePaymentReport, getPaymentReports, PaymentReport } from '../../redux/features/payment_report_reducer';
import { toast } from 'react-toastify';
import { storageUrl } from '../../configs/constants';
import DisabledWrapper from './DisabledWrapper';

const generateChartData = () => {
  const data = [];
  const currentDate = new Date();
  for (let i = 12; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount: Math.floor(Math.random() * 1000) + 500,
    });
  }
  return data;
};


interface Column<T> {
  header: string;
  accessor: string | string[];
  pinned?: boolean;
  render?: (value: string, row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
}

const Table = <T extends object>({ 
  data, 
  columns, 
  actions = null, 
  emptyMessage = "No data available" 
}: TableProps<T>) => {
  const pinnedColumns = columns.filter(col => col.pinned);
  const unpinnedColumns = columns.filter(col => !col.pinned);
  const allColumns = [...pinnedColumns, ...unpinnedColumns];

  const getNestedValue = (obj, accessor: string | string[]) => {
    if (typeof accessor === 'string') {
      return obj[accessor];
    }
    return accessor.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  };

  return (
    <div className="overflow-x-auto relative">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {allColumns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.pinned ? 'sticky left-0 z-10 bg-gray-50' : ''
                }`}
              >
                {column.header}
              </th>
            ))}
            {actions && <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={allColumns.length + (actions ? 1 : 0)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {allColumns.map((column, colIndex) => {
                  const cellValue = getNestedValue(row, column.accessor);
                  return (
                    <td 
                      key={colIndex} 
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
                        column.pinned ? 'sticky left-0 z-10 bg-white' : ''
                      }`}
                    >
                      {column.render ? column.render(cellValue, row) : cellValue}
                    </td>
                  );
                })}
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const PaymentReports: React.FC = () => {
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState<PaymentReport | null>(null);
  const [newReport, setNewReport] = useState({ report_name: '', start_date: new Date(), end_date: new Date(), content: '' });
  const [isLoading, setIsLoading] = useState(false);

  // const [isMetaDataOpen,setIsMetaDataOpen] = useState(false)

  const dispatch = useAppDispatch()
  const { reports, loading } = useAppSelector((state) => state.payment_reports_reducer)

  useEffect(() => {
    dispatch(getPaymentReports())
  }, [dispatch])

  const toggleGenerateReport = () => {
    setShowGenerateReport(!showGenerateReport);
  };

  // const toggleMetadata = (row: PaymentReport) => {
  //   setSelectedReport(row)
  //   setIsMetaDataOpen(!isMetaDataOpen)
  // }

  const handleCreateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(
        generatePaymentReport(newReport)
      ).unwrap();
      setShowGenerateReport(false);
      toast.success('Report created successfully');
    } catch (error) {
      toast.error('Failed to create report');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewReport = (report: PaymentReport) => {
    setSelectedReport(report);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  const columns: Column<PaymentReport>[] = [
    { header: 'Title', accessor: 'report_name' },
    { 
      header: 'Start Date', 
      accessor: ['metadata', 'start_date'],
    },
    { 
      header: 'End Date', 
      accessor: ['metadata', 'end_date'],
    },
    { 
      header: 'Generated by', 
      accessor: ['metadata', 'generated_by'],
    },
  ];

  const actions = (row: PaymentReport) => (
    <div className='flex items-center space-x-4'>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleViewReport(row)}
        className="text-blue-600 hover:text-blue-900 flex items-center"
      >
        View
      </motion.button>

      {/* <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => toggleMetadata(row)}
        className="text-green-600 hover:text-green-900 flex items-center"
      >
        Metadata
      </motion.button> */}
    </div>
  );

  generateChartData();

  const LoadingWrapper = ({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader className="animate-spin h-8 w-8 text-blue-500" />
        </div>
      );
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4 space-y-4">
            <LoadingWrapper isLoading={loading}>
              <div className="bg-white shadow-sm rounded-lg overflow-hidden p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Report Statistics</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Reports</span>
                    <span className="text-2xl font-bold text-blue-600">{reports.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Latest Report</span>
                    <span className="text-sm text-gray-800">{reports[0]?.created_at}</span>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleGenerateReport}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Create New Report
                  </motion.button>
                </div>
              </div>
            </LoadingWrapper>

            <DisabledWrapper>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden ">
              <h2 className="text-lg p-4 font-bold text-gray-900 mb-6">Weekly Payments</h2>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={generateChartData()} margin={{ top: 10, left: 0, bottom: 0 }}>
                  <Tooltip />
                  <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            </DisabledWrapper>
          </div>
          <div className="w-full md:w-3/4">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-4">
                <h1 className="text-lg font-bold text-gray-900 mb-6">Payment Reports</h1>
                <Table
                  data={reports}
                  columns={columns}
                  actions={actions}
                  emptyMessage="No reports available"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showGenerateReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          >
            <div className="flex items-center justify-center min-h-screen">
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-lg   shadow-sm transform transition-all max-w-lg w-full"
                onClick={e => e.stopPropagation()}
              >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={toggleGenerateReport}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Generate New Report</h2>
                  <form onSubmit={handleCreateReport} className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                      <div className="mt-1 relative rounded-md shadow-sm-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          icon={FileText as IconType}
                          type="text"
                          id="title"
                          value={newReport.report_name}
                          onChange={(e) => setNewReport({ ...newReport, report_name: e.target.value })}
                          required
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter report name"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Start Date</label>
                      <div className="mt-1 relative rounded-md shadow-sm-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <DatePicker
                          selected={newReport.start_date}
                          onChange={(date: Date) => setNewReport({ ...newReport, start_date: date })}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-2 p-2 cursor-pointer border-gray-300 rounded-md"
                          dateFormat="MMMM d, yyyy"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">End Date</label>
                      <div className="mt-1 relative rounded-md shadow-sm-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <DatePicker
                          selected={newReport.end_date}
                          onChange={(date: Date) => setNewReport({ ...newReport, end_date: date })}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-2 p-2 cursor-pointer border-gray-300 rounded-md"
                          dateFormat="MMMM d, yyyy"
                        />
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Generate Report
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={handleCloseModal}
          >
            <div className="flex items-center justify-center min-h-screen">
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-lg overflow-hidden h-[90vh] shadow-sm transform transition-all max-w-4xl w-full"
                onClick={e => e.stopPropagation()}
              >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleCloseModal}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={`${storageUrl}/${selectedReport.report_path}`}
                      className="w-full h-[84vh]"
                      style={{ border: 'none' }}
                      title="PDF Viewer"
                    ></iframe>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <AnimatePresence>
        {
          isMetaDataOpen && (
<motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={handleCloseModal}
          >
            <div className="flex items-center justify-center min-h-screen">
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-lg overflow-hidden h-[90vh] shadow-sm transform transition-all max-w-4xl w-full"
                onClick={e => e.stopPropagation()}
              >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleCloseModal}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                </motion.div>
              metadata modal
            </div>
          </motion.div>
          )
        }
      </AnimatePresence> */}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-white"
            >
              <Loader className="h-12 w-12" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentReports;

