import { INTERNAL_SERVER } from "../constants/status_codes.js"
import CustomError from "../interfaces/custom_error_class.js"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js"
import PlaceModel from "../models/Place.js"
import CarLogModel from "../models/CarLogs.js"
import TimeRepository from "./Time.js"

import { PrismaClient } from "@prisma/client"

class PartnerRepository{
    static prisma = new PrismaClient()

    static getAllPartners(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                const partners = await this.prisma.partner.findMany({
                    where: {
                      deleted_at: null  
                    },
                    include: {
                        dashboard: true,
                    }
                })

                return resolve(partners)
            }
        ))
    }

    static getAllPartnerPlaces({ partner_id }){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                const places = await this.prisma.normalPlace.findMany({
                    where: {
                        partner_id: +partner_id,
                        deleted_at: null
                    }
                })
                console.log(partner_id);
                console.log(places);

                return resolve(places)
            }
        ))
    }

    static getAllPartnerPlacesCount({ partner_id }){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                const count = await this.prisma.place.count({
                    where: {
                        partner_id: +partner_id
                    }
                })

                return resolve(count)
            }
        ))
    }

    static deletePartner({ partner_id }){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                const deleted_at = await TimeRepository.getCurrentTime()
                const deleted = await this.prisma.partner.update({
                    where: {
                        id: +partner_id
                    },
                    data: {
                        deleted_at
                    }
                })

                return resolve(deleted)
            }
        ))
    }

    static createPartner({ name, phone_number }){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                const created_at = await TimeRepository.getCurrentTime()

                let created_partner = await this.prisma.partner.create({
                    data: {
                        name, phone_number,
                        created_at
                    }
                })
                if(!created_partner){
                    let creating_partner_error = new CustomError('Error Creating parking provider', INTERNAL_SERVER)
                    return reject(creating_partner_error)
                }

                return resolve(created_partner)
            }
        ))
    }

    static updatePartner({ partner_id, name, phone_number }){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                const updated = await this.prisma.partner.update({
                    where: {
                        id: +partner_id
                    },
                    data: {
                        name, phone_number
                    }
                })

                return resolve(updated)
            }
        ))
    }

    static createPartnerDashboard({ partner_id, access_username, access_code }){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                const updated = await this.prisma.partnerDashboard.create({
                    data: {
                        access_username, access_code,
                        partner_id: +partner_id
                    }
                })

                return resolve(updated)
            }
        ))
    }
}


export default PartnerRepository