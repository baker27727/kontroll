import axios from "axios"
import ValidatorRepository from "../repositories/Validator.js"
import { sjekk_api_url } from "../configs.js"
import CustomError from "../interfaces/custom_error_class.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import { BAD_REQUEST, OK } from "../constants/status_codes.js"
import PrismaClientService from "../utils/prisma_client.js"

export const loginClientToTicket = asyncWrapper(
    async (req, res, next) => {
        const { plate_number, ticket_number } = req.body
        await ValidatorRepository.validateNotNull({ plate_number, ticket_number })

        const searchedComplaint = await PrismaClientService.instance.complaint.findFirst({
            where: {
                ticket_number: ticket_number,
                status: 'pending'
            }
        })

        if(searchedComplaint != null){
            const complaint_already_requested = new CustomError('Complaint already requested', BAD_REQUEST)
            return next(complaint_already_requested)
        }
    
        let searched_violation = await axios.get(`${sjekk_api_url}/violations/number/${ticket_number}`)

        if(searched_violation.status != 200){
            const ticket_number_mismatch = new CustomError('Ticket number mismatch', BAD_REQUEST)
            return next(ticket_number_mismatch)
        }
    
        if(searched_violation.data.plate_info.plate_number.toUpperCase().trim() != plate_number.toUpperCase().trim()){
            const plate_number_mismatch = new CustomError('Plate number mismatch', BAD_REQUEST)
            return next(plate_number_mismatch)
        }

        if(searched_violation.data.payment?.status == 'completed'){
            const ticket_already_paid = new CustomError('Ticket already paid and closed', BAD_REQUEST)
            return next(ticket_already_paid)
        }
    
    
        return res.status(OK).json(searched_violation.data)
    }
)