import { BAD_REQUEST, OK } from '../constants/status_codes.js'
import CustomError from '../interfaces/custom_error_class.js'
import asyncWrapper from '../middlewares/async_wrapper.js'
import ManagerRepository from '../repositories/Manager.js'

import ValidatorRepository from '../repositories/Validator.js'

export const registerComplaintManager = asyncWrapper(async (req,res, next) => {
    const {username,password} = req.body
    if(!username || username?.length == 0){
        let no_username_provided = new CustomError('No username provided', BAD_REQUEST)
        return next(no_username_provided)
    }

    if(!password || password?.length == 0){
        let no_password_provided = new CustomError('No password provided', BAD_REQUEST)
        return next(no_password_provided)
    }

    let response = await ManagerRepository.registerComplaintManager({
        username: username,
        password: password
    })

    return res.status(OK).json({
        success: true,
        manager: response
    })
})

export const loginComplaintManager = asyncWrapper(async (req,res,next) => {
    const {username,password} = req.body

    await ValidatorRepository.validateNotNull({
        username, password
    })

    let response = await ManagerRepository.loginComplaintManager({
        username: username,
        password: password
    })

    

    return res.status(OK).json(response)
})

export const addPermissionToComplaintManager = asyncWrapper(async (req,res) => {

})

export const removePermissionFromComplaintManager = asyncWrapper(async (req,res) => {

})