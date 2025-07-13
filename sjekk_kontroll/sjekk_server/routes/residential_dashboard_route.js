import { Router } from "express"
import { createResidentialDashboard, loginResidentialDashboard } from "../controllers/residential_dashboard_controller.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import PrismaClientService from "../utils/prisma_client.js"

const router = Router()

router.post('/residential-dashboards', createResidentialDashboard)

router.post('/residential-dashboards/login', loginResidentialDashboard)

router.get('/residentials/:id/notifications', asyncWrapper(
    async (req, res) => {
        const prisma = PrismaClientService.instance
        const { id } = req.params
        const notifications = await prisma.notification.findMany({
            where: {
                channel: 'residential',
                channel_member_id: +id
            }
        })
        res.status(200).json(notifications)
    }
))

export default router