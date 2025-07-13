import { Router } from "express"
import { createBrand, deleteBrand, getAllBrands } from "../controllers/brand_controller.js"

const router = Router()

router.get('/brands', getAllBrands)
router.post('/brands', createBrand)
router.delete('/brands/:id', deleteBrand)

export default router