import { Router } from "express";
import asyncWrapper from "../middlewares/async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";

const router = Router()

router.get('/notification-analytics', asyncWrapper(
    async (req,res) => {
        const notification_activities = await PrismaClientService.instance.notification.groupBy({
            by: ['sent_at'],
            _count: {
                sent_at: true
            },
            orderBy: {
                sent_at: 'desc'
            }
        });

        const formatted_activities = notification_activities.map(activity => ({
            day: activity.sent_at,
            count: activity._count.sent_at
        }));

        const notifications = await PrismaClientService.instance.notification.findMany({})

        const total_sent = notifications.length
        const total_delivered = notifications.length

        res.status(200).json({
            total_delivered,
            total_sent,
            notification_activities: formatted_activities
        })

    }

))


export default router