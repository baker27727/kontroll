import moment from "moment";
import { jwt_secret_key } from "../config.js";
import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ShiftRepository from "../repositories/Shift.js";
import ShiftHelper from "../repositories/ShiftHelper.js";
import jwt from 'jsonwebtoken'
import UserRepository from "../repositories/User.js";
import Auth from "../repositories/Auth.js";

export const getAllShifts = asyncWrapper(
    async (req,res) =>{
        let shifts = await ShiftRepository.getAllShifts()
        return res.status(OK).json(shifts)
    }
)

export const getAllTodayShifts = asyncWrapper(
    async (req,res) =>{
        let shifts = await ShiftRepository.getAllTodayShifts();
        return res.status(OK).json(shifts)
    }
)

export const getShiftsByDate = asyncWrapper(
    async (req,res) =>{
        let { date } = req.body
        let shifts = await ShiftRepository.getShiftsByDate(date)
        return res.status(OK).json(shifts)
    }
)

export const searchLogins = asyncWrapper(
    async (req,res) =>{
        let { start_date, end_date, place } = req.body
        let shifts = await ShiftRepository.getAllShifts()
        let result = []

        for(let shift of shifts){
            for(let placeLogin of shift.logins){
                let login_time = moment(placeLogin.login_time)
                let logout_time = moment(placeLogin.logout_time)

                let start = moment(start_date)
                let end = moment(end_date)

                let isBetween = login_time.isAfter(start) && logout_time.isBefore(end)

                if(isBetween && placeLogin.place_id == place){
                    let user = await UserRepository.getUser(shift.user_identifier)
                    result.push({
                        login_time: login_time.format('DD.MM.YY HH:mm'),
                        logout_time: logout_time.format('DD.MM.YY HH:mm'),
                        place: placeLogin.place_name,
                        user: user.user_identifier
                    })
                }
            }
        }
        return res.status(OK).json(result)
    }
)

export const createReport = asyncWrapper(
    async (req,res) => {
        const {results, start_date, end_date} = req.body
        let result = await ShiftHelper.generateReport(results, start_date, end_date)
        return res.status(OK).json(result)
    }
)

export const getUserShifts = asyncWrapper(
    async (req,res) =>{
        const { id } = req.params
        let shifts = await ShiftRepository.getUserShifts(id)
        return res.status(OK).json(shifts)
    }
)

export const createShift = asyncWrapper(
    async (req,res) =>{
        const { token } = req.headers
        console.log(req.headers);

        const decoded = await Auth.verifyToken(token)
        
        const shift = await ShiftRepository.createShift({
            user_id: decoded.id,
            pnid: decoded.pnid, 
            session_id: req.headers['x-session-id']
        })
        return res.status(OK).json(shift)
    }
)

export const endShift = asyncWrapper(
    async (req,res) =>{
        const { id } = req.params
        const {logins} = req.body

        await ShiftRepository.endShift(id, JSON.parse(logins))
        return res.status(OK).json({
            message: 'shift was ended'
        })
    }
)