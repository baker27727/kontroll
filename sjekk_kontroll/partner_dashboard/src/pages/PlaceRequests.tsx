import React, { useEffect } from 'react';
import { Trash } from 'lucide-react';
import { DangerModal } from '../components/DangerModal';
import { DataTable } from '../components/DataTable';
import IconButton from '../components/IconButton';
import { IconType } from 'react-icons';
import { Card } from '../components/Card';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { deletePlaceRequest, getAllPlaceRequests } from '../redux/features/place_request_reducer';
import PlaceRequest from '../interfaces/PlaceRequest';
import { showNotification } from '../redux/features/notification_store';

const Requests = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedRequest, setSelectedRequest] = React.useState<PlaceRequest>(null);

  const openDeleteModal = (request: PlaceRequest) => {
    setSelectedRequest(request);
    setIsDeleteModalOpen(true);
  };

  const dispatch = useAppDispatch();
  const { loading, requests } = useAppSelector(state => state.place_request_reducer);
  console.log(requests);
  

  const { partner } = useAppSelector(state => state.auth_reducer);

  useEffect(() => {
    dispatch(getAllPlaceRequests(partner.id));
  }, [dispatch, partner.id]);


  const handleRequestDeletion = async () => {
    try {
      await dispatch(
        deletePlaceRequest(selectedRequest.id)
      );
      dispatch(
        showNotification({
          type: 'success',
          message: 'Forespørsel slettet',
        })
      )

      dispatch(getAllPlaceRequests(partner.id));
    } catch (error) {
      dispatch(
        showNotification({
          type: 'error',
          message: 'Kunne ikke slette forespørsel',
        })
      )
    }
  };
  return (
    <div className="bg-gray-100">
      <main className="container mx-auto p-4">
        <Card
          title='Forespørsler'
        >
        <DataTable 
          data={requests}
          loading={loading}
          columns={[
            { title: 'Phone Number', key: ['requested_by', 'phone_number'], sortable: true },
            { title: 'Type', key: 'request_type', sortable: true },
            { title: 'Location', key: 'location', sortable: true },
            { title: 'Policy', key: 'policy', sortable: true },
            { title: 'Code', key: 'code', sortable: true },
          ]}

          actions={
            (request: PlaceRequest) => (
              <div className="flex space-x-2">
                <IconButton 
                onClick={() => openDeleteModal(request)}
                icon={Trash as IconType}
              />
              </div>
            )
          }
          hoverable
          itemsPerPage={8}
        />

        <DangerModal 
          title="Slett forespørsel"
          content='Ønsker du virkelig å fjerne forespørselen?'
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onAccept={handleRequestDeletion}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
        </Card>
      </main>
    </div>
  );
};

export default Requests;