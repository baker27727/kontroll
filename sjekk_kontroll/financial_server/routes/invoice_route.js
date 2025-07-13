import { Router } from "express"
import { createInvoice, getInvoices } from "../controllers/invoice_controller.js"

const router = Router()

router.get("/invoices", getInvoices)
router.post("/invoices", createInvoice)

export default router