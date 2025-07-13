import User from "../User"
import PayloadInterface from "./Payload"

interface GetUsersPayload extends PayloadInterface{
    users: User[]
}

export default GetUsersPayload