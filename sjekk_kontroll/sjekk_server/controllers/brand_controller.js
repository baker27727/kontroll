import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import BrandRepository from "../repositories/Brand.js"

export const getAllBrands = asyncWrapper(
    async (req,res) => {
        let brands = await BrandRepository.getAllBrands()
        return res.status(OK).json(brands)
    }
)

export const createBrand = asyncWrapper(
    async (req,res) => {
        const {brand} = req.body
        let result = await BrandRepository.createBrand(brand)

        return res.status(OK).send(result)
    }
)

export const deleteBrand = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let result = await BrandRepository.deleteBrand(id)

        return res.status(OK).send(result)
    }
)