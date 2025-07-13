import Partner from "./Partner"

// Place.ts
interface Place {
    id: number
    location: string
    policy: string
    code: string
    partner: Partner
    created_at: string
}

export default Place
