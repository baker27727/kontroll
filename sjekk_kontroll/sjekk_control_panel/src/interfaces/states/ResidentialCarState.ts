import ResidentialCar from "../ResidentialCar";
import ApiInterface from "../shared/ApiInterface";

interface ResidentialCarState extends ApiInterface{
    cars: Array<ResidentialCar>,
    currentCar: ResidentialCar
}

export default ResidentialCarState