import { BAD_REQUEST, NOT_AUTHORIZED } from "../constants/status_codes.js"

import jwt from 'jsonwebtoken'
import CustomError from "../interfaces/custom_error_class.js"
import asyncWrapper from "./async_wrapper.js"
import Auth from "../repositories/Auth.js"

const ValidateApiToken = asyncWrapper(async (req, res, next) =>{
    const { token } = req.headers

    if(!token){
        let missing_token_error = new CustomError('Please provide api token',BAD_REQUEST)
        return next(missing_token_error)
    }
    
    try{
        await Auth.verifyToken(token)
    }catch(error){
        let not_authorized_error = new CustomError('Invalid API token, Unauthorized',NOT_AUTHORIZED)
        return next(not_authorized_error)
    }
    
    return next()
})


export default ValidateApiToken