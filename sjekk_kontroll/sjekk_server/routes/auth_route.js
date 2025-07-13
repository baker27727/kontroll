import { Router } from 'express'

const router = Router()

import { loginApartment, loginPartner, loginPlace, loginUser, validateToken } from '../controllers/auth_controller.js'

router.post('/auth/partners/login', loginPartner)
router.post('/auth/places/login', loginPlace)
router.post('/auth/users/login', loginUser)

router.post('/auth/validate-token', validateToken)

router.post('/auth/apartments/login', loginApartment)

export default router