import { jwt_secret_key, static_files_host } from "../config.js"
import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import Auth from "../repositories/Auth.js"
import TimeRepository from "../repositories/Time.js"
import ViolationRepository from "../repositories/Violation.js"
import ViolationHelperRepository from "../repositories/ViolationHelper.js"

export const getAllviolations = asyncWrapper(
    async (req,res) =>{
        const violations = await ViolationRepository.getAllViolations()
        return res.status(OK).json(violations)
    }
)

export const getViolationsCount = asyncWrapper(
    async (req,res) =>{
        const count = await ViolationRepository.getViolationsCount()
        return res.status(OK).send(count)
    }
)

export const getAllPlaceviolations = asyncWrapper(
    async (req,res) =>{
        const { id: place_id } = req.params

        const violations = await ViolationRepository.getAllPlaceViolations({
            place_id, 
            session_id: req.headers['x-session-id']
        })
        return res.status(OK).json(violations)
    }
)   

export const getAllUserViolations = asyncWrapper(
    async (req,res) =>{
        const {id: user_id} = req.params


        const violations = await ViolationRepository.getAllUserViolations({
            user_id, 
            session_id: req.headers['x-session-id']
        })
        return res.status(OK).json(violations)
    }
)

export const getViolation = asyncWrapper(
    async (req,res) =>{
        const { id: violation_id } = req.params
        const violation = await ViolationRepository.getViolation({ violation_id })
        return res.status(OK).json(violation)
    }
)

export const getViolationByTicketNumber = asyncWrapper(
    async (req,res) =>{
        const { id: ticket_number } = req.params
        const violation = await ViolationRepository.getViolationByTicketNumber({ ticket_number })
        return res.status(OK).json(violation)
    }
)


export const createViolation = asyncWrapper(
    async (req,res) =>{
        const { 
            plate_info, 
            registered_car, 
            rules, 
            is_car_registered, 
            ticket_comment, 
            system_comment, 
            place,
            place_login_time,
            print_option,
            serial_number, barcode_image, ticket_image, ticket_number, kid_number
        } = req.body

        console.log('inside create val');
        console.log(barcode_image);
        const { token } = req.headers

        const images = [];

        for (const image of req.files) {
            const processed_image = await ViolationHelperRepository.addDateWatermarkToImage(
                './public/images/temp_cars/' + image.originalname,
                image.originalname,
                image.fieldname
            )

            images.push({
                path: static_files_host + processed_image,
                date: image.fieldname,
                localPath: './public/images/temp_cars/' + image.originalname,
                originalName: image.originalname
            });
        }

        console.log(images);
        console.log(req.headers['x-session-id']);
        console.log(token);
        console.log(req.headers);

        const decoded = await Auth.verifyToken(token)

            console.log(decoded);


        const violation = await ViolationRepository.createViolation({
            user_id: decoded.id,
            pnid: decoded.pnid,
            session_id: req.headers['x-session-id'],
            plate_info: JSON.parse(plate_info),
            registered_car: is_car_registered === 'true' ? JSON.parse(registered_car) : null,
            rules: JSON.parse(rules),
            is_car_registered: is_car_registered === 'true',
            ticket_comment,
            system_comment,
            place: JSON.parse(place),
            images,
            created_by: decoded.id,
            print_option,
            place_login_time,
            serial_number,
            barcode_image,
            ticket_image,
            ticket_number: ticket_number,
            kid_number: kid_number
        })

        return res.status(OK).json(true)
    }
)

export const deleteViolation = asyncWrapper(
    async (req,res) =>{
        const { id: violation_id } = req.params
        const deleted = await ViolationRepository.deleteViolation({ violation_id })
        return res.status(OK).send(deleted)
    }
)

export const deleteAllViolations = asyncWrapper(
    async (req,res) =>{
        const response = await ViolationRepository.deleteAllViolations()
        return res.status(OK).send(response)
    }
)


export const addImage = asyncWrapper(
    async (req, res) =>{
        const { id: violation_id } = req.params
        const proccessed_image = await ViolationHelperRepository.addDateWatermarkToImage(
            './public/images/temp_cars/' + req.file.originalname,
            req.file.originalname,
            TimeRepository.getCurrentTime()
        )

        const image = {
            path: static_files_host + proccessed_image,
            date: TimeRepository.getCurrentTime(),
            localPath: './public/images/temp_cars/' + req.file.originalname,
            originalName: req.file.originalname
        }
        await ViolationRepository.addImage({ violation_id, image })
        return res.status(OK).send(static_files_host + proccessed_image)
    }
)

export const getTicketPreview = asyncWrapper(
    async (req,res) =>{
        const { 
            plate_info, 
            rules, 
            ticket_comment, 
            place,
            place_login_time,
            print_option
        } = req.body
        const { token } = req.headers

        console.log(req.body);


        const decoded = await Auth.verifyToken(token)



        const ticket_preview = await ViolationRepository.getTicketPreview({
            pnid: decoded.pnid,
            plate_info: plate_info,
            rules: rules,
            ticket_comment,
            place: place,
            place_login_time,
            print_option
        })

        return res.status(OK).json(ticket_preview)
    }
)