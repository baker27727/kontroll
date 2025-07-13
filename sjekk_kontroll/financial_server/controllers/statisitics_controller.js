import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import StatisticsRepository from "../repositories/Statistics.js"

export const getStatistics = asyncWrapper(
    async (req,res) => {
        const statistics = await StatisticsRepository.getStatistics()
        res.status(OK).json(statistics)
    }
)


export const getSanctionsChartData = asyncWrapper(
    async (req,res) => {
        const chart = await StatisticsRepository.getSanctionsChartData()
        res.status(OK).json(chart)
    }
)