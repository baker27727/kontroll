import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import Shift from "../models/Shift.js"
import { PrismaClient } from "@prisma/client"
import TimeRepository from "./Time.js"

class ShiftRepository{
    static prisma = new PrismaClient()
    static getAllShifts(){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                const shifts = await this.prisma.shift.findMany({})
                return resolve(shifts)
            }
        ))
    }

    static getAllTodayShifts(){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                let current_date = moment('YYYY-MM-DD')
                let shifts = await this.prisma.shift.findMany({
                    where: {
                        start_date: {
                            lte: current_date
                        }
                    }
                })
                shifts = shifts.filter((shift) => {
                    let start_date = moment(moment(shift.start_date).format('YYYY-MM-DD'))
                    return moment(start_date).isSame(current_date)
                })

                return resolve(shifts)
            }
        ))
    }

    static getUserShifts({ user_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) => {

                const shifts = await this.prisma.shift.findMany({
                    where: {
                        user_id: +user_id
                    }
                })
                return resolve(shifts)
            }
        ))
    }

    static getShiftsByDate(date){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) => {
                let shifts = await Shift.find({ start_date: date }).sort({
                    created_at: 'desc'
                })
                return resolve(shifts)
            }
        ))
    }

    static createShift({ user_id, session_id, pnid }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                let current_date = TimeRepository.getCurrentTime()

                const shift = await this.prisma.shift.create({
                    data: {
                        start_date: current_date,
                        created_at: current_date,
                        pnid,
                        session_id,
                        user_id: user_id
                    },
                    include: {
                        logins: true
                    }
                })

                return resolve(shift)
            }
        ))
    }

    static endShift(shift_id, logins){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                const updated = await this.prisma.shift.update({
                    where: {
                        id: +shift_id
                    },
                    data: {
                        end_date: TimeRepository.getCurrentTime(),
                    }
                })

                await this.prisma.userPlaceLogin.createMany({
                    data: [
                        ...logins.map((login) => {
                            return {
                                login_time: login.login_time,
                                logout_time: login.logout_time,
                                place_name: login.place_name,
                                shift_id: +shift_id,
                            }
                        })
                    ]
                })
                return resolve(updated)
            }
        ))
    }
}

export default ShiftRepository