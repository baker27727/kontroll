import { NOT_AUTHORIZED, NOT_FOUND } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";
import Authentication from "./Authentication.js";
import TimeRepository from "./Time.js";

class ManagerRepository {
    static prisma = PrismaClientService.instance

    static loginManager = async ({ username, password, ip_address, hostname }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const manager = await this.prisma.manager.findFirst({
                where: {
                    username
                }
            })

            if (!manager) {
                let login_manager_error = new CustomError(
                    "Manager not found",
                    NOT_FOUND
                );
                return reject(login_manager_error)
            }

            const isMatch = await Authentication.decryptAndCheckPasswordMatch({
                normal: password,
                hashed: manager.password
            })

            if (!isMatch) {
                let login_manager_error = new CustomError(
                    "Wrong password",
                    NOT_AUTHORIZED
                );
                return reject(login_manager_error)
            }

            const token = await Authentication.generateToken({
                hostname,
                ip_address,
                manager_id: manager.id,
                role: manager.role
            })

            // const hashed_token = await Authentication.encryptPassword(token)

            return resolve({
                token,
                manager: {
                    ...manager,
                    password: undefined
                }
            })
        })
    )

    static updateLastLoginTime = async ({ manager_id }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const current_time = TimeRepository.getCurrentDateTime()

            await this.prisma.manager.updateMany({
                where: {
                    id: +manager_id
                },
                data: {
                    last_login_time: current_time
                }
            })
            resolve(current_time)
        })
    )

    static storeLogin = async ({ ip_address, hostname, token, manager_id }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const login = await this.prisma.login.create({
                data: {
                    ip_address,
                    hostname,
                    manager_id: +manager_id,
                    token,
                    login_time: TimeRepository.getCurrentDateTime(),
                    created_at: TimeRepository.getCurrentDateTime()
                }
            })

            const last_login_time = await this.updateLastLoginTime({ manager_id })

            resolve({
                login,
                last_login_time
            })
        })
    )

    static createManager = async ({ name, username, linked_email, password }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const manager = await this.prisma.manager.create({
                data: {
                    username,
                    password: await Authentication.encryptPassword(password),
                    name,
                    linked_email,
                    role: 'supervisor',
                    created_at: TimeRepository.getCurrentDateTime()
                }
            })
            resolve(manager)
        })
    )

    static verifyManagerToken = async ({ token }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const decoded = await Authentication.verifyToken(token)

            console.log(decoded);
            resolve(decoded)
        })
    )

    static getAllManagers = async () => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const managers = await this.prisma.manager.findMany({
                where: {
                    deleted_at: null
                }
            })
            resolve(managers)
        })
    )

    static deleteManager = async ({ manager_id }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            await this.prisma.manager.update({
                where: {
                    id: +manager_id
                },
                data: {
                    deleted_at: TimeRepository.getCurrentDateTime()
                }
            })
            resolve()
        })
    )

    static getManagerLogins = async ({ manager_id }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const logins = await this.prisma.login.findMany({
                where: {
                    manager_id: +manager_id
                }
            })
            resolve(logins)
        })
    )

    static updateManager = async ({ manager_id, name, username, linked_email }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const manager = await this.prisma.manager.update({
                where: {
                    id: +manager_id
                },
                data: {
                    name,
                    username,
                    linked_email
                }
            })
            resolve(manager)
        })
    )
}

export default ManagerRepository