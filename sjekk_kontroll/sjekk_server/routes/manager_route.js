import { Router } from "express"
import { createManager, loginManager } from "../controllers/manager_controller.js"

const router = Router()

router.post('/managers', createManager)
router.post('/managers/login', loginManager)

export default router