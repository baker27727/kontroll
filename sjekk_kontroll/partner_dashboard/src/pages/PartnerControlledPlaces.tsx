import React, { useEffect, useState } from 'react';
import { Search, Plus, Trash } from 'lucide-react';
import { DangerModal } from '../components/DangerModal';
import Modal from '../components/Modal';
import { Input } from '../components/InputField';
import CustomButton from '../components/Button';
import { TextArea } from '../components/TextArea';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getAllPartnerPlaces } from '../redux/features/partner_places_reducer';
import { DataTable } from '../components/DataTable';
import { Card } from '../components/Card';
import Button from '../components/Button';
import Place from '../interfaces/Place';
import { createPlaceRequest } from '../redux/features/place_request_reducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { showNotification } from '../redux/features/notification_store';
import IconButton from '../components/IconButton';
import { IconType } from 'react-icons';

const Places = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen ] = React.useState(false);

  const [selectedPlace, setSelectedPlace] = useState<Place>(null);

  const openDeleteModal = (place: Place) => {
    setIsDeleteModalOpen(true);
    setSelectedPlace(place);
  };

  const { partner } = useAppSelector(state => state.auth_reducer);
  const { places } = useAppSelector(state => state.partner_places_reducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPartnerPlaces(partner.id));
  }, [dispatch, partner.id]);
  const handleCreatePlaceDeletionRequest = async () => {
    try{
      await dispatch(
        createPlaceRequest({
          location: undefined,
          policy: undefined,
          code: undefined,
          place_id: selectedPlace.id,
          requested_by_id: partner.id,
          request_type: 'deletion'
        })
      ).then(unwrapResult)

      dispatch(
        showNotification({
          type: 'success',
          message: 'Forespørsel sendt'
        })
      )
    }catch(error){
      dispatch(
        showNotification({
          type: 'error',
          message: error.message
        })
      )
    }
  };

  const [location, setLocation] = useState('');
  const [policy, setPolicy] = useState('');
  const [code, setCode] = useState('');

  const handleCreateAccept = async () => {
    try{
      await dispatch(
        createPlaceRequest({
          location: location,
          policy: policy,
          code: code,
          place_id: undefined,
          requested_by_id: partner.id,
          request_type: 'creation'
        })
      )

      dispatch(
        showNotification({
          type: 'success',
          message: 'Forespørsel sendt'
        })
      )

      setIsAddModalOpen(false);

    }catch(error){
      dispatch(
        showNotification({
          type: 'error',
          message: error.message
        })
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">

        <Card
          title="Partner Kontrollerte Steder"
          headerAction={
            <Button onClick={() => setIsAddModalOpen(true)} variant='primary' size='sm'>
                <Plus className="w-4 h-4 mr-2" />
                Opprett nytt sted
              </Button>
          }
        >
        <div className="relative w-full md:w-96 mb-4">
              <input
                type="text"
                placeholder="Søk etter steder"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <DataTable 
        hoverable
        itemsPerPage={8}
          columns={[
            {
              title: 'Name',
              key: 'location',
            },
            {
              title: 'Code',
              key: 'code',
            },
            {
              title: 'Policy',
              key: 'policy',
            },
          ]}

          data={places}

          actions={
            (row: Place) => (
              <div className="flex space-x-2">
                <IconButton 
                onClick={() => openDeleteModal(row)}
                icon={Trash as IconType}
                />
              </div>
            )
          }
        />

        <DangerModal 
          title="Slett forespørsel"
          content='Ønsker du virkelig å fjerne forespørselen?'
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onAccept={() => setIsDeleteModalOpen(false)}
          onCancel={() => setIsDeleteModalOpen(false)}
        />

        <Modal title='Forespørsel' isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <Input placeholder='Name' helperText='Enter place name' value={location} onChange={(e) => setLocation(e.target.value)}/>
          <Input placeholder='Code' helperText='Enter place code' value={code} onChange={(e) => setCode(e.target.value)} />
          <TextArea placeholder='Policy' helperText='Enter place policy' rows={6} value={policy} onChange={(e) => setPolicy(e.target.value)}/>

          <div className="flex justify-end mt-4">
            <CustomButton variant="outline" onClick={() => setIsAddModalOpen(false)} className='mr-2'>
              Cancel
            </CustomButton>
            <CustomButton color="blue" onClick={handleCreateAccept}>
              Save
            </CustomButton>
          </div>
        </Modal>

        <DangerModal 
          title="Slett sted"
          content='Ønsker du virkelig å fjerne stedet?'
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onAccept={handleCreatePlaceDeletionRequest}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
        </Card>
      </main>
    </div>
  );
};

export default Places;