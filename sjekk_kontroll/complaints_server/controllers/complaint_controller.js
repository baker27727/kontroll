import { static_files_host } from "../configs.js";
import { BAD_REQUEST, OK } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ComplaintRepository from "../repositories/Complaint.js";


export const createComplaint = asyncWrapper(
    async (req,res) => {
        const {
            address, attachments, city, complaint_text, country, 
            email, first_name, last_name, postal_code, phone_number, ticket_number
        } = req.body
    
        const attachments_list = JSON.parse(attachments)
        for(let i = 0; i < req.files.length; i++) {
            attachments_list[i].filepath = static_files_host + req.files[i].path;
            attachments_list[i].filename = req.files[i].originalname
            attachments_list[i].filetype = req.files[i].mimetype
        }
    
    
        let response = await ComplaintRepository.createComplaint({
            address, attachments: attachments_list, city, complaint_text, country, 
            email, first_name, last_name, postal_code, phone_number, ticket_number
        })     
           
        return res.status(OK).json(response)
    }
)

export const getAllComplaints = asyncWrapper(async (req,res) => {
    let complaints = await ComplaintRepository.getAllComplaints()
    return res.status(OK).json(complaints)
})

export const getComplaint = asyncWrapper(async (req,res) => {
    const {id} = req.params

    let complaint = await ComplaintRepository.getComplaint(id)
    return res.status(OK).json(complaint)
})

export const performActionOnComplaint = asyncWrapper(async (req,res) => {
    const {id} = req.params
    const {message,status} = req.body

    console.log(req.body);

    if(!message || message?.length == 0) {
        return new CustomError('message is required | message is not empty',BAD_REQUEST)
    }

    if(!status || status?.length == 0) {
        return new CustomError('status is required | status is not empty',BAD_REQUEST)
    }

    let complaint = await ComplaintRepository.perfomActionOnComplaint(id,message,status)
    return res.status(OK).json(complaint)
})

export const deleteComplaint = asyncWrapper(async (req,res) => {
    const {id} = req.params

    let result = await ComplaintRepository.deleteComplaint(id)
    return res.status(OK).json(result)
})

export const getComplaintsCount = asyncWrapper(async (req,res) => {
    let result = await ComplaintRepository.getComplaintsCount()
    return res.status(OK).json(result)
})