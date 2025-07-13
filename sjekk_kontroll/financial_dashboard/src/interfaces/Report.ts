interface FinanceReport {
    id: number
    report_file: string
    start_date: string
    end_date: string
    total_income: number
    tax_deducted: number
  
    report_title: string
    report_file_size: string
    created_at: string
}

export default FinanceReport