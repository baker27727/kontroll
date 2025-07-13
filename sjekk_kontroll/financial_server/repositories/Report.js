import moment from "moment";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";
import TimeRepository from "./Time.js";
import ReportHelperRepository from "./ReportHelper.js";
import fs from "fs"

class ReportRepository {
    static prisma = PrismaClientService.instance

    static getReports = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const reports = await this.prisma.financialReport.findMany()
                resolve(reports)
            }
        )
    )

    static getReportById = async (id) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const report = await this.prisma.financialReport.findUnique({
                    where: {
                        id: +id
                    }
                })
                resolve(report)
            }
        )
    )

    static generateReport = async ({ start_date, end_date, report_title }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const sanctions = await this.prisma.sanction.findMany({
                    include: {
                        invoice: true,
                        sanction_files: true
                    }
                })
                const filtered_sanctions = sanctions.filter((sanction) => {
                    return moment(sanction.created_at, TimeRepository.full_date_format).isBetween(
                        moment(start_date, TimeRepository.date_format),
                        moment(end_date, TimeRepository.date_format)
                    )
                })

                const path = await ReportHelperRepository.generateReport({
                    sanctions: filtered_sanctions,
                    report_title
                })


                console.log(filtered_sanctions);

                const report = await this.prisma.financialReport.create({
                    data: {
                        report_file: path,
                        start_date,
                        end_date,
                        report_file_size: "0",
                        tax_deducted: 0,
                        total_income: 0,
                        report_title: report_title,
                        created_at: TimeRepository.getCurrentDateTime()
                    }
                })
                resolve(report)
            }
        )
    )

    static deleteReport = async (id) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const report = await this.prisma.financialReport.update({
                    where: {
                        id: +id
                    },
                    data: {
                        deleted_at: TimeRepository.getCurrentDateTime()
                    }
                })
                resolve(report)
            }
        )
    )

    static getTotalRevenue = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const total_income = await this.prisma.payment.aggregate({
                    _sum: {
                        paid_amount: true
                    }
                })
                resolve(total_income._sum.paid_amount)
            }
        )
    )
}

export default ReportRepository