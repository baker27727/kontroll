import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Routes from '../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { deleteRegisteredCar, getRegisteredCars } from '../../redux/stores/registered_cars_store';
import moment from 'moment';
import TimeHelper from '../../utils/time_utils';
import { showNotification } from '../../redux/stores/notification_store';
import NoteComponent from '../../components/Note';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { DataTable } from '../../components/DataTable';
import IconButton from '../../components/IconButton';
import { Card } from '../../components/Card';
import Button from '../../components/Button';
import { PlusIcon } from 'lucide-react';
import Tag from '../../components/Tag';



const DeleteModal = ({ show, onClose, onConfirm }) => {
  const [t] = useTranslation()
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-2 rounded-sm shadow-md w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold">{t('registered_cars_block.delete_modal.confirm_delete_title')}</h2>
        <p className="mb-6">{t('registered_cars_block.delete_modal.confirm_delete_message')}</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-1 rounded-sm mr-2 transition-all duration-300 ease-in-out hover:bg-gray-400"
            onClick={onClose}
          >
            {t('registered_cars_block.delete_modal.cancel_button')}
          </button>
          <button
            className="bg-red-600 text-white px-4 py-1 rounded-sm transition-all duration-300 ease-in-out hover:bg-red-700"
            onClick={onConfirm}
          >
            {t('registered_cars_block.delete_modal.confirm_button')}
          </button>
        </div>
      </div>
    </div>
  );
};

const RenewModal = ({ show, onClose, car, onRenew }) => {
  const [expireDate, setExpireDate] = useState(new Date());
  const [t] = useTranslation();
  
  const parkingOptions = [
    { value: 'reserved', label: t('registered_cars_block.parking_options.reserved_parking') },
    { value: 'guest', label: t('registered_cars_block.parking_options.guest_parking') },
  ];
  const [parkingType, setParkingType] = useState(parkingOptions.find(option => option.value === car?.parking_type) || parkingOptions[0]);
  const handleRenew = () => {
    onRenew({ ...car, parking_type: parkingType.value, expire_date: expireDate });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-3 rounded-sm shadow-md w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">{t('registered_cars_block.renew_car_registration_modal.renew_car_registration')}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{t('registered_cars_block.renew_car_registration_modal.parking_type')}</label>
          <Select
            value={parkingType}
            onChange={setParkingType}
            options={parkingOptions}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{t('registered_cars_block.renew_car_registration_modal.new_expiration_date')}</label>
          <DatePicker
            selected={expireDate}
            selectsMultiple
            onChange={([date]) => setExpireDate(date)}
            dateFormat="yyyy-MM-dd"
            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <NoteComponent title={t('registered_cars_block.renew_car_registration_modal.note_title')} description={t('registered_cars_block.renew_car_registration_modal.note_message')}/>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-1 rounded-sm mr-2 transition-all duration-300 ease-in-out hover:bg-gray-400"
            onClick={onClose}
          >
            {t('registered_cars_block.renew_car_registration_modal.cancel_button')}
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded-sm transition-all duration-300 ease-in-out hover:bg-blue-700"
            onClick={handleRenew}
          >
            {t('registered_cars_block.renew_car_registration_modal.confirm_button')}
          </button>
        </div>
      </div>
    </div>
  );
};

const EditModal = ({ show, onClose, car, onSave }) => {
  const [t] = useTranslation();
  
  const parkingOptions = [
    { value: 'reserved', label: t('registered_cars_block.parking_options.reserved_parking') },
    { value: 'guest', label: t('registered_cars_block.parking_options.guest_parking') },
  ];
  const [parkingType, setParkingType] = useState(parkingOptions.find(option => option.value === car?.parking_type) || parkingOptions[0]);
  const [expireDate, setExpireDate] = useState(new Date(car?.expire_date));

  const handleSave = () => {
    onSave({ ...car, parking_type: parkingType.value, expire_date: expireDate });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-3 rounded-sm shadow-md w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">{t('registered_cars_block.edit_car_modal.edit_car_registration')}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{t('registered_cars_block.edit_car_modal.parking_type')}</label>
          <Select
            value={parkingType}
            onChange={setParkingType}
            options={parkingOptions}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{t('registered_cars_block.edit_car_modal.expiration_date')}</label>
          <DatePicker
            selected={expireDate}
            selectsMultiple
            onChange={([date]) => setExpireDate(date)}
            dateFormat="yyyy-MM-dd"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-1 rounded-sm mr-2 transition-all duration-300 ease-in-out hover:bg-gray-400"
            onClick={onClose}
          >
            {t('registered_cars_block.edit_car_modal.cancel_button')}
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded-sm transition-all duration-300 ease-in-out hover:bg-blue-700"
            onClick={handleSave}
          >
            {t('registered_cars_block.edit_car_modal.confirm_button')}
          </button>
        </div>
      </div>
    </div>
  );
};

const RegisteredCars = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('longTerm');
  const [t] = useTranslation();

  const handleDeleteClick = (car_id: number) => {
    setSelectedCar(car_id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCar) return;

    await dispatch(
      deleteRegisteredCar(selectedCar)
    ).unwrap()
    .then(() => {
      dispatch(
        showNotification({
          type: 'success',
          message: t('registered_cars_block.car_deletion_success_title'),
          description: t('registered_cars_block.car_deletion_success_message'),

        })
      )
    }).catch(() => {
      dispatch(
        showNotification({
          type: 'error',
          message: t('registered_cars_block.car_deletion_failure_title'),
          description: t('registered_cars_block.car_deletion_failure_message'),
        })
      )
    })
    setShowModal(false);
    setSelectedCar(null);
  };

  const navigate = useNavigate();
  const navigateToRegisterCar = () => {
    navigate(Routes.REGISTER_CAR);
  };


  const { residential_cars } = useAppSelector(state => state.registered_cars_store)
  console.log(residential_cars);
  
  const guest_cars = residential_cars.filter(
    car => car.parking_type == 'guest'
  )

  const reserved_cars = residential_cars.filter(
    car => car.parking_type == 'reserved'
  )
  const { dashboard } = useAppSelector(state => state.auth_store)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if(!dashboard?.residential_quarter) return

    dispatch(getRegisteredCars(dashboard?.residential_quarter.id))
  }, [dispatch, dashboard?.residential_quarter]);

  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);

  const handleSaveEdit = async () => {
    // Update car registration logic here
    setShowEditModal(false);
    setSelectedCar(null);
  };

  const handleRenewCar = async () => {
    // Renew car registration logic here
    setShowRenewModal(false);
    setSelectedCar(null);
  };


  const filteredCars = activeTab === 'longTerm' ? reserved_cars : guest_cars

  return (
    <>
      <div className="mx-auto max-w-8xl">
        <Card title='Registered Cars'
          headerAction={
            <div className='flex space-x-2 items-center'>
              
              <div className="text-gray-600">
              <p className="text-md flex items-center space-x-2">
                <span>{t('registered_cars_block.registered_cars_count').toUpperCase()}</span> <Tag text={`${residential_cars.length} / ${dashboard?.residential_quarter.max_cars_registrations}`} size='sm'/>
              </p>
            </div>
              <Button onClick={navigateToRegisterCar} leftIcon={<PlusIcon className="w-5 h-5" />} variant={'ghost'}>
              Register Car
            </Button>
            </div>
          }
        >
        <div className="mb-4 flex justify-between items-center">
            <div className="flex border-b">
              <button
                className={`px-4 py-2 focus:outline-none ${activeTab === 'longTerm' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                onClick={() => setActiveTab('longTerm')}
              >
                {t('registered_cars_block.tabs.long_term_cars')}
              </button>
              <button
                className={`px-4 py-2 focus:outline-none ${activeTab === 'guest' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                onClick={() => setActiveTab('guest')}
              >
                {t('registered_cars_block.tabs.guest_cars')}
              </button>
            </div>


          </div>

          <div className="overflow-x-auto">
          <DataTable 
          hoverable
          
                      columns={[
                        { title: t('registered_cars_block.table_columns.plate_number'), key: ['registered_car','plate_number'], sortable: true },
                        { title: t('registered_cars_block.table_columns.registration_date'), key: ['registered_car','registration_date'], sortable: true },
                        { title: t('registered_cars_block.table_columns.expiration_date'), key: ['registered_car','expire_date'], sortable: true },
                        { title: t('registered_cars_block.table_columns.time_left'), key: ['registered_car','expire_date',], render: (row) => moment.duration(moment(row, TimeHelper.format).diff(moment())).humanize(), sortable: true },
                        { title: t('registered_cars_block.table_columns.parking_type'), key: 'parking_type', sortable: true },
                        { title: 'Apartment', key: 'apartment', sortable: true, render(_, row) {
                          return row.apartment ? row.apartment.apartment_number : 'N/A'
                        }, },
                      ]}

                      actions={
                        (row) => {
                          if(activeTab === 'longTerm') {
                            return (
                              <div className="flex space-x-2">
                            <IconButton
                              icon={FaTrashAlt}
                              onClick={() => handleDeleteClick(row.id)}
                              size='sm'
                            
                            />
                          </div>
                            )
                          }else{
                            return (
                              <div className="flex space-x-2">
                                <IconButton 
                                  icon={FaTrashAlt}
                                  onClick={() => handleDeleteClick(row.id)}
                                  size='sm'
                                
                                />
                              </div>
                            )
                          }
                        }
                      }

                      data={filteredCars}
                    />
          </div>
        </Card>
      </div>

      <DeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />

      <EditModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        car={selectedCar}
        onSave={handleSaveEdit}
      />
      <RenewModal
        show={showRenewModal}
        onClose={() => setShowRenewModal(false)}
        car={selectedCar}
        onRenew={handleRenewCar}
      />
    </>
  );
};

export default RegisteredCars;
