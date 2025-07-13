import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getPartners, deletePartner, createPartner, createPartnerLink, updatePartner } from '../redux/features/PartnerSlice';
import Partner from '../interfaces/Partner';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { Edit, Hash, Link, Text, Trash } from 'lucide-react';
import { DangerModal } from '../components/DangerModal';
import Modal from '../components/Modal';
import CustomButton from '../components/Button';
import { Input } from '../components/InputField';
import NoteComponent from '../components/Note';
import { showNotification } from '../redux/features/notification_store';
import reload from '../utils/page_reloader';
import { DataTable } from '../components/DataTable';
import { Card } from '../components/Card';
import { IconType } from 'react-icons';
import IconTextButton from '../components/IconTextButton';
import { GiContract } from 'react-icons/gi';

const PartnersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const parkingProviders = useAppSelector(state => state.partnerProvider.partners);
    const { t } = useTranslation(); // Initialize useTranslation hook

    useEffect(() => {
        dispatch(getPartners());
    }, [dispatch]);

    

    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [isGenerateLinkModalOpen, setIsGenerateLinkModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [currentPartner, setCurrentPartner] = React.useState<Partner | null>(null);

    const [accessCode, setAccessCode] = React.useState('');
    const [accessUsername, setAccessUsername] = React.useState('');

    const [name, setName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');

    const openDeleteModal = (partner: Partner) => {
        setCurrentPartner(partner);
        setIsDeleteModalOpen(true);
    };

    const openEditModal = (partner: Partner) => {
        setCurrentPartner(partner);
        setName(partner.name);
        setPhoneNumber(partner.phone_number);

        setIsEditModalOpen(true);
    };

    const openGenerateLinkModal = (partner: Partner) => {
        setCurrentPartner(partner);
        setIsGenerateLinkModalOpen(true);
    };

    const handleDeleteAccept = async () => {    
      await dispatch(deletePartner(currentPartner?.id))
      .then(unwrapResult)
      .then(() => {
        dispatch(
          showNotification({
            message: 'Partner deleted successfully',
            description: 'Partner deleted successfully',
            type: 'success',
          })
        )
          setIsDeleteModalOpen(false);
      })
      .catch((error) => {
          dispatch(
              showNotification({
                  message: 'Failed to delete partner',
                  description: error.message,
                  type: 'error',
              })
          )
          setIsDeleteModalOpen(false);
      });
    };

    const handleCreateAccept = async () => {
      await dispatch(
        createPartner({
          name: name,
          phone_number: phoneNumber
        })
      )
        .then(unwrapResult)
        .then(() => {
          dispatch(
            showNotification({
              message: 'Partner created successfully',
              description: 'Partner created successfully',
              type: 'success',
            })
          )
          setIsAddModalOpen(false);
        }).catch((error: Error) => {
          dispatch(
            showNotification({
              message: 'Failed to create partner',
              description: error.message,
              type: 'error',
            })
          )
          setIsAddModalOpen(false);
        });
    }

    const handleUpdateAccept = async () => {
      await dispatch(
        updatePartner({
          id: currentPartner?.id,
          data: {
            name: name,
            phone_number: phoneNumber
          }
        })
      )
        .then(unwrapResult)
        .then(() => {
          dispatch(
            showNotification({
              message: 'Partner updated successfully',
              type: 'success',
            })
          )
          dispatch(getPartners());
          setIsEditModalOpen(false);
        }).catch((error: Error) => {
          dispatch(
            showNotification({
              message: 'Failed to update partner',
              description: error.message,
              type: 'error',
            })
          )
          dispatch(getPartners());

          setIsEditModalOpen(false);
        });
    }

    const handleGenerateAccept = async () => {
      await dispatch(createPartnerLink({
        id: currentPartner?.id.toFixed(0),
        access_code: accessCode,
        access_username: accessUsername
    }))
    .then(unwrapResult)
    .then(() => {
      dispatch(
        showNotification({
          message: 'Partner link created successfully',
          description: 'Partner link created successfully',
          type: 'success',
        })
      )
      setIsGenerateLinkModalOpen(false);
      reload(2);
    })
    .catch((error: Error) => {
      dispatch(
        showNotification({
          message: 'Failed to create partner link',
          description: error.message,
          type: 'error',
        })
      )
    });
    }

    return (
        <>
          <Card
            title='Partners'
            headerAction={
              <CustomButton leftIcon={GiContract as IconType} variant='outline' onClick={() => setIsAddModalOpen(true)}>
                {t('add_partner')}
            </CustomButton>
            }
          >
            <DataTable 
                data={parkingProviders}
                columns={[
                    {id: 'name', title: t('name'), key: 'name', sortable: true},
                    {id:'phone_number',title: t('phone_number'), key: 'phone_number', sortable: true},
                    {id:'dashboard',title: t('access_username'), key: ['dashboard','access_username'], sortable: true},
                    {id:'xx',title: t('access_code'), key: ['dashboard','access_code'], sortable: true},
                ]}

                itemsPerPage={8}
                hoverable
                actions={
                    (row: Partner) => (
                        <div className='flex items-center space-x-2'>
                          <IconTextButton
                            text='Edit' 
                            icon={Edit as IconType}
                            onClick={() => openEditModal(row)}
                            size='sm'
                            color='yellow'
                          />
                          <IconTextButton
                            text='Dashboard' 
                            icon={Link as IconType}
                            onClick={() => openGenerateLinkModal(row)}
                            size='sm'
                            color='green'
                          />
                          <IconTextButton 
                          text='Delete'
                            icon={Trash as IconType}
                            onClick={() => openDeleteModal(row)}
                            size='sm'
                            color='red'
                          />
                          </div>
                    )
                }
            />

<Modal title={`Create Partner`} isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <>
          <Input icon={Text as IconType} placeholder='Name' helperText='Enter the name of the partner' value={name} onChange={(e) => setName(e.target.value)}/>
          <Input icon={Text as IconType} placeholder='Phone Number' helperText='Enter the phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>

            <div className='flex justify-end'>
            <CustomButton onClick={() => setIsAddModalOpen(false)} variant="outline" className='mr-2'>
              Cancel
            </CustomButton>

            <CustomButton onClick={handleCreateAccept} color="green">
              Create
            </CustomButton>
            </div>
          </>
      </Modal>

<Modal title={`Update Partner "${currentPartner?.name}"`} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <>
          <Input icon={Text as IconType} placeholder='Name' helperText='Enter the name of the partner' value={name} onChange={(e) => setName(e.target.value)}/>
          <Input icon={Text as IconType} placeholder='Phone Number' helperText='Enter the phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>

            <div className='flex justify-end'>
            <CustomButton onClick={() => setIsEditModalOpen(false)} variant="outline" className='mr-2'>
              Cancel
            </CustomButton>

            <CustomButton onClick={handleUpdateAccept} color="green">
              Update
            </CustomButton>
            </div>
          </>
      </Modal>


      <Modal title={`Generate Access for Partner "${currentPartner?.name}"`} isOpen={isGenerateLinkModalOpen} onClose={() => setIsGenerateLinkModalOpen(false)}>
        <>
          <Input icon={Text as IconType} placeholder='Access username' helperText='Enter the access username' value={accessUsername} onChange={(e) => setAccessUsername(e.target.value)}/>
          <Input icon={Hash as IconType} placeholder='Access code' helperText='Enter the access code' value={accessCode} onChange={(e) => setAccessCode(e.target.value)}/>

          <NoteComponent title='Note' description='Please ensure that the access code is unique for each partner. Otherwise, users will not be able to access the dashboard.' />

            <div className='flex justify-end'>
            <CustomButton onClick={() => setIsGenerateLinkModalOpen(false)} variant="outline" className='mr-2'>
              Cancel
            </CustomButton>

            <CustomButton onClick={handleGenerateAccept} color="green">
              Generate
            </CustomButton>
            </div>
          </>
      </Modal>

    <DangerModal 
        title='Delete User'
        content={`Are you sure you want to delete this partner "${currentPartner?.name}"?`}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onAccept={handleDeleteAccept}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
          </Card>
        </>
    );
};

export default PartnersPage;
