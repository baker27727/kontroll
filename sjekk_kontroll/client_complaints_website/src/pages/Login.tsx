import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/hooks';
import { loginClient } from '../redux/features/client_auth';
import { unwrapResult } from '@reduxjs/toolkit';
import { FlagIcon as LicensePlate, Ticket, AlertCircle } from 'lucide-react';
import LogoImage from '/public/parksync.png';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [plateNumber, setPlateNumber] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await dispatch(loginClient({ plate_number: plateNumber, ticket_number: ticketNumber }));
      unwrapResult(result);
      navigate('/', { replace: true });
    } catch (error) {
      setError(error.message || t('Login Error'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image and text */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{backgroundImage: "url('https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')"}}></div>
        <div className="absolute inset-0 bg-blue-600 opacity-40 z-10"></div>
        <div className="relative z-20">
          <h1 className="text-5xl font-bold mb-4 leading-tight">Welcome to <br />ParkSync</h1>
          <p className="text-xl">Manage your parking tickets with ease and efficiency.</p>
        </div>
        <div className="relative z-20">
          <p className="text-sm">© 2023 ParkSync. All rights reserved.</p>
        </div>
        {/* Decorative element */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mb-32 -mr-32 z-10"></div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white shadow rounded-lg p-8 w-full max-w-lg transform transition-all duration-300 hover:shadow-3xl">
          <div className="flex justify-center mb-8">
            <img src={LogoImage} alt="ParkSync logo" className="w-48" />
          </div>
          
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">{t("Client's Ticket Portal")}</h2>
          
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="plate_number" className="block text-sm font-medium text-gray-700 mb-1">
                {t('plate_number')}
              </label>
              <div className="relative">
                <LicensePlate className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="plate_number"
                  type="text"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                  placeholder={t('plate_number')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="ticket_number" className="block text-sm font-medium text-gray-700 mb-1">
                {t('ticket_number')}
              </label>
              <div className="relative">
                <Ticket className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="ticket_number"
                  type="text"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value)}
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                  placeholder={t('ticket_number')}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none  transition-all duration-300 group"
            >
              <span>{t('login')}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;

