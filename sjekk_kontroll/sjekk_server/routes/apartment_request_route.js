import { Router } from "express"
import { acceptApartmentRequest, createApartmentRequest, getAllApartmentRequests, getApartmentRequestsByResidentialQuarter, rejectApartmentRequest } from "../controllers/apartment_request_controller.js"

const router = Router()

router.get('/apartment-requests', getAllApartmentRequests)

router.get('/residential-quarters/:id/apartment-requests', getApartmentRequestsByResidentialQuarter)

router.post('/residential-quarters/:id/apartment-requests', createApartmentRequest)

router.post('/apartment-requests/:id/accept', acceptApartmentRequest)
router.post('/apartment-requests/:id/reject', rejectApartmentRequest)

export default router