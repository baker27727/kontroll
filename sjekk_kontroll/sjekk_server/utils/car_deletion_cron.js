import schedule from 'node-schedule';
import CarRepository from '../repositories/Car.js';

const performExpirationTask = async ({car_id}) => {
    await CarRepository.deleteCar({ car_id: +car_id });
}

const parseDate = (dateString) => {
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('.').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

export const scheduleCarForRemove = ({car_id, expirationDate}) => {
    const parsedDate = parseDate(expirationDate);
    const job = schedule.scheduleJob(parsedDate, () => {
        performExpirationTask({car_id});
    });
}
const shutdown = () => {
    console.log('Shutting down...');

    process.exit(0);
  };
  
  // Handle shutdown signals
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);