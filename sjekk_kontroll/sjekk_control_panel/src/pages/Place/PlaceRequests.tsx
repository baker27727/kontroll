// src/PlaceRequestsPage.tsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Search, Trash2  } from 'lucide-react';
import { DangerModal } from '../../components/DangerModal';
import { ConfirmationModal } from '../../components/ConfirmationDialog';
import { DataTable } from '../../components/DataTable';
import { Card } from '../../components/Card';
import IconButton from '../../components/IconButton';
import { IconType } from 'react-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { approvePlaceRequest, deletePlaceRequest, getAllPlaceRequests } from '../../redux/features/PlaceRequestSlice';
import PlaceRequest from '../../interfaces/PlaceRequest';
import { showNotification } from '../../redux/features/notification_store';


const PlaceRequestsPage: React.FC = () => {
  const [t] = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<PlaceRequest | null>(null);
  const dispatch = useAppDispatch();
  const { loading, requests } = useAppSelector(state => state.place_request_state);
  

  useEffect(() => {
    dispatch(getAllPlaceRequests());
  }, [dispatch]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isAcceptModalOpen, setIsAcceptModalOpen] = React.useState(false)

  const openDeleteModal = (request: PlaceRequest) => {
    setSelectedRequest(request)
    setIsDeleteModalOpen(true)
  }

  const openAcceptModal = (request: PlaceRequest) => {
    setSelectedRequest(request)
    setIsAcceptModalOpen(true)
  }



  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRequestApproval = async () => {
    try {
      await dispatch(
        approvePlaceRequest(selectedRequest.id)
      );

      dispatch(
        showNotification({
          type: 'success',
          message: t('requestApproved')
        })
      )

      setIsAcceptModalOpen(false)
      dispatch(getAllPlaceRequests())
    } catch (error) {
      dispatch(
        showNotification({
          type: 'error',
          message: error
        })
      )
    }
  };

  const handleRequestDeletion = async () => {
    try {
      await dispatch(
        deletePlaceRequest(selectedRequest.id)
      );

      dispatch(
        showNotification({
          type: 'success',
          message: t('requestDeleted')
        })
      )

      setIsDeleteModalOpen(false)
      dispatch(getAllPlaceRequests())
      
    } catch (error) {
      dispatch(
        showNotification({
          type: 'error',
          message: error
        })
      )
    }
  };

  return (
    <div className="container mx-auto">      

      <Card
        title='Place Requests'
        headerAction={
          <div className='flex space-x-2'>
            <div className="relative">
          <input
            type="text"
            placeholder={t('searchRequests')}
            className="pl-8 pr-4 w-96 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-2 top-1.5 text-gray-400" size={20} />
        </div>
          </div>
        }
      >
      <DataTable 
      loading={loading}
      hoverable
      itemsPerPage={8}
      showColumnSelector 
        columns={[
          {
            id: 'request_type',
            title: 'Request Type',
            key: 'request_type',
            sortable: true,
          },
          {
            id: 'requested_by',
            title: 'Requested By',
            key: ['requested_by', 'name'],
            sortable: true,
            show: true,
          },
          { id: 'location', title: t('Name'), key: 'location', sortable: true, render(_, row) {
            return <div className='flex items-center space-x-2'>{row.location ?? 'N/A'}</div>;
          }, },
          { id: 'code', title: t('Code'), key: 'code', sortable: true, render(_, row) {
            return <div className='flex items-center space-x-2'>{row.code ?? 'N/A'}</div>;
          }},
          { id: 'policy', title: t('Policy'), key: 'policy', sortable: true, render(_, row) {
            return <div className='flex items-center space-x-2'>{row.policy ?? 'N/A'}</div>;
          }},
        ]}

        actions={(row: PlaceRequest) => (
          <div className="flex space-x-2">
            <IconButton icon={Check as IconType} onClick={() => openAcceptModal(row)} color='green'/>
            <IconButton icon={Trash2 as IconType} onClick={() => openDeleteModal(row)}/>
          </div>
        )}

        data={requests}
      />
      </Card>

      <ConfirmationModal 
        title='Accept Request'
        content='Are you sure you want to accept this request?'
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        onAccept={handleRequestApproval}
        onCancel={() => setIsAcceptModalOpen(false)}
      />

<DangerModal 
        title='Reject Request'
        content={`Are you sure you want to reject request "${selectedRequest?.location}"?`}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onAccept={handleRequestDeletion}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default PlaceRequestsPage;