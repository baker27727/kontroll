import PartnerDashboard from "./PartnerDashboard"
import Place from "./Place"

interface Partner {
    id: number,
    name: string,
    phone_number: string
    created_at: string
    updated_at: string | null
    dashboard: PartnerDashboard
    owned_places: Array<Place>
}

export default Partner