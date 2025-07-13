import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import PrismaClientService from "../utils/prisma_client.js"
import InvoiceRepository from "./Invoice.js"
import TimeRepository from "./Time.js"

class SanctionRepository {
    static prisma = PrismaClientService.instance

    static getSanctions = async () => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const sanctions = await this.prisma.sanction.findMany({
                where: {
                    deleted_at: null
                },
                orderBy: {
                    created_at: 'desc'
                },
                include: {
                    sanction_rules: true,
                    sanction_files: true,
                    payment: true
                }
            })
            resolve(sanctions)
        })
    )

    static getDeletedSanctions = async () => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const sanctions = await this.prisma.sanction.findMany({
                where: {
                    deleted_at: {
                        not: null
                    }
                },
                orderBy: {
                    created_at: 'desc'
                },
                include: {
                    sanction_rules: true,
                    sanction_files: true,
                    payment: true
                }
            })
            resolve(sanctions)
        })
    )

    static getSanctionById = async (id) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const sanction = await this.prisma.sanction.findUnique({
                where: {
                    id: +id
                },
                include: {
                    sanction_rules: true,
                    sanction_files: true
                }
            })
            resolve(sanction)
        })
    )

    static createSanction = async ({ kid_number, control_number, total_charge, rules, employee_pnid, violated_at }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const sanction = await this.prisma.sanction.create({
                data: {
                    employee_pnid, 
                    created_at: TimeRepository.getCurrentDateTime(),
                    date: TimeRepository.getCurrentDate(),
                    kid_number,
                    control_number,
                    total_charge: +total_charge,
                    due_date: TimeRepository.increaseTimeByWeeks({
                        current_time: violated_at,
                        weeks: 3
                    }),
                    sanction_rules: {
                        create: rules
                    }
                }
            })

            await InvoiceRepository.createInvoice({
                sanction_id: sanction.id
            })

            const new_sanction = await this.prisma.sanction.findFirst({
                where: {
                    id: sanction.id
                },
                include: {
                    sanction_rules: true,
                    sanction_files: true
                }
            })

            resolve(new_sanction)
            
        })
    )

    static deleteSanction = async ({ id }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            await this.prisma.invoice.update({
                where: {
                    sanction_id: +id
                },
                data: {
                    deleted_at: TimeRepository.getCurrentDateTime()
                }
            })

            const deleted_sanction = await this.prisma.sanction.update({
                where: {
                    id: +id
                },
                data: {
                    deleted_at: TimeRepository.getCurrentDateTime()
                }
            })
            resolve(deleted_sanction)
        })
    )

    static markSanctionAsPaid = async ({ id }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const updated_sanction = await this.prisma.sanction.update({
                where: {
                    id: +id
                },
                include: {
                    i
                },
                data: {
                    status: 'paid'
                }
            })

            await this.prisma.payment.create({
                data: {
                    client_name: 'John Doe',
                    plate_number: updated_sanction.plate_number,
                    charged_at: updated_sanction.created_at,
                    paid_amount: updated_sanction.total_charge,
                    paid_at: TimeRepository.getCurrentDateTime(),
                    control_number: updated_sanction.control_number,
                    sanction_id: updated_sanction.id
                }
            })
            resolve(updated_sanction)
        })
    )

    static sendSanctionToDebtCollect = async ({ id }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const updated_sanction = await this.prisma.sanction.update({
                where: {
                    id: +id
                },
                data: {
                    status: 'sent_to_debt_collect'
                }
            })
            resolve(updated_sanction)
        })
    )

    static completeSanctionByKidNumber = async ({ kid_number }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const updated_sanction = await this.prisma.sanction.update({
                where: {
                    kid_number
                },
                data: {
                    status: 'paid'
                }
            })
            resolve(updated_sanction)
        })
    )
}

export default SanctionRepository