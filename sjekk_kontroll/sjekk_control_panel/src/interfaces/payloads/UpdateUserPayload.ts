interface UpdateUserPayload{
    id: number,
    payload: {
        pnid: string
        name: string
        password: string
    }
}

export default UpdateUserPayload