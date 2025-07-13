import PublicPlaceDashboard from "../PlaceProfile";
import ApiInterface from "../shared/ApiInterface";

interface PlaceDashboardState extends ApiInterface{
    dashboards: Array<PublicPlaceDashboard>,
}

export default PlaceDashboardState