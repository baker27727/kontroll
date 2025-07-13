interface CreateRulePayload{
    name:string,
    charge:number,
    policy_time:number,
    extras: {
        meter_receipt_number: boolean,
        meter_number: boolean,
        expiry_date: boolean,
        paid_amount: boolean
    },
}

export default CreateRulePayload