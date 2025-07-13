import { BAD_REQUEST, NOT_FOUND, UNPROCESSABLE } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";
import Auth from "./Auth.js";
import TimeRepository from "./Time.js";

class ManagerRepository {
    static prisma = PrismaClientService.instance

    static loginManager = async ({ username, password }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const manager = await this.prisma.manager.findFirst({
                    where: {
                        username
                    }
                })

                if(!manager){
                    const manager_not_found = new CustomError("Manager doesn't exists", NOT_FOUND)
                    return reject(manager_not_found)
                }

                const password_does_match = await Auth.decryptAndCheckPasswordMatch({
                    normal: password,
                    hashed: manager.password
                })

                if(!password_does_match) {
                    const password_mismatch = new CustomError("Password Mismatch", BAD_REQUEST)
                    return reject(password_mismatch)
                }

                const token = await Auth.generateToken(manager)

                return resolve({
                    manager: {
                        ...manager,
                        password: null
                    },
                    token
                })
            }
        )
    )

    static createManager = async ({ username, password }) => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const existing_manager = await this.prisma.manager.findFirst({
                    where: {
                        username
                    }
                })

                if(existing_manager){
                    const manager_already_exists_error = new CustomError('This username is not available', 400)
                    return reject(manager_already_exists_error)
                }

                const manager = await this.prisma.manager.create({
                    data: {
                        username,
                        password: await Auth.encryptPassword(password),
                        role: 'admin',
                        created_at: TimeRepository.getCurrentTime()
                    }
                })

                return resolve(manager)
            }
        )
    )
}

export default ManagerRepository