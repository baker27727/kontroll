import NS from 'node-schedule'
import TimeRepository from '../repositories/Time.js'


export const scheduleCarForRemove = async (time, car_id) => {
  const required_date = await TimeRepository.increaseTimeByHours(
    await TimeRepository.getCurrentTime(),
    time
  )
  NS.scheduleJob(new Date(required_date), async () => {
    
  })
}
