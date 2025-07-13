'use client'

import { useEffect, useState } from 'react'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import {  AlertCircle, ArrowDownRight, ArrowUpRight, Clock, CreditCard, DollarSign, Ticket, Wallet } from 'lucide-react'
import DisabledWrapper from './DisabledWrapper'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import LoadingWrapper from './LoadingWrapper'
import { getPaymentDashboardStatistics, getPayments, Payment, Refund } from '../../redux/features/payment-dashboard-reducer'
import { getAllViolations } from '../../redux/features/ViolationSlice'
import { Link, useNavigate } from 'react-router-dom'
import Routes from '../../constants/routes'
import { toast } from 'react-toastify'
import Violation from '../../interfaces/Violation'
import Button from '../../components/Button'
import { getPaymentLogs } from '../../redux/features/payment_logs_reducer'
import { cancelPaymentRefund, getPaymentRefunds } from '../../redux/features/payment_refund_reducer'
import moment from 'moment'
import { getStripeBalance } from '../../redux/features/stripe_balance_reducer'





export default function PaymentDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg border p-4 ${className}`}>
      {children}
    </div>
  )

  const TabButton = ({ value, label, active, onClick }) => (
    <button
      onClick={() => onClick(value)}
      className={`px-3 py-2 text-sm font-medium rounded-md ${
        active
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  )

  type NestedAccessor = string | string[];

  interface Column<T> {
    header: string;
    accessor: NestedAccessor;
    pinned?: boolean;
    render?: (value: string, row: T) => React.ReactNode;
  }
  
  interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: (row: T) => React.ReactNode;
    emptyMessage?: string;
  }
  
  const getNestedValue = (obj, accessor: NestedAccessor) => {
    if (typeof accessor === 'string') {
      return obj[accessor];
    }
    return accessor.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  };
  
  const Table = <T extends object>({ 
    data, 
    columns, 
    actions = null, 
    emptyMessage = "No data available" 
  }: TableProps<T>) => {
    const pinnedColumns = columns.filter(col => col.pinned);
    const unpinnedColumns = columns.filter(col => !col.pinned);
    const allColumns = [...pinnedColumns, ...unpinnedColumns];
  
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

  const {
    payments,
    dashboard,
    is_dashboard_loading,
    is_payments_loading
  } = useAppSelector(state => state.payment_dashboard_reducer)

  const {
    loading: is_violations_loading,
    violations
  } = useAppSelector(state => state.ViolationReducer)

  const {
    paymentLogs,
    loading: is_payment_logs_loading
  } = useAppSelector(state => state.payment_logs_reducer)

  const {
    refunds,
    loading: is_refunds_loading
  } = useAppSelector(state => state.payment_refund_reducer)

  const stripe_balance = useAppSelector(state => state.stripe_balance_reducer)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPayments())
    dispatch(getPaymentDashboardStatistics())
    dispatch(getAllViolations())
    dispatch(getPaymentLogs())
    dispatch(getPaymentRefunds())
    dispatch(getStripeBalance())
  }, [dispatch])

  const navigate = useNavigate()


  async function handleRefund(row: Payment) {
    // await dispatch(
    //   createPaymentRefund(row.id)
    // ).then(() => {
    //   dispatch(getPaymentDashboardStatistics())
    //   dispatch(getPaymentRefunds())

    //   toast.success('Refund created successfully')
    // }).catch(() => {
    //   toast.error('Failed to refund')
    // })
    console.log(row.id);
    
    toast.info("Initiating refund... This feature is not yet implemented.")
  }

  async function handleCancelRefund(row: Refund) {
    await dispatch(
      cancelPaymentRefund(row.id)
    ).then(() => {

      toast.success('Refund cancelled successfully')
      dispatch(getPaymentDashboardStatistics())
      dispatch(getPaymentRefunds())
    }).catch(() => {
      toast.error('Failed to cancel refund')
    })
  }

  const handlePayout = () => {
    toast.info("Initiating payout... This feature is not yet implemented.")
  }

  return (
    <div className="flex-1 space-y-4 p-4">
      <div className="space-y-4">
      <div className="bg-white rounded-md p-4 shadow-sm">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <h2 className="text-xl font-semibold tracking-tight">Payment Dashboard</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">|</span>
              <Link to={Routes.DASHBOARDS.PAYMENT_REPORTS} className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
                Reports
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <TabButton
              value="overview"
              label="Overview"
              active={activeTab === 'overview'}
              onClick={setActiveTab}
            />
            <TabButton
              value="analytics"
              label="Analytics"
              active={activeTab === 'analytics'}
              onClick={setActiveTab}
            />
            <TabButton
              value="overdue-refunded"
              label="Overdue & Refunded"
              active={activeTab === 'overdue-refunded'}
              onClick={setActiveTab}
            />
            <TabButton
              value="logs"
              label="Logs"
              active={activeTab === 'logs'}
              onClick={setActiveTab}
            />
            <TabButton
              value="stripe-balance"
              label="Stripe Balance"
              active={activeTab === 'stripe-balance'}
              onClick={setActiveTab}
            />
          </div>
        </div>
      </div>
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <LoadingWrapper isLoading={is_dashboard_loading}>
              <Card>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{dashboard.statistics.total_revenue} Kr.</div>
                {/* <p className="text-xs text-gray-500">
                  +20.1% from last month
                </p> */}
              </Card>
              </LoadingWrapper>
              <LoadingWrapper isLoading={is_dashboard_loading}>
              <Card>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Total Payments</p>
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{dashboard.statistics.total_payments}</div>
                {/* <p className="text-xs text-gray-500">
                  +180.1% from last month
                </p> */}
              </Card>
              </LoadingWrapper>
              <LoadingWrapper isLoading={is_dashboard_loading}>
              <Card>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Total Refunds</p>
                  <Ticket className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{dashboard.statistics.total_refunds}</div>
                {/* <p className="text-xs text-gray-500">
                  +19% from last month
                </p> */}
              </Card>
              </LoadingWrapper>
              <LoadingWrapper isLoading={is_violations_loading}>
              <Card>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Total Violations</p>
                  <Ticket className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{violations.length}</div>
                {/* <p className="text-xs text-gray-500">
                  -4% from last month
                </p> */}
              </Card>
              </LoadingWrapper>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <LoadingWrapper isLoading={is_dashboard_loading}>
              <Card className="col-span-4">
                <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dashboard.revenue_overview}>
                      <XAxis
                        dataKey="date"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              </LoadingWrapper>
              <LoadingWrapper isLoading={is_dashboard_loading}>
              <Card className="col-span-3 max-md:col-span-4">
                <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Distribution of payment methods used
                </p>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboard.payment_methods}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              </LoadingWrapper>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <LoadingWrapper isLoading={is_dashboard_loading}>
              <Card>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Expired Payments</p>
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{dashboard.statistics.overdued_payments}</div>
                {/* <p className="text-xs text-gray-500">
                  +20.1% from last month
                </p> */}
              </Card>
              </LoadingWrapper>
              <LoadingWrapper isLoading={is_dashboard_loading}>
              <Card>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Idle Payments</p>
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{dashboard.statistics.idle_payments}</div>
                {/* <p className="text-xs text-gray-500">
                  +180.1% from last month
                </p> */}
              </Card>
              </LoadingWrapper>
              <LoadingWrapper isLoading={is_dashboard_loading}>
              <Card>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Completed Payments</p>
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{dashboard.statistics.completed_payments}</div>
                {/* <p className="text-xs text-gray-500">
                  +19% from last month
                </p> */}
              </Card>
              </LoadingWrapper>
              <LoadingWrapper isLoading={is_dashboard_loading}>
              <Card>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Failed Payments</p>
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{dashboard.statistics.failed_payments}</div>
                {/* <p className="text-xs text-gray-500">
                  -4% from last month
                </p> */}
              </Card>
              </LoadingWrapper>
            </div>

            <LoadingWrapper isLoading={is_payments_loading}>
            <Card>
              <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
              <Table
                data={payments}
                columns={[
                  { header: 'ID', accessor: 'id', pinned: true },
                  { header: 'Holder', accessor: ['metadata', 'card_holder_details', 'full_name'] },
                  { header: 'Card', accessor: ['metadata', 'card_holder_details', 'card_number'] },
                  { header: 'Amount', accessor: 'required_amount' },
                  { header: 'Date', accessor: 'init_date' },
                  { header: 'Paid At', accessor: ['metadata', 'paid_at'] },
                  { header: 'Status', accessor: 'status' },
                  { header: 'Sanction', accessor: 'sanction_id' },
                ]}
                actions={
                  (row: Payment) => (
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-600 hover:underline"
                        onClick={() => navigate(Routes.DASHBOARDS.PAYMENT_DETAILS.replace(':id', row.id.toString()))}
                      >
                        View
                      </button>
                      <button
                        className="text-green-500 hover:text-green-600 hover:underline"
                        onClick={() => navigate(Routes.PAGES.VIOLATION_DETAILS.replace(':id', row.sanction_id.toString()))}
                      >
                        Sanction
                      </button>

                      {
                        row.status == 'completed' && (
                          <button
                            className="text-red-500 hover:text-red-600 hover:underline"
                            onClick={() => handleRefund(row)}
                          >
                            Refund
                          </button>
                        )
                      }
                      
                      <button
                        className="text-red-500 hover:text-red-600 hover:underline"
                        onClick={() => toast.error('Not implemented yet')}
                      >
                        Delete
                      </button>
                    </div>
                  )
                }
              />
            </Card>
            </LoadingWrapper>
            <LoadingWrapper isLoading={is_violations_loading}>
            <Card>
              <h3 className="text-lg font-semibold mb-4">Recent Violations</h3>
              <Table<Violation>
                data={violations}
                columns={[
                  { header: 'ID', accessor: 'id', pinned: true },
                  { header: 'Created by', accessor: ['created_by', 'name'] },
                  { header: 'Released to', accessor: ['plate_info', 'plate_number'] },
                  { header: 'Place', accessor: ['place', 'location'] },
                  { header: 'Date', accessor: 'created_at' },
                  { header: 'KID', accessor: ['ticket_info', 'kid'] },
                  { header: 'Rule', accessor: 'rule', render: (_, row) => row.rules[0].name },
                  { header: 'Charge', accessor: ['ticket_info', 'kid'], render: (_, row) => row.rules[0].charge + ' kr.' },
                ]}

                actions={
                  (row: Violation) => (
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-600 hover:underline"
                        onClick={() => navigate(Routes.PAGES.VIOLATION_DETAILS.replace(':id', row.id.toString()))}
                      >
                        View
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600 hover:underline"
                        onClick={() => toast.error('Not implemented yet')}
                      >
                        Delete
                      </button>
                    </div>
                  )
                }
              />
            </Card>
            </LoadingWrapper>
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <DisabledWrapper>
              <Card>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                </div>
                <div className="text-2xl font-bold">3.6%</div>
                <p className="text-xs text-gray-500">
                  +0.3% from last week
                </p>
                <div className="mt-4 h-[60px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { day: "Mon", rate: 3.4 },
                        { day: "Tue", rate: 3.5 },
                        { day: "Wed", rate: 3.3 },
                        { day: "Thu", rate: 3.4 },
                        { day: "Fri", rate: 3.6 },
                        { day: "Sat", rate: 3.5 },
                        { day: "Sun", rate: 3.6 },
                      ]}
                    >
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              </DisabledWrapper>
              <DisabledWrapper>
              <Card>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Average Transaction Value</p>
                </div>
                <div className="text-2xl font-bold">$42.50</div>
                <p className="text-xs text-gray-500">
                  -2.5% from last week
                </p>
                <div className="mt-4 h-[60px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { day: "Mon", value: 40 },
                        { day: "Tue", value: 43 },
                        { day: "Wed", value: 45 },
                        { day: "Thu", value: 44 },
                        { day: "Fri", value: 41 },
                        { day: "Sat", value: 40 },
                        { day: "Sun", value: 42.5 },
                      ]}
                    >
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              </DisabledWrapper>
              <DisabledWrapper>
              <Card>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Chargeback Rate</p>
                </div>
                <div className="text-2xl font-bold">0.8%</div>
                <p className="text-xs text-gray-500">
                  +0.1% from last week
                </p>
                <div className="mt-4 h-[60px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { day: "Mon", rate: 0.7 },
                        { day: "Tue", rate: 0.8 },
                        { day: "Wed", rate: 0.8 },
                        { day: "Thu", rate: 0.7 },
                        { day: "Fri", rate: 0.8 },
                        { day: "Sat", rate: 0.9 },
                        { day: "Sun", rate: 0.8 },
                      ]}
                    >
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              </DisabledWrapper>
            </div>
            <DisabledWrapper>
            <Card>
              <h3 className="text-lg font-semibold mb-4">Payment Success Rate</h3>
              <p className="text-sm text-gray-500 mb-4">
                Percentage of successful payments over time
              </p>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { date: '2023-01-01', successRate: 95 },
                      { date: '2023-02-01', successRate: 27 },
                      { date: '2023-03-01', successRate: 94 },
                      { date: '2023-04-01', successRate: 70 },
                      { date: '2023-05-01', successRate: 95 },
                      { date: '2023-06-01', successRate: 90 },
                      { date: '2023-07-01', successRate: 99 },
                    ]}
                  >
                    <XAxis
                      dataKey="date"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="successRate"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            </DisabledWrapper>
          </div>
        )}

{activeTab === 'overdue-refunded' && (
          <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <LoadingWrapper isLoading={is_dashboard_loading}>
              <Card>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Total Overdue</p>
                  <Ticket className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{payments.filter((payment) => payment.status === 'overdue').length}</div>
                {/* <p className="text-xs text-gray-500">
                  +20.1% from last month
                </p> */}
              </Card>
              </LoadingWrapper>
              <LoadingWrapper isLoading={is_dashboard_loading}>
              <Card>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Total Refunded</p>
                  <Ticket className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{payments.filter((payment) => payment.status === 'refunded').length}</div>
                {/* <p className="text-xs text-gray-500">
                  +20.1% from last month
                </p> */}
              </Card>
              </LoadingWrapper>
              </div>
            <Card>
              <h3 className="text-lg font-semibold mb-4">Overdue Payments</h3>
              <Table
                emptyMessage='No overdue payments found'
                data={payments.filter((payment) => payment.status === 'overdue')}
                columns={[
                  { header: 'ID', accessor: 'id', pinned: true },
                  { header: 'Holder', accessor: 'holder' },
                  { header: 'Amount', accessor: 'amount', render: (value) => `$${value}` },
                  { header: 'Due Date', accessor: 'dueDate' },
                  { header: 'Days Overdue', accessor: 'daysOverdue' },
                ]}
                actions={(row) => (
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-600 hover:underline"
                      onClick={() => toast.info(`Sending reminder for payment ID: ${row.id}`)}
                    >
                      Send Reminder
                    </button>
                  </div>
                )}
              />
            </Card>
            <LoadingWrapper isLoading={is_refunds_loading}>
            <Card>
              <h3 className="text-lg font-semibold mb-4">Refunded Payments</h3>
              <Table
                emptyMessage='No refunded payments found'
                data={refunds}
                columns={[
                  { header: 'ID', accessor: 'id', pinned: true },
                  { header: 'Holder', accessor: ['payment', 'metadata', 'card_holder_details', 'full_name'] },
                  { header: 'Card', accessor: ['payment', 'metadata', 'card_holder_details', 'card_number'] },
                  { header: 'Amount', accessor: 'refund_amount', render: (value) => `${+value / 100}` },
                  { header: 'Refund Date', accessor: 'refundDate', render: (_, row) => {
                    const start_date = row.requested_at

                    const date = moment(start_date, 'DD.MM.YYYY HH:mm').add(14, 'days').format('DD.MM.YYYY HH:mm')

                    return date
                  } },
                  { header: 'Reason', accessor: 'reason', render: (value) => value || 'N/A' },
                ]}
                actions={(row) => (
                  <div className="flex space-x-2">
                    <button
                      className="text-red-500 hover:text-red-600 hover:underline"
                      onClick={() => handleCancelRefund(row)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              />
            </Card>
            </LoadingWrapper>
          </div>
        )}

{activeTab === 'logs' && (
          <div className="space-y-4">
            <LoadingWrapper isLoading={is_payment_logs_loading}>
            <Card>
              <h3 className="text-lg font-semibold mb-4">Payment Logs</h3>
              <Table
                emptyMessage='No payment logs found'
                data={paymentLogs}
                columns={[
                  { header: 'ID', accessor: 'id', pinned: true },
                  { header: 'Action', accessor: 'action' },
                  { header: 'Date', accessor: 'timestamp', render(value) {
                    const date = new Date(value);
                    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
                  }, },
                  { header: 'Details', accessor: 'details' },

                ]}
              />
            </Card>
            </LoadingWrapper>
          </div>
        )}

{activeTab === 'stripe-balance' && (
          <div className="space-y-6">
            <LoadingWrapper isLoading={stripe_balance.loading}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      <Wallet className="mr-2 h-6 w-6 text-green-500" />
                      Available Balance
                    </h3>
                    <Button onClick={handlePayout} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm flex items-center">
                      Payout
                    </Button>
                  </div>
                  {stripe_balance?.available.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-2xl font-bold text-green-600">
                          {(item.amount / 100).toFixed(2)} {item.currency.toUpperCase()}
                        </span>
                        <ArrowUpRight className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  ))}
                  <p className="text-sm text-gray-600 mt-2">
                    This is the balance available for immediate use or payout to your bank account.
                  </p>
                </Card>

                <Card>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Clock className="mr-2 h-6 w-6 text-yellow-500" />
                    Pending Balance
                  </h3>
                  {stripe_balance?.pending.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-2xl font-bold text-yellow-600">
                          {(item.amount / 100).toFixed(2)} {item.currency.toUpperCase()}
                        </span>
                        <ArrowDownRight className="h-5 w-5 text-yellow-500" />
                      </div>
                    </div>
                  ))}
                  <p className="text-sm text-gray-600 mt-2">
                    This balance represents funds that are not yet available, typically due to pending transactions or holding periods.
                  </p>
                </Card>

                <Card>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <DollarSign className="mr-2 h-6 w-6 text-blue-500" />
                    Connect Reserved
                  </h3>
                  {stripe_balance?.connect_reserved.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-2xl font-bold text-blue-600">
                          {(item.amount / 100).toFixed(2)} {item.currency.toUpperCase()}
                        </span>
                        <AlertCircle className="h-5 w-5 text-blue-500" />
                      </div>
                    </div>
                  ))}
                  <p className="text-sm text-gray-600 mt-2">
                    This balance is reserved for potential disputes or chargebacks in Stripe Connect accounts.
                  </p>
                </Card>
              </div>

              <Card>
                <h3 className="text-xl font-semibold mb-4">Source Types</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {['available', 'pending', 'connect_reserved'].map((balanceType) => (
                    <div key={balanceType}>
                      <h4 className="font-semibold  capitalize">{balanceType.replace('_', ' ')}</h4>
                      {stripe_balance?.[balanceType]?.length > 0 ? (
                        stripe_balance[balanceType]?.map((item, index) => (
                          <div key={index} className="mb-2">
                            <h5 className="text-sm font-medium">{item.currency.toUpperCase()}</h5>
                            {Object.entries(item?.source_types ?? {}).length > 0 ? (
                              <ul className="list-disc list-inside text-sm text-gray-600">
                                {Object.entries(item.source_types).map(([source, amount]) => (
                                  <div key={source} className="flex space-x-4 text-sm text-gray-600">
                                    <span className="font-medium">{source}</span>
                                    <span>{(+amount / 100).toFixed(2)} {item.currency.toUpperCase()}</span>
                                  </div>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-500 italic">No sources found</p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 italic">No data available</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Account Status</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    stripe_balance?.livemode
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {stripe_balance?.livemode ? 'Live Mode' : 'Test Mode'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Your account is currently in {stripe_balance?.livemode ? 'live' : 'test'} mode. 
                  {!stripe_balance?.livemode && " Don't forget to switch to live mode for real transactions."}
                </p>
                <div className="flex justify-end">
                  <Button color={'green'} onClick={() => {
                    toast.info('Switching to live mode... This feature is not yet implemented.');
                  }}>
                    {stripe_balance?.livemode ? 'Switch to Test Mode' : 'Switch to Live Mode'}
                  </Button>
                </div>
              </Card>
            </LoadingWrapper>
          </div>
        )}

      </div>
    </div>
  )
}
