import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import CarLogRepository from "../repositories/CarLog.js";

export const getAllCarLogs = asyncWrapper(
    async (req,res) => {
        const logs = await CarLogRepository.getAllLogs()
        return res.status(OK).json(logs)
    }
)

export const getAllPlaceCarLogs = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const logs = await CarLogRepository.getAllPlaceLogs(id)
        return res.status(OK).json(logs)
    }
)

export const getAllPlaceCarLogsCount = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const logs_count = await CarLogRepository.getAllPlaceCarLogsCount(id)
        return res.status(OK).json(logs_count)
    }
)

export const getAllPlaceCarLogsAvgTime = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const logs_count = await CarLogRepository.getAllPlaceCarLogsAvgTime(id)
        return res.status(OK).json(logs_count)
    }
)

export const generateCarLogsReport = asyncWrapper(
    async (req,res) => {
        const {logs} = req.body
        let result = await CarLogRepository.generateCarLogsReport(logs)
        return res.status(OK).json(result)
    }
)

export const getAllCarLogsReports = asyncWrapper(
    async (req,res) => {
        let result = await CarLogRepository.getAllCarLogsReports()
        return res.status(OK).json(result)
    }
)