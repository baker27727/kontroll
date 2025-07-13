import Place from "./Place"

interface ClientInfo{
    _id: string
    place: Place
    name: string
    type: string
    access_link: string
    access_code: string
    free_parking_hours: number
    created_at: string
    updated_at: string
}

export default ClientInfo