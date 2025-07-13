import CarLog from "../CarLog";
import ApiInterface from "../shared/ApiInterface";

interface CarLogState extends ApiInterface{
    logs: Array<CarLog>
}

export default CarLogState