import ApiInterface from "../ApiInterface";
import FinanceReport from "../Report";

interface ReportState extends ApiInterface {
    reports: FinanceReport[],
    total_revenue: number
}

export default ReportState