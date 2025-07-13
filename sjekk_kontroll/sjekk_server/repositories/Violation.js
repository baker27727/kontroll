import { NOT_FOUND } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import moment from "moment";
import ViolationHelperRepository from "./ViolationHelper.js";
import UserRepository from "./User.js";
import PlaceRepository from "./Place.js";
import { account_number, iban_numner, kid_number, swift_code } from "../config.js";
import PrismaClientService from "../utils/prisma_client.js";
import TimeRepository from "./Time.js";

import Randomstring from "randomstring";
import axios from "axios";
import Auth from "./Auth.js";
import PaymentRepository from "./Payment.js";
import { io } from "../server.js";
import SocketPocket from "../constants/socket_pocket.js";

class ViolationRepository{
    static prisma = PrismaClientService.instance

    static getAllViolations(){
        return new Promise(promiseAsyncWrapepr(
            async(resolve) =>{
                const violations = await this.prisma.violation.findMany({
                    orderBy: {
                        created_at: 'desc'
                    },
                    include: {
                        place: true,
                        created_by: true,
                        images: true,
                        rules: {
                            include: {
                                extras_values: true,
                                extras: true
                            }
                        },
                        ticket_info: true,
                        plate_info: true,
                        payment: {
                            include: {
                                metadata: {
                                    include: {
                                        card_holder_details: true,
                                    }
                                }
                            }
                        }
                    }
                })
                return resolve(violations)
            }
        ))
    }

    static getViolationsCount(){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                const count = await this.prisma.violation.count()
                return resolve(count)
            }
        ))
    }


    // static updateViolation(id, data){
    //     return new Promise(promiseAsyncWrapepr(
    //         async(resolve, reject) =>{
    //             let result = await Violation.updateOne({_id: id}, data)

    //             return resolve(result.modifiedCount)
    //         }
    //     ))
    // }

    static getAllPlaceViolations({ place_id, session_id }){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                const violations = await this.prisma.violation.findMany({
                    where: {
                        place_id: +place_id,
                        session_id
                    },
                    orderBy: {
                        created_at: 'desc'
                    },
                    include: {
                        place: true,
                        created_by: true,
                        rules: {
                            include: {
                                extras_values: true
                            }
                        },
                        plate_info: true,
                        ticket_info: true,
                        images: true,
                        payment: {
                            include: {
                                metadata: {
                                    include: {
                                        card_holder_details: true
                                    }
                                }
                            }
                        }
                    }
                })

                console.log(violations);
                
                return resolve(violations)
            }
        ))
    }

    static getAllUserViolations({ user_id, session_id }){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                const violations = await this.prisma.violation.findMany({
                    where: {
                        user_id: +user_id,
                        session_id
                    },
                    orderBy: {
                        created_at: 'desc'
                    },
                    include: {
                        place: true,
                        created_by: true,
                        rules: {
                            include: {
                                extras_values: true
                            }
                        },
                        images: true,
                        plate_info: true,
                        ticket_info: true,
                        payment: {
                            include: {
                                metadata: {
                                    include: {
                                        card_holder_details: true
                                    }
                                }
                            }
                        }
                    }
                })

                console.log(violations);
                
                return resolve(violations)
            }
        ))
    }

    static getViolation({ violation_id }){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                const violation = await this.prisma.violation.findUnique({
                    where: {
                        id: +violation_id
                    },
                    include: {
                        place: true,
                        created_by: true,
                        rules: {
                            include: {
                                extras_values: true,
                                extras: true
                            }
                        },
                        images: true,
                        plate_info: true,
                        ticket_info: true,
                        payment: {
                            include: {
                                metadata: {
                                    include: {
                                        card_holder_details: true
                                    }
                                }
                            }
                        }
                    }
                })

                return resolve(violation)
            }
        ))
    }

    static getViolationByTicketNumber({ ticket_number }){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                const ticketInfo = await this.prisma.ticketInfo.findFirst({
                    where: {
                        ticket_number
                    }
                })

                if(!ticketInfo) return reject(new CustomError('Ticket not found', NOT_FOUND))

                const violation = await this.prisma.violation.findFirst({
                    where: {
                        id: ticketInfo.violation_id
                    },
                    include: {
                        payment: {
                            include: {
                                metadata: {
                                    include: {
                                        card_holder_details: true
                                    }
                                }
                            }
                        },
                        place: true,
                        created_by: true,
                        rules: {
                            include: {
                                extras_values: true,
                                extras: true
                            }
                        },
                        images: true,
                        plate_info: true,
                        ticket_info: true
                    }
                })

                return resolve(violation)
            }
        ))
    }

    static createViolation({
        user_id, pnid, ticket_comment, system_comment, place, rules, session_id,
        images, plate_info, is_car_registered, registered_car, place_login_time, print_option,
        serial_number, barcode_image, ticket_image, ticket_number, kid_number
    }){
        return new Promise(promiseAsyncWrapepr(
            async(resolve) =>{
                let created_at = TimeRepository.getCurrentTime()
                
                const total_charge = rules.reduce((acc,val) => acc + val.charge, 0)


                const { car_model, plate_number, manufacture_year, car_description, car_type, car_color, country_name, country_code   } = plate_info
                const { location, code, policy, id: place_id } = place

                const created = await this.prisma.violation.create({
                    data: {
                        user_id: +user_id,
                        ticket_comment,
                        system_comment,
                        place_id: +place_id,
                        images: {
                            create: images.map(image => ({
                                path: image.path,
                                date: image.date
                            }))
                        },
                        created_at,
                        place_login_time,
                        print_option,
                        total_charge,
                        ticket_info: {
                            create: {
                                ticket_number,
                                ticket_image,
                                print_option,
                                barcode_image,
                                serial_number,
                                kid: kid_number,
                                created_at
                            }
                        },
                        rules: {
                            create: [
                                ...rules.map(rule => ({
                                    ...rule,
                                    extras_values: {
                                        create: rule.extras_values
                                    },
                                    extras: {
                                        create: rule.extras
                                    },
                                    id: undefined
                                }))
                            ]
                        },
                        plate_info: {
                            create: {
                                car_model,
                                plate_number,
                                manufacture_year,
                                car_description,
                                car_type,
                                car_color,
                                country_name,
                                country_code
                            }
                        },
                        is_car_registered,
                        session_id: session_id,
                    }
                })

                await axios.post('https://finance.gensolv.no/api/sanctions', {
                    kid_number: kid_number.toString(),
                    control_number: ticket_number,
                    total_charge: total_charge,
                    violated_at: created.created_at,
                    employee_pnid: pnid,
                    rules: rules.map(rule => {
                        return {
                            name: rule.name,
                            charge: rule.charge
                        }
                    })
                })

                const intent = await PaymentRepository.createPaymentIntent({
                    amount: total_charge,
                    currency: 'nok',
                    metadata: {
                        kid: kid_number
                    }
                })


                await this.prisma.payment.create({
                    data: {
                        violation_id: created.id,
                        kid_number: kid_number,
                        required_amount: total_charge,
                        status: 'idle',
                        init_date: created.created_at,
                        refund: undefined,
                        plate_number: plate_number,
                        control_number: ticket_number,
                        sanction_id: created.id,
                        payment_intent_client_secret: intent.client_secret,

                        metadata: undefined

                    }
                })

                await this.prisma.paymentLogs.create({
                    data: {
                        action: `payment initialization for ticket ${ticket_number} with kid ${kid_number}`,
                        details: `Payment intent created for ticket ${ticket_number} with kid ${kid_number}`,
                        level: 'info',
                        timestamp: (new Date()).toString()
                    }
                })

                io.emit(SocketPocket.EMITS.NOTIFY_VIOLATION_CREATION, {})
                io.emit(SocketPocket.EMITS.NOTIFY_PAYMENT_INITIALIZATION, {})


                return resolve(created)
            }
        ))
    }

    static deleteViolation({ violation_id }){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                const deleted_at = await TimeRepository.getCurrentTime()
                const deleted = await this.prisma.violation.update({
                    where: {
                        id: +violation_id
                    },
                    data: {
                        deleted_at
                    }
                })

                return resolve(true)
            }
        ))
    }

    static deleteAllViolations(){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                await Violation.deleteMany({})
                return resolve(true)
            }
        ))
    }

    static addImage({ violation_id, image}){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                await this.prisma.violation.update({
                    where: {
                        id: +violation_id
                    },
                    data: {
                        images: {
                            create: {
                                path: image.path,
                                date: image.date
                            }
                        }
                    }
                })
                return resolve(image)
            }
        ))
    }

    static getTicketPreview({
        pnid, ticket_comment, place, rules, plate_info, print_option, place_login_time
    }){
        return new Promise(promiseAsyncWrapepr(
            async(resolve) =>{
                let created_at = TimeRepository.getCurrentTime()
                let ticketNumber = ViolationHelperRepository.generateTicketNumber()
                
                const total_charge = rules.reduce((acc,val) => acc + val.charge, 0)

                const serial_number = ViolationHelperRepository.generateRealSerialNumber()
                let barcode_image = await ViolationHelperRepository.generateTicketBarcode(serial_number)

                const { car_model, plate_number, manufacture_year, car_description, car_type, car_color, country_name, country_code   } = plate_info
                const { location, code, policy, id: place_id } = place
                const kid_number = Randomstring.generate({ length: 10, charset: 'numeric' })
                let { ticket_link, qrcode_link } = await ViolationHelperRepository.generateTicketImage(ticketNumber,barcode_image,{
                    ticket_number: ticketNumber,
                    rules: rules,
                    ticket_comment: ticket_comment,
                    from_date: created_at,
                    to_date: created_at,
                    pnid: pnid,
                    print_option,
                    place_login_time,
                    car_info:{
                        car_model,
                        plate_number,
                        manufacture_year,
                        car_description,
                        car_type,
                        car_color,
                        country_name,
                        country_code
                    },
                    location: location,
                    ticket_info:{
                        total_charge: total_charge,
                        paid_to: 'Sjekk Kontroll',
                        account_number: account_number,
                        kid_number: kid_number,
                        swift_code: swift_code,
                        iban_number: iban_numner,
                        payment_date: moment(created_at, 'DD.MM.YYYY HH:mm').add(3, 'weeks').format('DD.MM.YYYY'),
                    }
                })

                return resolve({ 
                    ticket_link, 
                    qrcode_link, 
                    serial_number, 
                    ticket_number: ticketNumber, 
                    barcode_link: barcode_image,
                    kid_number: kid_number
                 })
            }
        ))
    }
}

export default ViolationRepository