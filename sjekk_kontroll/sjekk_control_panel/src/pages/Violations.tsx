// src/ViolationsPage.tsx
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Trash } from 'lucide-react';
import Violation from '../interfaces/Violation';
import { useNavigate } from 'react-router-dom';
import { DangerModal } from '../components/DangerModal';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { deleteViolation, getAllViolations, setCurrentViolation } from '../redux/features/ViolationSlice';
import { showNotification } from '../redux/features/notification_store';
import reload from '../utils/page_reloader';
import { unwrapResult } from '@reduxjs/toolkit';
import { DataTable } from '../components/DataTable';
import { Card } from '../components/Card';
import IconButton from '../components/IconButton';
import { IconType } from 'react-icons';


const ViolationsPage: React.FC = () => {


  const [t] = useTranslation()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [violation, setViolation] = React.useState<Violation | null>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllViolations());
  }, [dispatch]);

  const {violations} = useAppSelector(state => state.ViolationReducer)

  console.log(violations);
  

  const openDeleteModal = (violation: Violation) => {
    setIsDeleteModalOpen(true)
    setViolation(violation)
  }


  const navigate = useNavigate()

  const navigateToViewViolation = async (record: Violation) => {
    dispatch(setCurrentViolation(record))
    navigate(`/violations/${record.id}`)
  }

  const handleDeleteAccept = async () => {
    await dispatch(
      deleteViolation(violation?.id)
    ).then(unwrapResult)
    .then(() => {
      dispatch(
        showNotification({
          type: 'success',
          message: t('deleted_successfully'),
          description: t('deleted_successfully'),
        })
      )
      setIsDeleteModalOpen(false)
      reload()
    }).catch((error: Error) => {
      
      dispatch(
        showNotification({
          type: 'error',
          message: t('deleted_error'),
          description: error.message,
        })
      )
      setIsDeleteModalOpen(false)
    })
  }


  return (
    <>
      <Card
        title='Violations'
      >
      <DataTable 
        hoverable
        itemsPerPage={8}
        showColumnSelector
          columns={[
            { id: 'ticket_number', title: t('No.'), key: ['ticket_info', 'ticket_number'], sortable: true },
            { id: 'id', title: t('ID'), key: 'id', sortable: true },
            { id: 'created_by', title: t('created_by'), key: ['created_by', 'name'], sortable: true },
            { id: 'location', title: t('location'), key: ['place', 'location'], sortable: true },
            { id: 'ticket_comment', title: t('ticket_comment'), key: 'ticket_comment', sortable: true },
            { id: 'system_comment', title: t('system_comment'), key: 'system_comment', sortable: true },
            { id: 'created_at', title: t('created_at'), key: 'created_at', sortable: true },
          ]}

          actions={
            (row: Violation) => (
              <div className='flex gap-2'>
                <IconButton 
                  onClick={() => navigateToViewViolation(row)}
                  size='sm'
                  icon={Eye as IconType}
                  color='blue'
                />
                <IconButton 
                  onClick={() => openDeleteModal(row)}
                  size='sm'
                  icon={Trash as IconType}
                />
              </div>
            )
          }

          data={violations}
        />

      <DangerModal 
        title='Delete violation'
        content={`Are you sure you want to delete this VL "${violation?.ticket_info.ticket_number}"?`}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onAccept={handleDeleteAccept}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
      </Card>
    </>
  );
};

export default ViolationsPage;
