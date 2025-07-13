import { useState, useEffect } from 'react'
import { Car, AlertTriangle, Trash } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { createResidentialCar, deleteRegisteredCar, getRegisteredCars } from '../redux/featuers/registered_cars_store'
import moment from 'moment'
import { DangerModal } from '../components/DangerModal'
import { unwrapResult } from '@reduxjs/toolkit'
import { showNotification } from '../redux/featuers/notification_store'
import Modal from '../components/Modal'
import CountrySelector, { Country } from '../components/CountrySelector'
import { ConfirmationModal } from '../components/ConfirmationDialog'
import countries from '../constants/countries'
import { useTranslation } from 'react-i18next'

export default function CarsPage() {
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false)
  const [isDeleteCarModalOpen, setIsDeleteCarModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [carToDelete, setCarToDelete] = useState(null)
  const { residential_cars } = useAppSelector(state => state.registered_cars_store)
  const dispatch = useAppDispatch()
  const { apartment } = useAppSelector(state => state.auth_store)
  const [currentDate, setCurrentDate] = useState(moment())

  const [country, setCountry] = useState<Country>(
    countries.find((country) => country.alpha2 === 'no')
  )
  const [plate_number, setPlateNumber] = useState('')

  useEffect(() => {
    dispatch(getRegisteredCars(apartment?.id))
  }, [apartment, dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(moment())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const deleteCar = (car) => {
    setCarToDelete(car)
    setIsDeleteCarModalOpen(true)
  }

  const handleDeleteAccept = async () => {
    await dispatch(deleteRegisteredCar(carToDelete.id))
    .then(unwrapResult)
    .then(() => {
      setIsDeleteCarModalOpen(false)
      dispatch(
        showNotification({
          message: 'Car Deleted',
          description: 'Car has been deleted successfully',
          type: 'success',
        })
      )
    }).catch((error) => {
      console.log(error)
      dispatch(
        showNotification({
          message: 'Failed to delete car',
          description: error.message,
          type: 'error',
        })
      )
    })
  }

  const handleAddCarSubmit = async (e) => {
    e.preventDefault()
    setIsConfirmationModalOpen(true)
  }

  const handleConfirmAddCar = async () => {
    try {
      await dispatch(
        createResidentialCar({
          residential_quarter_id: apartment.residential_quarter_id,
          plate_number: plate_number,
          subscription_plan_days: apartment.residential_quarter.guest_free_days,
          parking_type: 'guest',
          apartment_id: apartment.id,
          country: {
            name: country.name,
            code: country.alpha2
          }
        })
      ).unwrap()
      setIsAddCarModalOpen(false)
      dispatch(getRegisteredCars(apartment.id))
      dispatch(
        showNotification({
          type: 'success',
          message: 'Car added successfully'
        })
      )
    } catch (error) {
      dispatch(
        showNotification({
          type: 'error',
          message: 'Failed to add car',
          description: error.message
        })
      )
    }
    setIsConfirmationModalOpen(false)
  }

  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('cars_page.title')}</h2>
        <button
          onClick={() => setIsAddCarModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out shadow-md"
        >
          {t('cars_page.add_car')}
        </button>
      </div>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              {t('cars_page.car_limit_warning', { max: apartment.residential_quarter.max_cars_by_apartment, current: residential_cars.length })}
            </p>
          </div>
        </div>
      </div>
      <ul className="space-y-4">
        {
          residential_cars.length === 0 && (
            <li className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition duration-150 ease-in-out">
              <div className="flex items-center">
                <Car className="w-6 h-6 text-indigo-500 mr-3" />
                <span className="font-medium">{t('cars_page.no_cars_registered')}</span>
              </div>
            </li>
          )
        }
        {residential_cars.map((car) => (
          <li key={car.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition duration-150 ease-in-out">
            <div className="flex items-center">
              <Car className="w-6 h-6 text-indigo-500 mr-3" />
              <div>
                <span className="font-medium">{car.registered_car?.plate_number}</span>
                <span className="ml-4 text-sm text-gray-500">
                  {(() => {
                    const expireDate = moment(car.registered_car.expire_date, 'DD.MM.YYYY HH:mm');
                    const duration = moment.duration(expireDate.diff(currentDate));
                    const days = Math.floor(duration.asDays());
                    const hours = Math.floor(duration.hours());
                    const minutes = Math.floor(duration.minutes());
                    const seconds = Math.floor(duration.seconds());
                    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
                  })()}
                </span>
              </div>
            </div>
            <button
              onClick={() => deleteCar(car)}
              className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
            >
              <Trash className="w-6 h-6" />
            </button>
          </li>
        ))}
      </ul>

      <DangerModal 
        isOpen={isDeleteCarModalOpen}
        onClose={() => setIsDeleteCarModalOpen(false)}
        title={t('cars_page.delete_car_modal.title')}
        content={t('cars_page.delete_car_modal.content')}
        onAccept={handleDeleteAccept}
        onCancel={() => {
          setIsDeleteCarModalOpen(false)
          setCarToDelete(null)
        }}
      />

      <Modal isOpen={isAddCarModalOpen} onClose={() => setIsAddCarModalOpen(false)} title={t('cars_page.add_car_modal.title')}>
        <form onSubmit={handleAddCarSubmit}>
          <div className="mb-4">
            <label htmlFor="newCarNumber" className="block text-sm font-medium text-gray-700 ">{t('cars_page.add_car_modal.car_number_label')}</label>
            <input 
              placeholder={t('cars_page.add_car_modal.car_number_placeholder')}
              value={plate_number} 
              onChange={(e) => setPlateNumber(e.target.value)} 
              type="text" 
              id="newCarNumber" 
              name="newCarNumber" 
              required 
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out py-2 px-2 border-2" 
            />
          </div>
          <div className="mb-4">
            <CountrySelector onSelect={(country) => setCountry(country)}/>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out shadow-md">{t('cars_page.add_car_modal.submit')}</button>
        </form>
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        title={t('cars_page.confirm_add_car_modal.title')}
        content={t('cars_page.confirm_add_car_modal.content', { plate_number })}
        onAccept={handleConfirmAddCar}
        onCancel={() => setIsConfirmationModalOpen(false)}
      />
    </div>
  )
}