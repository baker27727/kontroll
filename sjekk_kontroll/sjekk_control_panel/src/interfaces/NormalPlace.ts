import Partner from "./Partner";
import Place from "./Place";

interface NormalPlace {
    id: number
    partner: Partner
    location: string
    policy: string
    code: string
    place_type: string
    place: Place
}

export default NormalPlace