import CarImage from "./CarImage";
import Place from "./Place";
import PlateInfo from "./PlateInfo";
import Rule from "./Rule";
import TicketInfo from "./TicketInfo";
import User from "./User";

interface Violation{
    id: number,
    created_by: User,
    ticket_comment:string,
    system_comment:string,

    images: Array<CarImage>,
    place:Place,
    rules: Array<Rule>,
    plate_info: PlateInfo,
    is_car_registered: boolean,
    registered_car_info: {
        plate_number: string,
        car_brand: string,
        car_model: string,
        manufacture_year: string,
        car_color: string,
        country_name: string
    },
    created_at: string,

    ticket_info: TicketInfo
}

export default Violation