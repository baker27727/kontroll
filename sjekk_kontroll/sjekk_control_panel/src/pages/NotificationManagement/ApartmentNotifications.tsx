import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { useEffect } from "react"
import { getApartmentNotification } from "../../redux/features/notification_management_store"
import { Card } from "../../components/Card"
import { DataTable } from "../../components/DataTable"

const ApartmentNotifications = () => {
  const dispatch = useAppDispatch()
  const {id} = useParams()
  const { current_apartment_dashboard_notifications } = useAppSelector(state => state.notification_management_store)
  useEffect(() => {
    dispatch(getApartmentNotification(+id))
  }, [dispatch, id])
  return (
    <>
      <Card>
        <DataTable 
          data={current_apartment_dashboard_notifications}
          columns={[
            { id: 'id', sortable: true, key: 'id', title: 'id'},
                    { id: 'title', sortable: true, key: 'title', title: 'title'},
                    { id: 'body', sortable: true, key: 'body', title: 'body'},
                    { id: 'icon', sortable: true, key: 'icon', title: 'icon', render(_, row) {
                        if(!row.icon) return ""
                        return (
                            <img src={row.icon} alt={row.title}/>

                    )}},
                    { id: 'image', sortable: true, key: 'image', title: 'image', render(_, row) {
                        if(!row.image) return ""
                        return (
                            <img src={row.image} alt={row.title}/>
                        )
                    }},
          ]}
        />
      </Card>
    </>
  )
}

export default ApartmentNotifications