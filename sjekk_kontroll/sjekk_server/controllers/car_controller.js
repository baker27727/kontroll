import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import CarRepository from "../repositories/Car.js";

export const getAllCars = asyncWrapper(
    async (req,res) => {
        let cars = await CarRepository.getAllCars();
        return res.status(OK).json(cars);
    }
)

export const getCarsCount = asyncWrapper(
    async (req,res) => {
        const count = await CarRepository.getCarsCount();
        return res.status(OK).send(count);
    }
)

export const getAllCarsByPlace = asyncWrapper(
    async (req,res) => {
        const {id: place_id} = req.params

        const cars = await CarRepository.getAllCarsByPlace({ place_id });
        return res.status(OK).json(cars);
    }
)

export const getCar = asyncWrapper(
    async (req,res) => {
        const {id: car_id} = req.params
        const car = await CarRepository.getCar({ car_id })
        return res.status(OK).json(car)
    }
)

export const getCarByPlate = asyncWrapper(
    async (req,res) => {
        const {id: plate_number} = req.params
        const car = await CarRepository.getCarByPlate({ plate_number })
        return res.status(OK).json(car)
    }
)

export const createCar = asyncWrapper(
    async (req,res) => {
        const { plate_number, start_date, end_date, registration_type, place_id, country } = req.body
        console.log(req.body);
        const car = await CarRepository.createCar({ plate_number, start_date, end_date, registration_type, place_id, country })
        return res.status(OK).json(car)
    }
)

export const updateCar = asyncWrapper(
    async (req,res) => {
        const {id: car_id} = req.params
        const { start_date, end_date, plate_number } = req.body

        let updated = await CarRepository.updateCar({ car_id, start_date, end_date, plate_number })
        return res.status(OK).json(updated)
    }
)

export const deleteCar = asyncWrapper(
    async (req,res) => {
        const {id: car_id} = req.params
        let delete_result = await CarRepository.deleteCar({ car_id })
        return res.status(OK).json(delete_result)
    }
)

export const deleteAllCars = asyncWrapper(
    async (req,res) => {
        await CarRepository.deleteAllCars()
        return res.status(OK).json(true)
    }
)