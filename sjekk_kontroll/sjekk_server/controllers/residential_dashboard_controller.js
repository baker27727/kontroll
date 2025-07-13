import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import ResidentialDashboardRepository from "../repositories/ResidentialDashboard.js";
import ValidatorRepository from "../repositories/Validator.js";

export const createResidentialDashboard = asyncWrapper(
    async (req,res) => {
        const { access_username, access_code, residential_quarter_id } = req.body
        
        await ValidatorRepository.validateNotNull({ 
            access_username, access_code, residential_quarter_id
        })

        
        const result = await ResidentialDashboardRepository.createResidentialDashboard({
            access_username, access_code, residential_quarter_id
        })
        return res.status(OK).json(result)
    }
)

export const loginResidentialDashboard = asyncWrapper(
    async (req,res) => {
        const { access_username, access_code } = req.body

        await ValidatorRepository.validateNotNull({ access_username, access_code })

        const result = await ResidentialDashboardRepository.loginResidentialDashboard({ access_username, access_code })
        return res.status(OK).json(result)
    }
)