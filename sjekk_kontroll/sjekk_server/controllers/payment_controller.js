import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import PaymentRepository from "../repositories/Payment.js";

export const createPaymentIntent = asyncWrapper(
    async (req, res) => {
        const payment_intent = await PaymentRepository.createPaymentIntent()

        return res.status(OK).json(payment_intent)
    }
)

export const getPaymentDashboardData = asyncWrapper(
    async (req, res) => {
        const dashboard_data = await PaymentRepository.getPaymentDashboardData()

        return res.status(OK).json(dashboard_data)
    }
)

export const getAllPayments = asyncWrapper(
    async (req, res) => {
        const payments = await PaymentRepository.getAllPayments()

        return res.status(OK).json(payments)
    }
)

export const getPayment = asyncWrapper(
    async (req, res) => {
        const { id: payment_id } = req.params
        const payment = await PaymentRepository.getPayment(payment_id)

        return res.status(OK).json(payment)
    }
)

export const getViolationPayment = asyncWrapper(
    async (req, res) => {
        const { id: violation_id } = req.params
        const payment = await PaymentRepository.getViolationPayment(violation_id)

        return res.status(OK).json(payment)
    }
)

export const getStripeBalance = asyncWrapper(
    async (req, res) => {
        const balance = await PaymentRepository.getStripeBalance()

        return res.status(OK).json(balance)
    }
)

export const getRefunds = asyncWrapper(
    async (req, res) => {
        const refunds = await PaymentRepository.getRefunds()

        return res.status(OK).json(refunds)
    }
)

export const createRefund = asyncWrapper(
    async (req, res) => {
        const { id: payment_id } = req.params
        const refund = await PaymentRepository.createRefund({ payment_id })

        return res.status(OK).json(refund)
    }
)

export const cancelRefund = asyncWrapper(
    async (req, res) => {
        const { id: refund_id } = req.params
        const refund = await PaymentRepository.cancelRefund({ refund_id })

        return res.status(OK).json(refund)
    }
)

export const getPaymentLogs = asyncWrapper(
    async (req, res) => {
        const logs = await PaymentRepository.getPaymentLogs()

        return res.status(OK).json(logs)
    }
)

export const stroePaymentLog = asyncWrapper(
    async (req, res) => {
        const { action, details, log_level = 'info' } = req.body
        const log = await PaymentRepository.stroePaymentLog({ action, details, log_level })

        return res.status(OK).json(log)
    }
)