import Violation from "../Violation";
import ApiInterface from "../shared/ApiInterface";

interface ViolationState extends ApiInterface{
    violations: Array<Violation>
    currentViolation: Violation | null
}

export default ViolationState