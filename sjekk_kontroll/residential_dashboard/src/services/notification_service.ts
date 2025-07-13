import axiosHttp from "../utils/axios_client"

interface NotificationSubscriptionPayload {
    residential_dashboard_id: number
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

    static listenOnNotificationPermissionChange = (residential_dashboard_id: number) => {
        navigator.permissions.query({ name: 'notifications' }).then((notificationPerm) => {
            notificationPerm.onchange = async () => {
                if(notificationPerm.state == 'denied'){
                    await this.unsubscribe(residential_dashboard_id)
                }

                if(notificationPerm.state == 'granted'){
                    await this.saveSubscription({
                        residential_dashboard_id
                    })
                }
            };
        });
    }

    static async getCurrentPushManagerSubscription() {
        try{
            const service_worker_registration = await navigator.serviceWorker.getRegistration()
            return await service_worker_registration.pushManager.getSubscription() || await this.createPushManagerSubscription()
        } catch (error) {
            console.log(error);
            
            console.log("Failed to get push manager subscription");
            
        }
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
        console.log(JSON.stringify(subscription));
        

        return subscription
    }

    static async saveSubscription(payload: NotificationSubscriptionPayload) {
        try{
            const response = await axiosHttp.post(`/residential-quarter-dashboard/${payload.residential_dashboard_id}/notification/subscription`, {
                ...payload,
                push_manager_subscription: await this.getCurrentPushManagerSubscription()
            })
            console.log(response.data);
            
        }catch(error) {
            console.log(error)
        }
    }

    static async unsubscribe(apartment_id: number) {
        try{
            await axiosHttp.post(`/residential-quarter-dashboard/${apartment_id}/notification/unsubscribe`)
        }catch(error) {
            console.log(error)
        }
    }
}

export default NotificationService