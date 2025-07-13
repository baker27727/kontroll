interface CreatePlaceRequestPayload {
    request_type: 'creation' | 'deletion'; 
    location: string | undefined
    policy: string | undefined
    code: string | undefined
    place_id: number | undefined
    requested_by_id: number
}

export default CreatePlaceRequestPayload