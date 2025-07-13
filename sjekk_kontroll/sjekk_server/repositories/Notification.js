import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import PrismaClientService from "../utils/prisma_client.js"
import TimeRepository from "./Time.js"

class NotificationRepository {
    static prisma = PrismaClientService.instance

    static getAllNotifications = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const notifications = await this.prisma.notification.findMany()
                return resolve(notifications)
            }
        )
    )

    static storeNotification = async ({ title, body, icon, image, channel, channel_member_id }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const notification = await this.prisma.notification.create({
                    data: {
                        title,
                        body,
                        icon,
                        image,
                        channel,
                        channel_member_id: +channel_member_id,
                        sent_at: TimeRepository.getCurrentDate()
                    }
                })
                return resolve(notification)
            }
        )
    )
}

export default NotificationRepository