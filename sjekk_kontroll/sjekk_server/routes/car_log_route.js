import { Router } from "express"
import { generateCarLogsReport, getAllCarLogs, getAllCarLogsReports, getAllPlaceCarLogs, getAllPlaceCarLogsAvgTime, getAllPlaceCarLogsCount } from "../controllers/car_log_controller.js"

const router = Router()

router.get('/car-logs', getAllCarLogs)
router.get('/car-logs/places/:id', getAllPlaceCarLogs)
router.get('/car-logs/places/:id/count', getAllPlaceCarLogsCount)
router.get('/car-logs/places/:id/avg-time', getAllPlaceCarLogsAvgTime)

router.post('/car-logs/reports', generateCarLogsReport)
router.get('/car-logs/reports', getAllCarLogsReports)

export default router