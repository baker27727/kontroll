import puppeteer from "puppeteer"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import PrismaClientService from "../utils/prisma_client.js"
import { compiledPaymentReportTemplate } from "../config.js"
import CustomError from "../interfaces/custom_error_class.js"
import { INTERNAL_SERVER } from "../constants/status_codes.js"
import TimeRepository from "./Time.js"
import moment from "moment"
import Handlebars from 'handlebars'

class PaymentReportRepository {
    static prisma = PrismaClientService.instance
    static getPaymentReports = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve) => {
                const reports = await this.prisma.paymentReport.findMany({
                    include: {
                        metadata: true
                    }
                })
                return resolve(reports)
            }
        )
    )

    static async generatePaymentReport({
        start_date, end_date, report_name
    }) {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            const browser = await puppeteer.launch({
                headless: 'true',
                args:['--no-sandbox'],
                defaultViewport:{
                    width: 800,
                    height: 600,
                    deviceScaleFactor: 2
                }
            });
            try{
                const page = await browser.newPage();                
                
            
                const templateData = await this.getPaymentReportData({
                    from: start_date,
                    to: end_date,
                    report_name: `${report_name}_payment_report_${Date.now()}.pdf`
                });

                                 Handlebars.registerHelper('json', function(obj) {
                                        return JSON.stringify(obj);
                                      });

                                      
            
                let parsed = compiledPaymentReportTemplate(templateData)
            

                await page.setContent(parsed, {
                    waitUntil: ['load', 'networkidle0']
                })

                await new Promise((resolve) => setTimeout(resolve, 2000));


                // const container = await page.$('.container')

                const name = `${report_name}_payment_report_${Date.now()}`

                await page.pdf({
                    path: `./public/payment_reports/${name}.pdf`,
                    format: 'A3',
                    displayHeaderFooter: false,
                    printBackground: true,
                    landscape: true,
                })
            
                await browser.close();

                await this.prisma.paymentReport.create({
                    data: {
                        metadata: {
                            create: {
                                generated_by: 'Moataz Abubaker',
                                start_date: start_date,
                                end_date: end_date,
                                statistics: JSON.stringify({})
                            }
                        },

                        report_name: name,
                        report_path: `payment_reports/${name}.pdf`,
                        created_at: TimeRepository.getCurrentTime()
                    }
                })
                
                return resolve(name)
            }catch(error){
                await browser.close()
                let generate_payment_report_error = new CustomError(
                    error.message,
                    INTERNAL_SERVER
                );

                return reject(generate_payment_report_error)
            }
        }))
    }
    

    static async getPaymentReportData({
        from, to, report_name
    }) {
        return new Promise(promiseAsyncWrapper(async (resolve) => {
            const payments = await this.prisma.payment.findMany({
                include: {
                    metadata: {
                        include: {
                            card_holder_details: true
                        }
                    },

                    sanction: {
                        include: {
                            created_by: true,
                            rules: true,
                            payment: true,
                            place: true,
                            plate_info: true,
                            ticket_info: true
                        }
                    }
                }
            })

            const paid_payments = payments.filter(payment => payment.status == 'completed')
            const total_revenue = paid_payments.reduce((acc, payment) => acc + payment.required_amount, 0)
            const violations = await this.prisma.violation.findMany({
                include: {
                    created_by: true,
                    rules: true,
                    payment: true,
                    place: true,
                    plate_info: true,
                    ticket_info: true
                }
            })
            const total_refunds = await this.prisma.refund.count()

            const revenue_data = paid_payments.reduce((acc, payment) => {
                const date = moment(payment.metadata.paid_at, 'DD.MM.YYYY HH:mm').format('MMM')
                if (!acc[date]) {
                    acc[date] = 0
                }
                acc[date] += payment.required_amount
                return acc
            }, {})
            const revenue_categories = Object.keys(revenue_data)
            const revenue_data_values = Object.values(revenue_data)

            const methods_data = paid_payments.reduce((acc, payment) => {
                const method = payment.metadata.payment_method || 'unknown'
                if (!acc[method]) {
                    acc[method] = 0
                }
                acc[method] += 1
                return acc
            }, {})
            const methods_categories = Object.keys(methods_data)
            const methods_data_values = Object.values(methods_data)

            return resolve({
                report_date: TimeRepository.getCurrentTime(),
                period_from: from,
                period_to: to,
                user_name: "Moataz Abubaker",
                department: "Finance - Admin",
                report_name: report_name,
                total_revenue: total_revenue,
                total_payments: paid_payments.length,
                total_refunds: total_refunds,
                total_violations: violations.length,
                expired_payments: payments.filter(payment => payment.status == 'overdued').length,
                idle_payments: payments.filter(payment => payment.status == 'idle').length,
                completed_payments: paid_payments.length,
                failed_payments: "0",
                recent_payments: paid_payments.slice(0, 5),
                recent_violations: violations.slice(0, 5),
                current_year: moment().format('YYYY'),

                revenue_categories,
                revenue_data_values,

                methods_categories,
                methods_data_values,
            })
        }))
    }
}

export default PaymentReportRepository