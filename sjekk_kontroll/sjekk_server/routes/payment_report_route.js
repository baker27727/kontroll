import { Router } from "express";
import { generatePaymentReport, getPaymentReports } from "../controllers/payment_report_controller.js";

const router = Router()

router.get('/payment-reports', getPaymentReports)
router.post('/payment-reports', generatePaymentReport)


export default router