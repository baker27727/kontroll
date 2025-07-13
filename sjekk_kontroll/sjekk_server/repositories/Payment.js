import Stripe from "stripe"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import { stripe_secret_key } from "../config.js";
import PrismaClientService from "../utils/prisma_client.js";
import moment from "moment";

const stripe = new Stripe(stripe_secret_key, { apiVersion: "2022-11-15" });

class PaymentRepository {
    static prisma = PrismaClientService.instance

    static async createPaymentIntent({ amount, currency = 'nok', metadata = {} }) {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 100 * amount,
                currency,
                automatic_payment_methods: { enabled: true },
                metadata: metadata
            });
            return resolve(paymentIntent)
        }))
    }

    static async getPaymentById(id) {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            const payment = await this.prisma.payment.findUnique({
                where: { id: +id },
                include: {
                    refund: true,
                    sanction: true,
                    metadata: {
                        include: {
                            card_holder_details: true
                        }
                    }
                }
            });
            return resolve(payment)
        }))
    }

    static async updatePaymentStatus(id, status) {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            const payment = await this.prisma.payment.update({
                where: { id: +id },
                data: {
                    status
                }
            });
            return resolve(payment)
        }))
    }

    static async getPaymentDashboardData() {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            const payments = await this.prisma.payment.findMany({
                include: {
                    sanction: true,
                    refund: true,
                    metadata: {
                        include: {
                            card_holder_details: true
                        }
                    }
                }
            })
            const paid_ones = payments.filter(payment => payment.status == 'completed')


            const paidByMethod = Object.entries(payments.reduce((acc, payment) => {
                if (payment.status === 'completed') {
                    const method = payment.metadata.payment_method || 'unknown';
                    if (!acc[method]) {
                        acc[method] = 0;
                    }
                    acc[method]++;
                }
                return acc;
            }, {}))
            .map(([name, value]) => ({ name, value }));

            console.log(paidByMethod);
                        

            const revenue_overview = paid_ones.reduce((data, payment) => {
                const date = moment(payment.metadata.paid_at, 'DD.MM.YYYY HH:mm').format('YYYY-MM-DD')
                const existing = data.find(item => item.date == date)
                if(existing) {
                    existing.value += payment.required_amount
                } else {
                    data.push({ date, value: payment.required_amount })
                }
                return data
            }, [])


            const idle_ones = payments.filter(payment => payment.status == 'idle')
            const overdued_ones = payments.filter(payment => payment.status == 'overdued')

            return resolve({
                statistics: {
                    overdued_payments: overdued_ones.length,
                    idle_payments: idle_ones.length,
                    completed_payments: paid_ones.length,
                    failed_payments: 0,

                    total_payments: payments.length,
                    total_revenue: paid_ones.reduce((total, payment) => total + payment.required_amount, 0),
                    total_refunds: 0,
                },

                revenue_overview: revenue_overview,
                payment_methods: paidByMethod
            })
        }))
    }

    static async getAllPayments() {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            const payments = await this.prisma.payment.findMany({
                include: {
                    sanction: true,
                    refund: true,
                    metadata: {
                        include: {
                            card_holder_details: true
                        }
                    }
                }
            })
            return resolve(payments)
        }))
    }

    static async getPayment(id) {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            const payment = await this.prisma.payment.findUnique({
                where: { id: +id },
                include: {
                    metadata: {
                        include: {
                            card_holder_details: true
                        }
                    },
                    sanction: {
                        include: {
                            ticket_info: true,
                            place: true,
                            rules: {
                                include: {
                                    extras_values: true,
                                    extras: true
                                }
                            },
                            created_by: {
                                include: {
                                    shifts: true,
                                    
                                }
                            },
                            plate_info: true,
                            images: true
                        }
                    },
                    refund: true
                }
            });
            return resolve(payment)
        }))
    }

    static async getViolationPayment(violation_id) {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            const payment = await this.prisma.payment.findFirst({
                where: {
                    violation_id: +violation_id
                },

                include: {
                    metadata: {
                        include: {
                            card_holder_details: true
                        }
                    },
                    sanction: {
                        include: {
                            ticket_info: true,
                            place: true,
                            rules: {
                                include: {
                                    extras_values: true,
                                    extras: true
                                }
                            },
                            created_by: true,
                            plate_info: true,
                            images: true
                        }
                    },
                    refund: true
                }
            });
            return resolve(payment)
        }))
    }

    static async getStripeBalance() {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            const balance = await stripe.balance.retrieve();
            return resolve(balance)
        }))
    }

    static async createRefund({ payment_id }) {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            try {
                const payment = await this.prisma.payment.findUnique({
                    where: { id: +payment_id },
                    include: {
                        metadata: {
                            include: {
                                card_holder_details: true
                            }
                        }
                    }
                })
                const stripe_refund = await stripe.refunds.create({ charge: payment.metadata.charge_id }) 

                const refund = await this.prisma.refund.create({
                    data: {
                        charge_id: payment.metadata.charge_id,
                        stripe_refund_id: stripe_refund.id,
                        refund_amount: stripe_refund.amount,
                        payment_intent_id: payment.metadata.payment_intent_id,
                        currency: 'nok',
                        kid_number: payment.kid_number,

                        payment_id: payment.id
                    }
                })

                await this.prisma.payment.update({
                    where: { id: payment.id },
                    data: {
                        status: 'refunded'
                    }
                })
                return resolve(refund);
            } catch (error) {
                return reject(error);
            }
        }))
    }

    static async getRefunds() {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            const refunds = await this.prisma.refund.findMany({
                include: {
                    payment: {
                        include: {
                            metadata: {
                                include: {
                                    card_holder_details: true
                                }
                            }
                        }
                    }
                }
            })
            return resolve(refunds)
        }))
    }

    static async cancelRefund({ refund_id }) {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            try {
                const refund = await this.prisma.refund.findUnique({
                    where: { id: +refund_id }
                })
                const stripe_refund = await stripe.refunds.cancel(refund.stripe_refund_id)

                await this.prisma.payment.update({
                    where: { id: refund.payment_id },
                    data: {
                        status: 'completed'
                    }
                })
                return resolve(stripe_refund)
            } catch (error) {
                return reject(error)
            }
        }))
    }

    static async stroePaymentLog ({ action, details, log_level = 'info' }) {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            try {
                const log = await this.prisma.paymentLogs.create({
                    data: {
                        action,
                        details,
                        level: log_level,
                        timestamp: (new Date()).toString()
                    }
                })
                return resolve(log)
            } catch (error) {
                return reject(error)
            }
        }))
    }

    static async getPaymentLogs () {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            try {
                const logs = await this.prisma.paymentLogs.findMany()
                return resolve(logs)
            } catch (error) {
                return reject(error)
            }
        }))
    }
}

export default PaymentRepository
