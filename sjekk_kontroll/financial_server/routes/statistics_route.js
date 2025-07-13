import { Router } from "express"
import { getSanctionsChartData, getStatistics } from "../controllers/statisitics_controller.js"

const router = Router()

router.get("/statistics", getStatistics)

router.get("/statistics/sanctions-chart", getSanctionsChartData)

export default router