import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import PrismaClientService from "../utils/prisma_client.js"
import TimeRepository from "./Time.js"

class NormalPlaceRepository{

    static prisma = PrismaClientService.instance
    static getAllNormalPlaces(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) =>{
                    const places = await this.prisma.normalPlace.findMany({
                        where: {
                            deleted_at: null
                        },
                        include: {
                            place: true,
                            partner: true
                        }
                    })

                    return resolve(places)
                }
            )
        )
    }

    static createNormalPlace({ location, policy, code, partner_id }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) => {
                    const place = await this.prisma.place.create({
                        data: {
                            location,
                            policy,
                            code,
                            place_type: 'normal',
                            created_at: TimeRepository.getCurrentTime(),
                            normal_place: {
                                create: {
                                    location,
                                    policy,
                                    code,
                                    partner_id: +partner_id,
                                    place_type: 'Mall'
                                }
                            }
                        }
                    })

                    const created_normal_place = await this.prisma.normalPlace.findFirst({
                        where: {
                            place_id: place.id
                        },
                        include: {
                            place: true,
                            partner: true
                        }
                    })

                    return resolve(created_normal_place)
                }
            )
        )
    }

    static updateNormalPlace({ place_id, location, policy, code, partner_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const updated = await this.prisma.normalPlace.update({
                    where: {
                        id: +place_id
                    },
                    data: {
                        location, policy, code, partner_id: partner_id != undefined ? +partner_id : null
                    }
                })

                return resolve(updated)
            }
        ))
    }
}

export default NormalPlaceRepository