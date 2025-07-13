import { useEffect } from 'react'
import { DataTable } from '../../components/DataTable'
import { Card } from '../../components/Card'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getApartments } from '../../redux/stores/apartments_store'
import { useTranslation } from 'react-i18next'

export default function Apartments() {
  const { t } = useTranslation()
  const { apartments, loading } = useAppSelector(state => state.apartments_store)
  const { dashboard } = useAppSelector(state => state.auth_store)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      getApartments(dashboard.residential_quarter.id)
    )
  }, [dispatch, dashboard.residential_quarter.id])

  return (
    <>
      <Card
        title={t('apartments.card_title')}
      >
      <DataTable 
      hoverable
        data={apartments}
        loading={loading}
        columns={[
          { key: 'apartment_number', title: t('apartments.table.columns.apartment_number'), sortable: true },
          { key: 'owner_name', title: t('apartments.table.columns.owner_name'), sortable: true },
          { key: 'email', title: t('apartments.table.columns.email'), sortable: true },
          { key: 'username', title: t('apartments.table.columns.username'), sortable: true },
          { key: 'created_at', title: t('apartments.table.columns.created_at'), sortable: true },
        ]}
      />
      </Card>
    </>
  )
}