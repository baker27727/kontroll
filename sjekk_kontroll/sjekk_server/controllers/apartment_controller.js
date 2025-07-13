import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import ApartmentPlaceRepository from "../repositories/Apartment.js"
import ValidatorRepository from "../repositories/Validator.js"

export const createApartment = asyncWrapper(
    async (req, res) => {
        const { location, policy, code } = req.body

        await ValidatorRepository.validateNotNull({ location, policy, code })
        const result = await ApartmentPlaceRepository.createApartment({ location, policy, code })
        return res.status(OK).json(result)
    }
)


export const changeApartmentPassword = asyncWrapper(
    async (req, res) => {
        const { id: apartment_id } = req.params
        const { old_password, new_password } = req.body
        const result = await ApartmentPlaceRepository.changeApartmentPassword({
            old_password, new_password, apartment_id
        })
        return res.status(OK).json(result)
    }
)

export const getAllApartments = asyncWrapper(
    async (req, res) => {
        const result = await ApartmentPlaceRepository.getAllApartment()
        return res.status(OK).json(result)
    }
)


export const getApartmentsByResidentialQuarter = asyncWrapper(
    async (req, res) => {
        const { id: residential_quarter_id } = req.params
        const result = await ApartmentPlaceRepository.getApartmentsByResidentialQuarter({ residential_quarter_id })
        return res.status(OK).json(result)
    }
)