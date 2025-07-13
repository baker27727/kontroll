import ApiInterface from "../ApiInterface"
import NormalPlace from "../NormalPlace"

interface NormalPlaceState extends ApiInterface{
    normal_places: Array<NormalPlace>
}

export default NormalPlaceState