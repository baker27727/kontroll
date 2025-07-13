import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import PaymentReportRepository from "../repositories/PaymentReportRepository.js"

export const getPaymentReports = asyncWrapper(
    async (req, res) => {
        const reports = await PaymentReportRepository.getPaymentReports()

        return res.status(OK).json(reports)
    }
)

export const generatePaymentReport = asyncWrapper(
    async (req, res) => {
        const { start_date, end_date, report_name } = req.body
        const report = await PaymentReportRepository.generatePaymentReport({
            start_date, end_date, report_name
        })

        return res.status(OK).json(report)
    }
)