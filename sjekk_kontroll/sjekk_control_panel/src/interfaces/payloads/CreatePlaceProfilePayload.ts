interface CreatePlaceProfilePayload{
    id: number,
    data: {
        place_name: string
        place_type: string
        access_username: string
        access_code: string
        free_parking_hours: number
    }
}

export default CreatePlaceProfilePayload