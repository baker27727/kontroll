import { useEffect, useState } from 'react';
import { Clipboard, Car } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";
import CustomButton from '../components/Button';
import { Input } from '../components/InputField';
import Modal  from '../components/Modal';
import { unwrapResult } from '@reduxjs/toolkit';
import moment from 'moment';
import { getAllPlaceRegisteredCars, registerNewCar } from '../redux/features/DashboardSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { DataTable } from '../components/DataTable';
import { baseUrl } from '../configs/constants';
import { Tag, Modal as AntdModal } from 'antd';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import PwaInstallationWrapper from '../components/PwaInstallationWrapper';

const Dashboard = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment());
  const [plateNumber, setPlateNumber] = useState('');


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You might want to show a toast notification here
  };

  const { place_dashboard } = useAppSelector(state => state.auth_reducer);
  const { loading, registered_cars } = useAppSelector(state => state.dashboard_state);

  console.log(registered_cars);
  

  console.log(registered_cars);
  const { t } = useTranslation();


  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllPlaceRegisteredCars(place_dashboard?.id))
      .then(unwrapResult)
      .then(() => {});
      const interval = setInterval(() => {
        setCurrentTime(moment());
      }, 1000);

      return () => clearInterval(interval);
  }, [dispatch, place_dashboard?.id]);

  const handleRegisterCar = async () => {
    await dispatch(registerNewCar({
      data: {
        plate_number: plateNumber
      },
      id: place_dashboard.id.toString()
    }))
    .then(unwrapResult)
    .then(() => {
      AntdModal.success({
        title: t('registration_success', { plate: plateNumber.toUpperCase() }),
        content: "Car Registered Successfully",
      })

      dispatch(getAllPlaceRegisteredCars(place_dashboard?.id))
    })
    .catch((error: Error) => {
      AntdModal.error({
        title: t('registration_failed'),
        okType: 'danger',
        content: (
          <div className="modal-content">
            <h4>{error.message}</h4>
          </div>
        )
      })
    });


  }

  return (
    <PwaInstallationWrapper>
      <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-md shadow border p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mt-4 md:mt-0 w-96">
              <p className="text-sm text-gray-600 mb-1">Registreringslink:</p>
              <div className="flex items-center bg-gray-100 rounded-md p-2">
                <input 
                  type="text" 
                  value={`${baseUrl + '/' + place_dashboard.id}/sjekk`} 
                  readOnly 
                  className="bg-transparent text-sm text-gray-800 mr-2 flex-grow"
                />
                <button 
                  onClick={() => copyToClipboard(`${baseUrl + '/' + place_dashboard.id}/sjekk`)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Clipboard className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow p-4 border">
          <div className='flex justify-between items-center mb-4'>
            <h2 className="text-2xl font-bold text-gray-800">Registrerte biler</h2>
            <CustomButton
              className="flex items-center"
              onClick={() => setIsRegisterModalOpen(true)}
            >
              <Car className="w-4 h-4 mr-2" />
              Register Car
            </CustomButton>
          </div>
          <DataTable 
            hoverable
            loading={loading}
            itemsPerPage={8}
            data={registered_cars}
            columns={[
              {title: 'Registreringsnummer', key: 'plate_number'},
              {title: 'Startdato', key: 'start_date'},
              {title: 'Sluttdato', key: 'end_date'},
              {title: 'Gjen åpningstid', key: 'timeLeft', render(_, row) {
                const endTime = moment(row.end_date, "DD.MM.YYYY HH:mm");
                const timeDiff = endTime.diff(currentTime);
                if (timeDiff < 0) {
                  return <Tag color='red'>{t('expired')}</Tag>;
                }
                const duration = moment.duration(timeDiff);
                const hours = duration.hours();
                const minutes = duration.minutes();
                const seconds = duration.seconds();

                return (
                  <Tag color='blue'>{`${hours}h ${minutes}m ${seconds}s`}</Tag>
                )
              },},
            ]}
          />
        </div>
      </main>

      <Modal 
        title="Register New Car" 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)}
      >
        <div className="space-y-4">
          <Input 
          icon={Car as IconType}
            title="Registration Number"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            placeholder="Enter car registration number"
            helperText='Please enter the registration number of the car you want to register.'
          />
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <CustomButton variant='outline' size='sm' onClick={() => setIsRegisterModalOpen(false)}>
            Cancel
          </CustomButton>
          <CustomButton color="blue" size='sm' onClick={handleRegisterCar}>
            Register Car
          </CustomButton>
        </div>
      </Modal>
    </div>
    </PwaInstallationWrapper>
  );
};

export default Dashboard;