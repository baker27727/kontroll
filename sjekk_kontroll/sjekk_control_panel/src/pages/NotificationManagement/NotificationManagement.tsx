import React, { useState, useEffect } from 'react';
import { SendIcon, EditIcon, TrashIcon, Text } from 'lucide-react';
import ActionBar from '../../components/Actionbar';
import { DangerModal } from '../../components/DangerModal';
import { Column, DataTable } from '../../components/DataTable';
import DropdownMenu from '../../components/DropdownMenu';
import Button from '../../components/Button';
import { IconType } from 'react-icons';
import { Card } from '../../components/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getNormalPlaces } from '../../redux/features/normal_place_store';
import { getResidentialPlaces } from '../../redux/features/residential_place_store';
import Modal from '../../components/Modal';
import { Input } from '../../components/InputField';
import { TextArea } from '../../components/TextArea';
import Select from '../../components/Select';
import SimpleFileUpload from '../../components/SimpleFileUpload';
import { getSystemNotifications, storeSystemNotification, SystemNotification } from '../../redux/features/SystemNotificationSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { ConfirmationModal } from '../../components/ConfirmationDialog';
import { storageUrl } from '../../configs/constants';
import { sendSystemNotification } from '../../redux/features/notification_management_store';
  
type SendType = 'public' | 'residential' | 'apartment' | '*';

const NotificationManagement: React.FC = () => {
  const [isSendCustomNotificationModalOpen, setIsSendCustomNotificationModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<SystemNotification | null>(null);
  const [isCreateNotificationModalOpen, setIsCreateNotificationModalOpen] = useState(false);
  const [isConfirmSendModalOpen, setIsConfirmSendModalOpen] = useState(false);
  const [isConfirmCreateModalOpen, setIsConfirmCreateModalOpen] = useState(false);

  const [sendOption, setSendOption] = useState<SendType>('public');
  const [selectedDestination, setSelectedDestination] = useState<string>('');

  const dispatch = useAppDispatch();
  const { normal_places } = useAppSelector(state => state.normal_place_store);
  const { residential_places } = useAppSelector(state => state.residential_place_store);
  const { notifications } = useAppSelector(state => state.system_notification_store);
  const apartments = []

  useEffect(() => {
    dispatch(getNormalPlaces());
    dispatch(getResidentialPlaces());
    dispatch(getSystemNotifications());
  }, [dispatch]);

  const parsedDestinations = {
    public: normal_places,
    residential: residential_places.map(place => place.residential_dashboard),
    apartment: apartments
  }

  const handleEditNotification = (notification: SystemNotification) => {
    console.log('Editing notification:', notification);
  };

  const handleDeleteNotification = (notification: SystemNotification) => {
    setSelectedNotification(notification);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedNotification) {
      // Delete notification logic here
      console.log('Deleting notification:', selectedNotification);
    }
    setIsDeleteModalOpen(false);
    setSelectedNotification(null);
  };

  const handleNotificationCreation = async () => {
    setIsConfirmCreateModalOpen(true);
  };

  const confirmNotificationCreation = async () => {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('body', body)
      formData.append('image', image)
      formData.append('icon', icon)
      
      await dispatch(storeSystemNotification(
        formData
      )).then(unwrapResult)
      .then(() => {
        setIsCreateNotificationModalOpen(false);
      });
    } catch(error) {
      console.error(error);
    }
  };

  const handleSendCustomNotification = () => {
    setIsConfirmSendModalOpen(true);
  };

  const confirmSendCustomNotification = () => {
    console.log('Sending custom notification:');
    console.log('Destination type:', sendOption);
    console.log('Selected destination:', selectedDestination === 'all' ? '*' : selectedDestination);
    setIsSendCustomNotificationModalOpen(false);
  };

  const [isSendSavedNotificationModalOpen, setIsSendSavedNotificationModalOpen] = useState(false);
  const [savedNotification, setSavedNotification] = useState<SystemNotification | null>(null);

  const openSendSavedNotificationModal = (saved_notification: SystemNotification) => {
    setSavedNotification(saved_notification);
    setIsSendSavedNotificationModalOpen(true);
  };

  const handleSendSavedNotification = async () => {
    console.log('Sending saved notification:');
    console.log('savedNotification:', savedNotification);

    console.log('Destination type:', sendOption);
    console.log('Selected destination:', selectedDestination);

    await dispatch(
      sendSystemNotification({
        notification_id: savedNotification.id,
        payload: {
          channel: sendOption,
          destinations: selectedDestination
        }
      })
    ).then(unwrapResult)
    .catch(error => {
      console.error(error);
    })
    
    setIsSendSavedNotificationModalOpen(false);
    setSavedNotification(null);
  };

  const columns: Column<SystemNotification>[] = [
    { id: 'title', key: 'title', title: 'Title', sortable: true },
    { id: 'body', key: 'body', title: 'Body', sortable: true },
    { id: 'image', key: 'image', title: 'Image', render(_, row) {
      if (!row.image) {
        return ""
      }
      return <img src={`${storageUrl}/${row.image}`} alt={row.title} width={50} height={50} />
    }, },
    { id: 'icon', key: 'icon', title: 'Icon', render(_, row) {
      if (!row.icon) {
        return ""
      }
      return <img src={`${storageUrl}/${row.icon}`} alt={row.title} width={50} height={50} />
    }, },
  ];

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [icon, setIcon] = useState<File | null>(null);

  const actions = (notification: SystemNotification) => (
    <DropdownMenu
      trigger={<Button variant="ghost">Actions</Button>}
      items={[
        {
          label: 'Send',
          icon: <SendIcon size={16} />,
          onClick: () => openSendSavedNotificationModal(notification),
        },
        {
          label: 'Edit',
          icon: <EditIcon size={16} />,
          onClick: () => handleEditNotification(notification),
        },
        {
          label: 'Delete',
          icon: <TrashIcon size={16} />,
          onClick: () => handleDeleteNotification(notification),
          hoverColor: 'red',
        },
      ]}
    />
  );

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Notification Management', href: '/notifications' },
  ];

  return (
    <div className="">
      <ActionBar
        breadcrumbItems={breadcrumbItems}
      >
        <Button
          onClick={() => setIsCreateNotificationModalOpen(true)}
          leftIcon={EditIcon as IconType}
        >
          Create Notification
        </Button>

        <Button 
            leftIcon={SendIcon as IconType}
            color="green" 
            onClick={() => setIsSendCustomNotificationModalOpen(true)}
        >
          Send Custom Notification
        </Button>
      </ActionBar>
      <Card title="Notification Management">
        <DataTable
          columns={columns}
          data={notifications}
          actions={actions}
          hoverable
          striped
          showColumnSelector
          paginated
        />
      </Card>

      <DangerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Notification"
        content="Are you sure you want to delete this notification? This action cannot be undone."
        onAccept={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
<Modal size='md' isOpen={isSendCustomNotificationModalOpen} onClose={() => setIsSendCustomNotificationModalOpen(false)} title='Create Notification'>
        <Input
          icon={Text as IconType}
          helperText='Notification title' 
          placeholder='Enter notification title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <TextArea
          value={body}
          onChange={(e) => setBody(e.target.value)} 
          helperText='Notification body (optional)'
          placeholder='Enter notification body'
          rows={5}
        />

        <div className="mb-4">
          <SimpleFileUpload 
            label='Notification image (optional)'
            onChange={(file) => setImage(file)}
            accept="image/*"
          />
        </div>

        <div className="mb-4">
          <SimpleFileUpload 
            label='Notification icon (optional)'
            onChange={(file) => setIcon(file)}
            accept="image/*"
          />
        </div>

        <div className='mb-4'>
          <p>Send to</p>
          <Select 
            className='w-full'
            onChange={(val) => {
              setSendOption(val as SendType);
              setSelectedDestination('');
            }}
            options={[
              { label: 'All', value: '*' },
              { label: 'Normal Place', value: 'public' },
              { label: 'Residential Place', value: 'residential' },
              { label: 'Apartments', value: 'apartment' },
            ]}
          />
        </div>

        <div className='mb-4'>
          <Select
            placeholder='Select destination'
            className='w-full'
            onChange={(val) => setSelectedDestination(val)}
            options={
              sendOption === '*' 
                ? [{ label: 'All', value: 'all' }]
                : parsedDestinations[sendOption]
                    .filter((dest) => dest != null)
                    .map((dest) => ({ 
                      label: dest['access_username'], 
                      value: dest['id'] 
                    }))
            }
          />
        </div>

        <div className='flex justify-end gap-2 mt-4'>
          <Button
            variant='outline'
            onClick={() => setIsSendCustomNotificationModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            leftIcon={SendIcon as IconType}
            onClick={handleSendCustomNotification}
          >
            Send
          </Button>
        </div>
      </Modal>

      <Modal size='md' isOpen={isCreateNotificationModalOpen} onClose={() => setIsCreateNotificationModalOpen(false)} title='Create Custom Notification'>
        <Input
          icon={Text as IconType}
          helperText='Notification title' 
          placeholder='Enter notification title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <TextArea 
          helperText='Notification body (optional)'
          placeholder='Enter notification body'
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="mb-4">
          <SimpleFileUpload 
            label='Notification image (optional)'
            onChange={(file) => setImage(file)}
            accept="image/*"
          />
        </div>

        <div className="mb-4">
          <SimpleFileUpload 
            label='Notification icon (optional)'
            onChange={(file) => setIcon(file)}
            accept="image/*"
          />
        </div>

        <div className='flex justify-end gap-2 mt-4'>
          <Button
            variant='outline'
            onClick={() => setIsCreateNotificationModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleNotificationCreation}
            leftIcon={SendIcon as IconType}
          >
            Create
          </Button>
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmSendModalOpen}
        onClose={() => setIsConfirmSendModalOpen(false)}
        title="Confirm Send Custom Notification"
        content="Are you sure you want to send this custom notification?"
        onAccept={confirmSendCustomNotification}
        onCancel={() => setIsConfirmSendModalOpen(false)}
      />

      <ConfirmationModal
        isOpen={isConfirmCreateModalOpen}
        onClose={() => setIsConfirmCreateModalOpen(false)}
        title="Confirm Create Notification"
        content="Are you sure you want to create this notification?"
        onAccept={confirmNotificationCreation}
        onCancel={() => setIsConfirmCreateModalOpen(false)}
      />

      <Modal title='Send Saved Notification' isOpen={isSendSavedNotificationModalOpen} onClose={() => setIsSendSavedNotificationModalOpen(false)}>
      <div className='mb-4'>
          <p>Send to</p>
          <Select 
            className='w-full'
            onChange={(val) => {
              setSendOption(val as SendType);
              setSelectedDestination('');
            }}
            options={[
              { label: 'Normal Place', value: 'public' },
              { label: 'Residential Place', value: 'residential' },
              { label: 'Apartments', value: 'apartment' },
              { label: 'All', value: '*' },
            ]}
          />
        </div>

        <div className='mb-4'>
          <Select
            placeholder='Select destination'
            className='w-full'
            onChange={(val) => setSelectedDestination(val)}
            options={
              sendOption == '*' 
                ? [{ label: 'All', value: 'all' }] 
                : [
                    { label: 'All', value: 'all' },
                    ...parsedDestinations[sendOption]
                      .filter((dest) => dest != null)
                      .map((dest) => ({
                        label: dest['access_username'],
                        value: dest['id'],
                      })),
                  ]
            }
          />
        </div>

        <div className='flex justify-end gap-2 mt-4'>
          <Button
            variant='outline'
            onClick={() => setIsSendSavedNotificationModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            leftIcon={SendIcon as IconType}
            onClick={handleSendSavedNotification}
          >
            Send
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default NotificationManagement;