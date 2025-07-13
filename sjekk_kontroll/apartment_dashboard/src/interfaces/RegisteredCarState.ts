import ApiInterface from "./ApiInterface"
import ResidentialCar from "./ResidentialCar"

interface RegisteredCarState extends ApiInterface{
    residential_cars: Array<ResidentialCar>
}

export default RegisteredCarState