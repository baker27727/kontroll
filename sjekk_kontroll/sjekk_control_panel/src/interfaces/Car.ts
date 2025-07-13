import Place from "./Place";

// Car.ts
interface Car {
    id: number
    place: Place;
    rank: 'normal' | 'vip' | 'owner'
    car_model: string
    car_type: string
    car_description: string
    plate_number: string
    registration_type: string
    start_date: string
    end_date: string
    created_at: string
}
  
  export default Car;
  