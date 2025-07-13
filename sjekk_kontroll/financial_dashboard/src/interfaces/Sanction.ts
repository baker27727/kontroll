import Invoice from "./Invoice"
import Payment from "./Payment"
import Rule from "./Rule"
import SanctionFile from "./SanctionFile"

interface Sanction {
    id: number
    due_date: string
    employee_pnid: string
    status: 'paid' | 'not_paid' | 'sent_to_debt_collect'
    deleted_at: string | null
    payment: Payment | null
    invoice: Invoice | null
    kid_number: string
    control_number: string
    total_charge: string

    sanction_rules: Rule[]

    sanction_files: SanctionFile[]
}

export default Sanction