import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import PartnerRepository from "../repositories/Partner.js";
import ValidatorRepository from "../repositories/Validator.js";

export const getAllPartners = asyncWrapper(
    async (req,res) => {
        let partners = await PartnerRepository.getAllPartners()
        return res.status(OK).json(partners)
    }
)

export const getAllPartnerPlaces = asyncWrapper(
    async (req,res) => {
        const {id: partner_id} = req.params
        let controlled_places = await PartnerRepository.getAllPartnerPlaces({ partner_id })
        return res.status(OK).json(controlled_places)
    }
)

export const getAllPartnerPlacesCount = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let controlled_places_count = await PartnerRepository.getAllPartnerPlacesCount(id)
        return res.status(OK).json(controlled_places_count)
    }
)

export const createPartner = asyncWrapper(
    async (req,res) => {
        const { name, phone_number } = req.body

        await ValidatorRepository.validateNotNull({
            name, phone_number
        })

        let result = await PartnerRepository.createPartner({ name, phone_number })
        return res.status(OK).json(result)
    }
)

export const updatePartner = asyncWrapper(
    async (req,res) => {
        const {id: partner_id} = req.params
        const { name, phone_number } = req.body
        let result = await PartnerRepository.updatePartner({ partner_id, name, phone_number })
        return res.status(OK).json(result)
    }
)

export const deletePartner = asyncWrapper(
    async (req,res) => {
        const {id: partner_id} = req.params
        let result = await PartnerRepository.deletePartner({ partner_id })
        return res.status(OK).json(result)
    }
)

export const createPartnerDashboard = asyncWrapper(
    async (req,res) => {
        const { id: partner_id } = req.params
        const { access_username, access_code } = req.body
        const result = await PartnerRepository.createPartnerDashboard({ partner_id, access_username, access_code })
        return res.status(OK).json(result)
    }
)