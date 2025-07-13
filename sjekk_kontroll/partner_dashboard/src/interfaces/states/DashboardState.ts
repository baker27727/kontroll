import ApiInterface from "../ApiInterface"
import Car from "../Car"

interface DashboardState extends ApiInterface{
    registered_cars: Array<Car>,
    statistics: {
        total_places: {
            value: number,
            loading: boolean
        },
        total_registered_cars: {
            value: number,
            loading: boolean
        },

        total_parking_time: {
            value: number,
            loading: boolean
        },

        average_parking_time: {
            value: number,
            loading: boolean
        }
    }
}

export default DashboardState