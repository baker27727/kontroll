import axiosHttp from "../utils/axios_client"

interface NotificationSubscriptionPayload {
    apartment_id: number
}

class NotificationService {
    static urlBase64ToUint8Array = base64String => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
      
        const rawData = atob(base64);
        const outputArray = new Uint8Array(rawData.length);
      
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
      
        return outputArray;
    }

    static listenOnNotificationPermissionChange = (apartment_id: number) => {
        navigator.permissions.query({ name: 'notifications' }).then((notificationPerm) => {
            notificationPerm.onchange = async () => {
                if(notificationPerm.state == 'denied'){
                    await this.unsubscribe(apartment_id)
                }

                if(notificationPerm.state == 'granted'){
                    await this.saveSubscription({
                        apartment_id
                    })
                }
            };
        });
    }

    static async getCurrentPushManagerSubscription() {
        const service_worker_registration = await navigator.serviceWorker.getRegistration()
        return await service_worker_registration.pushManager.getSubscription() || await this.createPushManagerSubscription()
    }

    static async getCurrentServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | undefined> {
        return await navigator.serviceWorker.getRegistration()
    }

    static async createPushManagerSubscription(): Promise<PushSubscription> {
        const service_worker_registration = await navigator.serviceWorker.getRegistration()

        const subscription = await service_worker_registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY)
        })

        return subscription
    }

    static async saveSubscription(payload: NotificationSubscriptionPayload) {
        try{
            await axiosHttp.post(`/apartment-dashboard/${payload.apartment_id}/notification/subscription`, {
                push_manager_subscription: await this.getCurrentPushManagerSubscription()
            })
        }catch(error) {
            console.log(error)
        }
    }

    static async unsubscribe(apartment_id: number) {
        try{
            await axiosHttp.post(`/apartment-dashboard/${apartment_id}/notification/unsubscribe`)
        }catch(error) {
            console.log(error)
        }
    }
}

export default NotificationService