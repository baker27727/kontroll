import { useState } from 'react'
import { User, Home, Phone, X } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { logout } from '../redux/featuers/auth_store'
import { useNavigate } from 'react-router-dom'
import Routes from '../constants/routes'
import axiosHttp from '../utils/axios_client'
import { showNotification } from '../redux/featuers/notification_store'
import ApiError from '../interfaces/ApiError'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'

export default function ProfilePage() {
  const { t } = useTranslation()
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)
  const { apartment } = useAppSelector(state => state.auth_store)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate(Routes.LOGIN)
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
        await axiosHttp.put(`/apartments/${apartment?.id}/password`, {
            old_password: oldPassword,
            new_password: newPassword
        })

        dispatch(
            showNotification({
                message: t('profile_page.password_change_success'),
                description: t('profile_page.password_change_success_description'),
                type: 'success'
            })
        )
        
        setIsChangePasswordModalOpen(false)
    } catch(err) {
        console.log(err);
        dispatch(
            showNotification({
                message: t('profile_page.password_change_error'),
                description: ApiError.from(err as AxiosError),
                type: 'error'
            })
        )

        setIsChangePasswordModalOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('profile_page.title')}</h2>
      <div className="bg-gray-50 p-6 rounded-md shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-indigo-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">{t('profile_page.name')}</p>
              <p className="text-lg font-semibold text-gray-900">{apartment?.owner_name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Home className="w-6 h-6 text-indigo-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">{t('profile_page.apartment_number')}</p>
              <p className="text-lg font-semibold text-gray-900">{apartment?.apartment_number}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-6 h-6 text-indigo-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">{t('profile_page.email')}</p>
              <p className="text-lg font-semibold text-gray-900">{apartment?.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <button
          onClick={() => setIsChangePasswordModalOpen(true)}
          className="mr-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out shadow-md"
        >
          {t('profile_page.change_password')}
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-150 ease-in-out shadow-md"
        >
          {t('profile_page.logout')}
        </button>
      </div>

      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t('profile_page.change_password_modal.title')}</h2>
              <button onClick={() => setIsChangePasswordModalOpen(false)} className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const oldPassword = (form.elements.namedItem('oldPassword') as HTMLInputElement).value
              const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value
              changePassword(oldPassword, newPassword)
            }}>
              <div className="mb-4">
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">{t('profile_page.change_password_modal.current_password')}</label>
                <input placeholder={t('profile_page.change_password_modal.current_password_placeholder')} type="password" id="oldPassword" name="oldPassword" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out py-2 px-2 border-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">{t('profile_page.change_password_modal.new_password')}</label>
                <input placeholder={t('profile_page.change_password_modal.new_password_placeholder')} type="password" id="newPassword" name="newPassword" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out py-2 px-2 border-2" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out shadow-md">{t('profile_page.change_password_modal.submit')}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}