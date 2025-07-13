import React, { useState } from 'react';
import Select from 'react-select';
import { FaCar, FaCalendarAlt, FaInfoCircle, FaPalette, FaCogs, FaExclamationTriangle, FaSpinner, FaInfo, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { apiUrl } from '../../constants/app_constants';
import CarData from '../../interfaces/CarData';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { createResidentialCar } from '../../redux/stores/registered_cars_store';
import { showNotification } from '../../redux/stores/notification_store';
import { useNavigate } from 'react-router-dom';
import Routes from '../../constants/routes';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/Card';
import Button from '../../components/Button';

const RegisterCar = () => {
  const [plateNumber, setPlateNumber] = useState('');
  const [parkingType, setParkingType] = useState({ value: 'reserved', label: 'Reserved parking' });
  const [expiration, setExpiration] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [carData, setCarData] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { dashboard } = useAppSelector(state => state.auth_store);

  const parkingOptions = [
    { value: 'reserved', label: t('register_car_block.parking_options.reserved_parking') },
    { value: 'guest', label: t('register_car_block.parking_options.guest_parking') },
  ];

  const expirationOptions = [
    { value: '3', label: t('register_car_block.expiration_durations.three_days') },
    { value: '7', label: t('register_car_block.expiration_durations.one_week') },
    { value: '30', label: t('register_car_block.expiration_durations.one_month') },
    { value: '365', label: t('register_car_block.expiration_durations.one_year') },
    { value: '1095', label: t('register_car_block.expiration_durations.three_years') },
  ];

  const handleRegisterClick = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirmRegister = async () => {
    try {
      await dispatch(
        createResidentialCar({
          plate_number: plateNumber,
          parking_type: parkingType.value as 'guest' | 'reserved',
          subscription_plan_days: parkingType.value === 'reserved' ? expiration.value : dashboard.residential_quarter.guest_free_days,
          residential_quarter_id: dashboard?.residential_quarter?.id as number,
        })
      ).unwrap();

      dispatch(
        showNotification({
          message: t('register_car_block.car_registration_success_title'),
          description: t('register_car_block.car_registration_success_message'),
          type: 'success',
        })
      );

      setTimeout(() => {
        navigate(Routes.REGISTERED_CARS);
      }, 2000);
    } catch (error) {
      dispatch(
        showNotification({
          message: t('register_car_block.car_registration_failure_title'),
          description: error.message,
          type: 'error',
        })
      );
    }
    setShowModal(false);
  };

  const fetchCarData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/autosys/${plateNumber}`);
      setCarData(response.data as CarData);
    } catch (err) {
      console.log(err);
      dispatch(
        showNotification({
          message: t('register_car_block.car_data_fetch_failure_title'),
          description: t('register_car_block.car_data_fetch_failure_message'),
          type: 'error',
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={t('register_car_block.register_new_car')}>
      <div className="mx-auto max-w-8xl">
        <div className="flex flex-col md:flex-row gap-4">
          <form className="space-y-4 flex-grow" onSubmit={handleRegisterClick}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('register_car_block.form_fields.plate_number')}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={t('register_car_block.form_fields.plate_number_placeholder')}
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 transition duration-200"
                  required
                />
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 border border-yellow-300 rounded focus:outline-none transition bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                  onClick={fetchCarData}
                  disabled={loading}
                >
                  {loading ? <FaSpinner className="animate-spin" /> : <FaInfo />}
                  <span>{t('register_car_block.form_fields.get_car_data')}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('register_car_block.form_fields.parking_type')}</label>
              <Select
                options={parkingOptions}
                value={parkingType}
                onChange={(option) => setParkingType(option)}
                className="react-select-container"
                classNamePrefix="react-select"
                isSearchable={false}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('register_car_block.form_fields.parking_expiration')}</label>
              <Select
                options={expirationOptions}
                value={expiration}
                onChange={(option) => setExpiration(option)}
                isDisabled={parkingType?.value !== 'reserved'}
                className="react-select-container"
                classNamePrefix="react-select"
                isSearchable={false}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out flex items-center space-x-2 shadow"
              >
                <FaCar />
                <span>{t('register_car_block.form_fields.submit_button')}</span>
              </Button>
            </div>
          </form>

          <div className="w-full md:w-80 bg-white border border-gray-200 rounded p-4 shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaInfoCircle className="text-blue-500 mr-2" />
              {t('register_car_block.car_data.title')}
            </h2>
            <hr className="mb-4 border-gray-200" />
            {carData ? (
              <div className="space-y-4">
                <CarDataItem icon={FaCar} label={t('register_car_block.car_data.car_type')} value={carData.car_type} />
                <CarDataItem icon={FaCalendarAlt} label={t('register_car_block.car_data.manufacture_year')} value={carData.manufacture_year} />
                <CarDataItem icon={FaInfoCircle} label={t('register_car_block.car_data.car_description')} value={carData.car_description} />
                <CarDataItem icon={FaCogs} label={t('register_car_block.car_data.car_model')} value={carData.car_model} />
                <CarDataItem icon={FaPalette} label={t('register_car_block.car_data.car_color')} value={carData.car_color} />
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center flex-col text-center text-gray-500 py-8">
                <FaSpinner className="text-blue-500 mb-4 animate-spin" size="3em" />
                <p>{t('register_car_block.car_data.loading')}</p>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col text-center text-gray-500 py-8">
                <FaExclamationTriangle className="text-yellow-500 mb-4" size="3em" />
                <p>{t('register_car_block.car_data.no_data_available')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">{t('register_car_block.registration_modal.confirm_registration_title')}</h2>
            <p className="mb-6 text-gray-600">{t('register_car_block.registration_modal.confirm_registration_message')}</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition duration-200"
                onClick={() => setShowModal(false)}
              >
                {t('register_car_block.registration_modal.cancel_button')}
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                onClick={handleConfirmRegister}
              >
                <FaCheckCircle />
                <span>{t('register_car_block.registration_modal.confirm_button')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

const CarDataItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start">
    <Icon className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
    <div>
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="ml-2 text-gray-600">{value}</span>
    </div>
  </div>
);

export default RegisterCar;