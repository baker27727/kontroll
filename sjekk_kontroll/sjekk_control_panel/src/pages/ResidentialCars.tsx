import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { Logs, Plus, Text, Trash } from 'lucide-react';
import CustomButton from '../components/Button';
import Modal from '../components/Modal';
import { Input } from '../components/InputField';
import Select, { Option } from '../components/Select';
import { DangerModal } from '../components/DangerModal';
import { DataTable } from '../components/DataTable';
import IconButton from '../components/IconButton';
import { Card } from '../components/Card';
import { IconType } from 'react-icons';
import { unwrapResult } from '@reduxjs/toolkit';
import "react-datepicker/dist/react-datepicker.css";
import { showNotification } from '../redux/features/notification_store';
import Routes from '../constants/routes';
import Tabs from '../components/Tabs';
import { getResidentialPlaces } from '../redux/features/residential_place_store';
import ResidentialCar from '../interfaces/ResidentialCar';
import { createResidentialCar, deleteRegisteredCar, getRegisteredCars } from '../redux/features/residential_car_store';
import moment from 'moment';
import TimeHelper from '../utils/time_utils';
import countries from '../constants/countries';
import CountrySelector, { Country } from '../components/CountrySelector';

const ResidentialCarsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation();

  const { cars, loading } = useAppSelector(state => state.residential_car_store);
  console.log(cars);

  
  const [searchText] = useState('');

  const {residential_places} = useAppSelector(state => state.residential_place_store)

  useEffect(() => {
    dispatch(getRegisteredCars());
    dispatch(getResidentialPlaces());
  }, [dispatch]);

  const [selectedCar, setSelectedCar] = React.useState<ResidentialCar | null>(null);

  const handleDeleteCar = async () => {
    if (!selectedCar) return;

    await dispatch(deleteRegisteredCar(selectedCar!.id))
      .then(unwrapResult)
      .then(() => {
        dispatch(
          showNotification({
            type: 'success',
            message: 'Car deleted successfully'
          })
        )
      }).catch((err: Error) => {
        dispatch(
          showNotification({
            type: 'error',
            message: err.message
          })
        )
      })
  };

  const filteredAdministrateCars = cars.filter(car => 
    car.parking_type === 'reserved' &&
    Object.values(car).some(value => 
      String(value).toLowerCase().includes(searchText.toLowerCase()))
  );

  const filteredGuestCars = cars.filter(car => 
    car.parking_type === 'guest' &&
    Object.values(car).some(value => 
      String(value).toLowerCase().includes(searchText.toLowerCase()))
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isAddCarModalOpen, setIsAddCarModalOpen] = React.useState(false)

  const [plateNumber, setPlateNumber] = React.useState('')
  const [placeId, setPlaceId] = React.useState(null)
  const [country, setCountry] = React.useState<Country>(
    countries.find((country) => country.alpha2 === 'no')
  )

  const openDeleteModal = (car: ResidentialCar) => {
    setSelectedCar(car);
    setIsDeleteModalOpen(true);
  };

  const createCar = async () => { 
    await dispatch(createResidentialCar({
        plate_number: plateNumber,
        parking_type: 'reserved',
        subscription_plan_days: 3,
        residential_quarter_id: placeId,
        country: {
          name: country.name,
          code: country.alpha2
        }
    }))
    .then(unwrapResult)
    .then(() => {
      dispatch(
        showNotification({
          type: 'success',
          message: t('added_successfully'),
          description: t('added_successfully'),
        })
      )

      setIsAddCarModalOpen(false);
      setPlateNumber('');
      setPlaceId(null);

    }).catch((error: Error) => {
      dispatch(
        showNotification({
          type: 'error',
          message: t('added_error'),
          description: error.message,
        })
      )
    })
  };

  

  const renderCarTable = (data: ResidentialCar[]) => (
    <DataTable 
      loading={loading}
      data={data}
      hoverable
      itemsPerPage={8}
      showColumnSelector
      columns={[
        { id: 'plate_number', title: 'Plate', key: ['registered_car','plate_number'], sortable: true },
        { id: 'residential_quarter', title: 'Quarter', key: ['residential_quarter', 'quarter_name'], sortable: true },
        { id: 'registration_date', title: 'Registration Date', key: ['registered_car','registration_date'], sortable: true },
        { id: 'expire_date', title: 'Expire Date', key: ['registered_car','expire_date'], sortable: true },
        { id: 'id', title: 'Expire Date', key: ['registered_car','expire_date',], render: (row) => moment.duration(moment(row, TimeHelper.format).diff(moment())).humanize(), sortable: true },
      ]}
      actions={
        (car: ResidentialCar) => (
          <div className='flex gap-2'>
            <IconButton icon={Trash as IconType} onClick={() => openDeleteModal(car)} color='red' />
          </div>
        )
      }
    />
  );

  const tabs = [
    {
      id: 'administrate',
      label: 'Administrate Cars',
      content: renderCarTable(filteredAdministrateCars),
      color: '#3B82F6',
    },
    {
      id: 'guest',
      label: 'Guest Cars',
      content: renderCarTable(filteredGuestCars),
      color: '#10B981',
    },
  ];

  return (
    <>
      <Card
        headerAction={
          <div className='flex space-x-2'>
            <a href={Routes.PAGES.CAR_LOGS}>
              <CustomButton size='sm' leftIcon={Logs as IconType} onClick={() => {}} variant='outline' >
                Car Logs
              </CustomButton>   
            </a> 
            <CustomButton size='sm' leftIcon={Plus as IconType} onClick={() => setIsAddCarModalOpen(true)} variant='outline' >
              Add Car
            </CustomButton>  
          </div>  
        }
        title='Residential Cars'
      >
        <Tabs tabs={tabs} />
      </Card>

      <Modal isOpen={isAddCarModalOpen} onClose={() => setIsAddCarModalOpen(false)} title='Add Car Form'>
        <>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Select Country</p>
          <CountrySelector 
            onSelect={(country) => setCountry(country)}
          />
        </div>
        <Input icon={Text as IconType} placeholder='Plate Number' helperText='Enter the plate number' value={plateNumber} onChange={(e)=> setPlateNumber(e.target.value)}/>

          <Select 
          className='w-full mb-4'
          placeholder='Select Place'
          onChange={(e) => setPlaceId(e)}
            options={residential_places.map((place) => ({
              value: place.id.toString(),
              label: place.location,
            } as Option))}
          />
        <div className="flex justify-end space-x-2 mt-4">
          <CustomButton onClick={() => setIsAddCarModalOpen(false)} variant="outline">
            Cancel
          </CustomButton>
          <CustomButton onClick={createCar} color="green">
            Add
          </CustomButton>
        </div>
        </>
      </Modal>

      <DangerModal 
         isOpen={isDeleteModalOpen} 
         onClose={() => setIsDeleteModalOpen(false)} 
         title='Delete Car' 
         content='Are you sure you want to delete the car?'
         onAccept={handleDeleteCar}
         onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};

export default ResidentialCarsPage;