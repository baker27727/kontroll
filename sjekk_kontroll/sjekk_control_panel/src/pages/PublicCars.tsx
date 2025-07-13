import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { Logs, Plus, Text, Trash } from 'lucide-react';
import { deleteCar, getAllCars, registerCar } from '../redux/features/CarSlice';
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

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { showNotification } from '../redux/features/notification_store';
import Car from '../interfaces/Car';
import moment from 'moment';
import Routes from '../constants/routes';
import { getNormalPlaces } from '../redux/features/normal_place_store';
import CountrySelector, { Country } from '../components/CountrySelector';
import countries from '../constants/countries';


const PublicCarsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(); // Corrected useTranslation hook initialization

  const { cars, loading } = useAppSelector(state => state.CarReducer);
  const [searchText] = useState('');

  const {normal_places} = useAppSelector(state => state.normal_place_store)
  console.log(cars);
  

  useEffect(() => {
    dispatch(getAllCars());
    dispatch(getNormalPlaces());
  }, [dispatch]);


  const [selectedCar, setSelectedCar] = React.useState<Car | null>(null);

  const handleDeleteCar = async () => {
    if (!selectedCar) return;

    await dispatch(deleteCar(selectedCar!.id))
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

  const filteredCars = cars.filter(car =>
    Object.values(car).some(value => 
      String(value).toLowerCase().includes(searchText.toLowerCase()))
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isAddCarModalOpen, setIsAddCarModalOpen] = React.useState(false)

  const [plateNumber, setPlateNumber] = React.useState('')
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null)
  const [placeId, setPlaceId] = React.useState(null)
  const [registrationType, setRegistrationType] = React.useState('')
  const [country, setCountry] = React.useState<Country>(
    countries.find((country) => country.alpha2 === 'no')
  )

  const openDeleteModal = (car: Car) => {
    setSelectedCar(car);
    setIsDeleteModalOpen(true);
  };


  const createCar = async () => {
    const data = {
      place_id: placeId,
      plate_number: plateNumber,
      registration_type: registrationType,
      start_date: moment(startDate).format("DD.MM.YYYY HH:mm"),
      end_date: moment(endDate).format("DD.MM.YYYY HH:mm"),
      registration_source: 'klage',
      country: {
        name: country.name,
        code: country.alpha2
      }
  } 
    await dispatch(registerCar(data))
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
      setStartDate(null);
      setEndDate(null);
      setPlaceId(null);
      setRegistrationType('');

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
        title='Cars'
      >
      <DataTable 
      loading={loading}
        data={filteredCars}
        hoverable
        itemsPerPage={8}
        showColumnSelector
        columns={[
          { id: 'id', title: t('id'), key: 'id', sortable: true },
          { id: 'plate_number', title: t('plate'), key: 'plate_number', sortable: true },
          { id: 'registration_type', title: t('registration'), key: 'registration_type', sortable: true },
          { id: 'registration_date', title: t('start'), key: 'registration_date', sortable: true },
          { id: 'expire_date', title: t('end'), key: 'expire_date', sortable: true },
          { id: 'place', title: t('place'), key: ['place','location'], sortable: true },
        ]}

        actions={
          (car: Car) => (
            <div className='flex gap-2'>
              {/* <IconButton icon={Eye as IconType} onClick={() => {}} color='blue' /> */}
              {/* <IconButton icon={Edit as IconType} onClick={() => {}} color='yellow' /> */}
              <IconButton icon={Trash as IconType} onClick={() => openDeleteModal(car)} color='red' />
            </div>
          )
        }
      />
      </Card>

      <Modal isOpen={isAddCarModalOpen} onClose={() => setIsAddCarModalOpen(false)} title='Add Car Form'>
        <>
          <div className="mb-4">
            <p className='text-gray-500 text-sm'>Country</p>
            <CountrySelector 
              onSelect={(country) => setCountry(country)}
            />
          </div>
        <Input icon={Text as IconType} placeholder='Plate Number' helperText='Enter the plate number' value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)}/>
          <Input icon={Text as IconType} placeholder='Registration Type' helperText='Enter the registration type' value={registrationType} onChange={(e) => setRegistrationType(e.target.value)}/>

          <Select 
          className='w-full mb-4'
          placeholder='Select Place'
          onChange={(e) => setPlaceId(e)}
            options={normal_places.map((place) => ({
              value: place.place.id.toString(),
              label: place.location,
            } as Option))}
          />
          <div className="flex flex-col">
            <p className='text-gray-500 text-sm'>Start Date</p>
            <DatePicker showTimeSelect dateFormat={"dd.MM.yyyy HH:mm"} className='focus:outline-none cursor-pointer w-full border border-gray-300 p-2 rounded' wrapperClassName='w-full mb-4 ' placeholderText='Start Date' selected={startDate} onChange={(date: Date | null) => setStartDate(date)} />


            <p className='text-gray-500 text-sm'>End Date</p>
            <DatePicker showTimeSelect dateFormat={"dd.MM.yyyy HH:mm"} className='focus:outline-none cursor-pointer w-full border border-gray-300 p-2 rounded' wrapperClassName='w-full ' placeholderText='End Date' selected={endDate} onChange={(date: Date | null) => setEndDate(date)} />

          </div>
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

export default PublicCarsPage;
