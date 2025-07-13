import { Router } from "express"
import { 
    createPartner, 
    createPartnerDashboard, 
    deletePartner, 
    getAllPartnerPlaces, 
    getAllPartnerPlacesCount, 
    getAllPartners,
    updatePartner
} from "../controllers/partner_controller.js"

const router = Router()

router.get('/partners', getAllPartners)

router.get('/partners/:id/places', getAllPartnerPlaces)
router.get('/partners/:id/places/count', getAllPartnerPlacesCount)

router.post('/partners', createPartner)
router.put('/partners/:id', updatePartner)
router.delete('/partners/:id', deletePartner)
router.post('/partners/:id/dashboard', createPartnerDashboard)

export default router