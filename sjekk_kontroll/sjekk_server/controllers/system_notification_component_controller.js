import notificationQueue from "../background_tasks/push_notification_queue.js";
import { static_files_host } from "../config.js";
import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import NotificationRepository from "../repositories/Notification.js";
import SystemNotificationComponentRepository from "../repositories/SystemNotificationComponent.js";
import PrismaClientService from "../utils/prisma_client.js";

export const getAllSystemNotificationComponents = asyncWrapper(
    async (req, res) => {
        const { id } = req.params
        const result = await SystemNotificationComponentRepository.getSystemNotificationComponent({ id })
        return res.status(OK).json(result)
    }
)

export const storeSystemNotificationComponent = asyncWrapper(
    async (req, res) => {
        const { title, body, is_favorite } = req.body
        
        
        const result = await SystemNotificationComponentRepository.createSystemNotificationComponent({
            title,
            body,
            icon: req.files.icon != null ? `notifications-uploads/${req.files.icon[0].filename}` : null,
            image: req.files.image != null ? `notifications-uploads/${req.files.image[0].filename}` : null,
            is_favorite
        })
        return res.status(OK).json(result)
    }
)

export const sendNotificationComponent = asyncWrapper(
    async (req,res) => {
        const { channel, destinations } = req.body
        const { id } = req.params
        try {
            const notification_component = await PrismaClientService.instance.systemNotificationComponent.findUnique({
              where: { id: +id },
            })
            
            let subscriptions;
        
            if (channel === '*') {
              // Fetch all subscriptions from all categories
              const [normalPlaceSubs, residentialPlaceSubs, apartmentSubs] = await Promise.all([
                PrismaClientService.instance.publicPlaceNotificationSubscription.findMany({}),
                PrismaClientService.instance.residentialDashboardNotificationSubscription.findMany({}),
                PrismaClientService.instance.apartmentNotificationSubscription.findMany({})
              ]);
              subscriptions = [
                ...normalPlaceSubs,
                ...residentialPlaceSubs,
                ...apartmentSubs,
              ];
            }else if(channel === 'residential'){
                subscriptions = await PrismaClientService.instance.residentialDashboardNotificationSubscription.findMany({})
            }else if(channel === 'apartment'){
                subscriptions = await PrismaClientService.instance.apartmentNotificationSubscription.findMany({})
            }else{
                subscriptions = await PrismaClientService.instance.publicPlaceNotificationSubscription.findMany({})
            }

            console.log(subscriptions);
            
    
            await Promise.all(
              subscriptions.map(async (sub) => {
                notificationQueue.add(`${sub.user_agent} ${sub.ip_address}`, {
                  push_manager_subscription: sub.push_manager_subscription,
                  payload: {
                    title: notification_component.title,
                    body: notification_component.body,
                    image: static_files_host + notification_component.image,
                    icon: static_files_host + notification_component.icon,
                    channel: sub.channel,
                    channel_member_id: sub.channel_member_id
                  },
                }, {
                    delay: 0,
                    priority: 1
                })
              })
            );
        
            res.status(200).json({ success: true, message: 'Notifications sent!' });
          } catch (error) {
            console.error('Error sending notifications:', error);
            res.status(500).json({ success: false, error: 'Failed to send notifications' });
          }
    }
)