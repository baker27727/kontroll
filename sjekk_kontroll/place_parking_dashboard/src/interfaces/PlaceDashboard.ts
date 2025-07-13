import Place from "./Place"

interface PlaceDashboard{
    id: number
    place: Place
    place_name: string
    place_type: string
    access_username: string
    access_code: string
    created_at: string
    updated_at: string | null
    free_parking_hours: number
}

export default PlaceDashboard