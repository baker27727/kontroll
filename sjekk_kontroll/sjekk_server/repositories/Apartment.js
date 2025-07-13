import { BAD_REQUEST } from "../constants/status_codes.js"
import CustomError from "../interfaces/custom_error_class.js"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import PrismaClientService from "../utils/prisma_client.js"
import Auth from "./Auth.js"
import TimeRepository from "./Time.js"

class ApartmentRepository{

    static prisma = PrismaClientService.instance
    static getAllApartment(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) =>{
                    const places = await this.prisma.apartment.findMany({
                        include: {
                            residential_quarter: true
                        }
                    })
                    return resolve(places)
                }
            )
        )
    }

    static getApartmentsByResidentialQuarter = async ({ residential_quarter_id }) => new Promise(
        promiseAsyncWrapper(
            async (resolve) =>{                
                const places = await this.prisma.apartment.findMany({
                    where: {
                        residential_quarter_id: +residential_quarter_id
                    }
                })
                return resolve(places)
            }
        )
    )

    static createApartment({ location, policy, code }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) => {
                    const place = await this.prisma.place.create({
                        data: {
                            location,
                            policy,
                            code,
                            place_type: 'apartment',
                            created_at: TimeRepository.getCurrentTime(),
                            apartment: {
                                create: {
                                    location,
                                    policy,
                                    code,
                                }
                            }
                        }
                    })

                    return resolve(place)
                }
            )
        )
    }

    static changeApartmentPassword({ apartment_id, old_password, new_password }){
        console.log(apartment_id);
        console.log(old_password);
        console.log(new_password);
        
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    const apartment = await this.prisma.apartment.findUnique({
                        where: {
                            id: +apartment_id
                        }
                    })

                    console.log(apartment);
                    

                    if(!(await Auth.decryptAndCheckPasswordMatch({normal: old_password, hashed: apartment.password}))){
                        const not_same_password_error = new CustomError('Old password is incorrect', BAD_REQUEST)
                        return reject(not_same_password_error)
                    }

                    const updated_apartment = await this.prisma.apartment.update({
                        where: {
                            id: +apartment_id
                        },
                        data: {
                            password: await Auth.encryptPassword(new_password)
                        }
                    })
                    return resolve(updated_apartment)
                }
            )
        )
    }
}

export default ApartmentRepository