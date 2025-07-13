// src/ApartmentRequestsPage.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X, Search} from 'lucide-react';
import { DataTable } from '../../components/DataTable';
import IconButton from '../../components/IconButton';
import { Card } from '../../components/Card';
import { IconType } from 'react-icons';

interface ApartmentRequest {
  id: string;
  name: string;
  code: string;
  policy: string;
  apartmentNumber: string;
  ownerName: string;
  email: string;
  phone: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

const ApartmentRequestsPage: React.FC = () => {
  const [t] = useTranslation();
  const [sortColumn,] = useState<keyof ApartmentRequest>('createdAt');
  const [sortDirection,] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState<ApartmentRequest[]>([
    {
      id: '1',
      name: 'Sunset Apartments',
      code: 'SA-001',
      policy: 'Standard residential',
      apartmentNumber: 'A101',
      ownerName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8901',
      createdAt: '2023-07-01T10:00:00Z',
      status: 'pending',
    },
    {
      id: '2',
      name: 'Ocean View Residences',
      code: 'OVR-002',
      policy: 'Premium residential',
      apartmentNumber: 'B205',
      ownerName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 987 654 3210',
      createdAt: '2023-06-30T14:30:00Z',
      status: 'pending',
    },
    // Add more dummy data as needed
  ]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected') => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  const filteredAndSortedRequests = requests
    .filter(request => 
      Object.values(request).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <>
      <Card
        title='Apartment Requests'
      >
      <div className="mb-2">
        <div className="relative">
          <input
            type="text"
            placeholder={t('searchRequests')}
            className="w-96 pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <DataTable 
      itemsPerPage={8}
        columns={[
          { id: 'name', title: t('name'), key: 'name', sortable: true },
          { id: 'code', title: t('code'), key: 'code', sortable: true },
          { id: 'policy', title: t('policy'), key: 'policy', sortable: true },
          { id: 'apartmentNumber', title: t('apartmentNumber'), key: 'apartmentNumber', sortable: true },
          { id: 'ownerName', title: t('ownerName'), key: 'ownerName', sortable: true },
        //   { title: t('email'), key: 'email' },
          { id: 'phone', title: t('phone'), key: 'phone', sortable: true },
          { id: 'createdAt', title: t('createdAt'), key: 'createdAt', sortable: true }
        ]}

        actions={(row: ApartmentRequest) => (
            <div className="flex space-x-2">
              <IconButton 
                onClick={() => handleStatusChange(row.id, 'approved')}
                icon={Check as IconType}
                color='green'
                size='sm'
              />
              <IconButton 
                onClick={() => handleStatusChange(row.id, 'rejected')}
                icon={X as IconType}
                size='sm'
              />
            </div>
        )}

        data={filteredAndSortedRequests}
        hoverable
      />
        </Card>      
    </>
  );
};

export default ApartmentRequestsPage;