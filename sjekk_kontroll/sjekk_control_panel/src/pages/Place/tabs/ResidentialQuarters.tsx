import { Edit, LayoutDashboardIcon, Plus, QrCode, SendIcon, Text, Trash } from 'lucide-react';
import { useEffect, useState } from 'react'
import { Input } from '../../../components/InputField';
import Modal from '../../../components/Modal';
import { TextArea } from '../../../components/TextArea';
import CustomButton from '../../../components/Button';
import { createResidentialPlace, getResidentialPlaces } from '../../../redux/features/residential_place_store';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { baseUrl, storageUrl } from '../../../configs/constants';
import axios from 'axios';
import { showNotification } from '../../../redux/features/notification_store';
import IconButton from '../../../components/IconButton';
import { DataTable } from '../../../components/DataTable';
import { IconType } from 'react-icons';
import Button from '../../../components/Button';
import { unwrapResult } from '@reduxjs/toolkit';
import { deletePlace } from '../../../redux/features/PlaceSlice';
import { DangerModal } from '../../../components/DangerModal';
import SimpleFileUpload from '../../../components/SimpleFileUpload';
import ResidentialQuarterInterface from '../../../interfaces/ResidentialQuarter';

const ResidentialQuarter = () => {
    const [searchTerm, setSearchTerm] = useState('');

      const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
      const [isGenerateDashboardModalOpen, setIsGenerateDashboardModalOpen] = useState(false);
      const [isQrcodeModalOpen, setIsQrcodeModalOpen] = useState(false);
      const [currentPlace, setCurrentPlace] = useState<ResidentialQuarterInterface | null>(null);

      const openQrcodeModal = (quarter) => {
        setIsQrcodeModalOpen(true);
        setCurrentPlace(quarter);
      };

      const [isSendNotificationModalOpen, setIsSendNotificationModalOpen] = useState(false);

      // const openSendNotificationModal = (quarter) => {
      //   setCurrentPlace(quarter);
      //   setIsSendNotificationModalOpen(true);
      // }

      const [notificationTitle, setNotificationTitle] = useState('');
      const [notificationBody, setNotificationBody] = useState('');
      const [notificationImage] = useState<File | null>(null);
      const [notificationIcon] = useState<File | null>(null);

      const handleSendNotification = async () => {
        try {
          const formData = new FormData();
          formData.append('title', notificationTitle);
          formData.append('body', notificationBody);
          if (notificationIcon) {
            formData.append('icon', notificationIcon);
          }
          if (notificationImage) {
            formData.append('image', notificationImage);
          }

          await axios.post(`${baseUrl}/residential-quarter-dashboard/${currentPlace.residential_dashboard.id}/send-notification`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setIsSendNotificationModalOpen(false);
        } catch (error) {
          console.log(error);
        }
      }
      

      const openGenerateDashboardModal = (place) => {
        setCurrentPlace(place);
        setIsGenerateDashboardModalOpen(true);
      }

      const dispatch = useAppDispatch();


      useEffect(() => {
        dispatch(getResidentialPlaces())
      }, [dispatch])
    
      useEffect(() => {
        dispatch(getResidentialPlaces());
      }, [dispatch]);

      const {residential_places} = useAppSelector(state => state.residential_place_store);

      const [accessName, setAccessName] = useState('');
      const [accessCode, setAccessCode] = useState('');
      const [accessUsername, setAccessUsername] = useState('');
      const [maxRegistrations, setMaxRegistrations] = useState(0);
      const [guestParkingHours, setGuestParkingHours] = useState(0);
      const [maxRegistrationsByApartment, setMaxRegistrationsByApartment] = useState(0);

      const handleCreateDashboard = async () => {
        try {

          
          await axios.post(`${baseUrl}/residential-dashboards`, {
            residential_quarter_id: currentPlace.id,
            access_code: accessCode,
            access_username: accessUsername,
          });

          dispatch(
            showNotification({
              message: 'Dashboard Creation',
              description: 'Dashboard created successfully',
              type: 'success',
            })
          )

          setIsGenerateDashboardModalOpen(false);

          dispatch(
            getResidentialPlaces()
          )
        } catch (error) {
          dispatch(
            showNotification({
              message: 'Something went wrong',
              description: error,
              type: 'error',
            })
          )
        }
      };

      const [name, setName] = useState('');
      const [code, setCode] = useState('');
      const [policy, setPolicy] = useState('');
      const [place_id, setPlace_id] = useState(null);
      const [isDeletePlaceModalOpen, setIsDeletePlaceModalOpen] = useState(false);

      const openDeleteModal = (quarter) => {
        setPlace_id(quarter.place.id);
        setIsDeletePlaceModalOpen(true);
      };

      const handleCreatePlace = async () => {
        await dispatch(createResidentialPlace({
          location: name,
          code: code,
          policy: policy,
          max_cars_registrations: maxRegistrations,
          guest_parking_hours: guestParkingHours,
          max_cars_by_apartment: maxRegistrationsByApartment,
          quarter_name: accessName
          
        }))
          .then(unwrapResult)
          .then(() => {
            dispatch(
              showNotification({
                type: 'success',
                message: 'Place created successfully'
              })
            )
            dispatch(getResidentialPlaces());
            setIsAddPlaceModalOpen(false);
          })
          .catch((err: Error) => {
            dispatch(
              showNotification({
                type: 'error',
                description: err.message,
                message: 'Error'
              })
            )
          });
      };

      const handleDeletePlace = async () => {
        await dispatch(deletePlace(place_id))
          .then(unwrapResult)
          .then(() => {
            dispatch(
              showNotification({
                type: 'success',
                message: 'Place deleted successfully'
              })
            )
            dispatch(getResidentialPlaces());
          })
          .catch((err: Error) => {
            dispatch(
              showNotification({
                type: 'error',
                description: err.message,
                message: 'Error'
              })
            )
          });
      };

      // const navigate = useNavigate()
  return (
    <>
    <div className="flex mb-4">
              <input
                type="text"
                placeholder="Search Residential places"
                className="flex-grow px-4 focus:ring-1 border rounded focus:outline-none "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button onClick={() => setIsAddPlaceModalOpen(true)} size="sm" leftIcon={Plus as IconType} className="bg-blue-500 ml-2 text-white px-6 py-1.5 rounded hover:bg-blue-600 transition duration-200">
                CREATE
              </Button>
            </div>

        <DataTable 
          data={residential_places}
          columns={[
            {id: 'location', title: 'Name', key: 'location', sortable: true},
            {id: 'policy', title: 'Policy', key: 'policy', sortable: true},
            {id:'code', title: 'Code', key: 'code', sortable: true},
            {id: 'quarter_name', title: 'Quarter Name', key: 'quarter_name', sortable: true, render: (row) => row as string ?? (<p className='text-red-700 font-semibold'>N/A</p>)},
            {id: 'access_username', title: 'Access Username', key: ['residential_dashboard','access_username'], sortable: true, render: (row) => row as string ?? (<p className='text-red-700 font-semibold'>N/A</p>)},
            {id: 'max_cars_registrations', title: 'Max Registrations', key: 'max_cars_registrations', render: (row) => (<p>{row as string} cars</p>), sortable: true},
            {id: 'guest_parking_hours', title: 'Guest Hours', key: 'guest_parking_hours', render: (row) => row as string ?? 'N/A', sortable: true},
          ]}
          actions={
            (row) => (
              <div className="flex space-x-2">
                {
                  row?.residential_dashboard?.apartment_registration_qrcode && (
                    <IconButton color='green' icon={QrCode as IconType} onClick={() => openQrcodeModal(row)} />
                  )
                }
                {/* {
                  row?.residential_dashboard?.notification_subscriptions.length > 0 && (
                    <IconButton color='blue' icon={BellIcon  as IconType} onClick={() => openSendNotificationModal(row)} />
                  )
                } */}
                <IconButton color='blue' icon={LayoutDashboardIcon as IconType} onClick={() => openGenerateDashboardModal(row)} />
                <IconButton color='yellow' icon={Edit as IconType} size='sm'/>
                {/* <IconButton color='yellow' icon={BellIcon as IconType} size='sm' onClick={() => navigate(Routes.PAGES.RESIDENTIAL_NOTIFICATIONS.replace(':id', row.id.toString()))}/> */}
                <IconButton icon={Trash as IconType} size='sm' onClick={() => openDeleteModal(row)}/>
              </div>
            )
          }
        />

        <Modal title='Qrcode Details' isOpen={isQrcodeModalOpen} onClose={() => setIsQrcodeModalOpen(false)}>
          <div className='flex flex-col items-center'>
            <img src={`${storageUrl}/${currentPlace?.residential_dashboard?.apartment_registration_qrcode}`} alt="" className='w-56 h-56 object-contain' />
            <h1 className='text-3xl font-semibold mt-2'>Qrcode Link</h1>
            <a href={currentPlace?.residential_dashboard?.apartment_registration_qrcode_link} className='text-blue-500 hover:underline mt-2 block text-center'>
              {currentPlace?.residential_dashboard?.apartment_registration_qrcode_link}
            </a>
          </div>
        </Modal>

    <Modal isOpen={isGenerateDashboardModalOpen} onClose={() => setIsGenerateDashboardModalOpen(false)} title={`Generate Dashboard Access for ${currentPlace?.location}`}>
        <Input placeholder='Access Username' helperText='Enter access username' value={accessUsername} onChange={(e) => setAccessUsername(e.target.value)} />
        <Input placeholder='Access Code' helperText='Enter access code' value={accessCode} onChange={(e) => setAccessCode(e.target.value)} />
        <div className="flex justify-end space-x-2">
        <CustomButton variant='outline' onClick={() => setIsGenerateDashboardModalOpen(false)} color="green" size='sm'>
          Cancel
        </CustomButton>

        <CustomButton onClick={() => handleCreateDashboard()} color="blue" size='sm'>
          Generate
        </CustomButton>
        </div>
      </Modal>

    <Modal isOpen={isAddPlaceModalOpen} onClose={() => setIsAddPlaceModalOpen(false)} title='Add Residential Place'>
        <Input placeholder='Name' helperText='Enter pace name' value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder='Code' helperText='Enter place code' value={code} onChange={(e) => setCode(e.target.value)} />
        <TextArea placeholder='Policy' helperText='Enter place policy' rows={6} value={policy} onChange={(e) => setPolicy(e.target.value)}/>
        <Input placeholder='Quarter Name' helperText='Enter quarter name' value={accessName} onChange={(e) => setAccessName(e.target.value)} />
        <Input placeholder='Max Registration Capacity' type='number' helperText='Enter max registration capacity' value={maxRegistrations} onChange={(e) => setMaxRegistrations(+e.target.value)} />
        <Input placeholder='Guest Parking' type='number' helperText='Enter guest parking hours'  value={guestParkingHours} onChange={(e) => setGuestParkingHours(+e.target.value)} />
        <Input placeholder='Max Cars By Apartment' type='number' helperText='Enter max cars by apartment'  value={maxRegistrationsByApartment} onChange={(e) => setMaxRegistrationsByApartment(+e.target.value)} />

        <div className="flex justify-end space-x-2">
        <CustomButton variant='outline' onClick={() => setIsAddPlaceModalOpen(false)} color="green">
          Cancel
        </CustomButton>

        <CustomButton onClick={handleCreatePlace} color="green">
          Add
        </CustomButton>
        </div>
      </Modal>

      <Modal size='md' isOpen={isSendNotificationModalOpen} onClose={() => setIsSendNotificationModalOpen(false)} title='Send Notification'>
        <Input
          icon={Text as IconType}
          helperText='Notification title' 
          placeholder='Enter notification title'
          value={notificationTitle}
          onChange={(e) => setNotificationTitle(e.target.value)}
          required
        />

        <TextArea 
          helperText='Notification body (optional)'
          placeholder='Enter notification body'
          value={notificationBody}
          onChange={(e) => setNotificationBody(e.target.value)}
          rows={5}
        />

        <div className="mb-4">
          <SimpleFileUpload 
            label='Notification image (optional)'
            onChange={(file) => console.log(file)}
            accept="image/*"
          />
        </div>

        <div className="mb-4">
          <SimpleFileUpload 
            label='Notification icon (optional)'
            onChange={(file) => console.log(file)}
            accept="image/*"
          />
        </div>

        <div className='flex justify-end gap-2 mt-4'>
          <Button
            variant='outline'
            onClick={() => setIsSendNotificationModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendNotification}
            leftIcon={SendIcon as IconType}
          >
            Create
          </Button>
        </div>
      </Modal>

      <DangerModal 
        isOpen={isDeletePlaceModalOpen}
        onClose={() => setIsDeletePlaceModalOpen(false)}
        onCancel={() => setIsDeletePlaceModalOpen(false)}
        onAccept={handleDeletePlace}
        title="Delete Place"
        content="Are you sure you want to delete this place?"
      />
    </>
  )
}

export default ResidentialQuarter