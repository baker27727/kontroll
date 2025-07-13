import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '../hooks/hooks';
import { loginPlaceDashboard } from '../redux/features/auth_reducer';
import { Eye, EyeOff, User, Lock, Mail, Phone } from 'lucide-react';
import PwaInstallationWrapper from '../components/PwaInstallationWrapper';


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const values = {
      access_code: formData.get('access_code') as string,
      access_username: formData.get('access_username') as string,
    };

    try {
      await dispatch(loginPlaceDashboard(values)).then(unwrapResult);
      // Show success message
      const successMessage = document.getElementById('successMessage');
      if (successMessage) successMessage.classList.remove('hidden');
      // Navigate after a short delay
      setTimeout(() => {
        navigate(searchParams.get('dist') || '/');
      }, 1500);
    } catch (error) {
      // Show error message
      const errorMessage = document.getElementById('errorMessage');
      if (errorMessage) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PwaInstallationWrapper>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded shadow overflow-hidden max-w-5xl w-full flex">
        {/* Left side - Image */}
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}>
          <div className="h-full bg-blue-900 bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center p-8">
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-xl">Log in to access your dashboard and manage your place with ease.</p>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="mb-8 text-center">
            <img src="/src/assets/logo.png" alt="Company Logo" className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">{t('Place Dashboard Login')}</h1>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="access_username" className="block text-sm font-medium text-gray-700 mb-1">
                {t('Access username')}
              </label>
              <div className="relative">
                <input
                  id="access_username"
                  name="access_username"
                  type="text"
                  required
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('Enter your username')}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label htmlFor="access_code" className="block text-sm font-medium text-gray-700 mb-1">
                {t('Access code')}
              </label>
              <div className="relative">
                <input
                  id="access_code"
                  name="access_code"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('Enter your access code')}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? t('Logging in...') : t('LOGIN')}
            </button>
          </form>

          <div id="successMessage" className="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-center hidden">
            {t('Login successful! Redirecting...')}
          </div>

          <div id="errorMessage" className="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-center hidden"></div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="text-blue-500 mr-2" size={18} />
                <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="text-blue-500 mr-2" size={18} />
                <a href="tel:+1234567890" className="text-blue-600 hover:underline">+1 (234) 567-890</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PwaInstallationWrapper>
  );
}