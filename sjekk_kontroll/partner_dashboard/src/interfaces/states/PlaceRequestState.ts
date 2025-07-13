import ApiInterface from "../ApiInterface"
import PlaceRequest from '../PlaceRequest'

interface PlaceRequestState extends ApiInterface{
    requests: PlaceRequest[]
}

export default PlaceRequestState