import Place from "./Place"

interface Partner {
    id: number,
    name: string,
    email: string,
    city: string,
    postal_code: string,
    address: string,
    other_address: string,
    fax_number: string,
    phone_number: string
    created_at: string
    updated_at: string | null,
    owned_places: Array<Place>
}

export default Partner