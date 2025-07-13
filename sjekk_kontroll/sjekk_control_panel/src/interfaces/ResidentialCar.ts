interface RegisteredCar {
    id: number
    plate_number: string
    car_model: string
    car_type: string
    car_description: string
    car_color: string
    manufacture_year: string
}


interface Apartment {
    id: number
    owner_name: string
    apartment_number: string
    email: string
    username: string
    password: string
    created_at: string
    residential_quarter_id: number
}
interface ResidentialCar {
    id: number
    parking_type: 'reserved' | 'guest'
    registration_date: string
    expire_date: string
    subscription_plan_days: number
    
    registered_car: RegisteredCar

    apartment?: Apartment
}

export default ResidentialCar