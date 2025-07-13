import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { getPublicNotification } from "../../redux/features/notification_management_store"
import { useParams } from "react-router-dom"
import { DataTable } from "../../components/DataTable"
import { Card } from "../../components/Card"

const PublicPlaceNotifications = () => {
    const dispatch = useAppDispatch()
    const { current_public_dashboard_notifications } = useAppSelector(state => state.notification_management_store)
    const {id} = useParams()
    useEffect(() => {
        dispatch(getPublicNotification(+id))
    }, [dispatch, id])
    return (
        <>
            <Card>
                <DataTable 
                hoverable
                data={current_public_dashboard_notifications}
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

export default PublicPlaceNotifications