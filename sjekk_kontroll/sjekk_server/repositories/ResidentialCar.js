import { BAD_REQUEST } from "../constants/status_codes.js"
import CustomError from "../interfaces/custom_error_class.js"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import { scheduleCarForRemove } from "../utils/car_deletion_cron.js"
import PrismaClientService from "../utils/prisma_client.js"
import AutosysRepository from "./Autosys.js"
import TimeRepository from "./Time.js"
import moment from "moment"

class ResidentialCarRepository{
    static prisma = PrismaClientService.instance
    
    static getAllResidentialCars = async () => new Promise(promiseAsyncWrapper(
        async (resolve) =>{
            const cars = await this.prisma.residentialCar.findMany({
                where: {
                    deleted_at: null
                },
                include: {
                    registered_car: true,
                    apartment: true,
                    residential_quarter: true
                }
            })

            console.log(cars);
            

            return resolve(cars)
        }
    ))

    static getResidentialCarsByQuarter = async ({ residential_quarter_id }) => new Promise(promiseAsyncWrapper(
        async (resolve) =>{
            const cars = await this.prisma.residentialCar.findMany({
                where: {
                    residential_quarter_id: +residential_quarter_id,
                    deleted_at: null
                },
                include: {
                    registered_car: true,
                    apartment: true
                }
            })

            return resolve(cars)
        }
    ))

    static getApartmentsCars = async ({ apartment_id }) => new Promise(promiseAsyncWrapper(
        async (resolve) =>{
            const cars = await this.prisma.residentialCar.findMany({
                where: {
                    apartment_id: +apartment_id,
                    deleted_at: null
                },
                include: {
                    registered_car: true
                }
            })

            return resolve(cars)
        }
    ))

    static registerResidentialCar = async ({ plate_number, parking_type, subscription_plan_days, residential_quarter_id, apartment_id, country }) => new Promise(promiseAsyncWrapper(
        async (resolve, reject) => {
            const checkResidentialQuarterRegistrationConstraint = await this.prisma.systemCar.findFirst({
                where: {
                    residential_quarter_id: +residential_quarter_id,
                    plate_number: plate_number.toUpperCase().replace(/\s/g, ''),
                    registration_type: parking_type.toLowerCase().replace(/\s/g, ''),
                    car_type: apartment_id ? 'apartment' : 'residential'
                }
            })

            if(checkResidentialQuarterRegistrationConstraint && checkResidentialQuarterRegistrationConstraint.registration_type == 'guest'){
                
                const lastRegistrationTime = checkResidentialQuarterRegistrationConstraint.last_registered_date
                const diffInDays = moment(TimeRepository.getCurrentTime(), 'DD.MM.YYYY HH:mm').diff(moment(lastRegistrationTime, 'DD.MM.YYYY HH:mm'), 'days')

                if(diffInDays < 2){
                    if(checkResidentialQuarterRegistrationConstraint.car_type == 'apartment'){
                        const error = new CustomError(`You can not register a car to an apartment more than once every two days.`, BAD_REQUEST)
                        return reject(error)
                    }
                    
                    const error = new CustomError(`You can not register a car to a residential quarter more than once every two days.`, BAD_REQUEST)
                    return reject(error)
                }
            }

            const created_at = TimeRepository.getCurrentTime()
            const car_data = country == null || country?.code == 'no' ? 
                await AutosysRepository.getPlateInformation({ plate_number })
                : {
                    car_model: null,
                    car_color: null,
                    car_type: null,
                    car_description: null,
                    manufacture_year: null
                }


            const residentialQ = await this.prisma.residentialQuarter.findUnique({
                where: {
                    id: +residential_quarter_id
                }
            })

            if(residentialQ.current_total_registered_cars >= residentialQ.max_cars_registrations){
                const error = new CustomError('Max cars registrations reached', BAD_REQUEST)
                return reject(error)
            }
            

            const isRegistrationExist = await this.prisma.registeredCar.findFirst({
                where: {
                    plate_number,
                    deleted_at: null,
                    registration_type: apartment_id ? 'apartment' : 'residential',
                    residential_car: {
                        parking_type: {
                            equals: parking_type
                        },
                        residential_quarter_id: +residentialQ.id,
                        apartment_id: +apartment_id      
                    },
                },
                include: {
                    residential_car: true
                }
            })

            console.log(parking_type);

            if(isRegistrationExist && isRegistrationExist.residential_car.parking_type == parking_type){
                console.log('is ege is fired');
                const error = new CustomError(`Car already registered as ${isRegistrationExist.residential_car.parking_type}`, BAD_REQUEST)
                return reject(error)
            }

            const registeredCar = await this.prisma.registeredCar.create({
                data: {
                    plate_number: plate_number.toUpperCase().replace(/\s/g, ''),
                    car_model: car_data.car_model,
                    car_color: car_data.car_color,
                    car_type: car_data.car_type,
                    car_description: car_data.car_description,
                    manufacture_year: car_data.manufacture_year,
                    registration_type: 'residential',
                    place_id: residentialQ.place_id,
                    registration_date: created_at,
                    expire_date: TimeRepository.increaseTimeByHours({
                        current_time: created_at,
                        hours: residentialQ.guest_free_days
                    }),

                    residential_car: {
                        create: {
                            subscription_plan_days: +subscription_plan_days,
                            parking_type,
                            residential_quarter_id: +residentialQ.id,
                            apartment_id: +apartment_id
                        }
                    }
                    
                }
            })

            if(!checkResidentialQuarterRegistrationConstraint && registeredCar != null){
                await this.prisma.systemCar.create({
                    data: {
                        residential_quarter_id: +residential_quarter_id,
                        plate_number: plate_number.toUpperCase().replace(/\s/g, ''),
                        registration_type: 'guest',
                        last_registered_date: TimeRepository.increaseTimeByHours({
                            current_time: created_at,
                            days: residentialQ.guest_free_days
                        }),
                        car_type: apartment_id ? 'apartment' : 'residential'
                    }
                })
            }

            if(registeredCar != null){
                await this.prisma.residentialQuarter.update({
                    where: {
                        id: +residential_quarter_id
                    },
                    data: {
                        current_total_registered_cars: {
                            increment: 1
                        }
                    }
                })

    
                await this.prisma.carLog.create({
                    data: {
                        start_date: created_at,
                        end_date: registeredCar.expire_date,
                        created_at,
                        registered_by: 'residential',
                        place_location: residentialQ.location,
                        place_code: residentialQ.code,
                        place_policy: residentialQ.policy,
                        plate_number: plate_number.toUpperCase().replace(/\s/g, ''),
                        car_model: car_data.car_model,
                        car_color: car_data.car_color ,
                        car_type: car_data.car_type,
                        car_description: car_data.car_description,
                        place_id: +residential_quarter_id
                    }
                })
            }

            return resolve(registeredCar)
        }
    ))

    static deleteResidentialCar = async ({ residential_car_id }) => new Promise(promiseAsyncWrapper(
        async (resolve, reject) => {

            const registeredCar = await this.prisma.residentialCar.update({
                where: {
                    id: +residential_car_id
                },
                data: {
                    deleted_at: TimeRepository.getCurrentTime()
                }
            })

            await this.prisma.residentialQuarter.update({
                where: {
                    id: registeredCar.residential_quarter_id
                },
                data: {
                    current_total_registered_cars: {
                        decrement: 1
                    }
                }
            })

            await this.prisma.registeredCar.update({
                where: {
                    id: registeredCar.registered_car_id
                },
                data: {
                    deleted_at: TimeRepository.getCurrentTime()
                }
            })
            return resolve(true)
        }
    ))

    static getResidentialDashboardStatistics = async ({ residential_quarter_id }) => new Promise(promiseAsyncWrapper(
        async (resolve) => {
            const guest_cars_count = await this.prisma.residentialCar.count({
                where: {
                    residential_quarter_id: +residential_quarter_id,
                    parking_type: 'guest'
                }
            })

            const reserved_cars_count = await this.prisma.residentialCar.count({
                where: {
                    residential_quarter_id: +residential_quarter_id,
                    parking_type: 'reserved',
                }
            })

            const total_cars_count = await this.prisma.residentialCar.count({
                where: {
                    residential_quarter_id: +residential_quarter_id
                }
            })

            return resolve({
                guest_cars_count,
                reserved_cars_count,
                total_cars_count
            })
        }
    ))
}

export default ResidentialCarRepository