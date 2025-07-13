interface Payment {
    id: number
    client_name: string
    plate_number: string
    charged_at: string
    paid_at: string
    paid_amount: string
    control_number: string
}

export default Payment