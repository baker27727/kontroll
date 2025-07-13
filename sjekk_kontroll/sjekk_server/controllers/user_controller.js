import UserRepository from "../repositories/User.js"
import moment from "moment"
import { INTERNAL_SERVER, NOT_CHANGED, NOT_FOUND, OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import CustomError from "../interfaces/custom_error_class.js"

export const getAllUsers = asyncWrapper(
    async (req, res) => {
        const users = await UserRepository.getAllUsers()
        return res.status(OK).json(users)
    }
    
)

export const getAllDeletedUsers = asyncWrapper(
    async (req, res) => {
        const users = await UserRepository.getAllDeletedUsers()
        return res.status(OK).json(users)
    }
    
)

export const getUsersCount = asyncWrapper(
    async (req, res) => {
        const count = await UserRepository.getUsersCount()
        return res.status(OK).send(count)
    }
    
)

export const createUser = asyncWrapper(
    async (req, res) => {
        const { name, pnid, password } = req.body
        const registered = await UserRepository.createUser({ name, pnid, password })

        return res.status(OK).json(registered)
    }
)


export const getUser = asyncWrapper(
    async (req, res) => {
        const { id: user_id } = req.params
    
        const user = await UserRepository.getUser({ user_id })
    
        return res.status(OK).json(user)
    }
)

export const updateUser = asyncWrapper(
    async (req, res) => {
        const { id: user_id } = req.params
        const { name, pnid, password } = req.body



        const updated = await UserRepository.updateUser({ user_id, name, pnid, password })

        return res.status(OK).json(updated)
    }
)
export const deleteUser = asyncWrapper(
    async (req, res) => {
        const { id: user_id } = req.params

        console.log(req.params);

        const result = await UserRepository.deleteUser({ user_id })

        return res.status(OK).json(result)
    }
)
export const deleteAllUsers = asyncWrapper(
    async (req, res) => {
        const count = await UserRepository.deleteAllUsers()
    
        return res.status(OK).json({ 
            count: count,
            message: 'All users were deleted successfully'
        })
    }
)