import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import AutosysRepository from "./Autosys.js";
import CustomError from "../interfaces/custom_error_class.js";
import { BAD_REQUEST, NOT_FOUND } from "../constants/status_codes.js";

import { PrismaClient } from "@prisma/client"
import TimeRepository from "./Time.js";
import { scheduleCarForRemove } from "../utils/car_deletion_cron.js";
import { io } from "../server.js";
import SocketPocket from "../constants/socket_pocket.js";

class PlaceRepository{
    static prisma = new PrismaClient()
    static getAllPlaces(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) =>{
                    const places = await this.prisma.place.findMany({
                        where: {
                            deleted_at: null
                        },
                        orderBy: {
                            created_at: 'desc'
                        },
                        include: {
                            normal_place: true,
                            residential: true
                        }
                    })
                    return resolve(places)
                }
            )
        )
    }

    static getPlacesCount(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) =>{
                    const count = await this.prisma.place.count()
                    return resolve(count)
                }
            )
        )
    }

    static getPlace({ place_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const place = await this.prisma.place.findUnique({
                    where: {
                        id: +place_id
                    }
                })


                return resolve(place)
            }
        ))
    }

    static createPlace({ location, policy, code }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const created_at = TimeRepository.getCurrentTime()
                const place = await this.prisma.place.create({
                    data: {
                        location, policy, code, created_at, is_verified: true
                    }
                })
                return resolve(place)
            }
        ))
    }

    static updatePlace({ place_id, location, policy, code, partner_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const updated = await this.prisma.place.update({
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

    static deletePlace({ place_id }){
        console.log(" i got deleted");
        console.log(place_id);
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const deleted_at = TimeRepository.getCurrentTime()
                const deleted = await this.prisma.place.update({
                    where: {
                        id: +place_id
                    },
                    data: {
                        deleted_at
                    }
                })

                if(deleted.place_type == 'residential'){
                    const x = await this.prisma.residentialQuarter.update({
                        where: {
                            place_id: +place_id
                        },
                        data: {
                            deleted_at: deleted_at
                        },
                        include: {
                            residential_dashboard: true
                        }
                    })

                    if(x.residential_dashboard != null){
                        await this.prisma.residentialDashboard.delete({
                            where: {
                                residential_quarter_id: x.id
                            }
                        })
                    }
                }else if(deleted.place_type == 'normal'){
                    const x = await this.prisma.normalPlace.update({
                        where: {
                            place_id: deleted.id
                        },
                        data: {
                            deleted_at: deleted_at
                        }
                    })
                }
    
                return resolve(deleted)
            }
        ))
    }

    static async deletePlaceDashboard ({ dashboard_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const deleted = await this.prisma.normalPlaceDashboard.delete({
                    where: {
                        id: +dashboard_id
                    }
                })
    
                return resolve(deleted)
            }
        ))
    }

    static deleteAllPlaces(){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const deleted_at = await TimeRepository.getCurrentTime()
                const deleted = await this.prisma.place.updateMany({
                    where: {
                        deleted_at: null
                    },
                    data: {
                        deleted_at
                    }
                })

                await this.prisma.normalPlace.updateMany({
                    where: {
                        deleted_at: null
                    },
                    data: {
                        deleted_at
                    }
                })

                await this.prisma.residentialQuarter.updateMany({
                    where: {
                        deleted_at: null
                    },
                    data: {
                        deleted_at
                    }
                })

                await this.prisma.apartment.updateMany({
                    where: {
                        deleted_at: null
                    },
                    data: {
                        deleted_at
                    }
                })
                
                return resolve(deleted)
            }
        ))
    }

    static createPlaceDashboard({ place_id, access_code, access_username, place_name, place_type, free_parking_hours }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const created_at = TimeRepository.getCurrentTime()
                const dashboard = await this.prisma.normalPlaceDashboard.create({
                    data: {
                        normal_place_id: +place_id, 
                        access_code, access_username,
                        place_name, place_type, free_parking_hours, created_at
                    }
                })

                return resolve(dashboard)
            }
        ))
    }

    static getAllPlaceDashboards({ place_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const dashboards = await this.prisma.normalPlaceDashboard.findMany({
                    where: {
                        normal_place_id: +place_id
                    },
                    include: {
                        notification_subscriptions: true
                    }
                })
                return resolve(dashboards)
            }
        ))
    }

    static async createCarFromPlaceDashboard({ plate_number, dashboard_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                const dashboard = await this.prisma.normalPlaceDashboard.findUnique({
                    where: {
                        id: +dashboard_id
                    },
                    include: {
                        normal_place: true
                    }
                })

                let is_car_registered = await this.prisma.registeredCar.findFirst({
                    where: {
                        plate_number: plate_number.toUpperCase().replace(/\s/g, ''),
                        deleted_at: null,
                        residential_car: null,
                        normal_car: {
                            normal_place_id: +dashboard.normal_place_id
                        }
                    },
                    include: {
                        residential_car: false,
                        normal_car: true
                    }
                })

                console.log(is_car_registered);
                

                if(is_car_registered){
                    const registeration_already_exists = new CustomError('Car is already registered', BAD_REQUEST)
                    return reject(registeration_already_exists)
                }

                let place_dashboard = await this.prisma.normalPlaceDashboard.findUnique({
                    where: {
                        id: +dashboard_id
                    },
                    include: {
                        normal_place: true
                    }
                })

                if(!place_dashboard){
                    let place_profile_not_found = new CustomError('Place Dashboard not found', NOT_FOUND)
                    return reject(place_profile_not_found)
                }

                const free_parking_hours = place_dashboard.free_parking_hours
                const start_date =  TimeRepository.getCurrentTime()
                const created_at = TimeRepository.getCurrentTime()
                const autosys_car_data = await AutosysRepository.getPlateInformation({
                    plate_number: plate_number.toUpperCase().replace(/\s/g, '')
                })



                const car = await this.prisma.registeredCar.create({
                    data: {
                        normal_car: {
                            create:{
                                normal_place_id: place_dashboard.normal_place.id,
                                free_parking_hours,
                                created_at,
                                registeration_source: 'normal_place_dashboard',
                            }
                        },
                        manufacture_year: autosys_car_data.manufacture_year ?? 'N/A',
                        car_model: autosys_car_data.car_model ?? 'N/A',
                        car_description: autosys_car_data.car_description ?? 'N/A',
                        car_color: autosys_car_data.car_color ?? 'N/A',
                        car_type: autosys_car_data.car_type ?? 'N/A',
                        plate_number: plate_number.toUpperCase().replace(/\s/g, ''),
                        registration_date: start_date,
                        expire_date: TimeRepository.increaseTimeByHours({
                            hours: +free_parking_hours,
                            current_time: start_date
                        }),
                        registration_type: 'normal',
                        place_id: place_dashboard.normal_place.place_id,
                    }
                })

                io.emit(SocketPocket.EMITS.NOTIFY_APP_WITH_CAR_REGISTRATION, {})

                scheduleCarForRemove({
                    car_id: car.id,
                    expirationDate: car.expire_date
                })

                await this.prisma.carLog.create({
                    data: {
                        start_date: created_at,
                        end_date: TimeRepository.increaseTimeByHours({
                            hours: +free_parking_hours,
                            current_time: created_at
                        }),
                        created_at: created_at,
                        registered_by: 'public_dashboard',
                        place_location: place_dashboard.normal_place.location,
                        place_code: place_dashboard.normal_place.code,
                        place_policy: place_dashboard.normal_place.policy,
                        plate_number: plate_number.toUpperCase().replace(/\s/g, ''),
                        car_model: autosys_car_data.car_model,
                        car_color: autosys_car_data.car_color,
                        car_type: autosys_car_data.car_type,
                        car_description: autosys_car_data.car_description,
                        place_id: +place_dashboard.normal_place.place_id
                    }
                })
        
                // await scheduleCarForRemove(+free_parking_time, car.id)
                return resolve(car)
            }
        ))
    }

    static async getAllCarsRegisteredByPlaceDashboard({ place_dashboard_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                const dashboard = await this.prisma.normalPlaceDashboard.findUnique({
                    where: {
                        id: +place_dashboard_id
                    },
                    include: {
                        normal_place: true
                    }
                })
                let registered_cars = await this.prisma.normalCar.findMany({
                    where: {
                        normal_place_id: dashboard.normal_place_id,
                        deleted_at: null
                    },
                    include: {
                        registered_car: true
                    }
                })

                registered_cars = registered_cars.map(car => {
                    return {
                        start_date: car.registered_car.registration_date,
                        end_date: car.registered_car.expire_date,
                        plate_number: car.registered_car.plate_number
                    }
                })

                console.log(registered_cars);
                
                return resolve(registered_cars)
            }
        ))
    }
}


export default PlaceRepository