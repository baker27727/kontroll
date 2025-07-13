import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../hooks/hooks'
import { loginManager } from '../redux/features/manager_login'
import { useNavigate } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import { UserIcon, LockIcon } from 'lucide-react'


export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [t] = useTranslation()
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    }

    try {
      const resultAction = await dispatch(loginManager(values))
      unwrapResult(resultAction)
      navigate('/')
    } catch (error) {
      setError(error.message || 'An error occurred during login')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex w-full items-center justify-center px-4 sm:px-6 lg:w-1/2 xl:w-2/5">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <img src="/assets/full_kontroll.png" alt="ParkSync Logo" className="h-20 w-auto" />
            <h2 className="mt-6 text-2xl font-semibold text-gray-900">
              {'Complaints Dashboard'}
            </h2>
          </div>
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                {t('username')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder={t('username')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('password')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder={t('password')}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {t('login')}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5">
        <div className="h-full w-full bg-cover bg-center" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", 
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}>
          <div className="h-full w-full bg-black bg-opacity-25 flex items-center justify-center">
            <div className="text-white text-center">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}