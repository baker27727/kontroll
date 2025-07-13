import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { DataTable } from '../../components/DataTable';
import { IconType } from 'react-icons';
import { BellIcon, Building, Hash, Plus, SendIcon, Shield, Text, Trash2, User } from 'lucide-react';
import { Card } from '../../components/Card';
import { deletePlaceDashboard, generatePlaceDashboard, getAllPlaceProfiles } from '../../redux/features/PlaceDashboardSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { Input } from '../../components/InputField';
import { showNotification } from '../../redux/features/notification_store';
import PublicPlaceDashboard from '../../interfaces/PlaceProfile';
import { DangerModal } from '../../components/DangerModal';
import IconButton from '../../components/IconButton';
import axios from 'axios';
import { baseUrl } from '../../configs/constants';
import SimpleFileUpload from '../../components/SimpleFileUpload';
import { TextArea } from '../../components/TextArea';

const PublicPlaceDashboards: React.FC = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation(); // Initialize useTranslation hook
    const { dashboards, loading } = useAppSelector(state => state.placeProfiles);
    const { id } = useParams();
    const [isAddDashboardModalOpen, setIsAddDashboardModalOpen] = useState(false);

    const [placeName, setPlaceName] = useState('');
    const [placeType, setPlaceType] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [accessUsername, setAccessUsername] = useState('');
    const [freeParkingHours, setFreeParkingHours] = useState(0);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentDashboard, setCurrentDashboard] = useState<PublicPlaceDashboard | null>(null);

    useEffect(() => {
        dispatch(getAllPlaceProfiles(id)).catch((error: Error) => {
            dispatch(
                showNotification({
                    type: 'error',
                    message: error.message
                })
            )
        });
    }, [dispatch, id]);

    const handleCreateDashboard = async () => {
        await dispatch(generatePlaceDashboard({
            id: +id,
            data: {
              place_name: placeName,
              place_type: placeType,
              access_code: accessCode,
              access_username: accessUsername,
              free_parking_hours: freeParkingHours
            }
          }))
          .then(unwrapResult)
          .then(() => {
              setIsAddDashboardModalOpen(false);
              dispatch(
                  showNotification({
                      type: 'success',
                      message: 'Dashboard created successfully'
                  })
              )
          })
          .catch((error: Error) => {
              dispatch(
                  showNotification({
                      type: 'error',
                      message: error.message
                  })
              )
          });
    }

    const openDeleteModal = (dashboard: PublicPlaceDashboard) => {
        setCurrentDashboard(dashboard);
        setIsDeleteModalOpen(true);
    };

    const handleDeletePlaceProfile = async (profile_id: number) => {
        await dispatch(deletePlaceDashboard({
            dashboard_id: profile_id,
            place_id: +id
        }))
        .then(unwrapResult)
        .then(() => {
            dispatch(
                showNotification({
                    type: 'success',
                    message: 'Dashboard deleted successfully'
                })
            )
            dispatch(getAllPlaceProfiles(id));
            setIsDeleteModalOpen(false);
        })
        .catch((err: Error) => {
            dispatch(
                showNotification({
                    type: 'error',
                    message: err.message
                })
            )
        });
    };

    const [isSendNotificationModalOpen, setIsSendNotificationModalOpen] = useState(false);
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationBody, setNotificationBody] = useState('');
    const [notificationImage, setNotificationImage] = useState<File | null>(null);
    const [notificationIcon, setNotificationIcon] = useState<File | null>(null);
    const openSendNotificationModal = (public_place_dashboard) => {
        setCurrentDashboard(public_place_dashboard);
        setIsSendNotificationModalOpen(true);
      }

      const handleSendNotification = async () => {
        try {
          await axios.post(`${baseUrl}/public-place-dashboard/${currentDashboard.id}/send-notification`, {
            title: notificationTitle,
            body: notificationBody,
            icon: notificationIcon,
            image: notificationImage
          });
          setIsSendNotificationModalOpen(false);
        } catch (error) {
          console.log(error);
        }
      }

    return (
        <>
            <Card
                title='Public Place Dashboards'
                headerAction={
                    <Button
                        onClick={() => setIsAddDashboardModalOpen(true)}
                        variant='outline'
                        leftIcon={Plus as IconType}
                    >
                        Add Dashboard
                    </Button>
                }
            >
                <DataTable 
                    loading={loading}
                    data={dashboards}
                    columns={[
                        {id: 'place_name', title: t('profile_name'), key: 'place_name', sortable: true},
                        {id: 'place_type', title: t('type'), key: 'place_type', sortable: true},
                        {id: 'access_username', title: t('access_username'), key: 'access_username', sortable: true},
                        {id: 'access_code', title: t('access_code'), key: 'access_code', sortable: true},
                        {id: 'free_parking_hours', title: t('free_parking_hours'), key: 'free_parking_hours', sortable: true},
                    ]}

                    actions={
                        (row: PublicPlaceDashboard) => (
                            <div className='flex items-center space-x-2'>
                                                {
                  row?.notification_subscriptions.length > 0 && (
                    <IconButton color='blue' icon={BellIcon  as IconType} onClick={() => openSendNotificationModal(row)} />
                  )
                }
                                <IconButton 
                                    icon={Trash2 as IconType}
                                    onClick={() => openDeleteModal(row)}
                                    color='red'
                                />
                            </div>
                        )
                    }
                />
            </Card>

            <Modal isOpen={isAddDashboardModalOpen} onClose={() => setIsAddDashboardModalOpen(false)} title='Add Dashboard'>
                <Input 
                    placeholder='Enter place name'
                    helperText='Enter the place name'
                    icon={Text as IconType}
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                />
                <Input 
                    placeholder='Enter place type'
                    helperText='Enter the type of the place'
                    icon={Building as IconType}
                    value={placeType}
                    onChange={(e) => setPlaceType(e.target.value)}
                />
                <Input 
                    placeholder='Enter access username'
                    helperText='Enter the access username'
                    icon={User as IconType}
                    value={accessUsername}
                    onChange={(e) => setAccessUsername(e.target.value)}
                />
                <Input 
                    placeholder='Enter access code'
                    helperText='Enter the access code'
                    icon={Shield as IconType}
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                />
                <Input 
                    placeholder='Enter free parking hours'
                    helperText='Enter the free parking hours'
                    type='number'
                    icon={Hash as IconType}
                    value={freeParkingHours}
                    onChange={(e) => setFreeParkingHours(+e.target.value)}
                />

                <div className='flex justify-end space-x-2'>
                    <Button
                        onClick={() => setIsAddDashboardModalOpen(false)}
                        variant='outline'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleCreateDashboard()}
                        variant='primary'
                    >
                        Create
                    </Button>
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
            onChange={(file) => setNotificationImage(file)}
            accept="image/*"
          />
        </div>

        <div className="mb-4">
          <SimpleFileUpload 
            label='Notification icon (optional)'
            onChange={(file) => setNotificationIcon(file)}
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
                title='Delete Dashboard'
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                content={`Are you sure you want to delete this dashboard "${currentDashboard?.place_name}"?`}
                onAccept={() => handleDeletePlaceProfile(currentDashboard?.id as number)}
                onCancel={() => setIsDeleteModalOpen(false)}
            />
        </>
    );
};

export default PublicPlaceDashboards;
