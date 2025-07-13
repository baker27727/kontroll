interface RegisteredCar {
    id: number
    plate_number: string
    car_model?: string
    car_type?: string
    car_description?: string
    car_color?: string
    manufacture_year?: string

    registration_date: string
    expire_date: string
}

export default RegisteredCar