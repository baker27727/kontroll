import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import ResidentialCarRepository from "../repositories/ResidentialCar.js"
import ValidatorRepository from "../repositories/Validator.js"

export const registerResidentialCar = asyncWrapper(
    async (req, res) => {
        const { plate_number, parking_type, subscription_plan_days, residential_quarter_id, apartment_id, country } = req.body
        await ValidatorRepository.validateNotNull({ plate_number, parking_type, subscription_plan_days, residential_quarter_id })
        const result = await ResidentialCarRepository.registerResidentialCar({ plate_number, parking_type, subscription_plan_days, residential_quarter_id, apartment_id, country })
        return res.status(OK).json(result)
    }
)

export const getAllResidentialCars = asyncWrapper(
    async (req, res) => {
        const result = await ResidentialCarRepository.getAllResidentialCars()
        return res.status(OK).json(result)
    }
)

export const getResidentialCarsByQuarter = asyncWrapper(
    async (req, res) => {
        const { id: residential_quarter_id } = req.params
        const result = await ResidentialCarRepository.getResidentialCarsByQuarter({ residential_quarter_id })
        return res.status(OK).json(result)
    }
)

export const getApartmentsCars = asyncWrapper(
    async (req, res) => {
        const { id: apartment_id } = req.params
        const result = await ResidentialCarRepository.getApartmentsCars({ apartment_id })
        return res.status(OK).json(result)
    }
)

export const deleteResidentialCar = asyncWrapper(
    async (req, res) => {
        const { id: residential_car_id } = req.params
        const result = await ResidentialCarRepository.deleteResidentialCar({ residential_car_id })
        return res.status(OK).json(result)
    }
)

export const getResidentialDashboardStatistics = asyncWrapper(
    async (req, res) => {
        const { id: residential_quarter_id } = req.params
        const result = await ResidentialCarRepository.getResidentialDashboardStatistics({ residential_quarter_id })
        return res.status(OK).json(result)
    }
)