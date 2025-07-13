import ApiInterface from "../ApiInterface"
import Car from "../Car"

interface DashboardState extends ApiInterface{
    registered_cars: Array<Car>
}

export default DashboardState