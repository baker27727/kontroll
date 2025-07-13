import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { loginClient, logoutClient } from '../redux/features/client_auth';
import { QrCode, Ticket, FileText, MessageSquare, CreditCard, LogOut, Globe, Calendar, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import LogoImage from '/public/parksync.png';
import { VscLaw } from 'react-icons/vsc';

const ClientDashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const state = useAppSelector((state) => state.client_auth);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const auto_login = searchParams.get('auto_login') || '';

    if (auto_login === 'true') {
      const plate_number = searchParams.get('plate_number') || '';
      const ticket_number = searchParams.get('ticket_number') || '';

      console.log(plate_number, ticket_number);

      dispatch(loginClient({ plate_number, ticket_number }))
        .unwrap()
        .then(() => toast.success(t('Login Successful')))
        .catch((error) => toast.error(t('Login Error') + ': ' + error.message));
    }
  }, [searchParams, dispatch, navigate, t]);

  useEffect(() => {
    if (searchParams.get('callback') === 'true') {
      toast.success(t('Payment successful, violation is closed'));
      dispatch(logoutClient())
    }
  }, [searchParams, t, dispatch]);

  const toggleCurrentLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'no' : 'en');
    toast.info(t('Language changed'));
  };

  const handleLogout = () => {
    dispatch(logoutClient());
    navigate('/login', { replace: true });
    toast.info(t('Logged out successfully'));
  };


  if (!state.ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4 flex flex-col">
        <header className="w-full max-w-6xl mx-auto mb-4">
          <div className="flex justify-between items-center">
            <img src={LogoImage} alt="Logo" className="w-40 h-auto" />
            <button
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm flex items-center bg-white px-4 py-2 rounded-full shadow-sm"
              onClick={toggleCurrentLanguage}
            >
              <Globe className="w-4 h-4 mr-2" />
              {t('change_language')}
            </button>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center">
          <div className="bg-white shadow rounded-lg  p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">{t('Welcome to ParkSync')}</h2>
            <p className="text-gray-600 text-center mb-8 flex items-center justify-center">
              <Ticket className="w-6 h-6 mr-2 text-blue-500" />
              {t('Please login to access your Ticket')}
            </p>
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 text-base font-medium mb-4 flex items-center justify-center"
              onClick={() => navigate('/login')}
            >
              <LogOut className="w-5 h-5 mr-2 transform rotate-180" />
              {t('Login')}
            </button>
            <div className="text-center">
              <QrCode className="w-20 h-20 text-blue-600 mb-4 mx-auto animate-pulse" />
              <p className="text-gray-600 text-sm">{t('Or Scan the QR code to login automatically')}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4 flex flex-col">
      <header className="w-full max-w-6xl mx-auto mb-8">
        <div className="flex flex-row justify-between items-center bg-white shadow-sm rounded-lg p-4">
          <img src={LogoImage} alt="Logo" className="w-40 h-auto mb-4 sm:mb-0" />
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm flex items-center"
              onClick={toggleCurrentLanguage}
            >
              <Globe className="w-4 h-4 mr-2" />
              {t('change_language')}
            </button>
            <button
              className="text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center bg-red-100 px-4 py-2 rounded-full"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">{t('logout')}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-6xl mx-auto flex-grow">
        <div className="bg-white shadow-sm rounded-lg p-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('Ticket Overview')}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-blue-100 rounded-lg p-4 flex items-center">
              <Ticket className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-blue-800">{t('Ticket Number')}</p>
                <p className="text-lg font-semibold text-blue-900">{state.ticket.ticket_info.ticket_number}</p>
              </div>
            </div>
            <div className="bg-purple-100 rounded-lg p-4 flex items-center">
              <CreditCard className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-purple-800">{t('Total Amount')}</p>
                <p className="text-lg font-semibold text-purple-900">{state.ticket.rules[0].charge} NOK</p>
              </div>
            </div>
            <div className="bg-green-100 rounded-lg p-4 flex items-center">
              <Calendar className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-green-800">{t('Issue Date')}</p>
                <p className="text-lg font-semibold text-green-900">{state.ticket.created_at}</p>
              </div>
            </div>
            <div className="bg-yellow-100 rounded-lg p-4 flex items-center">
              <MapPin className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-yellow-800">{t('Location')}</p>
                <p className="text-lg font-semibold text-yellow-900">{state.ticket.place.location}</p>
              </div>
            </div>
            {
              state.ticket.rules.length > 0 && (
                state.ticket.rules.map(
                  (rule) => (
                    <div className="bg-red-100 rounded-lg p-4 flex items-center">
                      <VscLaw className="w-8 h-8 text-red-600 mr-3" />
                      <div>
                        <p className="text-sm text-red-800">{t('Rule')}</p>
                        <p className="text-lg font-semibold text-red-900">{rule.name} - {rule.charge} NOK</p>
                      </div>
                    </div>
                  )
                )
              )
            }
          </div>
        </div>



        {state.ticket && state.ticket.images.length > 0 && (
          <div className="mt-4 bg-white shadow-sm rounded-lg  p-4">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('vehicle_images')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {state.ticket.images.map((image, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(image.path)}
                >
                  <img
                    src={image.path}
                    alt={`${t('alt_car_image')} ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-2 mt-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center text-sm font-medium shadow-sm"
            onClick={() => navigate('/ticket-info')}
          >
            <FileText className="w-5 h-5 mr-2" />
            {t('details')}
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 flex items-center justify-center text-sm font-medium shadow-sm"
            onClick={() => navigate('/complaint')}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            {t('complaint')}
          </button>
          <button
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 flex items-center justify-center text-sm font-medium shadow-sm"
            onClick={() => navigate('/payment')}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            {t('pay_ticket')}
          </button>
        </div>
      </main>

      <footer className="w-full max-w-6xl mx-auto mt-8 text-center text-gray-600 text-sm">
        <p>&copy; 2023 ParkSync. {t('All rights reserved.')}</p>
      </footer>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-3xl max-h-3xl overflow-auto">
            <img 
              src={selectedImage} 
              alt={t('Full size vehicle image')}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;

