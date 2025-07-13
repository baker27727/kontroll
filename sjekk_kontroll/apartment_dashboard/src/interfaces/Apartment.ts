import ResidentialQuarter from "./ResidentialQuarter"

interface Apartment {
    id: number
    owner_name: string
    apartment_number: string
    email: string
    username: string
    password: string
    created_at: string
    residential_quarter_id: number
    residential_quarter: ResidentialQuarter
}

export default Apartment