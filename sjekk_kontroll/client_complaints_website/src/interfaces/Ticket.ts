import CarImage from "./CarImage";
import Place from "./Place";
import PlateInfo from "./PlateInfo";
import Rule from "./Rule";
import TicketInfo from "./TicketInfo";
import User from "./User";

interface Ticket{
    id: number,
    created_by: User,
    ticket_comment:string,

    images: Array<CarImage>,
    place:Place,
    rules: Array<Rule>,
    plate_info: PlateInfo,
    is_car_registered: boolean,
    registered_car_info:Map<string,string | undefined>,
    created_at: string,

    ticket_info: TicketInfo
}

export default Ticket