import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ReportRepository from "../repositories/Report.js";

export const generateReport = asyncWrapper(
    async (req, res) => {
        const { start_date, end_date, report_title } = req.body
        console.log(start_date, end_date);
        const report = await ReportRepository.generateReport({
            start_date,
            end_date,
            report_title
        })

        res.status(OK).json(report)
    }
)

export const getReports = asyncWrapper(
    async (req, res) => {
        const reports = await ReportRepository.getReports()
        res.status(OK).json(reports)
    }
)

export const deleteReport = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const report = await ReportRepository.deleteReport(id)
        res.status(OK).json(report)
    }
)

export const getTotalRevenue = asyncWrapper(
    async (req, res) => {
        const total_income = await ReportRepository.getTotalRevenue()
        res.status(OK).json(total_income)
    }
)