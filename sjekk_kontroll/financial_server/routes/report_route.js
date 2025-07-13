import { Router } from "express"
import { deleteReport, generateReport, getReports, getTotalRevenue } from "../controllers/report_controller.js"

const router = Router()

router.get("/reports", getReports)
router.get("/reports/total-revenue", getTotalRevenue)

router.post("/reports", generateReport)

router.delete("/reports/:id", deleteReport)

export default router