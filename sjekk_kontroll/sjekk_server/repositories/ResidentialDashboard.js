import { BAD_REQUEST } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";
import Auth from "./Auth.js";
import ResidentialDashboardHelper from "./ResidentialDashboardHelper.js";
import TimeRepository from "./Time.js";

class ResidentialDashboardRepository{
    static prisma = PrismaClientService.instance

    static createResidentialDashboard = async ({
        access_username, access_code, residential_quarter_id
    }) => new Promise(promiseAsyncWrapper(
        async (resolve) => {
            const created_at = TimeRepository.getCurrentTime()
            const {apartment_registration_qrcode, qrcode_link} = await ResidentialDashboardHelper.generateTicketQRCode({
                residential_quarter_id: +residential_quarter_id,
            })
            const dashboard = await this.prisma.residentialDashboard.create({
                data: {
                    access_username, 
                    access_code: await Auth.encryptPassword(access_code), 
                    residential_quarter_id: +residential_quarter_id, 
                    apartment_registration_qrcode: apartment_registration_qrcode,
                    apartment_registration_qrcode_link: qrcode_link,
                    created_at: created_at
                }
            })

            return resolve(dashboard)
        }
    ))

    static loginResidentialDashboard = async ({ access_username, access_code }) => new Promise(promiseAsyncWrapper(
        async (resolve, reject) => {
            const dashboard = await this.prisma.residentialDashboard.findFirst({
                where: {
                    access_username
                },
                include: {
                    residential_quarter: true
                }
            })

            if(!dashboard){
                const error = new CustomError('No such dashboard exists', BAD_REQUEST)
                return reject(error)
            }

            if(!await Auth.decryptAndCheckPasswordMatch({
                normal: access_code, 
                hashed: dashboard.access_code
            })){
                const error = new CustomError('Wrong password', BAD_REQUEST)
                return reject(error)
            }

            const token = await Auth.generateToken({
                residential_dashboard_id: dashboard.id,
                residential_quarter_id: dashboard.residential_quarter_id
            })

            return resolve({
                token,
                dashboard
            })
        }
    ))
}

export default ResidentialDashboardRepository