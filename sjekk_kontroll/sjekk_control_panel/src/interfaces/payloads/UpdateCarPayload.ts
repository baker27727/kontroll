import Place from "../Place";

interface UpdateCarPayload{
    id: string,
    payload: {
        place: Place;
        rank: 'normal' | 'vip' | 'owner';
        plate_number: string;
        registration_type: string;
        start_date: string;
        end_date: string;
    }
}

export default UpdateCarPayload