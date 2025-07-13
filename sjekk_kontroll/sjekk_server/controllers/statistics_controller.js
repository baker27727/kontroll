import asyncWrapper from "../middlewares/async_wrapper.js";
import { OK } from "../constants/status_codes.js";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getAllStatistics = asyncWrapper(
    async (req,res) => {

        const usersCount = await prisma.user.count({
            where: {
                deleted_at: null
            }
        })

        const rulesCount = await prisma.rule.count({
            where: {
                deleted_at: null
            }
        })

        const placesCount = await prisma.place.count({
            where: {
                deleted_at: null
            }
        })

        const brandsCount = await prisma.brand.count()
        const colorsCount = await prisma.color.count()
        
        const carsCount = await prisma.registeredCar.count({
            where: {
                deleted_at: null
            }
        })

        const violationsCount = await prisma.violation.count()
        const partnersCount = await prisma.partner.count({
            where: {
                deleted_at: null
            }
        })

        const data = {
            usersCount,
            rulesCount,
            placesCount,
            brandsCount,
            colorsCount,
            carsCount,
            violationsCount,
            partnersCount
        }


        return res.status(OK).json(data)
    }
)