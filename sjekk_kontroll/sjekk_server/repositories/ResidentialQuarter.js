import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import PrismaClientService from "../utils/prisma_client.js"
import TimeRepository from "./Time.js"

class ResidentialPlaceRepository{

    static prisma = PrismaClientService.instance
    static getAllResidentialQuarters(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) =>{
                    const places = await this.prisma.residentialQuarter.findMany({
                        where: {
                            deleted_at: null
                        },
                        include: {
                            place: true,
                            residential_dashboard: {
                                include: {
                                    notification_subscriptions: true
                                }
                            },
                            residential_cars: true,
                        }
                    })
                    return resolve(places)
                }
            )
        )
    }

    static createResidentialQuarter({ location, policy, code, max_cars_registrations, quarter_name, guest_parking_hours, max_cars_by_apartment }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) => {
                    console.log(' iwas jere');
                    
                    const place = await this.prisma.place.create({
                        data: {
                            location,
                            policy,
                            code,
                            created_at: TimeRepository.getCurrentTime(),
                            place_type: 'residential',
                            residential: {
                                create: {
                                    location,
                                    policy,
                                    code,
                                    max_cars_registrations,
                                    quarter_name,
                                    guest_free_days: guest_parking_hours,
                                    max_cars_by_apartment,
                                }
                            }
                        }
                    })

                    const quarter = await this.prisma.residentialQuarter.findFirst({
                        where: {
                            place_id: place.id
                        },

                        include: {
                            place: true
                        }
                    })

                    return resolve(quarter)
                }
            )
        )
    }
}

export default ResidentialPlaceRepository