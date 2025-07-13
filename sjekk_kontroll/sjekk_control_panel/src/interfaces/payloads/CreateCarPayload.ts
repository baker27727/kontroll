
interface CreateUserPayload{
    plate_number: string;
    parking_type: 'guest' | 'reserved';
    subscription_plan_days: number;
    residential_quarter_id: number;
}

export default CreateUserPayload