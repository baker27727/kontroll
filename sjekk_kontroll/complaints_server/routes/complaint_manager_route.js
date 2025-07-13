import { Router } from "express"
import { loginComplaintManager, registerComplaintManager } from "../controllers/complaint_manager_controller.js"


const router = Router()

router.post('/managers/login', loginComplaintManager)
router.post('/managers/register', registerComplaintManager)

export default router