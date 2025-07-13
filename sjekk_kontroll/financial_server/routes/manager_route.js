import { Router } from "express"
import { createManager, deleteManager, getAllManagers, getManagerLogins, loginManager, updateManager, verifyManagerToken } from "../controllers/manager_controller.js"

const router = Router()

router.post("/managers/login", loginManager)

router.post("/managers", createManager)

router.post("/managers/verify-token", verifyManagerToken)

router.get("/managers", getAllManagers)

router.delete("/managers/:id", deleteManager)
router.get("/managers/:id/logins", getManagerLogins)

router.put("/managers/:id", updateManager)

export default router