import { Router } from "express"
import { loginClientToTicket } from "../controllers/client_controller.js"

const router = Router()

router.post('/clients/login', loginClientToTicket)

export default router