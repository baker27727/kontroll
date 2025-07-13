interface Invoice {
    id: number
    status: 'collected' | 'pending'
    invoice_file: string
    created_at: string
}

export default Invoice