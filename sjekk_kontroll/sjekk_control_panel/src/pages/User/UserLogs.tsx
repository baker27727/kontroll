import { useTranslation } from 'react-i18next';
import { DataTable } from '../../components/DataTable';
import { Card } from '../../components/Card';
import { Trash2 } from 'lucide-react';
import { IconType } from 'react-icons';

// Dummy data for UsersLogs
const dummyLogs = [
  { id: 1, userId: 'U001', action: 'Login', status: 'Success', timestamp: '2023-06-01T08:30:00Z', details: 'User logged in from IP 192.168.1.1' },
  { id: 2, userId: 'U002', action: 'Password Change', status: 'Success', timestamp: '2023-06-01T09:15:00Z', details: 'User changed their password' },
  { id: 3, userId: 'U003', action: 'Login', status: 'Failed', timestamp: '2023-06-01T10:00:00Z', details: 'Invalid password attempt from IP 192.168.1.2' },
  { id: 4, userId: 'U001', action: 'Logout', status: 'Success', timestamp: '2023-06-01T17:00:00Z', details: 'User logged out' },
  { id: 5, userId: 'U004', action: 'Account Creation', status: 'Success', timestamp: '2023-06-02T11:30:00Z', details: 'New user account created' },
  { id: 6, userId: 'U002', action: 'Profile Update', status: 'Success', timestamp: '2023-06-02T14:45:00Z', details: 'User updated their profile information' },
  { id: 7, userId: 'U005', action: 'Login', status: 'Success', timestamp: '2023-06-03T09:00:00Z', details: 'User logged in from mobile device' },
  { id: 8, userId: 'U003', action: 'Password Reset', status: 'Success', timestamp: '2023-06-03T13:20:00Z', details: 'User requested password reset' },
  { id: 9, userId: 'U001', action: 'Login', status: 'Success', timestamp: '2023-06-04T08:45:00Z', details: 'User logged in from new device' },
  { id: 10, userId: 'U004', action: 'Account Deletion', status: 'Success', timestamp: '2023-06-04T16:00:00Z', details: 'User account deleted' },
];

export default function UsersLogs() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto">
      <Card
        title='User Logs'
      >
      <DataTable 
            showColumnSelector
            striped
            hoverable
            itemsPerPage={8}
            bulkActions={[
              { label: t('Delete'), icon: Trash2 as IconType, onClick: () => {} },
            ]}
            columns={[
              { id: 'id', title: t('User ID'), key: 'userId', sortable: true },
              { id: 'action', title: t('Action'), key: 'action', sortable: true },
              { id: 'status', title: t('Status'), key: 'status', sortable: true },
              { id: 'details', title: t('Details'), key: 'details', sortable: true },
              { id: 'timestamp', title: t('Timestamp'), key: 'timestamp', sortable: true },
            ]}

            data={dummyLogs}
        />
      </Card>
    </div>
  );
}