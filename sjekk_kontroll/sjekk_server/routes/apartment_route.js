import { Router } from "express"

import { changeApartmentPassword, createApartment, getAllApartments } from "../controllers/apartment_controller.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import PrismaClientService from "../utils/prisma_client.js"

const router = Router()

router.get('/apartments', getAllApartments)
router.get('/apartments/:id/notifications', asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const prisma = PrismaClientService.instance
        const notifications = await prisma.notification.findMany({
            where: {
                channel: 'apartment',
                channel_member_id: +id
            }
        })
        res.status(200).json(notifications)
    }
))
router.post('/apartments', createApartment)

router.put('/apartments/:id/password', changeApartmentPassword)

export default router