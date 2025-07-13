import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { Card } from '../../components/Card'
import IconButton from '../../components/IconButton'
import { FaTimes } from 'react-icons/fa'
import { DangerModal } from '../../components/DangerModal'
import { ConfirmationModal } from '../../components/ConfirmationDialog'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { acceptApartmentRequest, getApartmentRequests, rejectApartmentRequest } from '../../redux/stores/apartment_requests_store'
import { unwrapResult } from '@reduxjs/toolkit'
import { showNotification } from '../../redux/stores/notification_store'
import { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'

export default function ApartmentRequests() {
  const { t } = useTranslation()
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const {apartment_requests, loading} = useAppSelector(state => state.apartment_requests_store)
  const dispatch = useAppDispatch()

  const handleAccept = (request) => {
    setSelectedRequest(request)
    setIsAcceptModalOpen(true)
  }

  const handleReject = (request) => {
    setSelectedRequest(request)
    setIsRejectModalOpen(true)
  }

  const confirmAccept = () => {
    dispatch(
      acceptApartmentRequest(selectedRequest.id)
    ).then(unwrapResult)
    .then(() => {
      setSelectedRequest(null)
      dispatch(
        showNotification({
          message: t('apartment_requests.notifications.accept.success.message'),
          description: t('apartment_requests.notifications.accept.success.description'),
          type: 'success',
        })
      )

      dispatch(getApartmentRequests(dashboard?.id))
    }).catch((error) => {
      dispatch(
        showNotification({
          message: t('apartment_requests.notifications.accept.error.message'),
          description: error.message,
          type: 'error',
        })
      )
    })
    setIsAcceptModalOpen(false)
  }

  const confirmReject = () => {
    dispatch(
      rejectApartmentRequest(selectedRequest.id)
    ).then(unwrapResult)
    .then(() => {
      setSelectedRequest(null)
      dispatch(
        showNotification({
          message: t('apartment_requests.notifications.reject.success.message'),
          description: t('apartment_requests.notifications.reject.success.description'),
          type: 'success',
        })
      )
      dispatch(getApartmentRequests(dashboard?.residential_quarter.id))
    }).catch((error) => {
      dispatch(
        showNotification({
          message: t('apartment_requests.notifications.reject.error.message'),
          description: error.message,
          type: 'error',
        })
      )
    })
    setIsRejectModalOpen(false)
  }

  const { dashboard } = useAppSelector(state => state.auth_store)

  useEffect(() => {
    dispatch(getApartmentRequests(dashboard?.residential_quarter.id))
  }, [dispatch, dashboard?.residential_quarter.id])

  return (
    <div className="container mx-auto">
      <Card title={t('apartment_requests.card_title')}>
      <DataTable 
      emptyMessage={t('apartment_requests.table.empty_message')}
      loading={loading}
            data={apartment_requests}
            hoverable
            itemsPerPage={8}
            columns={[
              {title: t('apartment_requests.table.columns.owner_name'), key: 'owner_name', sortable: true},
              {title: t('apartment_requests.table.columns.apartment_number'), key: 'apartment_number', sortable: true},
              {title: t('apartment_requests.table.columns.email'), key: 'email', sortable: true},
              {title: t('apartment_requests.table.columns.username'), key: 'username', sortable: true},
              {title: t('apartment_requests.table.columns.created_at'), key: 'created_at', sortable: true},
            ]}

            actions={
              (request) => (
                <div className="flex space-x-2">
                  <IconButton onClick={() => handleAccept(request)} icon={Check as IconType} color='green' size='sm'/>
                  <IconButton onClick={() => handleReject(request)} icon={FaTimes as IconType} size='sm' />
                </div>
              )
            }
          />
      </Card>
      
      <ConfirmationModal 
        isOpen={isAcceptModalOpen}
        title={t('apartment_requests.accept_modal.title')}
        content={t('apartment_requests.accept_modal.content')}
        onAccept={confirmAccept}
        onCancel={() => setIsAcceptModalOpen(false)}
        onClose={() => setIsAcceptModalOpen(false)}
      />
     <DangerModal 
        isOpen={isRejectModalOpen}
        title={t('apartment_requests.reject_modal.title')}
        content={t('apartment_requests.reject_modal.content')}
        onAccept={confirmReject}
        onCancel={() => setIsRejectModalOpen(false)}
        onClose={() => setIsRejectModalOpen(false)}
     />
    </div>
  )
}