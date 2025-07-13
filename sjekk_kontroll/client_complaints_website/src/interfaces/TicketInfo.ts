interface TicketInfo {
    ticket_number: string
    ticket_image: string
    print_option: string
    payment_date: string | null
    barcode_image: string
    serial_number: string

    kid: number
}

export default TicketInfo