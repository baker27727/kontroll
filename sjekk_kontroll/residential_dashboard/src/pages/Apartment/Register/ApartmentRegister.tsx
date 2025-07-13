import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, InfoIcon } from 'lucide-react';
import { ConfirmationModal } from '../../../components/ConfirmationDialog';
import { useAppDispatch } from '../../../hooks/hooks';
import { showNotification } from '../../../redux/stores/notification_store';
import Notification from '../../../components/Notification';
import axiosClient from '../../../utils/axios_client';
import { useParams } from 'react-router-dom';
import ApiError from '../../../interfaces/ApiError';
import { useTranslation } from 'react-i18next';

const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 text-gray-800 p-4 rounded-lg shadow-md">
    <div className="flex items-start">
      <InfoIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
      <p className="text-sm">{children}</p>
    </div>
  </div>
);

export default function ApartmentRegister() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistrationConfirmationModalOpen, setIsRegistrationConfirmationModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const [apartmentNumber, setApartmentNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [ownerName, setOwnerName] = useState('');

  const [buildingNumber, setBuildingNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');

  const { id } = useParams();

  const openRegistrationConfirmationModal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistrationConfirmationModalOpen(true);
  };

  const handleRegistrationConfirmation = async () => {
    try {
      await axiosClient.post(`/residential-quarters/${id}/apartment-requests`, {
        owner_name: ownerName,
        username: username,
        password: password,
        apartment_number: apartmentNumber,
        email: email,
        building_number: buildingNumber,
        floor_number: floorNumber
      });

      dispatch(
        showNotification({
          message: t('apartment_register.notifications.success.message'),
          description: t('apartment_register.notifications.success.description'),
          type: 'success',
        })
      );

      setIsRegistrationConfirmationModalOpen(false);
      
    } catch(err) {
      dispatch(
        showNotification({
          message: t('apartment_register.notifications.error.message'),
          description: ApiError.from(err),
          type: 'error',
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden w-full max-w-5xl flex">
        <div className="w-2/5 relative">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt={t('apartment_register.image_alt')}
            className="w-full h-full object-cover"
          />
          <Note>
            {t('apartment_register.note')}
            <a href="https://apartment.gensolv.no" target='_blank' className="text-blue-600 hover:underline ml-1">
              https://apartment.gensolv.no
            </a>
            {t('apartment_register.note_continuation')}
          </Note>
        </div>
        <div className="w-3/5 p-8">
          <div className="flex justify-center mb-6">
            <img src="/assets/logo.png" alt={t('apartment_register.logo_alt')} className="h-12" />
          </div>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t('apartment_register.title')}</h2>
          <form className="space-y-4" onSubmit={openRegistrationConfirmationModal}>
            <div className="flex items-center">
              <div className='flex-grow mr-4'>
                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('apartment_register.form.owner_name')}
                </label>
                <input
                  id="ownerName"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 transition duration-150 ease-in-out"
                  placeholder={t('apartment_register.form.owner_name_placeholder')}
                />
              </div>
              <div className='flex-grow'>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('apartment_register.form.username')}
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 transition duration-150 ease-in-out"
                  placeholder={t('apartment_register.form.username_placeholder')}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className='flex-grow mr-4'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('apartment_register.form.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 transition duration-150 ease-in-out"
                  placeholder={t('apartment_register.form.email_placeholder')}
                />
              </div>
              <div className='flex-grow'>
                <label htmlFor="apartmentNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('apartment_register.form.apartment_number')}
                </label>
                <input
                  id="apartmentNumber"
                  value={apartmentNumber}
                  onChange={(e) => setApartmentNumber(e.target.value)}
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 transition duration-150 ease-in-out"
                  placeholder={t('apartment_register.form.apartment_number_placeholder')}
                />
              </div>
            </div>
            <div className='flex items-center'>
              <div className='flex-grow mr-4'>
                <label htmlFor="buildingNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('apartment_register.form.building_number')}
                </label>
                <input
                  id="buildingNumber"
                  value={buildingNumber}
                  onChange={(e) => setBuildingNumber(e.target.value)}
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 transition duration-150 ease-in-out"
                  placeholder={t('apartment_register.form.building_number_placeholder')}
                />
              </div>
              <div className='flex-grow'>
                <label htmlFor="floorNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('apartment_register.form.floor_number')}
                </label>
                <input
                  id="floorNumber"
                  value={floorNumber}
                  onChange={(e) => setFloorNumber(e.target.value)}
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 transition duration-150 ease-in-out"
                  placeholder={t('apartment_register.form.floor_number_placeholder')}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('apartment_register.form.password')}
              </label>
              <div className="relative">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 transition duration-150 ease-in-out"
                  placeholder={t('apartment_register.form.password_placeholder')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                {t('apartment_register.form.confirm_password')}
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 transition duration-150 ease-in-out"
                  placeholder={t('apartment_register.form.confirm_password_placeholder')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              {t('apartment_register.form.submit')}
            </button>
          </form>
        </div>
      </div>

      <ConfirmationModal 
        title={t('apartment_register.confirmation_modal.title')}
        isOpen={isRegistrationConfirmationModalOpen} 
        onClose={() => setIsRegistrationConfirmationModalOpen(false)}
        onAccept={handleRegistrationConfirmation}
        onCancel={() => setIsRegistrationConfirmationModalOpen(false)}
        content={t('apartment_register.confirmation_modal.content')}         
      />

      <Notification />
    </div>
  );
}