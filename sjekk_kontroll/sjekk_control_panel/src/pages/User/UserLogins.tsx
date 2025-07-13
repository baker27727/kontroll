import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable } from '../../components/DataTable';
import Select from '../../components/Select';
import DatePicker from 'react-datepicker';
import { Card } from '../../components/Card';

// Dummy data for UserLogins
const dummyLogins = [
  { id: 1, place_name: 'Main Office', login_time: '2023-06-01T08:30:00Z', logout_time: '2023-06-01T17:00:00Z', shift_id: 1 },
  { id: 2, place_name: 'Branch A', login_time: '2023-06-02T09:00:00Z', logout_time: '2023-06-02T18:00:00Z', shift_id: 2 },
  { id: 3, place_name: 'Branch B', login_time: '2023-06-03T08:45:00Z', logout_time: '2023-06-03T16:45:00Z', shift_id: 3 },
  { id: 4, place_name: 'Main Office', login_time: '2023-06-04T08:15:00Z', logout_time: '2023-06-04T16:30:00Z', shift_id: 4 },
  { id: 5, place_name: 'Branch C', login_time: '2023-06-05T09:30:00Z', logout_time: '2023-06-05T18:30:00Z', shift_id: 5 },
];

const dummyShifts = [
  { id: 1, start_date: '2023-06-01T08:00:00Z', end_date: '2023-06-01T17:00:00Z', pnid: 'PN001', total_completed_violations: 0, created_at: '2023-06-01T07:55:00Z', session_id: 'S001' },
  { id: 2, start_date: '2023-06-02T09:00:00Z', end_date: '2023-06-02T18:00:00Z', pnid: 'PN002', total_completed_violations: 1, created_at: '2023-06-02T08:55:00Z', session_id: 'S002' },
  { id: 3, start_date: '2023-06-03T08:45:00Z', end_date: '2023-06-03T16:45:00Z', pnid: 'PN003', total_completed_violations: 0, created_at: '2023-06-03T08:40:00Z', session_id: 'S003' },
  { id: 4, start_date: '2023-06-04T08:15:00Z', end_date: '2023-06-04T16:30:00Z', pnid: 'PN001', total_completed_violations: 2, created_at: '2023-06-04T08:10:00Z', session_id: 'S004' },
  { id: 5, start_date: '2023-06-05T09:30:00Z', end_date: '2023-06-05T18:30:00Z', pnid: 'PN004', total_completed_violations: 1, created_at: '2023-06-05T09:25:00Z', session_id: 'S005' },
];

export default function UserLogins() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlace, setFilterPlace] = useState('');
  const [sortConfig] = useState({ key: 'login_time', direction: 'desc' });
  const [filterDate, setFilterDate] = React.useState<Date | null>(null);

  const filteredAndSortedLogins = useMemo(() => {
    const result = dummyLogins.filter(login => 
      login.place_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterPlace ? login.place_name === filterPlace : true) &&
      (filterDate ? new Date(login.login_time).toDateString() === new Date(filterDate).toDateString() : true)
    );

    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [searchTerm, filterPlace, filterDate, sortConfig]);

//   const handleSort = (key) => {
//     setSortConfig(prevConfig => ({
//       key,
//       direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
//     }));
//   };

  const uniquePlaces = [...new Set(dummyLogins.map(login => login.place_name))];

  return (
    <div className="mx-auto">
      <Card title='User Logins'>
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder={t('Search places...')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <Select 
          onChange={setFilterPlace}
          options={uniquePlaces.map(place => ({ value: place, label: place }))}
        />
        <DatePicker showTimeSelect dateFormat={"dd.MM.yyyy HH:mm"} className='focus:outline-none cursor-pointer border border-gray-300 p-2 rounded' wrapperClassName='w-full ' placeholderText='Start Date' selected={filterDate} onChange={(date: Date | null) => setFilterDate(date)} />

        {(filterPlace || filterDate) && (
          <button
            onClick={() => {
              setFilterPlace('');
              setFilterDate(null);
            }}
            className="px-4 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {t('Clear Filters')}
          </button>
        )}
      </div>
      <DataTable 
            hoverable   
            itemsPerPage={8}
            columns={[
              { id: 'id', title: t('Place'), key: 'place_name' },
              { id: 'login_time', title: t('Login Time'), key: 'login_time' },
              { id: 'logout_time', title: t('Logout Time'), key: 'logout_time' },
              { id: 'shift_id', title: 'Shift Details', key: 'shift_id', render: (shift_id) => {
                const shift = dummyShifts.find(s => s.id === shift_id);

                return (
                    <div>
                        <p><strong>{t('Shift Start')}:</strong> {new Date(shift.start_date).toLocaleString()}</p>
                        <p><strong>{t('Shift End')}:</strong> {new Date(shift.end_date).toLocaleString()}</p>
                        <p><strong>{t('PNID')}:</strong> {shift.pnid}</p>
                        <p><strong>{t('Violations')}:</strong> {shift.total_completed_violations}</p>
                        <p><strong>{t('Session ID')}:</strong> {shift.session_id}</p>
                    </div>
                );
              }},
              { id: 'shift_id', title: t('Session ID'), key: 'shift_id', sortable: true, render(shift_id) {
                const shift = dummyShifts.find(s => s.id === shift_id);
                return (
                    <p>{shift.session_id}</p>
                );
              }},
            ]}

            data={filteredAndSortedLogins}
        />
      </Card>
    </div>
  );
}