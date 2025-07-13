import Report from "../Report";
import ApiInterface from "../shared/ApiInterface";

interface ReportState extends ApiInterface{
    reports: Array<Report>
}

export default ReportState