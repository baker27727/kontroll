import moment from "moment";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import parseFileType from "../utils/parse_file.type.js";
import CustomError from "../interfaces/custom_error_class.js";
import { NOT_AUTHORIZED } from "../constants/status_codes.js";
import PrismaClientService from "../utils/prisma_client.js";
import EmailRepository from "./Email.js";
import DateRepository from "./Date.js";

class ComplaintRepository{
    static prisma = PrismaClientService.instance

    static createComplaint({
        address, attachments, city, complaint_text, country, 
        email, first_name, last_name, postal_code, phone_number, ticket_number
    }){
        return new Promise(promiseAsyncWrapper(async (resolve, reject) =>{
            const complaint = await this.prisma.complaint.create({
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    address: address,
                    postal_code: postal_code,
                    city: city,
                    country: country,
                    phone_number: phone_number,
                    email: email,
                    complaint_text: complaint_text,
                    ticket_number: ticket_number,
                    created_at: DateRepository.getCurrentDateTime()
                }
            })

            await this.prisma.complaintAttachments.createMany({
                data: attachments.map(attachment => {
                    return {
                        file_type: parseFileType(attachment.filetype),
                        file_path: attachment.filepath,
                        file_name: attachment.filename,
                        complaint_id: complaint.id
                    }
                })
            })
            

            await EmailRepository.sendMail({
                subject: `Complaint recieved`,
                to: email,
                text: `Complaint recieved with number ${ticket_number} and pending`,
                html: `<h3>Complaint recieved with number ${ticket_number} and pending</h3>`
            })
            
            return resolve(complaint);
        }))
    }

    static getAllComplaints(){
        return new Promise(promiseAsyncWrapper(async (resolve, reject) =>{
            const complaints = await this.prisma.complaint.findMany({
                include: {
                    attachments: true
                }
            })

            return resolve(complaints)
        }))
    }

    static getComplaint(id){
        return new Promise(promiseAsyncWrapper(async (resolve, reject) =>{
            const complaint = await this.prisma.complaint.findUnique({
                where: {
                    id: +id
                },
                include: {
                    attachments: true
                }
            })

            return resolve(complaint)
        }))
    }

    static perfomActionOnComplaint(id,message,status){
        return new Promise(promiseAsyncWrapper(async (resolve, reject) =>{
            const complaint = await this.prisma.complaint.update({
                where: {
                    id: +id
                },
                data: {
                    status: status
                }
            })

            await EmailRepository.sendMail({
                subject: `Svar på saken ${complaint.ticket_number}`,
                to: complaint.email,
                text: message,
                html: `<p>${message}</p>`
            })

            return resolve(true)
        }))
    }

    static deleteComplaint(id) {
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            await this.prisma.$transaction(async (prisma) => {
                await prisma.complaintAttachments.deleteMany({
                    where: {
                        complaint_id: +id
                    }
                });

                await prisma.complaint.delete({
                    where: {
                        id: +id
                    }
                });
            });
            return resolve(true);
        }));

    }

    static getComplaintsCount(){
        return new Promise(promiseAsyncWrapper(async (resolve, reject) =>{
            const count = await this.prisma.complaint.count()
            return resolve(count)
        }))
    }
}

export default ComplaintRepository