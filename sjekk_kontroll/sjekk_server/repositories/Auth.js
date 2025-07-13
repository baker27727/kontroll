import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { jwt_secret_key } from '../config.js'
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import CustomError from "../interfaces/custom_error_class.js";
import { BAD_REQUEST, NOT_FOUND } from "../constants/status_codes.js";

import { PrismaClient } from "@prisma/client"
import randomstring from "randomstring";


class Auth{
    static prisma = new PrismaClient()

    static encryptPassword(password){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                let hashedPassword = await bcrypt.hash(password,10)
                return resolve(hashedPassword)
            }
        ))
    }

    static decryptAndCheckPasswordMatch({ normal, hashed }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                let isMatch = await bcrypt.compare(normal,hashed)    
                return resolve(isMatch)
            }
        ))
    }

    static generateToken(data, expiresIn = '30d'){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                let token = jwt.sign(
                    data,
                    jwt_secret_key,
                    {expiresIn}
                )
                return resolve(token)
            }
        ))
    }

    static verifyToken(token){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                let decoded = jwt.verify(token,jwt_secret_key)
                return resolve(decoded)
            }
        ))
    }

    static async loginPartner({access_username, access_code}){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                
                const dashboard = await this.prisma.partnerDashboard.findUnique({
                    where: {
                        access_username,
                        partner: {
                            deleted_at: null
                        }
                    },
                    include: {
                        partner: true
                    }
                })

                if(!dashboard){
                    let partner_not_found_error = new CustomError('No partner was found', NOT_FOUND)
                    return reject(partner_not_found_error)
                }

                if(dashboard.access_code != access_code){
                    let access_code_not_match = new CustomError('Access code is incorrect', BAD_REQUEST)
                    return reject(access_code_not_match)
                }

                const token = await this.generateToken({
                    access_username, access_code
                }, '3h')

                console.log(token);
                console.log(dashboard.partner);

                return resolve({
                    token, partner: dashboard.partner
                })
            }
        ))
    }

    static loginPlace({ access_username, access_code }){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                const dashboard = await this.prisma.normalPlaceDashboard.findUnique({
                    where: {
                        access_username
                    }
                })

                if(!dashboard){
                    let place_profile_not_found_error = new CustomError('No dashboard username was found', NOT_FOUND)
                    return reject(place_profile_not_found_error)
                }

                if(dashboard.access_code != access_code){
                    let access_code_not_match = new CustomError('Access code is incorrect', BAD_REQUEST)
                    return reject(access_code_not_match)
                }

                let token = await this.generateToken({
                    access_username, access_code
                }, '3h')

                return resolve({
                    token: token,
                    place_dashboard: dashboard
                })
            }
        ))
    }

    static async loginUser({pnid, password}){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                const user = await this.prisma.user.findUnique({
                    where: {
                        pnid
                    }
                })

                console.log(user);

                if(!user){
                    let user_not_found_error = new CustomError('No user was found', NOT_FOUND)
                    return reject(user_not_found_error)
                }

                if(user.deleted_at != null){
                    let user_deleted_error = new CustomError('User has been deleted', BAD_REQUEST)
                    return reject(user_deleted_error)
                }

                if(!await this.decryptAndCheckPasswordMatch({normal: password, hashed: user.password})){
                    let password_not_match = new CustomError('Password is incorrect', BAD_REQUEST)
                    return reject(password_not_match)
                }

                const token = await this.generateToken({
                    pnid, id: user.id
                }, '12h')

                const session_id = `session-${randomstring.generate(20)}`


                return resolve({ token, user, 'x-session-id': session_id })
            }
        ))
    }

    static loginApartment = async ({ access_password, access_username }) => new Promise(promiseAsyncWrapper(
        async (resolve, reject) => {
            const apartment = await this.prisma.apartment.findFirst({
                where: {
                    username: access_username
                },
                include: {
                    residential_quarter: true
                }
            })

            if(!apartment){
                const error = new CustomError('No such apartment exists', BAD_REQUEST)
                return reject(error)
            }

            
            if(!await this.decryptAndCheckPasswordMatch({normal: access_password, hashed: apartment.password})){
                const error = new CustomError('Wrong password', BAD_REQUEST)
                return reject(error)
            }

            const token = await this.generateToken({
                id: apartment.id
            })

            return resolve({
                token,
                apartment
            })
        }
    ))
            
}

export default Auth