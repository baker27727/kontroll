import PlaceRepository from "../repositories/Place.js"
import { BAD_REQUEST, INTERNAL_SERVER, OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import CustomError from "../interfaces/custom_error_class.js"
import PlaceProfileModel from "../models/PlaceProfile.js"

export const getAllPlaces = asyncWrapper(async (req, res, next) => {
    let places = await PlaceRepository.getAllPlaces()
    return res.status(OK).json(places)
})

export const getPlacesCount = asyncWrapper(async (req, res, next) => {
    let count = await PlaceRepository.getPlacesCount()
    return res.status(OK).send(count)
})

export const getPlace = async (req, res) => {
    try{
        const { id: place_id } = req.params
        const place = await PlaceRepository.getPlace({ place_id })

        return res.status(OK).json(place)
    }catch(error){
        return res.status(INTERNAL_SERVER).send(error)
    }
}

export const createPlace = asyncWrapper(
    async (req, res) => {
        const data = req.body
        let newPlace = await PlaceRepository.createPlace(data)
    
        return res.status(OK).json(newPlace)
    }
)

export const updatePlace = asyncWrapper(
    async (req, res) => {
        const { id: place_id } = req.params
        let { location, policy, code, partner_id } = req.body
    
        let updated = await PlaceRepository.updatePlace({ place_id, location, policy, code, partner_id })
    
        return res.status(OK).json({
            success: updated,
            message: 'Place updated successfully'
        })
    }
)

export const deletePlace = asyncWrapper(
    async (req, res) => {
        const { id: place_id } = req.params
        let deleted = await PlaceRepository.deletePlace({ place_id })
    
        return res.status(OK).json({ 
            success: deleted,
            message: 'Place was deleted successfully'
        })
    }
)

export const deletePlaceDashboard = asyncWrapper(
    async (req, res) => {
        const { dashboard_id } = req.params
        let deleted = await PlaceRepository.deletePlaceDashboard({ dashboard_id })
    
        return res.status(OK).json({ 
            success: deleted,
            message: 'Place was deleted successfully'
        })
    }
)

export const deleteAllPlaces = asyncWrapper(
    async (req, res) => {
        let count = await PlaceRepository.deleteAllPlaces()
    
        return res.status(OK).json({ 
            count: count,
            message: 'All places were deleted successfully'
        })
    }
)

export const createPlaceDashboard = asyncWrapper(
    async (req, res) => {
        const {id: place_id} = req.params
        const {access_code, access_username, place_name, place_type, free_parking_hours} = req.body

        let result = await PlaceRepository.createPlaceDashboard({ place_id,  access_code, access_username, place_name, place_type, free_parking_hours })

        return res.status(OK).json(result)
    }
)

export const getAllPlaceDashboards = asyncWrapper(
    async (req, res) => {
        const {id: place_id} = req.params

        let result = await PlaceRepository.getAllPlaceDashboards({ place_id })

        return res.status(OK).json(result)
    }
)

export const getPlaceProfile = asyncWrapper(
    async (req, res) => {
        const {client} = req.params

        let result = await PlaceRepository.getPlaceProfile(client)

        return res.status(OK).json(result)
    }
)

export const createCarFromPlaceDashboard = asyncWrapper(
    async (req, res) => {
        const { id: dashboard_id } = req.params
        const { plate_number } = req.body

        const result = await PlaceRepository.createCarFromPlaceDashboard({ plate_number, dashboard_id })

        return res.status(OK).json(result)
    }
)

export const getAllCarsRegisteredByPlaceDashboard = asyncWrapper(
    async (req, res) => {
        const {id: place_dashboard_id} = req.params

        let result = await PlaceRepository.getAllCarsRegisteredByPlaceDashboard({ place_dashboard_id })

        return res.status(OK).json(result)
    }
)
