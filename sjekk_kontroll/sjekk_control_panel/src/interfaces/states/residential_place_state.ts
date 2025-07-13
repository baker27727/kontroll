import ApiInterface from "../ApiInterface"
import ResidentialQuarter from "../ResidentialQuarter"

interface ResidentialPlaceState extends ApiInterface{
    residential_places: Array<ResidentialQuarter>
}

export default ResidentialPlaceState