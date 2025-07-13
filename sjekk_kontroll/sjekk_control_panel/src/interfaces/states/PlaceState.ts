import Place from "../Place";
import ApiInterface from "../shared/ApiInterface";

interface PlaceState extends ApiInterface{
    places: Array<Place>,
    currentPlace: Place | null
}

export default PlaceState