import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function SharePage() {
  const { t } = useTranslation()
  const [sharedParking] = useState({
    location: t('share_page.current_shared_parking.location_value'),
    hourlyRate: 50,
    isAvailable: true,
    standbyTime: t('share_page.current_shared_parking.standby_time_value'),
    availableFrom: "14:00",
    availableTo: "22:00"
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('share_page.title')}</h2>
      <div className="bg-gray-50 p-6 rounded-md shadow-sm mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('share_page.current_shared_parking.title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">{t('share_page.current_shared_parking.location')}</p>
            <p className="text-lg font-semibold text-gray-900">{sharedParking.location}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{t('share_page.current_shared_parking.hourly_rate')}</p>
            <p className="text-lg font-semibold text-gray-900">{t('share_page.current_shared_parking.rate_value', { rate: sharedParking.hourlyRate })}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{t('share_page.current_shared_parking.availability')}</p>
            <p className={`text-lg font-semibold ${sharedParking.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {sharedParking.isAvailable ? <CheckCircle className="inline w-5 h-5 mr-1" /> : <XCircle className="inline w-5 h-5 mr-1" />}
              {sharedParking.isAvailable ? t('share_page.current_shared_parking.available') : t('share_page.current_shared_parking.not_available')}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{t('share_page.current_shared_parking.standby_time')}</p>
            <p className="text-lg font-semibold text-gray-900">{sharedParking.standbyTime}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{t('share_page.current_shared_parking.available_hours')}</p>
            <p className="text-lg font-semibold text-gray-900">{t('share_page.current_shared_parking.time_range', { from: sharedParking.availableFrom, to: sharedParking.availableTo })}</p>
          </div>
        </div>
      </div>
      <form className="space-y-4 bg-gray-50 p-6 rounded-md shadow-sm">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">{t('share_page.form.location')}</label>
          <input placeholder={t('share_page.form.location_placeholder')} type="text" id="location" name="location" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out py-2 px-2 border" />
        </div>
        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">{t('share_page.form.hourly_rate')}</label>
          <input placeholder={t('share_page.form.hourly_rate_placeholder')} type="number" id="hourlyRate" name="hourlyRate" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out py-2 px-2 border" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('share_page.form.description')}</label>
          <textarea placeholder={t('share_page.form.description_placeholder')} id="description" name="description" rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out py-2 px-2 border"></textarea>
        </div>
        <div>
          <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">{t('share_page.form.account_number')}</label>
          <input placeholder={t('share_page.form.account_number_placeholder')} type="text" id="accountNumber" name="accountNumber" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out py-2 px-2 border" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out shadow-md">{t('share_page.form.submit')}</button>
      </form>
    </div>
  )
}