import Violation from "../Violation"
import PayloadInterface from "./Payload"

interface GetViolationsPayload extends PayloadInterface{
    violations: Violation[]
}

export default GetViolationsPayload