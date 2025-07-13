import Car from "../Car";
import ApiInterface from "../shared/ApiInterface";

interface CarState extends ApiInterface{
    cars: Array<Car>,
    currentCar: Car
}

export default CarState