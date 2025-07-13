import { Router } from "express";
import { cancelRefund, createPaymentIntent, createRefund, getAllPayments, getPayment, getPaymentDashboardData, getPaymentLogs, getRefunds, getStripeBalance, getViolationPayment, stroePaymentLog } from "../controllers/payment_controller.js";

const router = Router();

router.post("/payment-intent", createPaymentIntent);

router.get('/payments/dashboard-data', getPaymentDashboardData)
router.get('/payments', getAllPayments)

router.get('/violations/:id/payment', getViolationPayment)

router.get('/payments/balance', getStripeBalance)

router.post('/payments/:id/refunds', createRefund)
router.get('/payments/refunds', getRefunds)

router.post('/payments/:id/overdue/remind')

router.post('/refunds/:id/cancel', cancelRefund)

router.get('/payments/logs', getPaymentLogs)
router.post('/payments/logs', stroePaymentLog)
router.get('/payments/:id', getPayment)



export default router;

