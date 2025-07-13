import { useState } from 'react'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function LocationsPage() {
  const { t } = useTranslation()
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false)
  const [locations, setLocations] = useState([])

  const toggleSharing = (id: number) => {
    setLocations(locations.map(loc => 
      loc.id === id ? { ...loc, isShared: !loc.isShared } : loc
    ))
  }

  const addLocation = (locationData) => {
    setLocations([...locations, { id: Date.now(), ...locationData, isShared: false }])
    setIsAddLocationModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('locations_page.title')}</h2>
        <button
          onClick={() => setIsAddLocationModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out shadow-sm"
        >
          {t('locations_page.add_location')}
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('locations_page.table.code')}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('locations_page.table.policy')}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('locations_page.table.city')}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('locations_page.table.area')}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('locations_page.table.status')}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('locations_page.table.actions')}</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {
              locations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-lg text-gray-500">{t('locations_page.no_locations')}</td>
                </tr>
              ) : null
            }
          {locations.map((location) => (
            <tr key={location.id}>
              <td className="px-6 py-4 whitespace-nowrap">{location.code}</td>
              <td className="px-6 py-4 whitespace-nowrap">{location.policy}</td>
              <td className="px-6 py-4 whitespace-nowrap">{location.city}</td>
              <td className="px-6 py-4 whitespace-nowrap">{location.area}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {
                  location.status === 'certified' ? (
                    <span className="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-sm bg-green-100 text-green-800">
                      {t('locations_page.status.certified')}
                    </span>
                  ) : (
                    <span className="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-sm bg-red-100 text-red-800">
                      {t('locations_page.status.in_review')}
                    </span>
                  )
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleSharing(location.id)}
                  className={`px-3 py-1 rounded-sm text-sm font-semibold ${
                    location.isShared
                      ? 'bg-red-100 text-red-800 hover:bg-red-200'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  {location.isShared ? t('locations_page.stop_sharing') : t('locations_page.start_sharing')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddLocationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md p-4 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t('locations_page.add_location_modal.title')}</h2>
              <button onClick={() => setIsAddLocationModalOpen(false)} className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const code = (form.elements.namedItem('code') as HTMLInputElement).value
              const policy = (form.elements.namedItem('policy') as HTMLInputElement).value
              const city = (form.elements.namedItem('city') as HTMLInputElement).value
              const area = (form.elements.namedItem('area') as HTMLInputElement).value
              addLocation({ code, policy, city, area })
            }}>
              <div className="mb-4">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">{t('locations_page.add_location_modal.code')}</label>
                <input placeholder={t('locations_page.add_location_modal.code_placeholder')} type="text" id="code" name="code" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out py-2 px-2 border-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="policy" className="block text-sm font-medium text-gray-700">{t('locations_page.add_location_modal.policy')}</label>
                <input placeholder={t('locations_page.add_location_modal.policy_placeholder')} type="text" id="policy" name="policy" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out py-2 px-2 border-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">{t('locations_page.add_location_modal.city')}</label>
                <input placeholder={t('locations_page.add_location_modal.city_placeholder')} type="text" id="city" name="city" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out py-2 px-2 border-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="area" className="block text-sm font-medium text-gray-700">{t('locations_page.add_location_modal.area')}</label>
                <input placeholder={t('locations_page.add_location_modal.area_placeholder')} type="text" id="area" name="area" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out py-2 px-2 border-2" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out shadow-md">{t('locations_page.add_location_modal.submit')}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}