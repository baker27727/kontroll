import { Router } from "express"
import { createApartmentLocationRequest, getAllApartmentLocationRequests } from "../controllers/apartment_location_request_controller.js"

const router = Router()

router.get('/apartment-location-requests', getAllApartmentLocationRequests)
router.post('/apartment-location-requests', createApartmentLocationRequest)

export default router