import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ApartmentLocationRequestRepository from "../repositories/ApartmentLocationRequest.js";

export const getAllApartmentLocationRequests = asyncWrapper(
    async (req, res) => {
        const result = await ApartmentLocationRequestRepository.getAllApartmentLocationRequests()
        return res.status(OK).json(result)
    }
)

export const createApartmentLocationRequest = asyncWrapper(
    async (req, res) => {
        const { id: apartment_id } = req.params
        const { access_username, access_code } = req.body
        const result = await ApartmentLocationRequestRepository.createApartmentLocationRequest({ apartment_id, access_username, access_code })
        return res.status(OK).json(result)
    }
)