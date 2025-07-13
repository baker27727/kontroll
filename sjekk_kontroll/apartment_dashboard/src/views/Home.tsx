import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { getRegisteredCars } from '../redux/featuers/registered_cars_store'
import { Car, Share2, MapPin, AlertTriangle, CheckCircle, XCircle, Clock, Calendar, TrendingUp } from 'lucide-react'
import moment from 'moment'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTranslation } from 'react-i18next'

export default function HomeDashboard() {
  const { apartment } = useAppSelector(state => state.auth_store)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { residential_cars } = useAppSelector(state => state.registered_cars_store)
  const [currentDate, setCurrentDate] = useState(moment())
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'))

  const [sharedParking] = useState({
    location: t('home_dashboard.shared_parking.location'),
    hourlyRate: 50,
    isAvailable: true,
    standbyTime: t('home_dashboard.shared_parking.standby_time'),
    availableFrom: "14:00",
    availableTo: "22:00"
  })

  const [earningsData] = useState([
    { name: t('home_dashboard.months.jan'), amount: 1000 },
    { name: t('home_dashboard.months.feb'), amount: 1200 },
    { name: t('home_dashboard.months.mar'), amount: 900 },
    { name: t('home_dashboard.months.apr'), amount: 1500 },
    { name: t('home_dashboard.months.may'), amount: 2000 },
    { name: t('home_dashboard.months.jun'), amount: 1800 },
  ])

  useEffect(() => {
    dispatch(getRegisteredCars(apartment?.id))
  }, [apartment, dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(moment())
      setCurrentTime(moment().format('HH:mm:ss'))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const carRegistrationLimit = 3

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{t('home_dashboard.welcome', { name: apartment?.owner_name })}</h1>
        <div className="text-right">
          <p className="text-sm text-gray-500">{currentDate.format('dddd, MMMM D, YYYY')}</p>
          <p className="text-2xl font-semibold text-indigo-600">{currentTime}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div 
        className="bg-white p-4 rounded shadow border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('home_dashboard.recent_activity')}</h2>
        <div className="space-y-4">
          {residential_cars.slice(0, 3).map((car, index) => (
            <motion.div 
              key={car.id} 
              className="flex items-center justify-between border-b pb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex items-center">
                <Car className="w-5 h-5 text-indigo-500 mr-3" />
                <span className="font-medium">{car.registered_car?.plate_number}</span>
              </div>
              <span className="text-sm text-gray-500">
                {(() => {
                  const expireDate = moment(car.registered_car.expire_date, 'DD.MM.YYYY HH:mm');
                  const duration = moment.duration(expireDate.diff(currentDate));
                  const days = Math.floor(duration.asDays());
                  const hours = Math.floor(duration.hours());
                  const minutes = Math.floor(duration.minutes());
                  return t('home_dashboard.expires_in', { days, hours, minutes });
                })()}
              </span>
            </motion.div>
          ))}
        </div>
        {residential_cars.length > 3 && (
          <Link to="/cars" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            {t('home_dashboard.view_all_cars')}
          </Link>
        )}
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Registered Cars Summary */}
        <motion.div 
          className="bg-white p-4 rounded shadow border"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{t('home_dashboard.your_cars')}</h2>
            <Car className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-3xl font-bold text-indigo-600 mb-2">{residential_cars.length} / {carRegistrationLimit}</p>
              <p className="text-sm text-gray-600">{t('home_dashboard.registered_cars')}</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600">{Math.round((residential_cars.length / carRegistrationLimit) * 100)}%</span>
            </div>
          </div>
          {residential_cars.length >= carRegistrationLimit && (
            <div className="mt-2 flex items-center text-yellow-700">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span className="text-xs">{t('home_dashboard.car_limit_reached')}</span>
            </div>
          )}
          <Link to="/cars" className="mt-4 hover:underline inline-block text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            {t('home_dashboard.manage_cars')}
          </Link>
        </motion.div>

        {/* Shared Parking Status (Disabled) */}
        <motion.div 
          className="bg-white p-4 rounded shadow border opacity-50 cursor-not-allowed"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{t('home_dashboard.shared_parking.title')}</h2>
            <Share2 className="w-6 h-6 text-indigo-500" />
          </div>
          <p className="text-3xl font-bold text-indigo-600 mb-2">{t('home_dashboard.shared_parking.rate', { rate: sharedParking.hourlyRate })}</p>
          <p className="text-sm text-gray-600">{t('home_dashboard.shared_parking.current_rate')}</p>
          <div className="mt-2 flex items-center">
            {sharedParking.isAvailable ? (
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm ${sharedParking.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {sharedParking.isAvailable ? t('home_dashboard.shared_parking.available') : t('home_dashboard.shared_parking.not_available')}
            </span>
          </div>
          <div className="mt-2 flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{t('home_dashboard.shared_parking.time_range', { from: sharedParking.availableFrom, to: sharedParking.availableTo })}</span>
          </div>
          <span className="mt-4 inline-block text-indigo-600 text-sm font-medium">{t('home_dashboard.shared_parking.manage_sharing_disabled')}</span>
        </motion.div>

        {/* Quick Stats (Disabled) */}
        <motion.div 
          className="bg-white p-4 rounded shadow border opacity-50 cursor-not-allowed"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('home_dashboard.quick_stats.title')}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-indigo-500 mr-2" />
                <span className="text-gray-600">{t('home_dashboard.quick_stats.next_payment')}</span>
              </div>
              <span className="font-semibold">{moment().add(1, 'month').startOf('month').format('MMM D, YYYY')}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-gray-600">{t('home_dashboard.quick_stats.monthly_earnings')}</span>
              </div>
              <span className="font-semibold text-green-600">+12.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-indigo-500 mr-2" />
                <span className="text-gray-600">{t('home_dashboard.quick_stats.active_locations')}</span>
              </div>
              <span className="font-semibold">3</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Earnings Chart (Disabled) */}
      <motion.div 
        className="bg-white p-4 rounded shadow border opacity-50 cursor-not-allowed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('home_dashboard.earnings_overview_disabled')}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}