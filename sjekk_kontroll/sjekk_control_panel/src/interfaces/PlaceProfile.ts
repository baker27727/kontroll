import Place from "./Place"
import NotificationSubscription from "./PushManagerSubscription"

interface PublicPlaceDashboard{
    id: number
    place: Place
    place_name: string
    place_type: string
    access_username:string
    access_code: string
    free_parking_hours: number,
    created_at: string,
    updated_at: string | null
    notification_subscriptions: NotificationSubscription[]
}

export default PublicPlaceDashboard