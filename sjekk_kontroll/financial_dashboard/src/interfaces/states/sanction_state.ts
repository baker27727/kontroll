import ApiInterface from "../ApiInterface"
import Sanction from "../Sanction"

interface SanctionState extends ApiInterface{
    sanctions: Sanction[]
    deleted_sanctions: Sanction[]
    selected_sanction: Sanction | null
}

export default SanctionState