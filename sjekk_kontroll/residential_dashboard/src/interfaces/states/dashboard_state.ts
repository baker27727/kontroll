import ApiInterface from "../ApiInterface";

interface DashboardState extends ApiInterface {
    guest_cars_count: number
    reserved_cars_count: number
    total_cars_count: number
}

export default DashboardState