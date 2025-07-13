interface UpdatePlacePayload{
    id: number,
    payload: {
        location: string
        code: string
        policy: string,
        partner_id: string
    }
}

export default UpdatePlacePayload