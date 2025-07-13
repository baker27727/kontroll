interface PlaceRequest {
    id: number
    location: string | undefined
    policy: string | undefined
    code: string | undefined
    place_id: number | undefined
    request_type: 'creation' | 'deletion'
}

export default PlaceRequest