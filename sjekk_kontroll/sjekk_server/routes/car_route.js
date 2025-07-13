import { Router } from "express";
import { createCar,getAllCars,getCar,updateCar,deleteCar,deleteAllCars, getCarByPlate, getAllCarsByPlace, getCarsCount } from "../controllers/car_controller.js";

const router = Router()

router.get('/cars', getAllCars)
router.get('/cars/count', getCarsCount)
router.get('/cars/place/:id', getAllCarsByPlace)
router.get('/cars/:id', getCar)
router.get('/cars/plate/:id', getCarByPlate)

router.post('/cars', createCar)
router.put('/cars/:id', updateCar)

router.delete('/cars/:id', deleteCar)
router.delete('/cars', deleteAllCars)


export default router