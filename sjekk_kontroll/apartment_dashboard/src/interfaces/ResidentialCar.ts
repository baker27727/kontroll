import RegisteredCar from "./RegisteredCar"

interface ResidentialCar {
    id: number
    parking_type: 'reserved' | 'guest'
    subscription_plan_days: number
    
    registered_car: RegisteredCar
}

export default ResidentialCar