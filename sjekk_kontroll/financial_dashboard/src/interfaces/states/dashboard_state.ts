import ApiInterface from "../ApiInterface";

interface DashboardState extends ApiInterface {
    total_sanctions: number
    total_unpaid_sanctions: number
    total_paid_sanctions: number
    total_deleted_sanctions: number,

    paid_sanctions_chart_data: unknown[],
    not_paid_sanctions_chart_data: unknown[],
}

export default DashboardState