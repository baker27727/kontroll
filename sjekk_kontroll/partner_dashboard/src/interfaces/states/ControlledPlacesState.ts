import ApiInterface from "../ApiInterface"
import Place from "../Place"

interface ControlledPlacesState extends ApiInterface{
    places: Array<Place>
}

export default ControlledPlacesState