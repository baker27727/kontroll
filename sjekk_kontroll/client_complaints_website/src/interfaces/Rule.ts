interface Rule{
    name:string,
    charge:number,
    policy_time:number
    extras_values: {
        meter_receipt_number: string,
        meter_number: string,
        expiry_date: string,
        paid_amount: string
    },
    extras: {
        meter_receipt_number: boolean,
        meter_number: boolean,
        expiry_date: boolean,
        paid_amount: boolean
    },
}

export default Rule