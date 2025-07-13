import { Router } from "express"

import { createNormalPlace, getAllNormalPlaces, updateNormalPlace } from "../controllers/normal_place_controller.js"

const router = Router()

router.get('/normal-places', getAllNormalPlaces)
router.post('/normal-places', createNormalPlace)

router.put('/normal-places/:id', updateNormalPlace)


export default router