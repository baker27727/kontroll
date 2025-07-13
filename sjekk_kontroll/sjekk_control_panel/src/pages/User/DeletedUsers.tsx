import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getAllDeletedUsers } from '../../redux/features/UserSlice';
import { Card } from '../../components/Card';
import { DataTable } from '../../components/DataTable';


const DeletedUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.UserReducer);
  const { t } = useTranslation(); // Initialize useTranslation hook

  useEffect(() => {
    dispatch(getAllDeletedUsers());
  }, [dispatch]);



  return (
    <>

    <Card title={t('deleted_users')}>
      <DataTable 
      hoverable
        columns={[
          {id: 'pnid', title: t('Pnid'), key: 'pnid', sortable: true},
          {id: 'name', title: t('name'), key: 'name', sortable: true},
          {id: 'deleted_at', title: t('deleted_at'), key: 'deleted_at', sortable: true},
        ]}

        data={state.deleted_users}
      />
    </Card>
    </>
  );
};

export default DeletedUsers;
