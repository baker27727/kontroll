import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import ApartmentRequestRepository from "../repositories/ApartmentRequest.js"
import ValidatorRepository from "../repositories/Validator.js"

export const getAllApartmentRequests = asyncWrapper(
    async (req, res) => {
        const result = await ApartmentRequestRepository.getAllApartmentRequests()
        return res.status(OK).json(result)
    }
)

export const createApartmentRequest = asyncWrapper(
    async (req, res) => {
        const { id: residential_quarter_id } = req.params
        const { owner_name, username, password, apartment_number, email, building_number, floor_number } = req.body
        await ValidatorRepository.validateNotNull({ owner_name, username, password, apartment_number, email, residential_quarter_id, building_number, floor_number })
        const result = await ApartmentRequestRepository.createApartmentRequest({ owner_name, username, password, apartment_number, email, residential_quarter_id, building_number, floor_number })
        return res.status(OK).json(result)
    }
)

export const getApartmentRequestsByResidentialQuarter = asyncWrapper(
    async (req, res) => {
        const { id: residential_quarter_id } = req.params
        const result = await ApartmentRequestRepository.getApartmentRequestsByResidentialQuarter({ residential_quarter_id })
        return res.status(OK).json(result)
    }
)

export const acceptApartmentRequest = asyncWrapper(
    async (req, res) => {
        const { id: apartment_request_id } = req.params
        const result = await ApartmentRequestRepository.acceptApartmentRequest({ apartment_request_id })
        return res.status(OK).json(result)
    }
)

export const rejectApartmentRequest = asyncWrapper(
    async (req, res) => {
        const { id: apartment_request_id } = req.params
        const result = await ApartmentRequestRepository.rejectApartmentRequest({ apartment_request_id })
        return res.status(OK).json(result)
    }
)