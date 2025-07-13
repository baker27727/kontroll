import { useTranslation } from 'react-i18next'

export default function EarningsPage() {
  const { t } = useTranslation()

  const monthlyPayments = [
    { month: t('earnings_page.months.january'), amount: 1000 },
    { month: t('earnings_page.months.february'), amount: 1200 },
    { month: t('earnings_page.months.march'), amount: 900 }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('earnings_page.title')}</h2>
      <div className="bg-gray-50 p-6 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('earnings_page.current_earnings')}</h3>
        <div className="h-64 flex items-end space-x-2">
          <div className="w-1/3 bg-indigo-500 rounded-t-md transition-all duration-500 ease-in-out hover:bg-indigo-600" style={{height: '75%'}} title={t('earnings_page.month_earnings', { month: t('earnings_page.months.january'), amount: 1000 })}>
            <div className="text-white text-center mt-2">1000</div>
          </div>
          <div className="w-1/3 bg-indigo-500 rounded-t-md transition-all duration-500 ease-in-out hover:bg-indigo-600" style={{height: '100%'}} title={t('earnings_page.month_earnings', { month: t('earnings_page.months.february'), amount: 1200 })}>
            <div className="text-white text-center mt-2">1200</div>
          </div>
          <div className="w-1/3 bg-indigo-500 rounded-t-md transition-all duration-500 ease-in-out hover:bg-indigo-600" style={{height: '66.7%'}} title={t('earnings_page.month_earnings', { month: t('earnings_page.months.march'), amount: 900 })}>
            <div className="text-white text-center mt-2">900</div>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{t('earnings_page.months.jan')}</span>
          <span>{t('earnings_page.months.feb')}</span>
          <span>{t('earnings_page.months.mar')}</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('earnings_page.monthly_payments')}</h3>
        <ul className="space-y-2">
          {monthlyPayments.map((payment, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition duration-150 ease-in-out">
              <span>{payment.month}</span>
              <span className="font-medium text-indigo-600">{t('earnings_page.amount', { amount: payment.amount })}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}