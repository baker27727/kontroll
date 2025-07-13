import AuthRepository from "./Auth.js"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import moment from "moment"
import CustomError from "../interfaces/custom_error_class.js"
import { ALREADY_EXISTS } from "../constants/status_codes.js"

import { PrismaClient } from "@prisma/client"
import TimeRepository from "./Time.js"

import Randomstring from "randomstring"

class UserRepository{
    static prisma = new PrismaClient()
    static async createUser({ name, pnid, password }){
        return new Promise(
            promiseAsyncWrapper(async (resolve,reject) => {
                const encrypted_password = await AuthRepository.encryptPassword(password)
                const created_at = await TimeRepository.getCurrentTime()  

                const searched_user = await this.prisma.user.findUnique({ where: { pnid } })

                if(searched_user != null && searched_user.deleted_at == null){
                    return reject(
                        new CustomError("User already exists", ALREADY_EXISTS)
                    )
                }
    
                const user = await this.prisma.user.create({
                    data: {
                        name,
                        pnid,
                        password: encrypted_password,
                        unique_code: `U-PN-${Randomstring.generate(8)}`,
                        created_at
                    }
                })
                return resolve(user)
            })
        )
    }

    static async getAllUsers(){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                const users = await this.prisma.user.findMany({
                    where: { deleted_at: null }
                })

                return resolve(users)
            }
        ))
    }

    static async getAllDeletedUsers(){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                const users = await this.prisma.user.findMany({
                    where: { deleted_at: { not: null } }
                })

                return resolve(users)
            }
        ))
    }

    static getUsersCount(){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                const count = await this.prisma.user.count()
                return resolve(count)
            }
        ))
    }

    static getUser({ user_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                const user = await this.prisma.user.findUnique({ where: { id: +user_id } })
                return resolve(user)
            }
        ))
    }

    static getUserByPnid({ pnid }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                const user = await this.prisma.user.findUnique({ where: { pnid } })
                return resolve(user)
            }
        ))
    }

    static updateUser({ user_id, name, pnid, password }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                const updated_at = await TimeRepository.getCurrentTime()

                const encrypted_password = password != undefined ? await AuthRepository.encryptPassword(password) : undefined

                const updated = await this.prisma.user.update({
                    where: { id: +user_id },
                    data: { name, pnid, password: encrypted_password, updated_at }
                })
                resolve(updated)
            }
        ))
    }

    static deleteUser({ user_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                const deleted_at = await TimeRepository.getCurrentTime()

                const result = await this.prisma.user.update({
                    where: { id: +user_id },
                    data: { deleted_at }
                })

                return resolve(true)
            }
        ))
    }

    static deleteAllUsers(){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                const deleted_at = await TimeRepository.getCurrentTime()
                const result = await this.prisma.user.updateMany({
                    where: { deleted_at: null },
                    data: { deleted_at: deleted_at }
                })
                return resolve(result.count)
            }
        ))
    }
}

export default UserRepository