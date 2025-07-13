import { Router } from "express"
import { getAllStatistics } from "../controllers/statistics_controller.js"

const router = Router()

router.get('/statistics', getAllStatistics)

export default router