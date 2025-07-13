import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import { default as PrismaClientService } from "../utils/prisma_client.js"
import { default as TimeRepository } from "./Time.js"

class SystemNotificationComponentRepository {
    static prisma = PrismaClientService.instance
    static getSystemNotificationComponent = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const systemNotificationComponent = await this.prisma.systemNotificationComponent.findMany()
                return resolve(systemNotificationComponent)
            }
        )
    )

    static createSystemNotificationComponent = async ({ title, body, icon, image, is_favorite }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const systemNotificationComponent = await this.prisma.systemNotificationComponent.create({
                    data: {
                        title,
                        body,
                        icon,
                        image,
                        is_favorite,
                        created_at: TimeRepository.getCurrentTime(),
                    }
                })
                return resolve(systemNotificationComponent)
            }
        )
    )

    static async 
}

export default SystemNotificationComponentRepository