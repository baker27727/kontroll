import ApiInterface from "../ApiInterface"
import PlaceRequest from "../PlaceRequest"

interface ControlledPlacesState extends ApiInterface{
    requests: PlaceRequest[]
}

export default ControlledPlacesState