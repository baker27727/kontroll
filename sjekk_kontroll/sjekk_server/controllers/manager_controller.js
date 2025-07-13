import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ManagerRepository from "../repositories/Manager.js";
import ValidatorRepository from "../repositories/Validator.js";

export const createManager = asyncWrapper(
    async (req,res) => {
        const { username, password } = req.body
        await ValidatorRepository.validateNotNull({ username, password })

        const manager = await ManagerRepository.createManager({ username, password })
        return res.status(OK).json(manager)
    }
)

export const loginManager = asyncWrapper(
    async (req,res) => {
        const { username, password } = req.body
        console.log({username, password});
        
        await ValidatorRepository.validateNotNull({ username, password })

        const manager = await ManagerRepository.loginManager({ username, password })

        return res.status(OK).json(manager)
    }
)