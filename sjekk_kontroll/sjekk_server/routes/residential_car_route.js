import { Router } from "express"

import { deleteResidentialCar, getAllResidentialCars, getApartmentsCars, getResidentialCarsByQuarter, getResidentialDashboardStatistics, registerResidentialCar } from "../controllers/residential_car_controller.js"

const router = Router()

router.get('/residential-cars', getAllResidentialCars)
router.get('/residential-quarters/:id/residential-cars', getResidentialCarsByQuarter)
router.get('/residential-quarters/apartments/:id/residential-cars', getApartmentsCars)

router.get('/residential-quarters/:id/statistics', getResidentialDashboardStatistics)


router.post('/residential-cars', registerResidentialCar)

router.delete('/residential-cars/:id', deleteResidentialCar)

export default router