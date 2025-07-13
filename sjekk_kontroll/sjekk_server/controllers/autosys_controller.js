import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import AutosysRepository from "../repositories/Autosys.js";
import logger from "../utils/logger.js";

const getPlateInformation = asyncWrapper(
    async (req,res) => {
        const {id: plate_number} = req.params
        let result = await AutosysRepository.getPlateInformation({ plate_number })

        return res.status(OK).json(result)
    }
)

export default getPlateInformation