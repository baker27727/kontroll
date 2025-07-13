import asyncWrapper from "../middlewares/async_wrapper";

export const sendCustomNotification = asyncWrapper(
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
        
            // Send notifications to each subscription
            const notificationPayload = {
              title: notification_component.title,
              body: notification_component.body,
              image: static_files_host + notification_component.image,
              icon: static_files_host + notification_component.icon,
            };

            
        
            await Promise.all(
              subscriptions.map(async (sub) => {
                notificationQueue.add(`${sub.user_agent} ${sub.ip_address}`, {
                  push_manager_subscription: JSON.parse(sub.push_manager_subscription).push_manager_subscription,
                  payload: notificationPayload,
                }, {
                    delay: 0
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