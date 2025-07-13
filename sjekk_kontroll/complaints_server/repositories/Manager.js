import { NOT_AUTHORIZED, NOT_FOUND } from '../constants/status_codes.js'
import CustomError from '../interfaces/custom_error_class.js'
import promiseAsyncWrapper from '../middlewares/promise_async_wrapper.js'
import bcrypt from 'bcrypt'
import PrismaClientService from '../utils/prisma_client.js'
import Auth from './Auth.js'
import DateRepository from './Date.js'

class ManagerRepository{
    static prisma = PrismaClientService.instance
    static registerComplaintManager({
        username,
        password,
    }){
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            let hashedPassword = await bcrypt.hash(password,10)
        

            let newComplaintManager = await this.prisma.manager.create({  
                data: {
                    username: username,
                    password: hashedPassword,
                    role: 'superuser',
                    created_at: DateRepository.getCurrentDateTime()
                }
            })

            return resolve(newComplaintManager)
        }))
    }

    static loginComplaintManager({username,password}){
        return new Promise(promiseAsyncWrapper(async (resolve, reject) =>{
            const manager = await this.prisma.manager.findUnique({
                where: {
                    username: username
                }
            })

            if(!manager){
                let manager_not_found_error = new CustomError('No manager was found', NOT_FOUND)
                return reject(manager_not_found_error)
            }

            let is_password_match = await Auth.decryptAndCheckPasswordMatch({
                plain: password,
                encrypted: manager.password
            })

            if(!is_password_match){
                let password_not_matched_error = new CustomError('Password is not matched', NOT_AUTHORIZED)
                return reject(password_not_matched_error)
            }

            const token = await Auth.generateToken({username: manager.username, role: manager.role, id: manager.id})

            return resolve({ token, manager } )
        }))
    }
}


export default ManagerRepository