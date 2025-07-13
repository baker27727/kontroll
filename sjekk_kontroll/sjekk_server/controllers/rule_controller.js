import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import RuleRepository from "../repositories/Rule.js";

export const getAllRules = asyncWrapper(
    async (req,res) => {
        const rules = await RuleRepository.getAllRules();
        return res.status(OK).json(rules);
    }
)

export const getRulesCount = asyncWrapper(
    async (req,res) => {
        const count = await RuleRepository.getRulesCount();
        return res.status(OK).send(count);
    }
)

export const getRule = asyncWrapper(
    async (req,res) => {
        const { id: rule_id } = req.params
        const rule = await RuleRepository.getRule({ rule_id })
        return res.status(OK).json(rule)
    }
)

export const createRule = asyncWrapper(
    async (req,res) => {
        const { name, charge, policy_time, extras } = req.body
        const rule = await RuleRepository.createRule({ name, charge, policy_time, extras })
        return res.status(OK).json(rule)
    }
)

export const updateRule = asyncWrapper(
    async (req,res) => {
        const { name, charge, policy_time, extras } = req.body
        const { id: rule_id } = req.params

        const updated = await RuleRepository.updateRule({ rule_id, name, charge, policy_time, extras })
        return res.status(OK).json(updated)
    }
)

export const deleteRule = asyncWrapper(
    async (req,res) => {
        const { id: rule_id } = req.params
        const deleted = await RuleRepository.deleteRule({ rule_id })
        return res.status(OK).json(deleted)
    }
)

export const deleteAllRules = asyncWrapper(
    async (req,res) => {
        await RuleRepository.deleteAllRules();
        return res.status(OK).json(true)
    }
)