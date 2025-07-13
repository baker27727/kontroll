import { INTERNAL_SERVER, NOT_AUTHORIZED, OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ManagerRepository from "../repositories/Manager.js";
import ValidatorRepository from "../repositories/Validator.js";

export const loginManager = asyncWrapper(
    async (req,res) => {
        const { username, password } = req.body

        console.log(username, password);

        await ValidatorRepository.validateNotNull({
            username, password            
        })

        const response = await ManagerRepository.loginManager({
            username,
            password,
            ip_address: req.ip,
            hostname: req.hostname
        })

        const storeLogin = await ManagerRepository.storeLogin({
            ip_address: req.ip,
            hostname: req.hostname,
            token: response.token,
            manager_id: response.manager.id
        })

        return res.status(OK).json({
            token: response.token,
            manager: {
                ...response.manager,
                last_login_time: storeLogin.last_login_time
            }
        })
    }
)

export const createManager = asyncWrapper(
    async (req,res) => {
        const { name, username, linked_email, password } = req.body
        console.log(req.body);
        await ValidatorRepository.validateNotNull({
            name, username, linked_email, password
        })
        

        const response = await ManagerRepository.createManager({
            name,
            username,
            linked_email,
            password
        })

        return res.status(OK).json(response)
    }
)

export const verifyManagerToken = asyncWrapper(
    async (req,res) => {
        const { token } = req.body
        console.log(token);

        if(!token){
            return res.status(NOT_AUTHORIZED).json({
                error: 'Token not found'
            })
        }
        const response = await ManagerRepository.verifyManagerToken({ token })
        return res.status(OK).json(response)
    }
)

export const getAllManagers = asyncWrapper(
    async (req,res) => {
        const response = await ManagerRepository.getAllManagers()
        return res.status(OK).json(response)
    }
)

export const deleteManager = asyncWrapper(
    async (req,res) => {
        const { id } = req.params
        console.log(id);
        const response = await ManagerRepository.deleteManager({ manager_id: id })
        return res.status(OK).json(response)
    }
)

export const getManagerLogins = asyncWrapper(
    async (req,res) => {
        const { id } = req.params
        const response = await ManagerRepository.getManagerLogins({ manager_id: id })
        return res.status(OK).json(response)
    }
)

export const updateManager = asyncWrapper(
    async (req,res) => {
        const { id } = req.params
        const { name, username, linked_email } = req.body
        const response = await ManagerRepository.updateManager({ manager_id: id, name, username, linked_email })
        return res.status(OK).json(response)
    }
)