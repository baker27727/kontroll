import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loginManager } from '../../redux/stores/auth_store';
import { Spin } from 'antd';
import { showNotification } from '../../redux/stores/notification_store';
import Notification from '../../components/Notification';
import { useNavigate } from 'react-router-dom';
import Routes from '../../constants/routes';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [t] = useTranslation()
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await dispatch(loginManager({ username, password }))
      .unwrap()
      .then(() => {
        dispatch(showNotification({
          message: t('login_block.login_success_title'),
          description: t('login_block.login_success_message'),
          type: 'info',
        }))

        setTimeout(() => {
          navigate(Routes.HOME)
        }, 2000)
      }).catch((error) => {
        dispatch(showNotification({
          message: t('login_block.login_failure_title'),
          description: error.message,
          type: 'error',
        }))
      });
  };

  const {loading} = useAppSelector(state => state.auth_store)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 select-none">
      <div className="flex w-full max-w-6xl rounded-sm shadow-sm overflow-hidden">
        {/* Login Form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12">
          <div className="text-center mb-8">
            <img src="/assets/parksync_green_black.png" alt="Parksync Logo" className="w-full mx-auto" />
            <h2 className="mt-4 text-3xl text-gray-700">{t('login_block.financial_dashboard')}</h2>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
                {t('login_block.form_fields.username')}
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder={t('login_block.form_fields.enter_username')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">{t('login_block.form_fields.password')}</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login_block.form_fields.enter_password')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full font-bold uppercase text-md bg-blue-500 text-white py-2 rounded-sm hover:bg-blue-600 transition duration-300 ease-in-out shadow-sm"
            >
              {t('login_block.form_fields.login_button')}
            </button>
          </form>
        </div>

        {/* Art Section */}
        <div className="hidden md:block md:w-1/2 bg-blue-600 relative">
          <img
            src="/assets/finance.jpg"
            alt="Art"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 z-50" >
          <Spin size='large' className='mb-2'/>
          <p className="text-white text-2xl font-bold">{t('login_block.trying_to_login')}</p>
        </div>
      )}

    <Notification />
    </div>
  );
};

export default LoginPage;
