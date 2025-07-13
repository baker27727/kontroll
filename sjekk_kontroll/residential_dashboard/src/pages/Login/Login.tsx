import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAppDispatch } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { loginDashboard } from '../../redux/stores/auth_store';
import { showNotification } from '../../redux/stores/notification_store';
import Routes from '../../constants/routes';
import Notification from '../../components/Notification';
import { useTranslation } from 'react-i18next';
import PwaInstallationWrapper from '../../components/PwaInstallationWrapper';

const LoginPage = () => {
  const [accessUsername, setAccessUsername] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [t] = useTranslation();
  


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(loginDashboard({
      access_username: accessUsername,
      access_code: accessCode
    }))
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

  return (
    <PwaInstallationWrapper>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 select-none p-4 sm:p-6 md:p-8">
      <div className="flex w-full max-w-5xl shadow-sm overflow-hidden rounded-lg">
        {/* Art Section */}
        <div className="hidden md:block md:w-2/5 bg-blue-600 relative">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Art"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-3/5 bg-white p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="text-center mb-6 md:mb-8">
            <img src="/assets/parksync_green_black.png" alt="Parksync Logo" className="w-3/4 sm:w-2/3 md:w-1/2 mx-auto" />
            <h2 className="mt-4 text-2xl sm:text-3xl text-gray-700">{t('login_block.dashboard_name')}</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="access_username" className="block text-gray-700 text-sm font-semibold mb-2">{t('login_block.form_fields.access_username')}</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="username"
                  id="access_username"
                  value={accessUsername}
                  onChange={(e) => setAccessUsername(e.target.value)}
                  placeholder={t('login_block.form_fields.enter_access_username')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="access_code" className="block text-gray-700 text-sm font-semibold mb-2">{t('login_block.form_fields.access_code')}</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  id="access_code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder={t('login_block.form_fields.enter_access_code')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full font-bold uppercase text-sm sm:text-md bg-blue-500 text-white py-2 rounded-sm hover:bg-blue-600 transition duration-300 ease-in-out shadow-sm"
            >
              {t('login_block.form_fields.login_button')}
            </button>
          </form>
        </div>
      </div>

      <Notification />
    </div>
    </PwaInstallationWrapper>
  );
};

export default LoginPage;