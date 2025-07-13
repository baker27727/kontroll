import AuthRepository from "../repositories/Auth.js"
import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ValidatorRepository from "../repositories/Validator.js";

export const loginUser = asyncWrapper(
    async (req, res, next) => {
        const { pnid, password } = req.body
        console.log(req.body);
    
        await ValidatorRepository.validateNotNull({ pnid, password })

        let success_login_result = await AuthRepository.loginUser({ pnid, password })   
    
        return res.status(OK).json(success_login_result)
    }
)

export const loginPartner = asyncWrapper(
    async (req, res,) => {
        const { access_code, access_username } = req.body
        await ValidatorRepository.validateNotNull({ access_username, access_code })
        const success_login_result = await AuthRepository.loginPartner({ access_code, access_username })   
    
        return res.status(OK).json(success_login_result)
    }
)

export const loginPlace = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const {access_code, access_username} = req.body
        console.log(access_code, access_username);
        
        await ValidatorRepository.validateNotNull({access_code, access_username})

        let success_login_result = await AuthRepository.loginPlace({id, access_code, access_username})

        return res.status(OK).json(success_login_result)
    }
)

export const validateToken = asyncWrapper(
    async (req, res) => {
        const { token } = req.body
        console.log(token);
        let decoded = await AuthRepository.verifyToken(token)
        console.log(decoded);
        return res.status(OK).json(decoded)
    }
)

export const loginApartment = asyncWrapper(
    async (req, res) => {
        const { access_password, access_username } = req.body
        
        await ValidatorRepository.validateNotNull({ access_password, access_username })
        const success_login_result = await AuthRepository.loginApartment({ access_password, access_username })           
    
        return res.status(OK).json(success_login_result)
    }
)