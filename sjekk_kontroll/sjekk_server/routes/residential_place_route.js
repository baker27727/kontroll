import { Router } from "express"
import { createResidentialQuarter, getAllResidentialQuarters } from "../controllers/residential_controller.js"
import { getResidentialCarsByQuarter } from "../controllers/residential_car_controller.js"
import { getApartmentRequestsByResidentialQuarter } from "../controllers/apartment_request_controller.js"
import { getApartmentsByResidentialQuarter } from "../controllers/apartment_controller.js"

const router = Router()

router.get('/residential-quarters', getAllResidentialQuarters)
router.get('/residential-quarters/:id/apartments', getApartmentsByResidentialQuarter)

router.post('/residential-quarters', createResidentialQuarter)


export default router