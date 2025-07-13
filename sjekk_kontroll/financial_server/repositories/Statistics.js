import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";

class StatisticsRepository {
    static prisma = PrismaClientService.instance

    static getStatistics = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const total_sanctions = await this.prisma.sanction.count()
                const total_unpaid_sanctions = await this.prisma.sanction.count({
                    where: {
                        status: 'not_paid'
                    }
                })

                const total_paid_sanctions = await this.prisma.sanction.count({
                    where: {
                        status: 'paid'
                    }
                })

                const total_deleted_sanctions = await this.prisma.sanction.count({
                    where: {
                        deleted_at: {
                            not: null
                        }
                    }
                })
                resolve({
                    total_sanctions,
                    total_unpaid_sanctions,
                    total_paid_sanctions,
                    total_deleted_sanctions
                })
            }
        )
    )

    static getSanctionsChartData = async () => new Promise(
        promiseAsyncWrapper(
            async (resolve, reject) => {
                const data = await this.prisma.sanction.groupBy({
                    by: ['date', 'status'],
                    _count: {
                        status: true
                    }
                })

                const paid_sanctions_chart_data = data.filter((d) => d.status === 'paid')
                const not_paid_sanctions_chart_data = data.filter((d) => d.status === 'not_paid')

                resolve({
                    paid_sanctions_chart_data,
                    not_paid_sanctions_chart_data
                })
            }
        )
    )
}

export default StatisticsRepository