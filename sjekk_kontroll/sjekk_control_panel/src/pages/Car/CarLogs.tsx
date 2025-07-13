import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/Card';
import { DataTable } from '../../components/DataTable';
import { getAllCarLogs } from '../../redux/features/CarLogSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Filter, Trash2 } from 'lucide-react';
import { IconType } from 'react-icons';

export default function CarLogs() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCarLogs())
}, [dispatch]);

    const { logs, loading } = useAppSelector(state => state.carLogs)
    console.log(logs);
    

  return (
    <div className="mx-auto min-h-screen">
      
        <Card
            title='Car Logs'
        >
            {/* Search and Filters */}
            <DataTable 
                showColumnSelector
                hoverable
                loading={loading}
                itemsPerPage={8}
                striped
                emptyMessage='No logs found'
                bulkActions={[
                    {label: t('Delete'), icon: Trash2 as IconType, onClick: () => {}},
                    {label: t('Filter'), icon: Filter as IconType, onClick: () => {}}
                ]}
                columns={[
                    {id: 'plate_number', title: t('Plate Number'), key: 'plate_number', sortable: true},
                    {id: 'registered_by', title: t('Registered By'), key: 'registered_by', sortable: true},
                    {id: 'place_details', title: t('Place Details'), key: 'place_details', sortable: true, render(_, row) {
                        return <div className='flex flex-col'>
                            <p>{row.place_location}</p>
                            <p>{row.place_code}</p>
                        </div>;
                    },},
                    {id: 'car_data', title: t('Car Data'), key: 'car_data', sortable: true, render(_, row) {
                        return <div className='flex flex-col'>
                            <p>{row.car_model}</p>
                            <p>{row.car_type}</p>
                            <p>{row.car_description}</p>
                            <p>{row.car_color}</p>
                        </div>;
                    },},
                    {id: 'start_date', title: t('Registration Date'), key: 'start_date', sortable: true},
                    {id: 'end_date', title: t('Expiration Date'), key: 'end_date', sortable: true},
                ]}

                data={logs}
            />
        </Card>
    </div>
  );
}
