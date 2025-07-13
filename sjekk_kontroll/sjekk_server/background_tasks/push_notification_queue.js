import { Worker, Queue } from 'bullmq';
import webPush from '../services/web_push.js';
import NotificationRepository from '../repositories/Notification.js';

import IORedis from 'ioredis';
const sharedConnection = new IORedis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null,
});

const redisConfig = {
  connection: sharedConnection,
  concurrency: 100,
};

// Initialize the queue
const notificationQueue = new Queue('notifications', redisConfig);

// Define the worker to process jobs
const worker = new Worker('notifications', async (job) => {
  try {
    // await webPush.sendNotification({"endpoint":"https://fcm.googleapis.com/fcm/send/ekNCbA5d7uc:APA91bEcewKAYO0svY6-dLglm4KCs4RUWGLz04JQ_9sPVsWp5upnBZL8XvaVEI2_ayj3TmfDI8I_bzj96A5XNAvpsPBpbwCV6gHQaBCh5KgZ0EBumUzL4ELCVlcYNMk3aISmq1Tk_zrc","expirationTime":null,"keys":{"p256dh":"BJ4rJklO73rNdHtm6G7QuKWuTn4FNmXXn0MzouE2Wjdx1Qyu-0p_7rKAkyGdyW_PDQ9qjadfMqaHh_Tf7MVdPqc","auth":"kbb1cZKZhFWF5ih3u-1orQ"}}, JSON.stringify({
    //     title: 'Notification', 
    //     body: 'Hello World', 
    //     icon: 'https://gc-api.techconnects.fr/images/events/seed/ev1.png', 
    //     image: 'https://gc-api.techconnects.fr/images/events/seed/ev1.png'
    // }))

    await NotificationRepository.storeNotification({
      ...job.data.payload,
      channel: job.data.payload.channel,
      channel_member_id: job.data.payload.channel_member_id
    })
    await webPush.sendNotification(JSON.parse(job.data.push_manager_subscription), JSON.stringify(job.data.payload));

  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
}, redisConfig);

await worker.waitUntilReady();

export default notificationQueue