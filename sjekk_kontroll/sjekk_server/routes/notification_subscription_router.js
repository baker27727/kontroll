import multer from "multer";
import { Router } from "express"
import PrismaClientService from "../utils/prisma_client.js"
import webPush from "../services/web_push.js"
import NotificationRepository from "../repositories/Notification.js"
import notificationQueue from "../background_tasks/push_notification_queue.js"
import asyncWrapper from '../middlewares/async_wrapper.js'

const router = Router()
const prisma = PrismaClientService.instance

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/notifications-uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG and PNG files are accepted'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


router.post('/residential-quarter-dashboard/:id/notification/subscription', async (req, res) => {
    try{
        const { push_manager_subscription } = req.body
    const { id } = req.params
    
    const dashboard = await prisma.residentialDashboard.findFirst({
        where: {
            id: +id
        }
    })

    if (!dashboard) {
        return res.status(404).json({
            success: false,
            message: 'Dashboard not found'
        })
    }

    await prisma.residentialDashboardNotificationSubscription.deleteMany({
        where: {
            user_agent: req.headers['user-agent'],
        }
    })

    await prisma.residentialDashboardNotificationSubscription.create({
        data: {
            push_manager_subscription: JSON.stringify(push_manager_subscription),
            user_agent: req.headers['user-agent'],
            ip_address: req.socket.remoteAddress,
            residential_dashboard_id: +id,
            channel_member_id: +id
        }
    })

    return res.status(200).json({
        success: true,
        message: 'Subscription updated'
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
})

router.post('/residential-quarter-dashboard/:id/notification/unsubscribe', async (req, res) => {
    const { id } = req.params

    const dashboard = await prisma.residentialDashboard.findFirst({
        where: {
            id: +id
        }
    })

    if (!dashboard) {
        return res.status(404).json({
            success: false,
            message: 'Dashboard not found'
        })
    }

    await prisma.residentialDashboardNotificationSubscription.deleteMany({
        where: {
            user_agent: req.headers['user-agent'],
        },
    })

    return res.status(200).json({
        success: true,
        message: 'Unsubscribe successful'
    })
})

router.post('/residential-quarter-dashboard/:id/send-notification', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }]), async (req, res) => {
    const { id } = req.params
    const { title, body } = req.body

    

    const subscriptions = await prisma.residentialDashboardNotificationSubscription.findMany({
        where: {
            residential_dashboard_id: +id
        }
    })

    await Promise.all(
        subscriptions.map(async sub => {

            try {
                await notificationQueue.add(`${sub.user_agent} ${sub.ip_address}`, {
                    push_manager_subscription: sub.push_manager_subscription,
                    payload: {
                        title,
                        body,
                        image,
                        icon,
                        channel: sub.channel,
                        channel_member_id: sub.channel_member_id
                    }
                }, { priority:1, delay:0 })
            } catch (error) {
                console.error(error);
            }
        })
    )


    return res.status(200).json({
        success: true,
        message: 'Notification sent'
    })
})

router.post('/public-place-dashboard/:id/notification/subscription', async (req, res) => {
    const { push_manager_subscription } = req.body
    const { id } = req.params
    

    const dashboard = await prisma.normalPlaceDashboard.findFirst({
        where: {
            id: +id
        }
    })
    

    if (!dashboard) {
        return res.status(404).json({
            success: false,
            message: 'Dashboard not found'
        })
    }

    await prisma.publicPlaceNotificationSubscription.deleteMany({
        where: {
            user_agent: req.headers['user-agent']
        }
    })

    await prisma.publicPlaceNotificationSubscription.create({
        data: {
            public_dashboard_id: +id,
            push_manager_subscription: JSON.stringify(push_manager_subscription),
            user_agent: req.headers['user-agent'],
            ip_address: req.socket.remoteAddress,
            channel_member_id: +id
        }
    })

    return res.status(200).json({
        success: true,
        message: 'Subscription updated'
    })
})

router.post('/public-place-dashboard/:id/notification/unsubscribe', async (req, res) => {
    const { id } = req.params

    const dashboard = await prisma.normalPlaceDashboard.findFirst({
        where: {
            id: +id
        }
    })

    if (!dashboard) {
        return res.status(404).json({
            success: false,
            message: 'Dashboard not found'
        })
    }

    await prisma.publicPlaceNotificationSubscription.deleteMany({
        where: {
            user_agent: req.headers['user-agent']
        }
    })

    return res.status(200).json({
        success: true,
        message: 'Unsubscribed successfully'
    })
})

router.post('/public-place-dashboard/:id/send-notification', async (req, res) => {
    const { id } = req.params
    console.log(req.body);
    

    const dashboard = await prisma.normalPlaceDashboard.findFirst({
        where: {
            id: +id
        }
    })

    const subscription = await prisma.publicPlaceNotificationSubscription.findFirst({
        where: {
            public_dashboard_id: +id
        }
    })

    console.log(dashboard);
    console.log(subscription);
    

    await notificationQueue.add(`${req.headers['user-agent']} ${req.socket.remoteAddress}`, {
        payload: {
            title: req.body.title,
            body: req.body.body,
            icon: req.body.icon,
            image: req.body.image,
            channel: 'public_place',
            channel_member_id: +id,
        },
        push_manager_subscription: subscription.push_manager_subscription
    }, { priority: 1, delay: 0 })

    return res.status(200).json({
        success: true,
        message: 'Notification sent'
    })
})

router.post('/apartment-dashboard/:id/notification/subscription', async (req, res) => {
    
    
    const { push_manager_subscription } = req.body
    const { id } = req.params
    

    const dashboard = await prisma.apartment.findFirst({
        where: {
            id: +id
        }
    })

    if(!dashboard){
        return res.status(404).json({
            success: false,
            message: 'Dashboard not found'
        })
    }

    await prisma.apartmentNotificationSubscription.deleteMany({
        where: {
            user_agent: req.headers['user-agent']
        }
    })

    await prisma.apartmentNotificationSubscription.create({
        data: {
            aprtment_id: +id,
            push_manager_subscription: JSON.stringify(push_manager_subscription),
            user_agent: req.headers['user-agent'],
            ip_address: req.socket.remoteAddress,
            channel_member_id: +id
        }
    })

    return res.status(200).json({
        success: true,
        message: 'Notification sent'
    })
})

router.post('/apartment-dashboard/:id/notification/unsubscribe', async (req, res) => {
    const { id } = req.params

    const dashboard = await prisma.apartment.findFirst({
        where: {
            id: +id
        }
    })

    if(!dashboard){
        return res.status(404).json({
            success: false,
            message: 'Dashboard not found'
        })
    }

    await prisma.apartmentNotificationSubscription.deleteMany({
        where: {
            user_agent: req.headers['user-agent'],
        }
    })

    return res.status(200).json({
        success: true,
        message: 'Unsubscribe successful'
    })
})


router.post('/apartment-dashboard/:id/send-notification', async (req, res) => {
    const { id } = req.params

    const dashboard = await prisma.apartment.findFirst({
        where: {
            id: +id
        }
    })

    const subscription = await prisma.apartmentNotificationSubscription.findFirst({
        where: {
            aprtment_id: +id
        }
    })
    
    await notificationQueue.add(`${req.headers['user-agent']} ${req.socket.remoteAddress}`, {
        payload: {
            title: req.body.title,
            body: req.body.body,
            icon: req.body.icon,
            image: req.body.image,
            channel: 'apartment',
            channel_member_id: id
        },
        notification_subscriptions: subscription.push_manager_subscription
    }, { priority: 1, delay: 0 })

    return res.status(200).json({
        success: true,
        message: 'Notification sent'
    })
})


router.get('/notifications', asyncWrapper(
    async (req, res) => {
        const prisma = PrismaClientService.instance
        const notifications = await prisma.notification.findMany({})
        console.log(notifications);
        
        return res.json(notifications)
    }
))

router.get('/notifications/residential', asyncWrapper(
    async (req, res) => {
        const prisma = PrismaClientService.instance
        const notifications = await prisma.notification.findMany({
            where: {
                channel: 'residential'
            }
        })
        console.log(notifications);
        
        return res.json(notifications)
    }
))

router.get('/notifications/public-place', asyncWrapper(
    async (req, res) => {
        const prisma = PrismaClientService.instance
        const notifications = await prisma.notification.findMany({
            where: {
                channel: 'public_place'
            }
        })
        console.log(notifications);
        
        return res.json(notifications)
    }
))

router.get('/notifications/apartment', asyncWrapper(
    async (req, res) => {
        const prisma = PrismaClientService.instance
        const notifications = await prisma.notification.findMany({
            where: {
                channel: 'apartment'
            }
        })
        console.log(notifications);
        
        return res.json(notifications)
    }
))


export default router