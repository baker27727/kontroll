import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import ResidentialPlaceRepository from "../repositories/ResidentialQuarter.js"
import ValidatorRepository from "../repositories/Validator.js"

export const getAllResidentialQuarters = asyncWrapper(
    async (req, res) => {
        const result = await ResidentialPlaceRepository.getAllResidentialQuarters()
        return res.status(OK).json(result)
    }
)


export const createResidentialQuarter = asyncWrapper(
    async (req, res) => {
        const { location, policy, code, max_cars_registrations, quarter_name, guest_parking_hours, max_cars_by_apartment } = req.body

        await ValidatorRepository.validateNotNull({ location, policy, code, max_cars_registrations, quarter_name, guest_parking_hours, max_cars_by_apartment })

        const result = await ResidentialPlaceRepository.createResidentialQuarter({ location, policy, code, max_cars_registrations, quarter_name, guest_parking_hours, max_cars_by_apartment })
        return res.status(OK).json(result)
    }
)