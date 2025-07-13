import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import NormalPlaceRepository from "../repositories/NormalPlace.js"
import ValidatorRepository from "../repositories/Validator.js"

export const getAllNormalPlaces = asyncWrapper(
    async (req, res) => {
        const result = await NormalPlaceRepository.getAllNormalPlaces()
        return res.status(OK).json(result)
    }
)

export const createNormalPlace = asyncWrapper(
    async (req, res) => {
        const { location, policy, code, partner_id } = req.body

        await ValidatorRepository.validateNotNull({ location, policy, code })

        const result = await NormalPlaceRepository.createNormalPlace({ location, policy, code, partner_id })
        return res.status(OK).json(result)
    }
)

export const updateNormalPlace = asyncWrapper(
    async (req, res) => {
        const { id: place_id } = req.params
        const { location, policy, code } = req.body

        await ValidatorRepository.validateNotNull({ location, policy, code })

        const result = await NormalPlaceRepository.updateNormalPlace({ location, policy, code, place_id })
        return res.status(OK).json(result)
    }
)