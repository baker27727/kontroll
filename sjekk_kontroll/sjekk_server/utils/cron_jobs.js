import cron from 'node-cron'
import ViolationModel from '../models/Violation.js'
import { PrismaClient } from '@prisma/client';
import moment from 'moment';
import PrismaClientService from './prisma_client.js';
import CarRepository from '../repositories/Car.js';

let lockViolationCron = cron.schedule('0 0 0 * * *', async () => {
    await ViolationModel.updateMany({},{
        locked: true
    })
})

async function deleteExpiredCars() {
  try {
    
    let prisma = PrismaClientService.instance
    const cars = await prisma.registeredCar.findMany({
      where: {
        deleted_at: null
      }
    })
  
  
    await Promise.all(
        cars.map(async (car) => {
            const expirationDate = moment(car.expire_date, 'DD.MM.YYYY HH:mm');
            if(moment(expirationDate).isBefore(moment()) || moment(expirationDate).isSame(moment())){
                await CarRepository.deleteCar({ car_id: car.id })
            }
        })
    )
  } catch (error) {
    // console.error('Error deleting expired cars:', error);
  }
}

// Schedule the job to run every day at midnight
const dailyJob = cron.schedule('* * * * * *', deleteExpiredCars);


async function shutdown() {

  // Stop the cron job
  dailyJob.stop();
  lockViolationCron.stop()

  process.exit(0);
}

// Handle termination signals to gracefully shut down
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);


