import Place from "./Place"
import NotificationSubscription from "./PushManagerSubscription"

interface ResidentialQuarter {
    id: number
    location: string
    policy: string
    code: string
    place_type: string
    place: Place,

    residential_dashboard: {
        id: number
        apartment_registration_qrcode: string
        apartment_registration_qrcode_link: string
        notification_subscriptions: NotificationSubscription[]
    }
}

export default ResidentialQuarter