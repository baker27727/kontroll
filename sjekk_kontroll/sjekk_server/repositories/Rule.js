import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import moment from "moment";

import { PrismaClient } from "@prisma/client"
import TimeRepository from "./Time.js";

class RuleRepository{
    static prisma = new PrismaClient()
    static getAllRules(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                const rules = await this.prisma.rule.findMany({
                    where: { deleted_at: null },
                    include: {
                        extras: true
                    }
                })
                return resolve(rules)
            }
        ))
    }

    static getRulesCount(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                const count = await this.prisma.rule.count()
                return resolve(count)
            }
        ))
    }

    static getRule({ rule_id }){
        return new Promise(
            promiseAsyncWrapepr(
                async (resolve, reject) => {
                    const rule = await this.prisma.rule.findFirst({ 
                        where: { id: +rule_id }
                    })
                    return resolve(rule)
                }
            )
        )
    }

    static createRule({ name, charge, policy_time, extras }){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                let created_at = await TimeRepository.getCurrentTime()
                const rule = await this.prisma.rule.create({
                    data: {
                        name, charge: +charge, policy_time: +policy_time, created_at
                    }
                })

                await this.prisma.extras.create({
                    data: {
                        rule_id: rule.id, 
                        ...extras
                    }
                })
                return resolve(rule)
            }
        ))
    }

    static updateRule({ rule_id, name, charge, policy_time, extras }){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                const updated_at = await TimeRepository.getCurrentTime()
                const rule = await this.prisma.rule.update({
                    where: { id: +rule_id },
                    data: {
                        name, 
                        charge: +charge, 
                        policy_time: +policy_time, 
                        updated_at
                    }
                })

                await this.prisma.extras.update({
                    where: { rule_id: +rule_id },
                    data: {
                        ...extras
                    }
                })
                return resolve(rule)
            }
        ))
    }

    static deleteRule({ rule_id }){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                const deleted_at = await TimeRepository.getCurrentTime()

                let response = await this.prisma.rule.update({
                    where: { id: +rule_id },
                    data: { deleted_at }
                })
                return resolve(response != null)
            }
        ))
    }

    static deleteAllRules(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                await this.prisma.rule.deleteMany({})
                return resolve(true)
            }
        ))
    }
}


export default RuleRepository