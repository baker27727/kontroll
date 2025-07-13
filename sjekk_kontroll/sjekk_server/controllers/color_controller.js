import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import ColorRepository from "../repositories/Color.js"

export const getAllColors = asyncWrapper(
    async (req,res) => {
        let colors = await ColorRepository.getAllColors()
        return res.status(OK).json(colors)
    }
)

export const createColor = asyncWrapper(
    async (req,res) => {
        const {color} = req.body
        let result = await ColorRepository.createColor(color)

        return res.status(OK).send(result)
    }
)

export const deleteColor = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let result = await ColorRepository.deleteColor(id)

        return res.status(OK).send(result)
    }
)